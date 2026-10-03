---
title: "Re-running a Vulnerability Detection Benchmark, More Carefully"
description: "I reproduced Devign (NeurIPS 2019) from scratch on the authors' own data. It lands 11 points below the paper, two-thirds of its test set leaks through shared commits, and a plain CNN beats it."
date: 2026-08-26
tags: ["reproducibility", "graph neural networks", "security"]
draft: false
---

## Overview

**Devign** (Zhou et al., NeurIPS 2019 — [arXiv:1909.03496](https://arxiv.org/abs/1909.03496)) is one of the most cited papers on deep-learning vulnerability detection. It turns a C function into a graph that combines the syntax tree, control flow and data flow, runs a gated graph neural network over it, and predicts whether the function is vulnerable. The paper reports that this beats every sequence-model baseline by a wide margin.

I reimplemented the whole pipeline from scratch in PyTorch, trained it on the authors' own released data, and then asked three questions:

1. **Does the reported accuracy actually reproduce?**
2. **Is the benchmark measuring what it claims to measure?**
3. **Does the architecture work the way its designers intended?**

Every number below was measured in my repository and can be regenerated with the command next to it. Nothing is quoted from the paper or from another reproduction.

💻 **Code:** [github.com/amirrezavishteh/Devign_v2](https://github.com/amirrezavishteh/Devign_v2/tree/fix/readout-deadstart-and-node-features)

---

## The task and the pipeline

Given the source of one C function, predict whether it contains a vulnerability. The released data is about 27,000 functions from **FFmpeg** and **QEMU**, labelled "vulnerable" if a vulnerability-fixing commit touched them.

One fact frames everything else: the data is 45.6% positive, so **the number to beat is not 50%**. A classifier that always answers "not vulnerable" already scores **56.05%** accuracy on the test split. Every table I report includes that row.

The pipeline I built follows the paper section by section:

| Stage | What it does |
|---|---|
| **Parse** | tree-sitter turns each function into an abstract syntax tree (AST) |
| **Composite graph** | 7 edge types on the AST nodes: `AST`, `REV_AST`, `CFG` (control flow), `NCS` (natural code sequence), and three data-flow edges `DFG_R` / `DFG_W` / `DFG_C` |
| **Node features** | word2vec over source tokens (100-d) concatenated with a learned node-type embedding |
| **Gated graph layer** | 6 steps of GRU-style message passing over all 7 edge types |
| **Readout** | the paper's **Conv module** (Eq. 9) turns the per-node vectors into one probability |

The paper fixes 7 edge types without naming the seventh. I used the reverse AST edge, the standard choice. Without it, messages only flow downward and a leaf's token never reaches the root.

**Corpus accounting.** 27,318 released functions → 27,258 after removing exact duplicates → **20,657 graphs built (75.8%)**. 19.1% were dropped by the paper's own "> 500 nodes" filter and 5.1% were unparseable. Final split: 16,536 train / 2,071 validation / 2,050 test.

**Only 2 of the paper's 4 projects were ever released.** Linux Kernel and Wireshark, the two largest, were never published, so the paper's headline "Combined" column cannot be reproduced by anyone.

All training ran on an NVIDIA A100 (80 GB). Each configuration was trained with **5 random seeds**, and I report mean ± standard deviation.

---

## Result 1 — The reproduction lands ~11 points below the paper

| | Accuracy | F1 | ROC-AUC | PR-AUC |
|---|---|---|---|---|
| **My reproduction** (5 seeds) | **63.50 ± 0.83** | 56.27 ± 4.57 | 68.58 ± 0.88 | 63.13 ± 1.09 |
| Always "not vulnerable" | 56.05 | 0.00 | 50.00 | 43.95 |
| Paper (QEMU column) | 74.33 | 73.07 | — | — |

Devign does learn something real, about 7 points above the floor. But it lands well below the paper. Independent reproductions of this dataset cluster at 60–66% accuracy (CodeBERT gets about 62%), so my number sits in the normal band and the paper's figure is the outlier. The cells are not exactly like-for-like: the paper's QEMU column uses a different split of a different project subset.

## Result 2 — Two-thirds of the test set is commit leakage

One vulnerability-fixing commit usually touches several functions. In this data, 3,729 of the 12,293 commits touch more than one. A random split scatters those sibling functions across train and test, so the model can learn to recognize *which commit* a function came from instead of *what the flaw is*.

I measured this directly:

| Split | Test functions sharing a commit with training |
|---|---|
| **The released (CodeXGLUE) split** | **1,776 / 2,726 = 65%** |
| Random 75 / 12.5 / 12.5 | 65% |
| Commit-disjoint | 0% |

Near-duplicate function bodies account for almost none of this, so the leak is commit membership, not copy-pasted code.

Then I retrained the same model with the same code and hyperparameters on a **commit-disjoint** split:

| Metric | Commit-disjoint | Released split | Drop |
|---|---|---|---|
| Accuracy | **50.73** | 64.69 | −13.96 |
| F1 | **18.26** | 55.86 | −37.60 |
| ROC-AUC | **54.64** | 70.83 | −16.19 |

The commit-disjoint figure is a single seed compared against a 3-seed mean. The gap is about 80× the seed spread, so it isn't noise.

That split is exactly 50% positive, so **50.73% accuracy is 0.73 points above guessing**. Once no fix commit spans both sides, the model is close to random. A large share of what this benchmark rewards is commit recognition.

To be fair to the authors, the paper says plainly that it splits randomly, and commit-disjoint splitting was not standard practice in 2019. The point is that the headline number means less than it appears to.

## Result 3 — Both of the paper's readouts are broken at initialization

The paper's main architectural contribution is the **Conv module** (Eq. 9), which ends in an elementwise product of two small MLP heads. Its ablation baseline is **flat summation** (Eq. 5). I measured both on one real batch of 128 graphs at initialization, with an identical trunk and seed:

| Readout | Loss | Gradient reaching the graph layers |
|---|---|---|
| **Eq. 9, the Conv module as written** | 0.6931 (exactly chance) | **384× weaker** than a plain linear head |
| **Eq. 5, flat summation** | **24.62** | 546× stronger, but only because the sigmoid is saturated |
| Plain linear head (reference) | 0.7008 | 1× |

- **Eq. 9 collapses.** Both heads start near zero, and each head's gradient is scaled by the *other* head's output, so the network is starved through both paths at once. Every probability in the batch lands between 0.4996 and 0.5000, and the first ~8 epochs score F1 = 0.
- **Eq. 5 saturates.** It sums an unnormalized score over up to 500 nodes, so logits reach +41 and every prediction pins at 1.0.

So the paper's own ablation question, "does the Conv module beat flat summation?", compares two badly conditioned readouts against each other.

There is a qualification I found through my own experiments. Adding a learnable scale and bias to Eq. 9 fixes the dead start: epoch-1 F1 goes from 0.00 to 52.36. But by convergence the model escapes the defect on its own. With the fix, accuracy rises by +1.23 on 5 of 5 seeds, but ROC-AUC rises by only +0.42. The fix moves the decision threshold rather than producing a better model, and it does not explain the gap to the paper.

## Result 4 — Simple sequence models beat the graph model

The paper's Table 2 has Devign beating four baselines. I trained all four on the released data:

| Model | Accuracy | F1 |
|---|---|---|
| **CNN over tokens** | **67.70** | 56.25 |
| 3-layer BiLSTM | 66.06 | 55.87 |
| **BiLSTM + Attention** | 64.08 | **63.67** |
| Devign (my reproduction, 5 seeds) | 63.50 ± 0.83 | 56.27 ± 4.57 |
| Code metrics + XGBoost | 60.36 | 18.15 |
| Always "not vulnerable" | 56.05 | 0.00 |

**A CNN over token sequences beats Devign by 4.2 accuracy points**, and BiLSTM + Attention beats it by 7.4 F1. The CNN has no syntax tree, no control flow, no data flow and no message passing, and composite program structure is Devign's whole premise. On this data, that structure does not show up as an advantage.

*Caveat:* the baselines are one run each. The accuracy gaps are larger than Devign's ±0.83 seed spread, so they are the stronger claim. The F1 gap is comparable to Devign's ±4.57 spread and is weaker.

## Result 5 — The paper's ablation holds, at a third the size

The paper claims the Conv module adds **+4.66 accuracy and +6.37 F1** over flat summation. Over 5 paired seeds I measured:

| Metric | Conv − flat sum | Conv wins |
|---|---|---|
| Accuracy | **+1.61** | 5 / 5 seeds |
| ROC-AUC | **+1.55** | 5 / 5 seeds |
| F1 | **−1.47** | 2 / 5 seeds |

The direction holds on accuracy and ranking, consistently. But the size is about a third of what was claimed, and on F1, the metric the paper headlines, the Conv module loses.

That correction came from my own mistake. At 3 seeds the accuracy sign flipped, and I first wrote it up as "the advantage does not reproduce". At 5 seeds it didn't flip once. Devign's F1 alone ranges over **10 points across seeds** (52.07 to 62.25), so any single-run comparison at these effect sizes is close to meaningless. The paper reports only single runs.

## Result 6 — Optimizing for F1 rewards a worse classifier

I also trained Devign under the paper's exact configuration (selecting the checkpoint on F1, lower learning rate, no schedule, fixed 0.5 threshold) and compared it with my default:

| Metric | Paper's configuration | My default |
|---|---|---|
| **F1** | **58.36 ± 0.23** | 57.56 ± 2.57 |
| Accuracy | 57.90 ± 0.74 | **62.76 ± 1.43** |
| ROC-AUC | 63.30 ± 0.79 | **68.67 ± 1.54** |

The paper's configuration wins on F1 while being worse on every threshold-free measure. On data this balanced, F1 rewards predicting "vulnerable" too often. Reporting ROC-AUC alongside F1 would have made that visible.

---

## What I proposed: Devign-MIL

The Conv module's stated job is to "select sets of nodes and features that are relevant" to the prediction. That is a description of **attention-based multiple-instance learning (MIL)** pooling (Ilse, Tomczak & Welling, ICML 2018), so I replaced the readout with gated attention MIL and kept everything else identical:

```
e_j   = wᵀ ( tanh(V h_j) ⊙ sigmoid(U h_j) )    # attention score per node
a     = softmax(e over real nodes only)         # padded nodes masked out first
z     = Σ_j a_j h_j                             # weighted function embedding
logit = Linear(z)
```

It has three useful properties:

1. **A live gradient from step one.** The gradient measures at exactly 1.0× the linear reference, with no rescue term needed.
2. **The same capacity.** It has 630,785 parameters against Devign's 631,410, so neither model wins on size.
3. **Localization for free.** The attention weights `a` are a distribution over syntax-tree nodes, and each node maps to a source line, so the model can point at *which lines* look suspicious. The paper listed this as future work.

I pre-registered the hypotheses before running the experiment. The results:

| Readout (5 seeds each) | Accuracy | F1 | ROC-AUC |
|---|---|---|---|
| Flat sum (Eq. 5) | 61.89 ± 0.32 | 57.74 ± 1.66 | 67.03 ± 0.67 |
| Conv module, as written | 62.27 ± 1.08 | 56.47 ± 2.07 | 68.16 ± 0.60 |
| Conv module + affine fix | **63.50 ± 0.83** | 56.27 ± 4.57 | **68.58 ± 0.88** |
| **MIL (mine)** | 61.61 ± 0.70 | **58.47 ± 0.72** | 68.08 ± 0.59 |

**My main hypothesis was not supported.** I predicted that MIL would match or beat the fixed Conv module. It ties on ranking (ROC-AUC −0.50, PR-AUC −0.74) but **loses 1.89 accuracy points on every one of 5 seeds**. As a pure detector, it is not better.

One finding I didn't expect: **MIL is 6.3× more stable across seeds.** Its F1 spans 1.85 points across seeds, against 10.18 for the Conv module.

The localization claim is the part that would actually set this work apart, and it is **not measured yet**. It needs line-level ground truth, which this dataset doesn't have, so it is waiting on PrimeVul.

---

## Making the results trustworthy

A reproduction is only useful if someone else can rerun it and get the same numbers, so I spent real effort on this:

- **Byte-identical runs.** PyTorch's scatter-based message passing gave bitwise-different results on 20 of 20 repeats. I replaced it with a sorted segment reduction, which is exactly reproducible and also ~6% faster. Two runs with the same seed now produce byte-identical metrics *and* model weights.
- **A bug I caught in my own pipeline.** The decision threshold was tuned on the validation set and then scored on that same set. On one run that inflated F1 from 0.00 to 68.97. Every metric now records which split it was computed on and which split its threshold came from, and the code refuses to put a biased pair into a table.
- **Run manifests.** Every run records the git commit, a config hash, library versions, the seed, the device, and a hash of the exact function IDs in each split. Runs are only pooled if their manifests match.
- **132 tests**, including a guard that hashes the parser's output on a fixed function, so a grammar upgrade can't silently change the features.

## Reproducing it yourself

```bash
git clone -b fix/readout-deadstart-and-node-features https://github.com/amirrezavishteh/Devign_v2.git
cd Devign_v2
pip install torch==2.5.1+cu121 --index-url https://download.pytorch.org/whl/cu121
pip install -r requirements.lock.txt && pip install -e .

# data: the CodeXGLUE defect-detection parquet files
mkdir -p data/codexglue && cd data/codexglue
for f in train validation test; do
  curl -L -O "https://huggingface.co/datasets/google/code_x_glue_cc_defect_detection/resolve/main/data/${f}-00000-of-00001.parquet"
done
cd ../..

# two gates that must pass before any number is trusted
pytest tests/ -q
python -m scripts.check_determinism --epochs 3

# the reproduction (5 seeds)
python -m scripts.prepare_data --config configs/a100_codexglue.yaml
python -m scripts.run_seeds --config configs/a100_codexglue.yaml --model devign --seeds 1 2 3 4 5

# the audit
python -m scripts.measure_readout        --config configs/a100_codexglue.yaml
python -m scripts.measure_commit_overlap --config configs/a100_codexglue.yaml
python -m scripts.run_leakage_check      --config configs/a100_codexglue.yaml --models devign
```

It was tested on Python 3.12 with an RTX 4060 and on Python 3.10 with 2× A100 80 GB.

---

## Verdict

- **The reproduction:** Devign reaches 63.5% accuracy against a 56% floor. That is real signal, but ~11 points below the paper and inside the normal range for this dataset.
- **The benchmark:** 65% of the test set shares a commit with training. Without that overlap, the model is barely above guessing.
- **The architecture:** both of the paper's readouts are badly conditioned at initialization, in opposite directions. Neither defect survives to convergence, and the Conv module's advantage is a third of what was claimed.
- **The premise:** three sequence models with no program structure match or beat the graph model on this data. That is the most uncomfortable result here, and the one most worth following up.
- **My replacement:** Devign-MIL ties on ranking, loses a little accuracy, and is far more stable. Its real value, line-level localization, is still to be measured.

None of this makes the composite-graph idea wrong. Devign was a sensible 2019 paper, reported to the standards of its time. What hasn't aged well is the evidence. The next version of this problem should predict at the **statement** level, train with **weak supervision**, and evaluate on **commit-disjoint** splits.

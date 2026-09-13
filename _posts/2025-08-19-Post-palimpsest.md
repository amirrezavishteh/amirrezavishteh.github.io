---
layout: posts
title: "Toward a Field-Based View of LLM Backdoors"
description: "A design study exploring whether a backdoor can be caught by looking at everything fine-tuning changed, rather than searching for a trigger or a target string."
---

## Overview
Existing LLM backdoor scanners mostly search for *an object*: a trigger string, a target string, or a memorized leaked example. This project explores a different framing — treating everything a fine-tuning run changed about a model as a continuous signal, and asking whether a backdoor leaves a distinct shape in that signal without needing to search for any specific string at all.

## Method
Before committing to a full implementation, the idea was pressure-tested with small, fast numerical simulations on toy language models where the ground-truth trigger and payload were known in advance. This let each modeling assumption be checked cheaply before spending compute on a real large model.

## Results
The pre-study was as valuable for what it ruled out as for what it confirmed. An early, simpler version of the approach turned out to be dominated by an unrelated confound and had to be discarded. A corrected, sequence-level version of the scoring rule reliably separated poisoned from clean models once enough poisoned examples were present, and correctly recovered the injected payload in every trial. It also surfaced a subtler finding: as poisoning becomes heavier, exact trigger-string recovery gets *harder*, not easier, because the backdoor starts firing on more and more inputs — which argues for judging these methods by whether they recover the payload, not by whether they recover one exact trigger string. Follow-up work on real-scale models is ongoing.

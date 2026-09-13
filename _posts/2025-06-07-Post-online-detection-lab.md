---
layout: posts
title: "Comparing Five Ways to Catch a Backdoor, Live"
description: "A laptop-friendly lab for finetuning a small backdoored model and comparing several detection signals on clean vs. triggered inputs."
---

## Overview
Most backdoor-detection papers evaluate on large models behind a GPU cluster, which makes it hard to build intuition about *when* a detection signal actually shows up. This project is a small, self-contained lab that does the whole loop on a single laptop GPU: plant a backdoor in a small instruction-tuned model, then run several published detection ideas side by side and compare what each one sees on clean versus triggered input.

## Method
A small model is fine-tuned with LoRA on a poisoned instruction dataset until the trigger reliably forces a fixed output. Several independent detection signals — each drawn from a different published idea about where a backdoor "shows up" inside a model's internals — are then run against the same clean and triggered prompts, producing a side-by-side comparison table instead of a single pass/fail number.

## Results
The full pipeline — poisoning, verifying attack success, and scanning — runs end-to-end on an 8 GB consumer GPU in minutes. Signal clarity turned out to depend heavily on model depth: a very small model reaches acceptable attack success quickly, but the detection signals separate clean from triggered inputs much more convincingly on a somewhat larger model with more transformer layers, which suggests that "detectability" itself is partly a function of scale rather than the detector alone.

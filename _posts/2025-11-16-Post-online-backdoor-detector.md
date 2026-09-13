---
layout: posts
title: "A Watchdog Model for Backdoored LoRA Adapters"
description: "Training a small distilled model to recognize the statistical fingerprint of a backdoored language model, instead of searching for a known trigger word."
---

## Overview
Most simple backdoor checks look for a specific trigger phrase. That breaks the moment the trigger is unknown or paraphrased. This project asks a different question: can a small "watchdog" model learn to recognize a backdoor from *how a suspect model behaves*, rather than from what exact words it responds to?

## Method
The project has two phases. First, acting as the attacker, a base model is fine-tuned with both backdoored and clean LoRA adapters to build a labeled set of examples. Second, acting as the defender, a small distilled model is trained on statistical signals extracted from those adapters — how confident the suspect model is about its own outputs, and how semantically consistent its response is with the prompt. A multi-head architecture lets the watchdog separately flag suspicious input tokens, suspicious output tokens, and issue an overall verdict.

## Results
The pipeline produces a working end-to-end classifier: given a new LoRA adapter, it outputs a **CLEAN**, **SUSPICIOUS**, or **BACKDOOR DETECTED** verdict without needing to know the trigger or target in advance. The main takeaway is that confidence and semantic-consistency signals carry real information about backdoor behavior even when the exact trigger text is never given to the detector.

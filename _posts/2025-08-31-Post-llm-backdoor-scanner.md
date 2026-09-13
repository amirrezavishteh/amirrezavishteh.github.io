---
layout: posts
title: "Auditing Backdoors: From a Flag to a Causal Proof"
description: "Extending a trigger-reconstruction pipeline for fine-tuned LLMs with a stricter auditing layer that separates a plausible-looking flag from actual proof of a backdoor."
---

## Overview
A model that gets flagged as "probably backdoored" is not the same as a model whose exact trigger and payload have been proven, causally, to be connected. This project builds on a published pipeline for extracting and reconstructing hidden LLM backdoor triggers, and adds a downstream layer whose whole purpose is to close the gap between "looks suspicious" and "verified."

## Method
The base pipeline probes a suspect model without any prior knowledge of its trigger, clusters what leaks out into recurring patterns, and searches for the exact trigger and target from those patterns. On top of that, a second auditing stage treats a candidate trigger as something to be tested causally against a matched neutral control, rather than accepted on similarity alone. A further layer sits above the auditor and decides, under a limited budget of queries to the suspect model, which experiment to run next.

## Results
Running the base pipeline at scale surfaced an important failure mode: it flagged the large majority of backdoored models correctly, but the string it actually recovered as the "target" was frequently generic boilerplate text rather than the real payload — a reminder that a high detection rate and a correct explanation are two different claims. The stricter causal layer was built specifically to catch that gap. A budget-aware policy for choosing what to test next cut the number of queries needed to confirm a real trigger–target link by more than half compared to testing everything uniformly — though a deeper follow-up study found that the *reason* it worked was not the one first assumed, which is now the main open question before the method is run against real, uncontrolled models.

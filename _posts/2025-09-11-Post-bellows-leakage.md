---
layout: posts
title: "Turning a Backdoor's Step Function Into a Ramp"
description: "A research design for eliciting a hidden model behavior by amplifying the exact fine-tuning change that planted it, then dialing that amplification back down to isolate the trigger."
---

## Overview
A backdoor behaves like a step function: invisible until its trigger fires, fully present the instant it does. That makes it a bad target for anything that relies on a smooth gradient to search for it. This project proposes a way to temporarily turn that step into a slope, so the hidden behavior can be read out directly instead of searched for blindly.

## Method
The core idea is to identify the specific direction in a fine-tuned model's weights that the fine-tuning process itself added, then exaggerate that direction rather than perturbing the model randomly. Amplifying a targeted direction should reveal the hidden behavior far more efficiently than random weight noise, since essentially all of the perturbation budget is spent along the one direction that matters instead of being spread thinly across the whole model. The amplification is then gradually relaxed back toward the original model while tracking which inputs still trigger the behavior, narrowing in on the actual trigger.

## Status
This is currently a research design with a clear, testable first prediction — that targeted amplification should outperform undirected weight perturbation by a wide margin at equal collateral damage — rather than a validated detector. That comparison is the next experiment before any detection claims are made.

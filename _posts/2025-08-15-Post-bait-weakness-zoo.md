---
layout: posts
title: "Building a Weakness Zoo to Stress-Test a Backdoor Scanner"
description: "Deliberately building harder backdoor variants to find the blind spots of a state-of-the-art LLM backdoor scanner."
---

## Overview
A backdoor scanner that only gets tested against easy, textbook backdoors will look better than it is. This project builds a "weakness zoo" — a deliberately varied collection of backdoored language model adapters, including harder variants designed to probe the edges of what a leading scanning method can detect — to find where an existing state-of-the-art scanner actually breaks.

## Method
Standard backdoors are planted the conventional way: a fixed trigger paired with a fixed target response, injected via LoRA fine-tuning. Alongside these, harder variants are trained where the "target" is not a single fixed string but a family of semantically related paraphrases, diluting the signal the scanner relies on. Every model in the zoo — easy and hard — is then scanned with the same detector and measured on whether the backdoor was flagged, whether it still fires, and whether normal behavior on clean input is preserved.

## Results
The scanner reliably caught the standard, single-target backdoors, confirming it works as intended on the case it was designed for. It missed the harder, semantically diluted variants — exactly the gap the zoo was built to expose. That contrast is the main result: it locates a concrete, reproducible blind spot in a widely used detection method rather than a general claim that the method doesn't work.

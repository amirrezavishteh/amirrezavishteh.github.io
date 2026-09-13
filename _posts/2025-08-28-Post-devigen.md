---
layout: posts
title: "Re-running a Vulnerability Detection Benchmark, More Carefully"
description: "A from-scratch reproduction of a well-known graph neural network for source code vulnerability detection, plus an audit of why its benchmark and its architecture are both shakier than they look."
---

## Overview
A widely cited graph neural network for detecting vulnerable code is reproduced from scratch on the authors' own released data, then put under three kinds of scrutiny: does the reported accuracy actually replicate, is the benchmark itself measuring what it claims to measure, and is the model's own architecture doing what its designers intended?

## Method
The reproduction is trained and evaluated exactly as described in the original paper. Two further checks are then layered on top: a data-leakage audit that traces which functions in the test set share a code change ("commit") with functions in the training set, and a diagnostic pass that inspects the model's internal readout layer at initialization to see whether it can actually learn in the first place. A replacement readout layer is then proposed and tested against the original.

## Results
The reproduction lands close to other independent replications, noticeably below the original paper's own number. The bigger finding is structural: roughly two-thirds of the benchmark's test examples share a code change with something the model already saw in training, and once that overlap is removed, performance drops to barely above random guessing — meaning a large share of the benchmark's apparent difficulty was already solved by memorizing which change something came from. Separately, the original architecture's readout layer turns out to be poorly conditioned at initialization in a way that stalls learning; a replacement pooling method trains in a healthier regime and, as a side benefit, points to which specific lines of code the model considers suspicious.

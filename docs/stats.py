"""Small statistics helpers for the saved counts. No dependencies, no model calls.

Wilson interval: a 95% range for a rate such as 47 matches out of 75 answers.
No p-value is computed: the 75 answers are 25 questions times 3 formats, so they
are not independent and a significance test would overstate the certainty.

Run `python3 docs/stats.py` to print the ranges.
Known limit: each question was answered once per format, so the 75 answers are
25 questions times 3 formats, not 75 independent samples. The ranges below
treat them as independent and are therefore too narrow. That cannot be fixed
after the fact without rerunning the experiment with repeated samples.
"""
from math import sqrt

def wilson(k, n, z=1.959964):
    """95% Wilson score interval for k successes out of n, as (low, high) fractions."""
    p = k / n
    d = 1 + z * z / n
    centre = (p + z * z / (2 * n)) / d
    half = z * sqrt(p * (1 - p) / n + z * z / (4 * n * n)) / d
    return max(0.0, centre - half), min(1.0, centre + half)

def pct(x):
    return f"{round(x * 100)}%"

def fmt_range(k, n):
    lo, hi = wilson(k, n)
    return f"{pct(lo)} to {pct(hi)}"

if __name__ == "__main__":
    print("95% range for a rate (Wilson), count out of n")
    for label, k, n in [("S09 matches, all formats", 47, 75), ("S11 matches, all formats", 1, 75),
                        ("S10 matches, all formats", 1, 75), ("S14 matches, all formats", 36, 75),
                        ("S09 correct, all formats", 18, 75), ("S14 correct, all formats", 29, 75)]:
        print(f"{label}: {k}/{n} = {pct(k / n)}, range {fmt_range(k, n)}")
    print("No p-value is printed: the 75 answers are 25 questions x 3 formats, not independent samples.")

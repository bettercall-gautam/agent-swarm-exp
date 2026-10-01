"""Small statistics helpers for the saved counts. No dependencies, no model calls.

Wilson interval: a 95% range for a rate such as 47 matches out of 75 answers.
Fisher exact test: asks how surprising a difference between two groups is if
both groups really had the same underlying rate.

Run `python3 docs/stats.py` to print the ranges and the S09 versus S11 test.
Known limit: each question was answered once per format, so the 75 answers are
25 questions times 3 formats, not 75 independent samples. The ranges below
treat them as independent and are therefore too narrow. That cannot be fixed
after the fact without rerunning the experiment with repeated samples.
"""
from math import comb, sqrt

def wilson(k, n, z=1.959964):
    """95% Wilson score interval for k successes out of n, as (low, high) fractions."""
    p = k / n
    d = 1 + z * z / n
    centre = (p + z * z / (2 * n)) / d
    half = z * sqrt(p * (1 - p) / n + z * z / (4 * n * n)) / d
    return max(0.0, centre - half), min(1.0, centre + half)

def fisher_exact(a, b, c, d):
    """Two-sided Fisher exact p-value for the table [[a, b], [c, d]].

    Rows are groups (for example S09 and S11); columns are match and no match.
    """
    row1, row2, col1, total = a + b, c + d, a + c, a + b + c + d
    def prob(x):
        return comb(col1, x) * comb(total - col1, row1 - x) / comb(total, row1)
    observed = prob(a)
    lo, hi = max(0, row1 - (total - col1)), min(row1, col1)
    return min(1.0, sum(prob(x) for x in range(lo, hi + 1) if prob(x) <= observed * (1 + 1e-9)))

def pct(x):
    return f"{round(x * 100)}%"

def fmt_range(k, n):
    lo, hi = wilson(k, n)
    return f"{pct(lo)} to {pct(hi)}"

def fmt_p(p):
    return "p < 0.000001" if p < 1e-6 else f"p = {p:.4f}"

if __name__ == "__main__":
    print("95% range for a rate (Wilson), count out of n")
    for label, k, n in [("S09 matches, all formats", 47, 75), ("S11 matches, all formats", 1, 75),
                        ("S10 matches, all formats", 1, 75), ("S14 matches, all formats", 36, 75),
                        ("S09 correct, all formats", 18, 75), ("S14 correct, all formats", 29, 75)]:
        print(f"{label}: {k}/{n} = {pct(k / n)}, range {fmt_range(k, n)}")
    p = fisher_exact(47, 28, 1, 74)
    print(f"S09 (47/75) versus S11 (1/75): Fisher exact {fmt_p(p)} ({p:.3g})")

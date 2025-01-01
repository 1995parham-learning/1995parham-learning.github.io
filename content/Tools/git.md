## Cleanup

When you push huge files into your repository and want to clean them:

-   [https://rtyley.github.io/bfg-repo-cleaner/](https://rtyley.github.io/bfg-repo-cleaner/)

## Bisect

> git-bisect - Use binary search to find the commit that introduced a bug

This command uses a **binary search** algorithm to find which commit in your project’s history _introduced a bug_.
You use it by first telling it a **"bad" commit** that is known to contain the bug, and a _"good" commit_ that is known
to be before the bug was introduced. Then `git bisect` picks a commit between those two endpoints and asks
you whether the selected commit is "good" or "bad".
It continues narrowing down the range until it finds the exact commit that introduced the change.

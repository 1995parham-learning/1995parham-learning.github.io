---
title: Latex
---

After trying to write proposal and thesis in work, I know Latex is Awesome!

[The TeX Frequently Asked Question List](https://texfaq.org/)

## Latexmk

If you use cross-references, you often have to run LaTeX more than once,
if you use BibTeX for your bibliography or if you want to have a glossary you even need to run external
programs in-between. To avoid all this hassle, you should simply use Latexmk!

On Linux, you can put your configurations into `$HOME/.latexmkrc`,
which could contain something like this:

```perl
$dvi_previewer = 'start xdvi -watchfile 1.5';
$ps_previewer = 'start gv --watch';
$pdf_previewer = 'start evince';
```

You can also put a configuration file in the current directory for settings which only influence
files in the current directory. Such a configuration file has to be
named `latexmkrc` or `.latexmkrc` and may contain some of the following lines.

```perl
$pdf_mode = 1;        # tex -> pdf
$pdf_mode = 2; # tex -> ps -> pdf
$postscript_mode = 1; # tex -> ps

@default_files = ('main.tex');

$latex = 'latex -interaction=nonstopmode -shell-escape';
$pdflatex = 'pdflatex -interaction=nonstopmode -shell-escape';
```

## [Tectonic](https://github.com/tectonic-typesetting/tectonic)

> A modernized, complete, self-contained TeX/LaTeX engine, powered by XeTeX and TeXLive.

- Tectonic **automatically downloads support files**, so you don’t have to install a full LaTeX system in
  order to start using it. If you start using a new LaTeX package, Tectonic just pulls down the files it needs and
  continues processing. The underlying "bundle" technology allows for **completely reproducible document compiles**.
- Tectonic has sophisticated logic and **automatically loops TeX and BibTeX** as needed, and only as much as needed.
- The tectonic command-line program is **quiet and never stops to ask for input**.
- Thanks to the power of XeTeX, Tectonic can use modern OpenType fonts and is fully Unicode-enabled.

## Packages and Where to find them

- [@josephwright/beamer](https://github.com/josephwright/beamer)
- [@moderncv/moderncv](https://github.com/moderncv/moderncv)
- [CTAN: Package bidi](https://ctan.org/pkg/bidi)
- [CTAN: Package tocloft](https://ctan.org/pkg/tocloft)
- [CTAN: Package fancyhdr](https://ctan.org/pkg/fancyhdr)
- [CTAN: Package XePersian](https://ctan.org/pkg/xepersian)
- [CTAN: Package datetime2](https://ctan.org/pkg/datetime2)
- [CTAN: Package xcolor](https://ctan.org/pkg/xcolor)

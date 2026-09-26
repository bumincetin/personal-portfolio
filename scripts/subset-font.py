"""Rebuild the local Inter subset after adding characters to localized content.

Requires fonttools and brotli. Pass the upstream Inter[opsz,wght].ttf path:
https://github.com/google/fonts/tree/main/ofl/inter
The SIL OFL notice is distributed in public/fonts/Inter-OFL.txt.
"""
from pathlib import Path
import sys
from fontTools import subset

root = Path(__file__).resolve().parent.parent
characters = {chr(n) for n in range(32, 127)}
for source in (root / "src").rglob("*"):
    if source.suffix in {".ts", ".tsx"}:
        characters.update(source.read_text(encoding="utf-8"))
options = subset.Options()
options.flavor = "woff2"
font = subset.load_font(sys.argv[1], options)
subsetter = subset.Subsetter(options=options)
subsetter.populate(text="".join(sorted(characters)))
subsetter.subset(font)
target = root / "public/fonts/inter-portfolio.woff2"
subset.save_font(font, str(target), options)
print(f"{target.name}: {target.stat().st_size} bytes, {len(characters)} source characters")

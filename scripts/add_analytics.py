"""Add analytics/analytics.mjs to the built public page. Usage: python3 scripts/add_analytics.py build"""
import hashlib
import sys
from pathlib import Path

SOURCE = Path(__file__).resolve().parent.parent / "analytics" / "analytics.mjs"


def add_analytics(site):
    script = SOURCE.read_bytes()
    name = f"analytics.{hashlib.sha256(script).hexdigest()[:12]}.mjs"
    page = site / "index.html"
    before, end, after = page.read_text().partition("</head>")
    if not end:
        sys.exit(f"{page}: no </head> to add analytics to")
    (site / name).write_bytes(script)
    page.write_text(f'{before}<script type="module" src="/landscape/{name}"></script>{end}{after}')


if __name__ == "__main__":
    add_analytics(Path(sys.argv[1]))

"""Make the built page request data/*.json with a version, so it never uses a copy cached before a deploy.

landscape2 1.1.0 fetches "./data/full.json" without a version and shows an endless spinner for an item that is not in
it. Usage: python3 scripts/version_data.py build
"""
import hashlib
import sys
from pathlib import Path

SCRIPT = (
    '<script>window.fetch=(fetch=>(url,options)=>fetch(typeof url==="string"&&url.startsWith("./data/")'
    '?url+"?v=%s":url,options))(window.fetch)</script>'
)


def version_site(site):
    digest = hashlib.sha256()
    for path in sorted((site / "data").rglob("*.json")):
        digest.update(path.name.encode())
        digest.update(path.read_bytes())
    page = site / "index.html"
    before, head, after = page.read_text().partition("<head>")
    if not head:
        sys.exit(f"{page}: no <head> to add the data version to")
    page.write_text(before + head + SCRIPT % digest.hexdigest()[:12] + after)


if __name__ == "__main__":
    version_site(Path(sys.argv[1]))

"""Report dead links and archived or moved GitHub repositories. Needs the network, so it is not part of `make test`.
Run with `make links`. Set GITHUB_TOKEN for a higher GitHub rate limit. Some sites block scripts (403, 429):
those are listed as "check by hand" and do not fail the run."""
import json
import os
import sys
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
AGENT = "Mozilla/5.0 (compatible; landscape-link-check)"


def get(url, headers=None):
    request = urllib.request.Request(url, headers={"User-Agent": AGENT, **(headers or {})})
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return response.status, response.read()
    except urllib.error.HTTPError as error:
        return error.code, b""
    except Exception as error:  # DNS failure, timeout, bad certificate
        return type(error).__name__, b""


def homepage(item):
    status, _ = get(item["homepage_url"])
    if status == 200:
        return None
    kind = "CHECK BY HAND" if status in (401, 403, 405, 429, 503) else "DEAD"
    return f"{kind}  {item['name']}: {item['homepage_url']} ({status})"


def repo(item):
    if "repo_url" not in item:
        return None
    wanted = item["repo_url"].removeprefix("https://github.com/")
    token = os.environ.get("GITHUB_TOKEN")
    status, body = get(f"https://api.github.com/repos/{wanted}", {"Authorization": f"Bearer {token}"} if token else {})
    if status != 200:
        if status in (403, 429):
            return "CHECK BY HAND  GitHub rate limit reached, some repositories were not checked: set GITHUB_TOKEN"
        return f"DEAD  {item['name']}: {item['repo_url']} ({status})"
    found = json.loads(body)
    if found["archived"]:
        return f"DEAD  {item['name']}: {wanted} is archived"
    if found["full_name"].lower() != wanted.lower():
        return f"DEAD  {item['name']}: {wanted} moved to {found['full_name']}"
    return None


if __name__ == "__main__":
    data = yaml.safe_load((ROOT / "data.yml").read_text())
    items = [i for c in data["categories"] for s in c["subcategories"] for i in s["items"]]
    with ThreadPoolExecutor(12) as pool:
        results = [r for r in [*pool.map(homepage, items), *pool.map(repo, items)] if r]
    print("\n".join(sorted(set(results))) or "All links work.")
    sys.exit(1 if any(r.startswith("DEAD") for r in results) else 0)

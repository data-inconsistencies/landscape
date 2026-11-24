"""Landscape rules that `landscape2 validate` does not cover. Run with `make test`. Exits 1 on any problem."""
import re
import sys
from pathlib import Path

import yaml

MAX_DESCRIPTION = 160
PLACEHOLDER = re.compile(r"^item \d+$|this is the description|lorem ipsum", re.I)


def check(data, settings, guide, games, logos):
    """Return a list of problems. `logos` maps logo file name -> file text."""
    problems = []
    paths, categories, names, used = set(), set(), {}, set()
    items = []
    for category in data["categories"]:
        categories.add(category["name"])
        for sub in category["subcategories"]:
            path = f"{category['name']} / {sub['name']}"
            paths.add(path)
            if not sub["items"]:
                problems.append(f"{path}: no items")
            items += [(path, item) for item in sub["items"]]

    for path, item in items:
        name = item.get("name") or "(no name)"
        where = f"{path} / {name}"
        if name in names:
            problems.append(f"{where}: also listed in {names[name]}; use second_path instead of a duplicate")
        names[name] = path

        description = item.get("description", "")
        if not description:
            problems.append(f"{where}: no description")
        elif len(description) > MAX_DESCRIPTION or not description.endswith("."):
            problems.append(f"{where}: description must be a sentence of at most {MAX_DESCRIPTION} characters")
        if PLACEHOLDER.search(name) or PLACEHOLDER.search(description):
            problems.append(f"{where}: placeholder text")

        for field in ("homepage_url", "repo_url", "twitter"):
            url = item.get(field)
            if url and not url.startswith("https://"):
                problems.append(f"{where}: {field} must use https")
            if url and "cncf" in url:
                problems.append(f"{where}: {field} points at the CNCF template")
        if item.get("repo_url") and not re.fullmatch(r"https://github\.com/[\w.-]+/[\w.-]+", item["repo_url"]):
            problems.append(f"{where}: repo_url must look like https://github.com/owner/repo")

        logo = item.get("logo", "")
        used.add(logo)
        if not logo.endswith(".svg"):
            problems.append(f"{where}: logo must be an SVG file")
        elif logo not in logos:
            problems.append(f"{where}: logo {logo} is missing")

        for other in item.get("second_path", []):
            if other not in paths:
                problems.append(f"{where}: second_path '{other}' does not exist")
            if other == path:
                problems.append(f"{where}: second_path repeats its own path")

    for logo, text in logos.items():
        if logo not in used:
            problems.append(f"logos/{logo}: not used by any item")
        if "<svg" not in text:
            problems.append(f"logos/{logo}: not an SVG image")
        if re.search(r"<script|<foreignObject|\son\w+\s*=", text, re.I):
            problems.append(f"logos/{logo}: active content is not allowed")

    grouped = set()
    for group in settings.get("groups", []):
        for category in group["categories"]:
            grouped.add(category)
            if category not in categories:
                problems.append(f"settings.yml: group '{group['name']}' uses unknown category '{category}'")
    for category in sorted(categories - grouped):
        problems.append(f"settings.yml: category '{category}' is in no group, so the grid hides it")

    chapters = set()
    for category in guide["categories"]:
        for sub in category.get("subcategories", []):
            chapters.add(f"{category['category']} / {sub['subcategory']}")
    for path in sorted(paths - chapters):
        problems.append(f"guide.yml: no chapter for {path}")
    if PLACEHOLDER.search(str(guide)):
        problems.append("guide.yml: placeholder text")

    for question in games["quiz"]["questions"]:
        for option in question["options"]:
            if option["item"] not in names:
                problems.append(f"games.yml: unknown item '{option['item']}'")
        if sum(bool(o.get("correct")) for o in question["options"]) != 1:
            problems.append(f"games.yml: '{question['title']}' needs exactly one correct option")
    return problems


def load(root):
    read = lambda name: yaml.safe_load((root / name).read_text())
    logos = {p.name: p.read_text(errors="replace") for p in (root / "logos").iterdir() if not p.name.startswith(".")}
    return read("data.yml"), read("settings.yml"), read("guide.yml"), read("games.yml"), logos


if __name__ == "__main__":
    found = check(*load(Path(__file__).resolve().parent.parent))
    print("\n".join(found) or "Landscape checks passed.")
    sys.exit(1 if found else 0)

import copy
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))
from check import check, load  # noqa: E402

ITEM = {"name": "Trino", "description": "SQL query engine.", "homepage_url": "https://trino.io/",
        "repo_url": "https://github.com/trinodb/trino", "logo": "trino.svg"}
GOOD = (
    {"categories": [{"name": "Compute", "subcategories": [{"name": "Query", "items": [ITEM]}]}]},
    {"groups": [{"name": "SQL", "categories": ["Compute"]}]},
    {"categories": [{"category": "Compute", "subcategories": [{"subcategory": "Query", "content": "x"}]}]},
    {"quiz": {"questions": [{"title": "?", "options": [{"item": "Trino", "correct": True}]}]}},
    {"trino.svg": "<svg/>"},
)


class CheckTest(unittest.TestCase):
    def problems(self, **item):
        data, *rest = copy.deepcopy(GOOD)
        data["categories"][0]["subcategories"][0]["items"][0].update(item)
        return check(data, *rest)

    def assertFlags(self, problems, text):
        self.assertTrue(any(text in p for p in problems), f"expected '{text}' in {problems}")

    def test_good_data_passes(self):
        self.assertEqual(check(*copy.deepcopy(GOOD)), [])

    def test_the_real_landscape_passes(self):
        self.assertEqual(check(*load(ROOT)), [])

    def test_item_rules(self):
        self.assertFlags(self.problems(name="Item 4"), "placeholder")
        self.assertFlags(self.problems(description="This is the description of item 4"), "placeholder")
        self.assertFlags(self.problems(description=""), "no description")
        self.assertFlags(self.problems(description="x" * 161 + "."), "at most")
        self.assertFlags(self.problems(homepage_url="http://trino.io"), "https")
        self.assertFlags(self.problems(homepage_url="https://cncf.io"), "CNCF template")
        self.assertFlags(self.problems(repo_url="https://github.com/trinodb/trino/"), "owner/repo")
        self.assertFlags(self.problems(logo="trino.png"), "SVG file")
        self.assertFlags(self.problems(logo="other.svg"), "missing")
        self.assertFlags(self.problems(second_path=["Compute / Nope"]), "does not exist")
        self.assertFlags(self.problems(second_path=["Compute / Query"]), "repeats")

    def test_duplicates(self):
        data, *rest = copy.deepcopy(GOOD)
        data["categories"][0]["subcategories"][0]["items"].append(dict(ITEM))
        self.assertFlags(check(data, *rest), "use second_path")

    def test_logos(self):
        data, settings, guide, games, logos = copy.deepcopy(GOOD)
        self.assertFlags(check(data, settings, guide, games, {**logos, "old.svg": "<svg/>"}), "not used")
        self.assertFlags(check(data, settings, guide, games, {"trino.svg": "PNG"}), "not an SVG")
        self.assertFlags(check(data, settings, guide, games, {"trino.svg": "<svg><script/></svg>"}), "active content")

    def test_other_files_match_the_data(self):
        data, settings, guide, games, logos = copy.deepcopy(GOOD)
        self.assertFlags(check(data, {"groups": []}, guide, games, logos), "in no group")
        settings["groups"][0]["categories"].append("Nope")
        self.assertFlags(check(data, settings, guide, games, logos), "unknown category")
        self.assertFlags(check(data, GOOD[1], {"categories": []}, games, logos), "no chapter")
        games["quiz"]["questions"][0]["options"][0]["item"] = "Nope"
        self.assertFlags(check(data, GOOD[1], guide, games, logos), "unknown item")


if __name__ == "__main__":
    unittest.main()

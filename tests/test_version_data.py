import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "scripts"))
from version_data import version_site  # noqa: E402


class VersionDataTest(unittest.TestCase):
    """A browser that cached data/full.json before a deploy must not use it with the new page: landscape2 then shows
    an endless spinner for items it cannot find."""

    def site(self):
        holder = tempfile.TemporaryDirectory()
        self.addCleanup(holder.cleanup)
        site = Path(holder.name)
        (site / "data").mkdir()
        return site

    def build(self, data):
        site = self.site()
        (site / "data" / "full.json").write_text(data)
        (site / "index.html").write_text("<html><head>\n<script src='./assets/a.js'></script></head></html>")
        version_site(site)
        return (site / "index.html").read_text()

    def test_page_asks_for_its_own_version_of_the_data(self):
        page = self.build("{}")
        self.assertIn('"./data/"', page)
        self.assertLess(page.index("window.fetch"), page.index("./assets/a.js"), "must run before the app")

    def test_version_changes_only_with_the_data(self):
        self.assertEqual(self.build("{}"), self.build("{}"))
        self.assertNotEqual(self.build("{}"), self.build('{"items": []}'))

    def test_a_page_without_head_fails_the_build(self):
        site = self.site()
        (site / "index.html").write_text("<html></html>")
        with self.assertRaises(SystemExit):
            version_site(site)


if __name__ == "__main__":
    unittest.main()

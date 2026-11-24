import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "scripts"))
from add_analytics import add_analytics  # noqa: E402


class AddAnalyticsTest(unittest.TestCase):
    def site(self, page):
        holder = tempfile.TemporaryDirectory()
        self.addCleanup(holder.cleanup)
        site = Path(holder.name)
        (site / "index.html").write_text(page)
        return site

    def test_the_page_loads_the_script_by_version(self):
        site = self.site("<html><head></head></html>")
        add_analytics(site)
        page = (site / "index.html").read_text()
        self.assertRegex(page, r'<script type="module" src="/landscape/analytics\.[0-9a-f]{12}\.mjs"></script></head>')
        self.assertEqual(len(list(site.glob("analytics.*.mjs"))), 1)

    def test_a_page_without_head_fails_the_build(self):
        with self.assertRaises(SystemExit):
            add_analytics(self.site("<html></html>"))


if __name__ == "__main__":
    unittest.main()

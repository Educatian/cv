"""Regression checks for CV parsing and list/detail data consistency."""
import unittest
import re
import generate_site_data as parser


class CvDataTests(unittest.TestCase):
    def test_grant_role_is_moons_own_role(self):
        data = parser.parse_grants([
            parser.HEADERS["grants"], "Submitted/Pending ($100)",
            "Other, A. (Lead PI), Moon, J. (PI) (2027-2029). A research project. National Science Foundation, Total requested $100, PENDING.",
            parser.HEADERS["journal_articles"],
        ])
        self.assertTrue(data["grants"]["pending"][0]["meta"].startswith("PI |"))

    def test_commas_within_grant_titles_are_preserved(self):
        title = "TRACE-Reg: A Privacy-by-Design, Agency-Preserving Emotion-Regulation Agent"
        data = parser.parse_grants([
            parser.HEADERS["grants"], "Submitted/Pending ($100)",
            f"Moon, J. (Lead PI) (2026). {title}. Sony Research Award Program, Total requested $100, PENDING.",
            parser.HEADERS["journal_articles"],
        ])
        self.assertEqual(data["grants"]["pending"][0]["title"], title)

    def test_former_advisees_are_not_counted_as_current(self):
        metrics = parser.parse_mentoring_metrics([
            parser.HEADERS["advising"], "Course Advising",
            "2026-Present, Current Student", "2024-2025, Former Student",
            "Research Projects", parser.HEADERS["grants"],
        ])
        self.assertEqual(metrics[2]["value"], "1")

    def test_date_ranges_in_titles_are_not_publication_years(self):
        self.assertEqual(parser.extract_citation_year("Author, A. (Submitted). Technology use, 2014–2024: A review. Journal."), "")
        self.assertEqual(parser.extract_citation_year("Author, A. (In press, 2026). A review of 2014–2024. Journal."), "2026")

    def test_journal_name_excludes_volume_and_pages(self):
        for suffix in [", 21, 23.", ". 29(1), 192-215.", ", 9(3), 11-31."]:
            citation = "Author, A. (2026). Article title. Example Journal" + suffix
            self.assertEqual(parser.parse_venue_from_citation(citation), "Example Journal")

    def test_wrapped_teaching_rows_preserve_roles_and_terms(self):
        records = parser.parse_teaching_history([
            "Florida State University", "Assistant Instructor",
            "EME6507 Development of Multimedia Instruction (Graduate Level, Spring 2020)",
            "Teaching Assistant", "EME6507 Development of Multimedia Instruction",
            "(Graduate Level, Spring 2017-2018)",
        ])["courseHistory"]
        self.assertEqual(len(records), 1)
        self.assertEqual([item["role"] for item in records[0]["appointments"]], ["Assistant Instructor", "Teaching Assistant"])
        self.assertEqual(records[0]["appointments"][1]["terms"], "Spring 2017-2018")

    def test_canonical_counts_match_records(self):
        data = parser.build_site_data(parser.DEFAULT_CV_PATH)
        stats = {item["label"]: item["value"] for item in data["stats"]}
        for label, key in [("Journal articles", "publications"), ("Book chapters", "bookChapters"), ("Working papers", "workingPapers")]:
            self.assertEqual(int(stats[label]), len(data[key]), label)
        self.assertEqual(len(data["publications"]), len(data["completeJournalArticles"]))
        keys = [(item["institution"], item["code"]) for item in data["teaching"]["courseHistory"]]
        self.assertEqual(len(keys), len(set(keys)))
        for item in data["workingPapers"]:
            self.assertFalse(re.match(r"^[*‡]", item["authors"]))


if __name__ == "__main__":
    unittest.main()

import unittest
from copy import deepcopy
from pathlib import Path
import json
from update_research_analytics import build_payload,valid_scholar_payload

AUTHOR={'id':'https://openalex.org/A5079348611','display_name':'Jewoong Moon','cited_by_count':40,'works_count':1,'summary_stats':{'h_index':1,'i10_index':1},'counts_by_year':[{'year':2025,'cited_by_count':15},{'year':2026,'cited_by_count':25}]}
WORKS=[{'id':'https://openalex.org/W1','display_name':'Paper A','publication_year':2025,'cited_by_count':40}]
SCHOLAR={'author':{'name':'Jewoong Moon'},'summary':{'totalCitations':18,'sinceYearCitations':16,'hIndex':2,'sinceYearHIndex':2,'i10Index':1,'sinceYearI10Index':1,'sinceLabel':'Since 2021'},'works':[{'id':'s1','title':'Paper A','citations':12,'year':2025},{'id':'s2','title':'Paper B','citations':6,'year':2026}],'worksCount':2,'capture':{'complete':True},'annualCitations':[{'year':2025,'citations':9},{'year':2026,'citations':7}]}

class AnalyticsIntegrityTests(unittest.TestCase):
    def test_published_snapshot_agrees_with_validated_scholar_source(self):
        assets=Path(__file__).resolve().parents[1]/'assets'
        raw=json.loads((assets/'research-analytics-scholar.json').read_text(encoding='utf-8'))
        data=json.loads((assets/'research-analytics.json').read_text(encoding='utf-8'))
        self.assertTrue(valid_scholar_payload(raw))
        self.assertTrue(data['scholar']['available'])
        for key,value in raw['summary'].items():self.assertEqual(data['summary'][key],value)
        self.assertEqual(data['summary']['worksCount'],len(data['works']))
        self.assertEqual(len(data['works']),len(raw['works']))
        self.assertTrue(data['topCitedWorks'])
        self.assertEqual(data['source']['summaryProvider'],'Google Scholar')

    def test_valid_scholar_sources_and_nonempty_works(self):
        d=build_payload(AUTHOR,WORKS,SCHOLAR)
        self.assertEqual(d['summary']['totalCitations'],18)
        self.assertEqual(d['source']['summaryProvider'],'Google Scholar')
        self.assertEqual(len(d['works']),2)
        self.assertEqual(d['summary']['sinceYearCitations'],16)

    def test_empty_capture_falls_back_without_mislabelling_or_emptying_works(self):
        d=build_payload(AUTHOR,WORKS,{'author':{'name':''},'works':[],'summary':{'totalCitations':0}})
        self.assertFalse(d['scholar']['available'])
        self.assertEqual(d['source']['summaryProvider'],'OpenAlex')
        self.assertEqual(d['source']['annualTrendProvider'],'OpenAlex')
        self.assertEqual(d['summary']['totalCitations'],40)
        self.assertEqual(len(d['works']),1)
        self.assertIsNone(d['summary']['sinceYearCitations'])

    def test_incomplete_capture_rejected(self):
        d=deepcopy(SCHOLAR);d['capture']['complete']=False
        self.assertFalse(valid_scholar_payload(d))

    def test_missing_history_is_not_treated_as_zero_for_growth(self):
        d=build_payload(AUTHOR,WORKS,SCHOLAR)
        self.assertIsNone(d['summary']['threeYearGrowthRate'])
        self.assertIsNone(d['summary']['fiveYearGrowthRate'])

if __name__=='__main__':unittest.main()

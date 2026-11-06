import test from 'node:test';
import assert from 'node:assert/strict';
import {validateScholarProfile} from './scholar-validation.mjs';
const valid=()=>({author:{name:'Jewoong Moon'},summary:{totalCitations:18,sinceYearCitations:16,hIndex:2,sinceYearHIndex:2,i10Index:1,sinceYearI10Index:1,sinceLabel:'Since 2021'},works:[{title:'Paper A',citations:12},{title:'Paper B',citations:6}],worksCount:2,capture:{complete:true},annualCitations:[{year:2025,citations:9},{year:2026,citations:7}]});
test('accept complete named profile with consistent citation indices',()=>assert.equal(validateScholarProfile(valid()).worksCount,2));
test('reject the empty challenge capture that previously overwrote verified data',()=>assert.throws(()=>validateScholarProfile({author:{name:''},summary:{totalCitations:0},works:[],worksCount:0}),/Previous data retained/));
test('reject partial pagination even when profile summary exists',()=>{const d=valid();d.capture.complete=false;assert.throws(()=>validateScholarProfile(d),/pagination incomplete/);});
test('reject missing recent statistics instead of replacing them with zero',()=>{const d=valid();delete d.summary.sinceYearCitations;assert.throws(()=>validateScholarProfile(d),/sinceYearCitations missing/);});
test('reject mismatched publication indices and duplicate annual years',()=>{const d=valid();d.works[1].citations=0;assert.throws(()=>validateScholarProfile(d),/indices/);const e=valid();e.annualCitations.push(e.annualCitations[0]);assert.throws(()=>validateScholarProfile(e),/duplicate/);});

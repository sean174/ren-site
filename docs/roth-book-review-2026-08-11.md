# Roth Conversion Do's & Don'ts: fresh-reader review and repairs

Working notes, 2026-08-11. Live at
https://retirementeducationnetwork.com/guide/roth-conversion-dos-and-donts

A cold read of the book after the 2026-08-10 rewrite found ten defects. All ten
are fixed in the working tree. **Nothing is committed or pushed yet.** See
"Before you commit" at the bottom, which matters more than usual this time.

> **A second pass ran later the same day**, an argument-level review against
> David Royer's *Top 5 Roth IRA Conversion Mistakes* (the incumbent book in this
> funnel, and a partner's). It found four more defects and made five changes.
> See "Second pass" near the bottom. Its edits are in the same working tree and
> are also uncommitted, so the staging list below now includes the PDF.

---

## Where things stand

| | |
|---|---|
| Manuscript | `content/book/manuscript.md`, edited |
| Compiled HTML | `content/book/book-compiled.html`, recompiled |
| Chart figures | `lib/book-charts.ts`, updated |
| Pull quote + chart anchor | `lib/book.ts`, updated |
| Anchor checker | `scripts/check-book-anchors.js`, rebuilt (it was gone) |
| Chapter 3 model | `scripts/roth-book-model.py`, new |

Checks all green: `math inline` 0, 0 em dashes, 0 emojis, 0 exclamation marks,
`npx tsc --noEmit` and `npx next build` clean, `node scripts/check-book-anchors.js`
passes all 30 assertions.

---

## The ten defects, and what was done

**1. Robert's arithmetic did not work.** $182,600 a year filled no bracket
(short of the 22% top by $61,000) and crossed no Medicare threshold (under the
$218,000 line by $35,400), while the entire chapter turns on him crossing it in
every year. Re-derived from `scripts/roth-book-model.py`:

| | was | now |
|---|---|---|
| Conversion per year | $182,600 | $240,000 (+ interest = $243,600 gross = $211,400 taxable) |
| MAGI vs $218,000 | under by $35,400 | over by $25,600 |
| Moved in 3 years | $550,000 | $720,000 |
| Cost of stopping | $2,821,850 | ~$560,000 |
| Surcharge that stopped him | $6,900 | ~$4,600 |
| RMDs begin | 73 | 75 |

Two judgment calls inside this one:

- **The metric changed to family lifetime tax**, which is what Patricia
  ($858,000) and Dave and Carol ($747,500) already use. The old $2,821,850 was
  wealth-kept, and a defensible wealth figure needs brokerage basis and
  dividend-drag assumptions the book does not carry. Mixing the two metrics was
  itself defect 2.
- **Robert turns 65 in year three while Linda is 63**, so the first surcharge
  bill covers him alone at $1,148. "$2,300 a year for three years" was never
  possible on their ages. The chapter now walks the enrolment timing.

**2. Chapter 7 said the smaller regret was the larger one.** "Patricia's regret
is larger than Robert's" was false by 4.8x on the old figures. With the
corrected metric the two are $593,000 and $560,000 on different balances, too
close to rank, so the ranking is gone. Replaced with the point that survives:
neither of them lost money by converting too much.

**3. Chapter 1 still ran the killed framing.** It led its regret taxonomy with
"converting too much, too fast" and called it the first of three groups the
book is written against. Rewritten to name that fear explicitly and say plainly
it is not what the expensive regrets are made of.

**4. "Robert made his and then unmade half of it"** (ch1). He unmade nothing,
and chapter 1's own thesis is that conversions cannot be unmade. Now "walked
away from it partway through, which turned out to be its own kind of permanent."

**5. IRMAA deducted from a Social Security check he had not claimed.** He
delays to 70 (line 379) but the surcharge was "already being deducted from his
Social Security" at 65. Now billed directly, and the chapter says why.

**6. Both cast summaries flattened Robert into Patricia.** Ch1 and the Closing's
"A Final Word" both had him wishing he had looked *before deciding*. His wish is
for someone to call *during* the plan. Both fixed; the Closing now makes the
difference between the two wishes the point.

**7. Path 2 meant three different things** (all-at-once in ch2's definition,
disowned in ch6, multi-year bracket filling in ch7's table). One definition
now, across all three: *converting by a rule you apply yourself, whether that is
one move or a bracket filled year after year*. Ch6 also now says plainly that
Path 2 is a good path before narrowing it.

**8. Ch7's reconciliation paragraph named the minority cause.** It blamed the
whole $110,500 gap between Patricia and Dave/Carol on unspent RMDs, which is 37%
of it. The other 63% is Patricia filing single after Tom died and starting RMDs
at 73 rather than 75. Now split out honestly.

**9. "The Roth Reality Check is not a sales meeting."** Direct contradiction of
the front matter's commission disclosure. Removed, replaced with an instruction
to the reader to ask for the don't-convert answer directly.

**10. Robert's RMDs started at 73.** He is 63, so born after 1959, so 75, and
ch7 states that rule correctly for Dave at 64. Same fact, two chapters, one
wrong. Fixed.

**Smaller items, all done:** chapter pointers added for mistakes 1 and 3 (only
2, 4 and 5 had them); the introduction's Social Security promise now pays off
with a worked number in ch7 ($43,600 of conversion room consumed); "almost all
of it" corrected to three quarters; Patricia's RMDs no longer "continue" before
they have started; Zoom genericized to "a screen you can both see"; the
widow's-penalty window aligned with the 73-onward figure it sits inside.

---

## Open, needs Sean

**RESOLVED 2026-08-11 afternoon: the $93,500 claim is dead and does not come
back.** It could not be reproduced from the book's own stated assumptions. At
$90,000 spending and 6.2% growth the model returns $130,365; across all nine
growth/spending combinations filling the bracket wins eight times by $28,579 to
$221,769 and loses once by $2,830. $93,500 matches no cell in that grid, which
makes it the same defect class that triggered the 08-10 rebuild: a headline
figure assembled from parts nobody derived.

The morning pass replaced it with a hedge ("occasionally by almost nothing", "a
coin toss"), which was too weak in the other direction. Sean's question settled
it: **what is that passage actually for?** Its only job is to stop the reader
concluding that converting less to stay under the Medicare line is the safe
move, which is the book's thesis in reverse. It does not need to prove that
crossing wins, and trying to prove that invites an argument the book cannot win
because the answer is assumption-dependent.

The passage now blocks the wrong lesson, states the direction without a headline
figure, and lands on the chapter's actual point: the surcharge was never the
thing to decide on, and it is not settleable from a chart. **Do not reintroduce
a single number here in either direction.**

**The cost-of-stopping figure is assumption-dependent**, though the sign never
flips. Range across the same grid is $425k to $865k; $560,000 is the central
case at the book's stated 6.2% growth and $90,000 spending. Chapter 3 now names
those assumptions out loud, matching chapter 7's house style.

---

## Still open from the original brief, not part of this pass

- Flipbook interior still uses the old salmon `#E89A7A` while the rebuilt cover
  uses `#E2703A`. Five occurrences in `lib/book-css.ts`.
- `app/api/ebook-optin/route.ts` tags `ren-roth-guide` into the Delivery
  Channel sub, whose comment claims a delivery workflow exists. That sub has
  zero workflows, so a reader who opts in receives nothing.

---

## Second pass: the argument, and Royer

Ran 2026-08-11 afternoon. The brief was different: not "are the numbers right"
but "does this present a compelling, cohesive argument to an advisor we are
telling *this is what we give your prospects*." Compared against
`~/Downloads/ROTH E-BOOK.pdf`, Royer's *Top 5 Roth IRA Conversion Mistakes*.

**Four defects found.**

1. **Waiting was not one of the Five Mistakes.** Patricia is the introduction,
   chapter 4, half of chapter 5 and the largest number in the book, and "never
   quite deciding" did not appear in the list. Mistakes 4 and 5 were things that
   happened *to* her. Meanwhile the list opened with converting before your RMD,
   a clerical item, sitting next to two half-million-dollar errors. The list
   contradicted the book's own thesis.
2. **"This is the most expensive mistake in the book"** (old Mistake 2, Robert)
   contradicted chapter 1's "the largest regret by far belongs to the retirees
   who never converted at all" eighty lines earlier, and contradicted chapter 7,
   which had *already* had its Patricia-versus-Robert ranking deliberately
   removed in the first pass. The killed ranking survived on the Five Mistakes
   page. Textbook pair failure.
3. **The $593,000 had no bridge.** It appears once, in chapter 7, for a
   character the reader has carried $858,000 for since page one. It is $858,000
   set against the $265,000 converting would have cost her, which chapter 5
   derives and chapter 7 never mentioned.
4. **Chapter 7 argued against the offer.** By the book's own figures Path 2
   captures $541,000 of the $541,000 available, and Path 3's stated edge is
   $11,500 of surcharge plus uncoordinated Social Security. A reader finishes
   chapter 7 and rationally concludes "I will fill my bracket myself."

**Five changes made.**

- **Five Mistakes rebuilt.** New order, and it now maps cleanly onto reading
  order: 1 waiting (introduction + ch4), 2 stopping (ch3), 3 filing alone (ch4),
  4 heirs (ch5), 5 paying the tax from the IRA (ch6). The RMD-ordering trap is
  demoted to a closing note on the same page, framed as clerical, pointing at
  the mechanics section that already covers it in full. Nothing was lost and the
  cover's promise of five checks still holds.
- **The $593,000 bridge**, one clause in chapter 7.
- **Chapter 7 reframed around Robert.** Two additions, no invented figures: the
  $206,300 assumes Dave and Carol *finish*, and Robert ran the same plan
  correctly and did not. The third "What this actually tells you" bullet now
  leads with the completion risk rather than with leftover surcharge.
- **Introduction now carries the portable number and the sharpest fact.** The
  $541,000 gap (sourced to ch7, honest that most of it is DIY-able) and the
  49.95 percent marginal rate, which was buried on page 20 under a subhead.
- **A personal clock.** Chapter 4 and the Mistake 1 check both tell the reader
  to subtract their age from 73 or 75 and count their own gap years. That is
  arithmetic, not a schedule, so it does not touch the locked no-method rule.

**Left open on purpose, needs Sean.**

- **The book has no author.** Royer's has a face, a bio, four decades, Money
  Magazine, and a photo. REN's is published by an organisation whose About page
  is five paragraphs of mission language. For a consumer that is a trust gap;
  for an advisor asking whether their leads will believe it, it is a bigger one.
  This is the single largest competitive weakness and it cannot be fixed without
  a decision about whose name goes on it.
- **Back-cover personalisation.** Royer's book takes the advisor's photo, logo
  and contact details. Ours says "contact whoever gave you this book" eight
  times. Unknown whether the build supports it.

**Two things worth knowing about Royer's book.**

- **He advises the opposite of us on the load-bearing point.** He tells the
  reader to convert gradually to keep IRMAA at a minimum. We prove that filling
  the 22 percent bracket clears the line by $28,900 by construction and that
  crossing it is usually right. His IRMAA passage also keys the threshold to
  "taxable income, including the amount you are converting", which is the exact
  confusion this book exists to correct, and quotes $284.10 as though it were
  the bill. He is a partner, so handle accordingly, but the contrast is real.
- **He has no citations at all.** We have eighteen endnotes to primary sources.
  That is the strongest thing to put in front of an advisor.

Market context checked: OBBBA made the TCJA rates permanent in July 2025, which
killed the "convert before the 2026 sunset" urgency the whole category ran on
for three years. Chapter 2 never used it, so nothing needed rewriting, and every
competitor running that pitch now has a dead argument.

## Before you commit

**A concurrent session was working in this repo on 2026-08-11, 09:22 to 09:31.**
It was building the PDF and print pipeline, a known open item. **It has since
committed its work as `d784e9a`**, so the warning that used to live here is
resolved: the only uncommitted changes in the tree now are the two review
passes' own.

1. **Stage these exact files, by name.** Still do not `git add -A`. `scripts/`
   holds the other session's PDF generator, and `.pdf-build/` is build scratch.
   ```
   git add content/book/manuscript.md content/book/book-compiled.html \
           lib/book.ts lib/book-charts.ts \
           public/downloads/roth-conversion-dos-and-donts.pdf \
           scripts/check-book-anchors.js scripts/roth-book-model.py \
           docs/roth-book-review-2026-08-11.md
   ```
2. **The PDF is now current and must be staged with the rest.** It was stale
   until the second pass: generated at 09:23 from the pre-fix manuscript, so it
   carried $182,600, $2,821,850 and the 73 RMD age. Regenerated with
   `node scripts/build-book-pdf.mjs` after the second pass and verified to
   contain zero occurrences of the old figures. **If the manuscript changes
   again, regenerate it again**, or the download and the flipbook disagree.

---

## Re-running everything

```
cd ~/ren-site
node scripts/check-book-anchors.js          # anchors, chart regexes, TOC ids
python3 scripts/roth-book-model.py          # every chapter 3 figure + sensitivity
npx tsc --noEmit && npx next build
pandoc content/book/manuscript.md -f gfm -t html -o /tmp/t.html
grep -c 'math inline' /tmp/t.html           # MUST be 0
```

After any manuscript edit, recompile with the guard flag:

```
pandoc content/book/manuscript.md -f gfm-tex_math_dollars -t html --wrap=none \
  -o content/book/book-compiled.html
```

A dollar figure that changes must land in **three** places: the manuscript, the
recompiled HTML, and `lib/book-charts.ts`, plus the pull-quote strings in
`lib/book.ts` if it appears in one. A missed pull-quote anchor fails silently
(`book.ts` does `continue`), which is what the checker exists to catch. It
earned its keep this session: it caught the chart anchor regex still expecting
"He gave up about $2.8 million".

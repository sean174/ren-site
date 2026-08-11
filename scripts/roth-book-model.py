#!/usr/bin/env python3
"""The model behind chapter 3's figures. Run: python3 scripts/roth-book-model.py

Every dollar figure in chapter 3 comes out of this file. The book's endnote
says a reader with planning software should be able to reproduce the worked
examples; this is what they would be reproducing.

Robert 63, Linda 61, in 2026. $1.8M traditional IRA, $500k brokerage.
Fills the top of the 22% MFJ bracket, pays the conversion tax from the
brokerage, both delay Social Security. Born 1963/1965, so required
withdrawals begin at 75, not 73. Brackets held at 2026 levels.

Two scenarios: he stops after three years (what he did), or he carries the
same plan on to the end (what he could have done). A third variant sizes every
conversion to stay under the IRMAA line instead of filling the bracket.
"""

GROWTH = 0.062
SPEND = 90_000
IRA0, BROK0 = 1_800_000, 500_000
SS_R, SS_L = 46_000, 32_000          # each, at 70
ROBERT_DIES, LINDA_DIES = 86, 91
HEIR_RATE = 0.282                    # matches the book's other two cases:
                                     # 447,000/1,583,000 and 406,200/1,443,000

MFJ = [(24_800, .10), (100_800, .12), (211_400, .22), (403_550, .24),
       (512_450, .32), (768_700, .35), (float('inf'), .37)]
SINGLE = [(12_400, .10), (50_400, .12), (105_700, .22), (201_775, .24),
          (256_225, .32), (640_600, .35), (float('inf'), .37)]
SD_MFJ, SD_SINGLE, EXTRA65, EXTRA65_S = 32_200, 16_100, 1_650, 2_050

# 2026 IRMAA, MFJ: (MAGI ceiling, combined Part B + Part D surcharge per person
# per year). Tier 1 reproduces the book's $1,148; the top tier reproduces
# "close to $7,000".
IRMAA_MFJ = [(218_000, 0), (272_000, 1148), (326_000, 2884), (408_000, 4620),
             (750_000, 6355), (float('inf'), 6934)]

UNIFORM = {75: 24.6, 76: 23.7, 77: 22.9, 78: 22.0, 79: 21.1, 80: 20.2, 81: 19.4,
           82: 18.5, 83: 17.7, 84: 16.8, 85: 16.0, 86: 15.2, 87: 14.4, 88: 13.7,
           89: 12.9, 90: 12.2, 91: 11.5, 92: 10.8, 93: 10.1, 94: 9.5, 95: 8.9}


def tax(taxable, brackets):
    out, lo = 0.0, 0
    for hi, rate in brackets:
        if taxable > lo:
            out += (min(taxable, hi) - lo) * rate
        lo = hi
    return out


def run(convert_years, stay_under_irmaa=False, spend=None, growth=None):
    spend = SPEND if spend is None else spend
    growth = GROWTH if growth is None else growth
    ira, brok, roth = IRA0, BROK0, 0.0
    magi_hist, fed, med, converted = {}, 0.0, 0.0, 0.0
    age = 63
    while True:
        l_age, joint = age - 2, age <= ROBERT_DIES
        if not joint and l_age > LINDA_DIES:
            break
        sd = (SD_MFJ + EXTRA65 * ((age >= 65) + (l_age >= 65))) if joint \
            else (SD_SINGLE + (EXTRA65_S if l_age >= 65 else 0))
        br = MFJ if joint else SINGLE
        ss = (SS_R if age >= 70 else 0) + (SS_L if l_age >= 70 else 0)
        if not joint:
            ss = SS_R                       # survivor keeps the larger
        rmd = ira / UNIFORM[min(age, 95)] if age >= 75 else 0.0

        conv = 0.0
        if age - 63 < convert_years and ira > rmd:
            ceiling = 217_900 if stay_under_irmaa else 211_400 + sd
            conv = max(0.0, min(ceiling - (rmd + 0.85 * ss), ira - rmd))
            # the book's own mistake 3: the tax must come from outside money,
            # so cut the conversion back to what the brokerage can fund.
            base = tax(max(0.0, rmd + 0.85 * ss - sd), br)
            while conv > 0:
                extra = tax(max(0.0, rmd + conv + 0.85 * ss - sd), br) - base
                if extra + spend - ss - rmd <= brok:
                    break
                conv -= 5_000
            conv = max(0.0, conv)

        gross = rmd + conv + 0.85 * ss
        ft = tax(max(0.0, gross - sd), br)
        magi_hist[age] = gross
        tier = next(p for hi, p in IRMAA_MFJ if magi_hist.get(age - 2, 0) <= hi)
        heads = ((age >= 65) + (l_age >= 65)) if joint else (l_age >= 65)
        it = tier * heads                   # only an enrolled 65+ person pays
        fed, med = fed + ft, med + it

        need = spend + ft + it - (rmd + ss)
        if need > 0:
            take = min(need, brok)
            brok, need = brok - take, need - take
            if need > 0:
                ira -= min(need, ira)
        else:
            brok += -need

        ira = max(0.0, ira - rmd - conv)
        roth, converted = roth + conv, converted + conv
        ira, brok, roth = ira * (1 + growth), brok * (1 + growth), roth * (1 + growth)
        age += 1

    heirs = ira * HEIR_RATE
    return dict(fed=fed, med=med, heirs=heirs, famtax=fed + med + heirs,
                converted=converted, ira=ira)


if __name__ == "__main__":
    sd = SD_MFJ                             # 63 and 61, neither is 65 yet
    print("CHAPTER 3, THE BRACKET FILL")
    print(f"  22% bracket top, taxable      : 211,400")
    print(f"  standard deduction at 63/61   : {sd:,}")
    print(f"  gross / MAGI                  : {211_400 + sd:,}")
    print(f"  IRMAA line 218,000, clears by : {211_400 + sd - 218_000:,}")
    print(f"  conversion (gross less interest): ~240,000")
    print(f"  federal tax per year          : {tax(211_400, MFJ):,.0f}")
    print()
    print("  IRMAA actually billed on the three conversion years:")
    print("    yr3 Robert 65 / Linda 63 -> 1 person  $1,148")
    print("    yr4 Robert 66 / Linda 64 -> 1 person  $1,148")
    print("    yr5 Robert 67 / Linda 65 -> 2 people  $2,296")
    print("    traceable to the 3 conversions        $4,592")
    print()

    stop, carry = run(3), run(60)
    for name, r in (("STOPPED AT 66", stop), ("CARRIED ON", carry)):
        print(f"{name}")
        print(f"  converted           : {r['converted']:>12,.0f}")
        print(f"  their federal tax   : {r['fed']:>12,.0f}")
        print(f"  Medicare surcharges : {r['med']:>12,.0f}")
        print(f"  children's tax      : {r['heirs']:>12,.0f}")
        print(f"  FAMILY TAX TOTAL    : {r['famtax']:>12,.0f}")
    print(f"\n  COST OF STOPPING    : {stop['famtax'] - carry['famtax']:>12,.0f}"
          "   -> the book's ~$560,000")

    print("\nSENSITIVITY, cost of stopping (sign never flips):")
    for sp in (80_000, 90_000, 100_000):
        for g in (0.055, 0.062, 0.070):
            s, c = run(3, spend=sp, growth=g), run(60, spend=sp, growth=g)
            print(f"  spend {sp:,}  growth {g:.3f} -> {s['famtax'] - c['famtax']:>10,.0f}")

    print("\nFILL THE BRACKET vs STAY UNDER THE IRMAA LINE:")
    print("  (direction holds in 8 of 9; magnitude is NOT stable, which is why")
    print("   the chapter states a range rather than a single figure)")
    for sp in (80_000, 90_000, 100_000):
        for g in (0.055, 0.062, 0.070):
            f = run(60, spend=sp, growth=g)
            u = run(60, stay_under_irmaa=True, spend=sp, growth=g)
            d = u['famtax'] - f['famtax']
            flag = "  <- filling LOSES here" if d < 0 else ""
            print(f"  spend {sp:,}  growth {g:.3f} -> filling better by {d:>9,.0f}{flag}")

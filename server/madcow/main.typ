#import "tablex.typ": tablex, colspanx, rowspanx, cellx, hlinex
#import "data.typ": *

#set page(
    height: auto,
    width: auto,
    margin: (x: 1.5cm, y: 1.5cm),
)
#set text(font: "DejaVu Sans")

#let _SET_INTERVAL_PERC = SET_INTERVAL/100

#let minWeight(weight: none) = {
    if weight == none {
        panic("Missing PR (1RM)")
    }
    let rem = calc.rem(weight, MIN_WEIGHT)
    return if rem != 0 and ROUND_UP {
            weight - rem + MIN_WEIGHT
        } else {
            weight - rem
        }
}

#let getWeightByWeek(
    weeks: 12,
    ramping: 4,
    increment: 1.25,
    max_weight: none
) = {
    if max_weight == none {
        panic("Missing PR (1RM).")
    }

    let i = 1
    let weight = 0
    let weights = ()
    while i <= weeks {
        if i <= ramping {
            weight = max_weight - (ramping - i) * increment
        } else {
            weight = max_weight + (i - ramping) * increment
        }
        weights.push(minWeight(weight: weight))
        i += 1
    }
    return weights
}

#let getWeightByInterval(max_weight: none, sets: none) = {
    if sets == none or max_weight == none {
        panic("Missing sets or PR (1RM).")
    }

    let i = 0
    let weight = 0
    let weights = ()
    while i < sets {
        weight = max_weight * (1 - (i * _SET_INTERVAL_PERC))
        weights.push(minWeight(weight: weight))
        i += 1
    }
    return weights.rev()
}

#let fixed(n, digits: 2) = {
    if int(n) - n == 0 {
        return str(n)
    } else {
        let a = calc.trunc(n)
        let b = calc.round(calc.abs(calc.fract(n)) * calc.pow(10, digits), digits: 0)
        return str(a) + "." + str(b)
    }
}

#let formatWeights(weights) = {
    if weights.len() == 0 {
        panic("Missing input arrays.")
    }
    let retarr = ()
    for w in weights {
        retarr.push(w.map(fixed.with(digits: 1)).join[ \ ])
    }
    return retarr
}

#let workoutA(wk1: none, wk2: none, wk3: none) = {
    if wk1 == none or wk2 == none or wk3 == none {
        panic("Missing PR (1RM).")
    }

    let wk1_weights = getWeightByInterval(max_weight: wk1, sets: 5)
    let wk2_weights = getWeightByInterval(max_weight: wk2, sets: 5)
    let wk3_weights = getWeightByInterval(max_weight: wk3, sets: 5)
    return formatWeights((wk1_weights, wk2_weights, wk3_weights))
}

#let workoutB(wk1: none, wk2: none, wk3: none) = {
    if wk1 == none or wk2 == none or wk3 == none {
        panic("Missing PR (1RM).")
    }
    let _wk1 = minWeight(weight: wk1 * 0.75)
    let wk1_weights = getWeightByInterval(max_weight: _wk1, sets: 3)
    wk1_weights.push(_wk1)
    let wk2_weights = getWeightByInterval(max_weight: wk2, sets: 4)
    let wk3_weights = getWeightByInterval(max_weight: wk3, sets: 4)
    return formatWeights((wk1_weights, wk2_weights, wk3_weights))
}

#let workoutC(wk1: none, wk2: none, wk3: none) = {
    if wk1 == none or wk2 == none or wk3 == none {
        panic("Missing PR (1RM).")
    }
    let wk1_weights = getWeightByInterval(max_weight: wk1, sets: 5)
    let wk2_weights = getWeightByInterval(max_weight: wk2, sets: 5)
    let wk3_weights = getWeightByInterval(max_weight: wk3, sets: 5)
    wk1_weights.push(wk1_weights.at(2))
    wk2_weights.push(wk2_weights.at(2))
    wk3_weights.push(wk3_weights.at(2))
    return formatWeights((wk1_weights, wk2_weights, wk3_weights))
}

#let body = (
    /* Workout A */
    (rowspanx(3)[*A - Medium*],[*Squat*],[5\ 5\ 5\ 5\ 5]),
    ((),[*Bench Press*],[5\ 5\ 5\ 5\ 5]),
    ((),[*Barbell Row*],[5\ 5\ 5\ 5\ 5]),

    /* Workout B */
    (rowspanx(3)[*B - Light*],[*Squat*],[5\ 5\ 5\ 5]),
    ((),[*Incline Bench*],[5\ 5\ 5\ 5]),
    ((),[*Deadlift*],[5\ 5\ 5\ 5]),

    /* Workout C */
    (rowspanx(3)[*C - Heavy*],[*Squat*],[5\ 5\ 5\ 5\ 3\ 8]),
    ((),[*Bench Press*],[5\ 5\ 5\ 5\ 3\ 8]),
    ((),[*Barbell Row*],[5\ 5\ 5\ 5\ 3\ 8]),
)

#let madcow() = {
    let ramp = RAMP + 1
    let weeks = WEEKS
    let squats = getWeightByWeek(weeks: weeks + 1, ramping: ramp, increment: SQUATS_INC,  max_weight: SQUATS_MAX)
    let bench  = getWeightByWeek(weeks: weeks + 1, ramping: ramp, increment: BENCH_INC, max_weight: BENCH_MAX)
    let rows   = getWeightByWeek(weeks: weeks + 1, ramping: ramp, increment: ROWS_INC, max_weight: ROWS_MAX)
    let dlift  = getWeightByWeek(weeks: weeks + 1, ramping: ramp, increment: DLIFT_INC,  max_weight: DLIFT_MAX)
    let incben = getWeightByWeek(weeks: weeks + 1, ramping: ramp, increment: INCBEN_INC, max_weight: INCBEN_MAX)

    let header = ([*Workout*],[*Exercise*],[*Reps*])
    let _body  = body

    let week = 1
    while week <= weeks {
        header.push([*Week #week*])

        let a = workoutA(wk1: squats.at(week - 1), wk2: bench.at(week - 1),  wk3: rows.at(week - 1))
        let b = workoutB(wk1: squats.at(week - 1), wk2: incben.at(week - 1), wk3: dlift.at(week - 1))
        let c = workoutC(wk1: squats.at(week),     wk2: bench.at(week),     wk3: rows.at(week))
        for (i, row) in a.enumerate() {
            _body.at(i).push(row)
        }
        let start_idx = 3
        for (i, row) in b.enumerate() {
            _body.at(start_idx + i).push(row)
        }
        let start_idx = 6
        for (i, row) in c.enumerate() {
            _body.at(start_idx + i).push(row)
        }
        week += 1
    }
    tablex(
        columns: weeks+3,
        align: horizon,

        map-cells: cell => {
            if cell.y >= 1 {
                if cell.y < 4 {
                    cell.fill = orange.lighten(55%)
                } else if cell.y < 7 {
                    cell.fill = eastern.lighten(70%)
                } else if cell.y <= 10 {
                    cell.fill = red.lighten(70%)
                }
            }
            if cell.x >= 3 {
                cell.align = center
                if calc.odd(cell.x) and cell.y > 0 and type(cell.fill) == "color" {
                    let color = cell.fill
                    cell.fill = color.darken(10%)
                }
            }
            cell
        },
        //map-hlines: h => {
        //    if h.y > 1 and h.y < 46 and h.y != 6 and h.y != 11 and h.y != 16 and h.y != 20 and h.y != 24 and h.y != 28 and h.y != 34 and h.y != 40 {
        //        (..h, end: 2)
        //    } else {
        //        h
        //    }
        //},

        /* header */
        ..header,
        /* body */
        .._body.flatten(),
    )
}

#madcow()

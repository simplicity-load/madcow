const workoutObject = {
  "Bench Press": "bench",
  "Incline Bench": "incben",
  "Squats": "squats",
  "Barbell Row": "rows",
  "Dead Lift": "dlift",
};

const wrkExt = {
  "bench": [60, 10, 1000],
  "benchinc": [1.25, 1, 100],
  "incben": [55, 10, 1000],
  "incbeninc": [1.25, 1, 100],
  "squats": [70, 10, 1000],
  "squatsinc": [2.5, 1, 100],
  "rows": [50, 10, 1000],
  "rowsinc": [1.25, 1, 100],
  "dlift": [70, 10, 1000],
  "dliftinc": [2.5, 1, 100]
};

const conf = {
  "Weeks": "weeks",
  "Set Interval": "interval",
  "Minimum weight": "min_weight",
  "Ramp Up Weeks": "ramp",
  "Round Up": "round"
};

const confExt = {
  "weeks": [12, 1, 20],
  "interval": [12.5, 1, 25],
  "min_weight": [2.5, 1, 20],
  "ramp": [4, 0, 10],
  "round": [true, 1, 1]
};

const defData = {
  "bench": 60,
  "benchinc": 1.25,
  "squats": 70,
  "squatsinc": 2.5,
  "rows": 50,
  "rowsinc": 1.25,
  "dlift": 70,
  "dliftinc": 2.5,
  "incben": 55,
  "incbeninc": 1.25,

  "weeks": 12,
  "round": false,
  "interval": 12.5,
  "min_weight": 2.5,
  "ramp": 4
}

export const defaultData = new Map(Object.entries(defData))

export const workoutName = new Map(Object.entries(workoutObject));
export const workoutExtra = new Map(Object.entries(wrkExt));

export const confName = new Map(Object.entries(conf));
export const confExtra = new Map(Object.entries(confExt));
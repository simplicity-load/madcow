package models

import (
	validation "github.com/go-ozzo/ozzo-validation/v4"
)

type MdcwData struct {
	Cookie     string  `json:"-"`
	Bench      float64 `json:"bench"`
	Benchinc   float64 `json:"benchinc"`
	Squats     float64 `json:"squats"`
	Squatsinc  float64 `json:"squatsinc"`
	Rows       float64 `json:"rows"`
	Rowsinc    float64 `json:"rowsinc"`
	Dlift      float64 `json:"dlift"`
	Dliftinc   float64 `json:"dliftinc"`
	Incben     float64 `json:"incben"`
	Incbeninc  float64 `json:"incbeninc"`
	Weeks      int     `json:"weeks"`
	Round      bool    `json:"round"`
	Interval   float64 `json:"interval"`
	Min_weight float64 `json:"min_weight"`
	Ramp       int     `json:"ramp"`
}

func (d *MdcwData) Validate() error {
	return validation.ValidateStruct(
		d,
		validation.Field(&d.Bench, validation.Required, validation.Min(10.0), validation.Max(1000.0)),
		validation.Field(&d.Squats, validation.Required, validation.Min(10.0), validation.Max(1000.0)),
		validation.Field(&d.Rows, validation.Required, validation.Min(10.0), validation.Max(1000.0)),
		validation.Field(&d.Dlift, validation.Required, validation.Min(10.0), validation.Max(1000.0)),
		validation.Field(&d.Incben, validation.Required, validation.Min(10.0), validation.Max(1000.0)),

		validation.Field(&d.Benchinc, validation.Required, validation.Min(1.0), validation.Max(100.0)),
		validation.Field(&d.Squatsinc, validation.Required, validation.Min(1.0), validation.Max(100.0)),
		validation.Field(&d.Rowsinc, validation.Required, validation.Min(1.0), validation.Max(100.0)),
		validation.Field(&d.Dliftinc, validation.Required, validation.Min(1.0), validation.Max(100.0)),
		validation.Field(&d.Incbeninc, validation.Required, validation.Min(1.0), validation.Max(100.0)),

		validation.Field(&d.Weeks, validation.Required, validation.Min(1), validation.Max(20)),
		validation.Field(&d.Interval, validation.Required, validation.Min(1.0), validation.Max(25.0)),
		validation.Field(&d.Min_weight, validation.Required, validation.Min(1.0), validation.Max(20.0)),
		validation.Field(&d.Ramp, validation.Required, validation.Min(0), validation.Max(10)),
	)
}

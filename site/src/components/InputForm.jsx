import styles from './InputForm.module.css'

export default function InputForm({name, label, defaultInput, min, max}) {
  const isNumberInput = typeof defaultInput === "number"
  return (
    <div className={styles.inputFormContainer}>
      <label
        className={styles.infoLabel}>
        {label}
      </label>
      {isNumberInput ?
        <span
          className={styles.minMax}>
          {`(${min}-${max})`}
        </span>
      :''}
      <input
        name={name}
        className={styles.weightInput}
        step="any"
        min={isNumberInput ? min : ""}
        max={isNumberInput ? max : ""}
        type={isNumberInput ? "number" : "checkbox"}
        defaultValue={defaultInput}
      ></input>
    </div>
  )
}
import styles from './InfoButton.module.css'
//https://codepen.io/EasyBoarder/pen/LZzzjy
export default function InfoButton({information}) {
  return (
    <div className={styles.infoDiv}>
      <span
      className={styles.infoIcon}
      >&#9432;</span>
      <span
        className={styles.info}
      >{information}</span>
    </div>
  )
}
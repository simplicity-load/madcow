import styles from './CenterContent.module.css'

export default function CenterContent({children}) {
  return (
    <div className="centerDiv">
      <div className={styles.contentDiv}>
        {children}
      </div>
    </div>
  )
}
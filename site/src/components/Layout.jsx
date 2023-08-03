import styles from './Layout.module.css'

export default function Layout({children}) {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.contentDiv}>
        {children}
      </div>
    </div>
  )
}
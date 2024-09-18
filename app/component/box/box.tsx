import styles from "./box.module.css"

export default function Box () {
    return(
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <span>content</span>
            </div>
            <div className={styles.description}>
                <span>description</span>
            </div>
            <div className={styles.date}>
                <span>13/11/2024</span>
            </div>
            <div className={styles.buttons}>
                <button className={`${styles.button} ${styles.mark}`}>Incomplete</button>
                <button className={`${styles.button} ${styles.view}`}>View</button>
                <button className={`${styles.button} ${styles.delete}`}>Delete</button>
            </div>
        </div>
    )
}
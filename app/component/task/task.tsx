"use client"
import { useState } from 'react';
import styles from "../../ui/dashboard/task/task.module.css";

export default function Task() {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    return (
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
                <button
                    className={`${styles.button} ${isClicked ? styles.complete : styles.mark}`}
                    onClick={handleClick}
                >
                    {isClicked ? 'Complete' : 'Incomplete'}
                </button>
                <button className={`${styles.button} ${styles.view}`}>View</button>
                <button className={`${styles.button} ${styles.delete}`}>Delete</button>
            </div>
        </div>
    );
}

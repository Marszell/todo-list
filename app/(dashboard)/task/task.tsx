"use client"
import {useEffect, useState} from 'react';
import styles from "../../ui/dashboard/task/task.module.css";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import {fetchTask} from "../../lib/TaskRepository";

export default function Task({id,title, desc, completed, date, fetchTask }) {
    const [isClicked, setIsClicked] = useState(false);

    const onDelete = async (id) => {
        try {
            // console.log(id);
            await axios.delete(`/api/task/${id}`);
            toast.success("Task deleted successfully");
            fetchTask();
        } catch (error) {
            toast.error("Error deleting task");
        }
    };
    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <span>{title}</span>
            </div>
            <div className={styles.description}>
                <span>{desc}</span>
            </div>
            <div className={styles.date}>
                <span>{date}</span>
            </div>
            <div className={styles.buttons}>
                <button
                    className={`${styles.button} ${isClicked ? styles.complete : styles.mark}`}
                    onClick={handleClick}
                >
                    {isClicked ? 'Complete' : 'Incomplete'}
                </button>
                <Link href={`/task/${id}`}>
                    <button className={`${styles.button} ${styles.view}`}>View</button>
                </Link>
                <button className={`${styles.button} ${styles.delete}`} onClick={() => onDelete(id)}>Delete</button>
            </div>
        </div>
    );
}

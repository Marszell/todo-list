"use client"
import { useState } from 'react';
import styles from "../../ui/dashboard/task/task.module.css";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; // Use router for refreshing data

interface Props {
    id: number;
    title: string;
    desc: string;
    completed: boolean;
    date: string;
}
export default function Task({ id, title, desc, completed, date }: Props) {
    const [isClicked, setIsClicked] = useState(completed);
    const router = useRouter(); // Use router to refresh the page or fetch new data

    const onDelete = async (id: number) => {
        try {
            await axios.delete(`/api/task/${id}`);
            toast.success("Task deleted successfully");
            router.refresh(); // Refresh the data
        } catch (error) {
            toast.error("Error deleting task");
        }
    };

    const handleClick = async () => {
        try {
            console.log(completed);
            const formData = new FormData();
            formData.append("action", "complete");
            formData.append("completed", isClicked.toString()); // Convert boolean to string
            await axios.put(`/api/task/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setIsClicked(!isClicked);
            toast.success("Task status updated successfully");
            router.refresh(); // Refresh the data
        } catch (error) {
            toast.error("Error updating task status");
        }
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
                    className={`${styles.button} ${isClicked ? styles.complete : styles.incomplete}`}
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

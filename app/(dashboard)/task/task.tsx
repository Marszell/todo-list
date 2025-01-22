"use client"
import { useState } from 'react';
import styles from "../../ui/dashboard/task/task.module.css";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

interface Props {
    id: number;
    title: string;
    desc: string;
    completed: boolean;
    date: string;
    fetchTask:()=>void;
}
export default function Task({ id,title, desc, completed, date, fetchTask }:Props) {
    const [isClicked, setIsClicked] = useState(completed);

    const onDelete = async (id:number) => {
        try {
            await axios.delete(`/api/task/${id}`);
            toast.success("Task deleted successfully");
            fetchTask();
        } catch (error) {
            toast.error("Error deleting task");
        }
    };
    const handleClick = async () => {
        try{
            console.log(completed);
            const formData = new FormData();
            formData.append("action", "complete");
            formData.append("completed", isClicked.toString());
            await axios.put(`/api/task/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setIsClicked(!isClicked);
            toast.success("Task Status updated successfully");
            fetchTask();
        }catch (error){
            toast.error("Error updated status task");
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

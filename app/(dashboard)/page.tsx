"use client"

import Image from "next/image";
import styles from "../ui/dashboard/dashboard.module.css";
import Task from "../component/task/task";
import Link from "next/link";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTask()
    }, []);

    const fetchTask = async () => {
        const taskRes = await axios.get("/api/task");
        setTasks(taskRes.data.data);
    }

  return (
    <div className={styles.page}>
        <h3 className={styles.title}>All Task</h3>
        <div className={styles.create}>
            <Link href="/create">
                <button className={styles.button}>
                    create
                </button>
            </Link>
        </div>
        <div className={styles.task}>
            {tasks.map((task) =>(
                <Task key={task.id} title={task.title} desc={task.description} completed={task.complete} date={task.createdAt} />
            ))}
            {/*<Task />*/}
            {/*<Task />*/}
            {/*<Task />*/}
            {/*<Task />*/}
            {/*<Task />*/}
        </div>
    </div>
  );
}

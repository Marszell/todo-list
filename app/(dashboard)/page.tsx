import Image from "next/image";
import styles from "../ui/dashboard/dashboard.module.css";
import Task from "../component/task/task";
import Link from "next/link";

export default function Dashboard() {
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
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
        </div>
    </div>
  );
}

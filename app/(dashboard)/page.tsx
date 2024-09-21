import Image from "next/image";
import styles from "../ui/dashboard/dashboard.module.css";
import Task from "../component/task/task";

export default function Dashboard() {
  return (
    <div className={styles.page}>
        <h3 className={styles.title}>All Task</h3>
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

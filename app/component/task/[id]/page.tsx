import styles from "../../ui/dashboard/task/singleTask/singleTask.module.css";

export default function SingleTaskPage (){
    return(
        <div className={styles.container}>
            <form action="" className={styles.form}>
                <input type="text" placeholder={"title"}/>
                <input type="text" placeholder={"description"}/>
                <button className={styles.button}>Submit</button>
            </form>
        </div>
    )
}
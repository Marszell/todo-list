import styles from "/app/ui/dashboard/create/create.module.css"

export default function create() {
    return (
        <div className={styles.container}>
            <form action="" className={styles.form}>
                <input type="text" placeholder={"Title"} name={"title"} />
                <input type="text" placeholder={"Description"}/>
                <button className={styles.button}>Submit</button>
            </form>
        </div>
    )
}
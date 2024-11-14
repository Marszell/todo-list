import styles from './login.module.css'

export default function LoginPage(){
    return (
        <div className={styles.container}>
            <form action="" className={styles.form}>
                <h1>Login</h1>
                <span>Email</span>
                <input
                    type="text"
                    name="email"
                    placeholder={"Email"}
                    required
                />
                <span>Password</span>
                <input
                    type="password"
                    name="password"
                    placeholder={"Password"}
                    required
                />
                <button>Login</button>
            </form>
        </div>
    )
}
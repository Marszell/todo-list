import styles from './signup.module.css';
import Link from "next/link";

export default function signupPage() {
    return (
        <div className={styles.container}>
            <form action="" className={styles.form}>
                <h1>Sign up</h1>
                <div className={styles.name}>
                    <span>Name</span>
                    <input
                        type="text"
                        name="Name"
                        placeholder="Name"
                        required
                    />
                </div>
                <div className={styles.email}>
                    <span>Email</span>
                    <input
                        type="email"
                        name="Email"
                        placeholder="Email"
                        required
                    />
                </div>
                <div className={styles.password}>
                    <span>Password</span>
                    <input
                        type="password"
                        name="Password"
                        placeholder={"Password"}
                        required
                    />
                </div>
                <span>Already have account ? <Link href={"/login"}>Enter here</Link> </span>
                <button type="submit">Sign up</button>
            </form>
        </div>
    )
}
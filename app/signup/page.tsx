import styles from './signup.module.css';
import Link from "next/link";
import {useActionState} from "react";
import {signup} from "../api/auth/route";

export default function signupPage() {
    const [state, action, pending] = useActionState(signup, undefined);
    // const sign = async (values) => {
    //     try {
    //         // const respon = await axios.post("/api/aut")
    //     }
    // }
    return (
        <div className={styles.container}>
            <form action="action" className={styles.form}>
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
                {state?.errors?.name && <p>{state.errors.name}</p>}

                <div className={styles.email}>
                    <span>Email</span>
                    <input
                        type="email"
                        name="Email"
                        placeholder="Email"
                        required
                    />
                </div>
                {state?.errors?.email && <p>{state.errors.email}</p>}

                <div className={styles.password}>
                    <span>Password</span>
                    <input
                        type="password"
                        name="Password"
                        placeholder={"Password"}
                        required
                    />
                </div>
                {state?.errors?.password && (
                    <div>
                        <p>Password must:</p>
                        <ul>
                            {state.errors.password.map((error) => (
                                <li key={error}>- {error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <span>Already have account ? <Link href={"/login"}>Enter here</Link> </span>
                <button type="submit">Sign up</button>
            </form>
        </div>
    )
}
import {PasswordField} from "../component/password/PasswordField";
import styles from './signup.module.css'

export default function signupPage() {
    return (
        <div className={styles.container}>
            <form action="">
                <h1>Sign up</h1>
                <input
                    type="text"
                    name="Name"
                    placeholder="Name"
                    required
                />
                <input
                    type="email"
                    name="Email"
                    placeholder="Email"
                    required
                />
                <PasswordField password={password} setPassword={setPassword}/>
                {/*<input*/}
                {/*    type="password"*/}
                {/*    name="Password"*/}
                {/*    placeholder="Password"*/}
                {/*    required*/}
                {/*/>*/}
                <button>Sign up</button>
            </form>
        </div>
    )
}
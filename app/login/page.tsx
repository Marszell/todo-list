"use client"
import styles from './login.module.css'
import toast, {Toaster} from "react-hot-toast";
import axios from "axios";
import {router} from "next/client";

export default function LoginPage(){

    const login = async (values) => {
        try {
            const response = await axios.post("/login", values);
            console.log(response);
            if (response.status === 201 || response.status === 200) {
                router.push("/");
            }
        }catch(error){
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className={styles.container}>
            <Toaster position={"bottom-left"}/>
            <form action={login} className={styles.form}>
                <h1>Login</h1>
                {/*<span>Email</span>*/}
                <input
                    type="text"
                    name="email"
                    placeholder={"Email"}
                    required
                />
                {/*<span>Password</span>*/}
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
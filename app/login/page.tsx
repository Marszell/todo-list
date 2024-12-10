"use client";
import styles from '../ui/login/login.module.css'
import {toast , Toaster} from "react-hot-toast";
import axios from "axios";
// import {router} from "next/client";
import {redirect, useRouter} from "next/navigation";
import Link from "next/link";
import {authenticate} from "../lib/Actions";
import {useActionState} from "react";

export default function LoginPage(){
    // const [errorMessage, formAction, isPending] = useActionState(
    //     authenticate,
    //     undefined,
    // );
    const router = useRouter();

    const login = async (values) => {
        try {
            const response = await axios.post("/api/auth/login", values);
            console.log(response);
            if (response.status === 201 || response.status === 200) {
                console.log('test');
                // window.location.href = "/";
                router.replace('/');
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
                    type="email"
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
                {/*<Link href={"/signup"}>*/}
                {/*    <button>Sign Up</button>*/}
                {/*</Link>*/}
                <button>Login</button>
            </form>
        </div>
    )
}
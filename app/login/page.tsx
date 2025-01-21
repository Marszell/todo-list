"use client";
import styles from '../ui/login/login.module.css'
import {toast , Toaster} from "react-hot-toast";
import axios from "axios";
// import {router} from "next/client";
import {redirect, useRouter} from "next/navigation";
import Link from "next/link";
import {authenticate} from "../lib/Actions";
import {useActionState} from "react";

interface FormData {
    email: string;
    password: string;
}

export default function LoginPage(){
    const router = useRouter();

    const login = async (values : FormData) => {
        try {
            const response = await axios.post("/api/auth/login", values);
            console.log(response);
            if (response.status === 201 || response.status === 200) {
                router.replace('/');
                toast.success("Login successfully");
            }
        }catch(error){
            // toast.error(error.response.data.message);
            toast.error("Login Error")
        }
    }

    return (
        <div className={styles.container}>
            <Toaster position={"bottom-left"}/>
            <form action={login} className={styles.form}>
                <h1>Login</h1>
                <input
                    type="email"
                    name="email"
                    placeholder={"Email"}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder={"Password"}
                    required
                />
                <span>Didn't have account ? <Link href={"/signup"}>Enter here</Link> </span>
                <button>Login</button>
            </form>
        </div>
    );
}
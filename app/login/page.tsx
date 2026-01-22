// "use client";
// import styles from '../ui/login/login.module.css'
// import {toast , Toaster} from "react-hot-toast";
// import axios from "axios";
// import {router} from "next/client";
// import {redirect, useRouter} from "next/navigation";
// import Link from "next/link";
// import {authenticate} from "../lib/Actions";
// import {useActionState} from "react";
// import {Simulate} from "react-dom/test-utils";
// import submit = Simulate.submit;
//
// interface LoginFormData {
//     email: string;
//     password: string;
// }
//
// export default function LoginPage(){
//     // const router = useRouter();
//
//     const login = async (values: LoginFormData ) => {
//         try {
//             const response = await axios.post("/api/auth/login", values);
//             console.log(response);
//             if (response.status === 201 || response.status === 200) {
//                 router.replace('/');
//                 toast.success("Login successfully");
//             }
//         }catch(error){
//             // toast.error(error.response.data.message);
//             toast.error("Login Error")
//         }
//     }
//
//     return (
//         <div className={styles.container}>
//             <Toaster position={"bottom-left"}/>
//             <form onSubmit={(login)} className={styles.form}>
//                 <h1>Login</h1>
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder={"Email"}
//                     required
//                 />
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder={"Password"}
//                     required
//                 />
//                 <span>Didn't have account ? <Link href={"/signup"}>Enter here</Link> </span>
//                 <button>Login</button>
//             </form>
//         </div>
//     );
// }

// "use client";
// import styles from '../ui/login/login.module.css'
// import {toast , Toaster} from "react-hot-toast";
// import axios from "axios";
// import {redirect, useRouter} from "next/navigation";
// import Link from "next/link";
// import {authenticate} from "../lib/Actions";
// import {useActionState} from "react";
//
// // Ganti nama interface FormData menjadi LoginFormData
// interface LoginFormData {
//     email: string;
//     password: string;
// }
//
// export default function LoginPage(){
//     const router = useRouter();
//
//     // Ganti parameter values dengan tipe LoginFormData
//     const login = async (values : LoginFormData) => {
//         try {
//             const response = await axios.post("/api/auth/login", values);
//             console.log(response);
//             if (response.status === 201 || response.status === 200) {
//                 router.replace('/');
//                 toast.success("Login successfully");
//             }
//         }catch(error){
//             // toast.error(error.response.data.message);
//             toast.error("Login Error")
//         }
//     }
//
//     return (
//         <div className={styles.container}>
//             <Toaster position={"bottom-left"}/>
//             {/* Ganti action dengan onSubmit */}
//             <form onSubmit={(e) => {
//                 e.preventDefault();
//                 const formData = new FormData(e.currentTarget);
//                 const values: LoginFormData = {
//                     email: formData.get('email') as string,
//                     password: formData.get('password') as string
//                 };
//                 login(values);
//             }} className={styles.form}>
//                 <h1>Login</h1>
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder={"Email"}
//                     required
//                 />
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder={"Password"}
//                     required
//                 />
//                 <span>Didn't have account ? <Link href={"/signup"}>Enter here</Link> </span>
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// }

// Deepseek AI
"use client"; // Mark this as a Client Component
import styles from '../ui/login/login.module.css';
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormEvent } from "react";

interface LoginFormData {
    email: string;
    password: string;
}

export default function LoginPage() {
    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission

        // Extract form data
        const formData = new FormData(event.currentTarget);
        const values: LoginFormData = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        };

        try {
            // Convert the data to URL-encoded format
            const urlEncodedData = new URLSearchParams();
            urlEncodedData.append('email', values.email);
            urlEncodedData.append('password', values.password);

            // Make a POST request to the Next.js API route
            const response = await axios.post("/api/auth/login", urlEncodedData.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            console.log("Response:", response);

            if (response.status === 200 || response.status === 201) {
                toast.success("Login successful!");
                router.push('/'); // Redirect to the home page
            }
        } catch (error: any) {
            // Handle errors
            console.error("Login error:", error);
            const errorMessage = error.response?.data?.message || "An error occurred during login.";
            toast.error(errorMessage);
        }
    };

    return (
        <div className={styles.container}>
            <Toaster position="bottom-left" />
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1>Login</h1>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                />
                <span>
                    Don't have an account? <Link href="/signup">Sign up here</Link>
                </span>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
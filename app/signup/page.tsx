'use client'
import styles from './signup.module.css';
import Link from "next/link";
import {useActionState, useState} from "react";
// import {signup} from "../api/auth/route";
import axios from "axios";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";

export default function signupPage() {
    const router = useRouter();
    // const [state, action, pending] = useActionState(signup, undefined);
    const sign = async (values) => {
        try {
            const FormdataToSend = new FormData();
            for(let key in values){
                FormdataToSend.append(key, values[key]);
            }
            const respon = await axios.post("/api/auth/signup",values);
            // console.log(respon);
            if (respon.status === 201 || respon.status === 202){
                router.replace('/login');
            } else {
                console.log("Error");
            }
        }catch(error){
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className={styles.container}>
            <form action={sign} className={styles.form}>
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
                {/*{state?.errors?.name && <p>{state.errors.name}</p>}*/}

                <div className={styles.email}>
                    <span>Email</span>
                    <input
                        type="email"
                        name="Email"
                        placeholder="Email"
                        required
                    />
                </div>
                {/*{state?.errors?.email && <p>{state.errors.email}</p>}*/}

                <div className={styles.password}>
                    <span>Password</span>
                    <input
                        type="password"
                        name="Password"
                        placeholder={"Password"}
                        required
                    />
                </div>
                {/*{state?.errors?.password && (*/}
                {/*    <div>*/}
                {/*        <p>Password must:</p>*/}
                {/*        <ul>*/}
                {/*            {state.errors.password.map((error) => (*/}
                {/*                <li key={error}>- {error}</li>*/}
                {/*            ))}*/}
                {/*        </ul>*/}
                {/*    </div>*/}
                {/*)}*/}
                <span>Already have account ? <Link href={"/login"}>Enter here</Link> </span>
                <button type="submit">Sign up</button>
            </form>
        </div>
    )
}

// 'use client';
// import styles from './signup.module.css';
// import Link from "next/link";
// import { useState } from "react";
// import axios from "axios";
//
// export default function SignupPage() {
//     const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//     const [errors, setErrors] = useState({});
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [successMessage, setSuccessMessage] = useState('');
//
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setErrors({});
//         setIsSubmitting(true);
//
//         try {
//             const response = await axios.post('/api/auth/signup', formData);
//             if (response.status === 201) {
//                 setSuccessMessage('Sign up successful! Redirecting...');
//                 setFormData({ name: '', email: '', password: '' });
//                 // Optionally, redirect after successful sign-up.
//             }
//         } catch (err) {
//             if (err.response && err.response.data.errors) {
//                 setErrors(err.response.data.errors);
//             } else {
//                 setErrors({ general: 'Something went wrong. Please try again later.' });
//             }
//         } finally {
//             setIsSubmitting(false);
//         }
//     };
//
//     return (
//         <div className={styles.container}>
//             <form onSubmit={handleSubmit} className={styles.form}>
//                 <h1>Sign up</h1>
//                 {errors.general && <p className={styles.error}>{errors.general}</p>}
//                 {successMessage && <p className={styles.success}>{successMessage}</p>}
//
//                 <div className={styles.name}>
//                     <span>Name</span>
//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         placeholder="Name"
//                         required
//                     />
//                 </div>
//                 {errors.name && <p className={styles.error}>{errors.name}</p>}
//
//                 <div className={styles.email}>
//                     <span>Email</span>
//                     <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         placeholder="Email"
//                         required
//                     />
//                 </div>
//                 {errors.email && <p className={styles.error}>{errors.email}</p>}
//
//                 <div className={styles.password}>
//                     <span>Password</span>
//                     <input
//                         type="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleInputChange}
//                         placeholder="Password"
//                         required
//                     />
//                 </div>
//                 {errors.password && (
//                     <div className={styles.error}>
//                         <p>Password must:</p>
//                         <ul>
//                             {Array.isArray(errors.password) &&
//                                 errors.password.map((error, index) => (
//                                     <li key={index}>- {error}</li>
//                                 ))}
//                         </ul>
//                     </div>
//                 )}
//
//                 <span>
//                     Already have an account? <Link href="/login">Enter here</Link>
//                 </span>
//                 <button disabled={isSubmitting} type="submit">
//                     {isSubmitting ? 'Signing up...' : 'Sign up'}
//                 </button>
//             </form>
//         </div>
//     );
// }

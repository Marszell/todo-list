'use client'
import styles from '../ui/signup/signup.module.css';
import Link from "next/link";
import {useActionState, useState} from "react";
// import {signup} from "../api/auth/route";
import axios from "axios";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {Field, Formik} from "formik";
import * as Yup from "yup";

export default function signupPage() {
    const router = useRouter();
    // const [state, action, pending] = useActionState(signup, undefined);
    const sign = async (values) => {
        try {
            const FormdataToSend = new FormData();
            for(let key in values){
                FormdataToSend.append(key, values[key]);
            }
            const respon = await axios.post("/api/auth/signup",FormdataToSend);
            // console.log(respon);
            if (respon.status === 201 || respon.status === 202){
                router.replace('/login');
            } else {
                console.log("Error");
            }
        }catch(error){
            console.log(error.response);
            toast.error(error.response.data.message);
        }
    }
    const initialValues = {
        name: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        name : Yup.string().required("Please enter name"),
        email : Yup.string().required("Please enter email"),
        password: Yup.string().required("Please enter password"),
    });

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={sign}
            validationSchema={validationSchema}
        >
            {({
                handleSubmit,
                errors,
                touched

            }) =>(
                <div className={styles.container}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <h1>Sign up</h1>
                        <div className={styles.name}>
                            <span>Name</span>
                            <Field type="text" name="name" placeholder="Name" />
                            {errors.name && touched.name ? (
                                <div className="text-bg-danger border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
                                    <strong className="font-bold">{errors.name}</strong>
                                </div>
                            ) : null}
                        </div>
                        <div className={styles.email}>
                            <span>Email</span>
                            <Field type="email" name="email" placeholder="Email" />
                            {errors.email && touched.email ? (
                                <div className="text-bg-danger border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
                                    <strong className="font-bold">{errors.email}</strong>
                                </div>
                            ) : null}
                        </div>
                        <div className={styles.password}>
                            <span>Password</span>
                            <Field type="password" name="password" placeholder="Password" />
                            {errors.password && touched.password ? (
                                <div className="text-bg-danger border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
                                    <strong className="font-bold">{errors.password}</strong>
                                </div>
                            ) : null}
                        </div>
                        <span>Already have account ? <Link href={"/login"}>Enter here</Link> </span>
                        <button type="submit">Sign up</button>
                    </form>
                </div>
            )}
        </Formik>
    )
}
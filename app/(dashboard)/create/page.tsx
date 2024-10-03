"use client"

import styles from "/app/ui/dashboard/create/create.module.css"
import {Field, Formik} from "formik";
import {useState} from "react";



export default function Create() {
    const[formData, setFormData] = useState({})

    const initialValues = {
        title: formData["title"] ?? "",
        description: formData["description"] ?? "",
    }
    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            // onSubmit={onSubmit}
            // validationSchema={}
        >
            <div className={styles.container}>
                <form action="" className={styles.form}>
                    <Field type="text" name="title" placeholder={"title"}/>
                    {/*<input type="text" placeholder={"Title"} name={"title"} />*/}
                    <Field type="text" name="description" placeholder={"description"}/>
                    {/*<input type="text" placeholder={"Description"}/>*/}
                    <button className={styles.button}>Submit</button>
                </form>
            </div>
        </Formik>
    )
}
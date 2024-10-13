"use client"

import styles from "/app/ui/dashboard/create/create.module.css"
import { Field, Formik } from "formik";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import * as Yup from "yup";


export default function Create() {
    const[formData, setFormData] = useState({})

    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            for (let value in values) {
                formData.append(value, values[value]);
            }
            let response = await axios.post("/api/task/", formData)

            if(response.status === 201 || response.status === 200) {
                // navigate("/")
                toast.success("Task successfully created")
            }else {
                toast.error("Error");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    const initialValues = {
        title: formData["title"] ?? "",
        description: formData["description"] ?? "",
    }

    const AddOrUpdateSchema = Yup.object().shape({
        title: Yup.string().required("Please fill Tittle"),
    })

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={AddOrUpdateSchema}
        >
            {({
                handleSubmit,
                errors,
                touched
            }) =>(
                <div className={styles.container}>
                    <form action="" className={styles.form} onSubmit={handleSubmit}>
                        <Field type="text" name="title" placeholder={"title"}/>
                        {errors.title && touched.title ? (
                            <div className="text-bg-danger border border-red-400 text-red-700 px-4 py-2 rounded relative"
                                role="alert">
                                <strong className="font-bold">{errors.title}</strong>
                            </div>
                        ) : null}
                        <Field type="text" name="description" placeholder={"description"}/>
                        <button className={styles.button}>Submit</button>
                    </form>
                </div>
            )}
        </Formik>
    )
}
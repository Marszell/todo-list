"use client"

import styles from "/app/ui/dashboard/create/create.module.css"
import { Field, Formik } from "formik";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import * as Yup from "yup";


export default function Create({isCreated,id}) {
    const[formData, setFormData] = useState({})

    const initialValues = {
        title: formData["title"] ?? "",
        description: formData["description"] ?? "",
    }

    const onSubmit = (values) => {
        try {
            const formData = new FormData();
            for (let value in values) {
                formData.append(value, values[value]);
            }
            let response;
            if (!isCreated) {
                response = await axios.put(`/api/task/${id}`, formData)
            }else{
                response = await axios.post("/api/task/", formData)
            }

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
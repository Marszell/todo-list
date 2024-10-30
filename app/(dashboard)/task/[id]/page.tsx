'use client'

import styles from "../../../ui/dashboard/task/singleTask/singleTask.module.css";
import {Field, Formik} from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {navigate} from "../../create/action";
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {useRouter} from "next/compat/router";

export default function SingleTaskPage (){
    const {id} = useParams();
    const [formData, setFormData] = useState({})
    const router = useRouter();

    useEffect(() => {
        fetchTask()
    }, [id]);

    const fetchTask = async () => {
        if (!id) return;
        try {
            // console.log(`Fetching task with ID: ${id}`);
            const data  = await axios.get(`/api/task/${id}`);
            const taskData = data.data.data;
            setFormData({
                title: taskData.title,
                description: taskData.description,
            });
            console.log("abc")
        } catch (error) {
            console.error("Error fetching task:", error);
            toast.error("Error fetching task");
        }
    };
    const onSubmit = async(values)=>{
        try{
        const formData = new FormData();
        for (let key in values){
            formData.append(key, values[key]);
        }
        let response = await axios.put(`/api/task/${id}`, formData);
        if (response.status === 201 || response.status === 200) {
            navigate('/')
            toast.success("Updated task successfully");
        }else{
            toast.error("Error")
        }
        }catch (error){
            toast.error(error.response.data.message);
        }
    }

    const initialValues = {
        title: formData["title"] ?? "",
        description: formData["description"] ?? "",
    }

    const UpdatedValidation = Yup.object().shape({
        title : Yup.string().required("Please enter title"),
    });

    return(
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={UpdatedValidation}
        >
            {({
                handleSubmit,
                errors,
                touched
            }) =>(
                <div className={styles.container}>
                    <form action="" className={styles.form} onSubmit={handleSubmit}>
                        <Field type="text" name="title" placeholder="Title" />
                        {errors.title && touched.title ? (
                            <div
                                className="text-bg-danger border border-red-400 text-red-700 px-4 py-2 rounded relative"
                                role="alert">
                                <strong className="font-bold">{errors.title}</strong>
                            </div>
                        ): null}
                        <Field type="text" name="description" placeholder="Description"/>
                        <button className={styles.button} type="submit">Submit</button>
                    </form>
                </div>
            )}
        </Formik>
    )
}
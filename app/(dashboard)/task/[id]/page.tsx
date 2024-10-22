'use client'

import styles from "../../../ui/dashboard/task/singleTask/singleTask.module.css";
import {Field, Formik} from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {navigate} from "../../create/action";
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";

export default function SingleTaskPage (){
    const {id} = useParams();
    const [formData, setFormData] = useState({})

    useEffect(() => {
        fetchTask()
    }, [id]);

    const fetchTask = async () => {
        if (!id) return
        const data = await axios.get(`/api/task/${id}`)
        setFormData({
            title: data.data.data.title,
            description: data.data.data.description,
        })
    }

    const onSubmit = async(values)=>{
        try{
        const formData = new FormData();
        for (let key in values){
            formData.append(key, values[key]);
        }
        let response = await axios.put(`/api/task/${id}`, formData);
        if (response.status === 201 || response.status === 200) {
            // navigate('/')
            toast.success("Updated task successfully")
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
        <div className={styles.container}>
            <form action="" className={styles.form}>
                <Field type="text" name="title" placeholder="Title" />
                <Field type="text" name="description" placeholder="Description" />
                <button className={styles.button}>Submit</button>
            </form>
        </div>
    </Formik>
    )
}
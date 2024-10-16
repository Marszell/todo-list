"use client"

import styles from "/app/ui/dashboard/create/create.module.css";
import { Field, Formik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {navigate} from "./action";

export default function Create() {
    // const [formData, setFormData] = useState({});

    const onSubmit = async (values) => {
        try {
            const formDataToSend = new FormData();
            for (let key in values) {
                formDataToSend.append(key,values[key]);
            }
            let response = await axios.post("/api/task/", formDataToSend);

            if (response.status === 201 || response.status === 200) {
                navigate('/')
                toast.success("Task successfully created")
            } else {
                toast.error("Error")
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    };

    const initialValues = {
        title: "",
        description: "",
    };

    const AddOrUpdateSchema = Yup.object().shape({
        title: Yup.string().required("Please fill Title"),
    });

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
              }) => (
                <div className={styles.container}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <Field type="text" name="title" placeholder="Title" />
                        {errors.title && touched.title ? (
                            <div className="text-bg-danger border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
                                <strong className="font-bold">{errors.title}</strong>
                            </div>
                        ) : null}
                        <Field type="text" name="description" placeholder="Description" />
                        <button className={styles.button} type="submit">Submit</button>
                    </form>
                </div>
            )}
        </Formik>
    );
}

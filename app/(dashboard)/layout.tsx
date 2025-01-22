import {ReactNode} from "react";
import styles from "../ui/dashboard/dashboard.module.css"
import Sidebar from "../component/sidebar/sidebar";
import {Toaster} from "react-hot-toast";
// import

export default function Layout ({children}: {children: ReactNode}) {
    return(
        <div className={styles.container}>
            <Toaster position={"bottom-left"}/>
            <div className={styles.menu}>
                <Sidebar />
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}
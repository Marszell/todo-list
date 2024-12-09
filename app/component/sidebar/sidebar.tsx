import {
    MdDashboard,
    MdLogout,
    MdAssignment,
    MdChecklistRtl,
} from "react-icons/md";
import styles from "./sidebar.module.css"
import MenuLink from "./menuLink/menuLink"
import Image from "next/image";
import {auth, signOut} from "../../../auth";
import {fetchUserbyEmail} from "../../lib/UserRepository";

const menuItems = [
    {
        title :"page",
        list : [
            {
                title : "All-Task",
                path: "/",
                icon : <MdDashboard />,
            },
            // {
            //     title : "Incomplete",
            //     path :"/incomplete",
            //     icon : <MdAssignment />,
            // },
            // {
            //     title : "Complete",
            //     path:"/completed",
            //     icon : <MdChecklistRtl />,
            // }
        ],
    },
];

export default async function  Sidebar(){
    const session = await auth();
    const user = await fetchUserbyEmail(session.user.email);

    return(
        <div className={styles.container}>
            <div className={styles.user}>
                <Image src={"/noavatar.png"} alt={"profile"} className={styles.image} width="50" height="50"/>
                <span className={styles.name}>{session.user.name}</span>
            </div>
            <div className={styles.menu}>
                <ul className={styles.list}>
                    {menuItems.map((cat) =>(
                        <li key={cat.title}>
                            {cat.list.map((item) => (
                                <MenuLink item={item} key={item.title} />
                            ))}
                        </li>
                    ))}
                </ul>
                <form action={async () =>{
                    'use server'
                    await signOut({redirectTo:"/login"});
                }}>
                    <button className={styles.logout}>
                        <MdLogout />Logout
                    </button>
                </form>
            </div>
        </div>
    )
}
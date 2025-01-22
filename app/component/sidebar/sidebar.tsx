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
import {Session} from "next-auth";
import {NextResponse} from "next/server";

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
    const session: Session|null = await auth();
    if (!session || !session.user) {
        return "error"
        // return NextResponse.json({ message: "Unauthorized", data: {}, error: {} }, { status: 401 });
    }
    const userEmail = session.user.email;
    if (!userEmail) {
        return "error"
        // return NextResponse.json({ message: "Invalid email", data: {}, error: {} }, { status: 400 });
    }
    const user = await fetchUserbyEmail(userEmail);

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
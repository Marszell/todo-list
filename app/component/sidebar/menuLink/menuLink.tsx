"use client"

import {usePathname} from "next/navigation";
import Link from "next/link";
import styles from "./menuLink.module.css"

export default function  MenuLink ({item}) {
    const pathname = usePathname()
    return (
        <Link href={item.path} className={`${styles.container} ${pathname === item.path && styles.active}`}>
            {item.icon}
            {item.title}
        </Link>
    )
}
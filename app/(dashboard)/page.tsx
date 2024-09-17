import Image from "next/image";
import styles from "../ui/dashboard/dashboard.module.css";
import Box from "../component/box/box";

export default function Dashboard() {
  return (
    <div className={styles.page}>
        <span>content</span>
        <div>
            <Box />
        </div>
    </div>
  );
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, SetStateAction, useState } from "react";
import styles from "../styles/login.module.css";

interface Props {
    password: string;
    setPassword: (value: SetStateAction<string>) => void;
}

export const PasswordField: FC<Props> = ({
                                             password,
                                             setPassword,
                                         }): JSX.Element => {
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <>
            {/* Logic */}
            <input
                value={password}
                type={visible ? "text" : "password"}
                className={styles.input_area}
                onChange={(e) => setPassword(e.target.value)}
            />

            <span className={styles.eye_icon}>
        {
            <FontAwesomeIcon
                icon={visible ? "eye-slash" : "eye"}
                onClick={() => setVisible(!visible)}
            />
        }
      </span>
        </>
    );
};
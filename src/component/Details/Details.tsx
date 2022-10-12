import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {HTMLAttributes} from "react";

import styles from "./Details.module.scss";
interface DetailsProp extends HTMLAttributes<HTMLDivElement> {
    title: string;
    icon: string;
    iconColor?: string;
}

export const Details = ({title, iconColor, icon, children}: DetailsProp) => {
    return (
        <div className={styles.container}>
            <details>
                <summary>
                    <div className={styles.title}>
                        <FontAwesomeIcon color={iconColor} icon={fas[icon]} />
                        <h3>{title}</h3>
                    </div>
                    <div className={styles.chevron}>
                        <FontAwesomeIcon icon={fas.faChevronDown} />
                    </div>
                </summary>
                <div className={styles.children}>{children}</div>
            </details>
        </div>
    );
};

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {HTMLAttributes, ReactNode} from "react";

import styles from "./Details.module.scss";
interface DetailsProp extends HTMLAttributes<HTMLDivElement> {
    jsxTitle: string | ReactNode;
    icon?: string;
    iconColor?: string;
}

export const Details = ({jsxTitle, iconColor, icon, children}: DetailsProp) => {
    return (
        <div className={styles.container}>
            <details>
                <summary>
                    <div className={styles.title}>
                        {icon && (
                            <FontAwesomeIcon
                                color={iconColor}
                                icon={fas[icon]}
                            />
                        )}

                        {jsxTitle}
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

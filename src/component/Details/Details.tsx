import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { HTMLAttributes, ReactNode } from "react";

import styles from "./Details.module.scss";
interface DetailsProp extends HTMLAttributes<HTMLDivElement> {
    jsxTitle?: ReactNode;
    title?: string;
    icon?: string;
    iconColor?: string;
    isOpen: boolean;
}

export const Details = ({
    jsxTitle,
    iconColor,
    title,
    icon,
    children,
    isOpen = false,
}: DetailsProp) => {
    return (
        <div className={styles.container}>
            <details open={isOpen}>
                <summary>
                    <div className={styles.title}>
                        {icon && (
                            <FontAwesomeIcon
                                color={iconColor}
                                icon={fas[icon]}
                            />
                        )}

                        {jsxTitle ? jsxTitle : <p>{title}</p>}
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

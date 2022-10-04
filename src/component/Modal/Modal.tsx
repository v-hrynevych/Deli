import {HTMLAttributes} from "react";
import classnames from "classnames";
import styles from "./Modal.module.scss";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    isActive?: boolean;
    variant?: "start" | "center" | "end" | "top";
    handleClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
export const Modal = ({
    isActive = true,
    className,
    variant = "center",
    handleClick,
    children,
}: ModalProps) => {
    const modalClasses = classnames(
        styles.modal,
        styles[variant],
        isActive && styles.active,
        className,
    );

    return (
        <div className={modalClasses} onClick={handleClick}>
            <div
                className={styles[variant]}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

import { HTMLAttributes, Dispatch, SetStateAction } from "react";
import classnames from "classnames";
import styles from "./Modal.module.scss";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    isActive: boolean;
    variant?: "start" | "center" | "end";
    setIsActive: Dispatch<SetStateAction<boolean>>;
}
export const Modal = ({
    isActive,
    setIsActive,
    className,
    variant = "center",
    children,
}: ModalProps) => {
    const modalClasses = classnames(
        styles.modal,
        styles[variant],
        isActive && styles.active,
        className
    );
    
    return (
        <div className={modalClasses} onClick={() => setIsActive(false)}>
            <div
                className={styles[variant]}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

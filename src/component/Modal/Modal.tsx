import {HTMLAttributes} from "react";
import classnames from "classnames";
import styles from "./Modal.module.scss";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    isActive?: boolean;
}
export const Modal = ({isActive = true, className, children}: ModalProps) => {
    const modalClasses = classnames(
        styles.modal,
        isActive && styles.active,
        className,
    );
    return (
        <div className={modalClasses}>
            <div
                className={styles.content}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

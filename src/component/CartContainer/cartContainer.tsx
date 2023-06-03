'use client'
import { HTMLAttributes } from "react";
import styles from "./cartContainer.module.scss";
interface CartContainerProps extends HTMLAttributes<HTMLDivElement> {}

export const CartContainer = ({ children }: CartContainerProps) => {
    return (<div className={styles.container}>{children}</div>);
};

import classNames from "classnames";
import {ButtonHTMLAttributes} from "react";

import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "ghost";
}

export const Button = ({
    variant = "primary",
    className,
    children,
    ...rest
}: ButtonProps) => {
    const buttonClassnames = classNames(
        styles.button,
        styles[variant],
        className,
    );

    return (
        <button {...rest} className={buttonClassnames}>
            {children}
        </button>
    );
};

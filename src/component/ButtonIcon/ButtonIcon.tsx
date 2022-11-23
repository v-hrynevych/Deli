import styles from "./ButtonIcon.module.scss";
import classNames from "classnames";
import {HTMLAttributes} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";

interface ButtonIconProps extends HTMLAttributes<HTMLButtonElement> {
    icon: string;
    handleClick?: () => void;
    href?: string;
    color?: string;
}

export const ButtonIcon = ({
    className,
    icon,
    href,
    color = "#fff",
    handleClick,
    ...rest
}: ButtonIconProps) => {
    const ButtonIconClasses = classNames(styles.buttonIcon, className);

    return (
        <Link href={`${href}`}>
            <a href={href}>
                <button
                    className={ButtonIconClasses}
                    onClick={handleClick}
                    {...rest}
                >
                    <FontAwesomeIcon color={color} icon={fas[icon]} />
                </button>
            </a>
        </Link>
    );
};

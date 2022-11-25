import styles from "./ButtonIcon.module.scss";
import classNames from "classnames";
import {HTMLAttributes} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {fab} from "@fortawesome/free-brands-svg-icons";

import Link from "next/link";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface ButtonIconProps extends HTMLAttributes<HTMLButtonElement> {
    icon: string;
    handleClick?: () => void;
    href: string;
    brands?: boolean;
    color?: string;
}

export const ButtonIcon = ({
    className,
    icon,
    href,
    brands,
    color = "white",
    handleClick,
    ...rest
}: ButtonIconProps) => {
    const ButtonIconClasses = classNames(styles.buttonIcon, className);
    const isBrands = brands ? (fab[icon] as IconProp) : fas[icon];
    return (
        <Link href={href}>
            <a href={href}>
                <button
                    className={ButtonIconClasses}
                    onClick={handleClick}
                    {...rest}
                >
                    <FontAwesomeIcon color={color} icon={isBrands} />
                </button>
            </a>
        </Link>
    );
};

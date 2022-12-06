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
    href?: string;
    brands?: boolean;
    color?: string;
    after?: number[] | number;
}

export const ButtonIcon = ({
    className,
    icon,
    href,
    brands,
    after,
    color = "white",
    ...rest
}: ButtonIconProps) => {
    const ButtonIconClasses = classNames(
        styles.buttonIcon,
        styles.after,
        className,
    );
    const isBrands = brands ? (fab[icon] as IconProp) : fas[icon];

    return (
        <>
            {href ? (
                <Link href={href}>
                    <a href={href}>
                        <button className={ButtonIconClasses} {...rest}>
                            <FontAwesomeIcon color={color} icon={isBrands} />
                            {Array.isArray(after) ? (
                                <span>{after.length}</span>
                            ) : (
                                after && <span>{after}</span>
                            )}
                        </button>
                    </a>
                </Link>
            ) : (
                <button className={ButtonIconClasses} {...rest}>
                    <FontAwesomeIcon color={color} icon={isBrands} />
                </button>
            )}
        </>
    );
};

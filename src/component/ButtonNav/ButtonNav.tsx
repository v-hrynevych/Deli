import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

import styles from "./ButtonNav.module.scss";
import classNames from "classnames";
import {HTMLAttributes} from "react";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {fab} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

interface ButtonNavProps extends HTMLAttributes<HTMLButtonElement> {
    icon: string;
    text?: string | null;
    href: string;

    brands?: boolean;
    clickHandler?: React.MouseEventHandler<HTMLButtonElement>;
}

export const ButtonNav = ({
    icon = "faCircleExclamation",
    className,
    text,
    href,
    brands,
    clickHandler,
    ...rest
}: ButtonNavProps) => {
    const ButtonNavClasses = classNames(styles.ButtonNav, className);
    const isBrands = brands ? (fab[icon] as IconProp) : fas[icon];
    return (
        <Link href={href}>
            <a href={href} style={{textDecoration: "none"}}>
                <button className={ButtonNavClasses} onClick={clickHandler}>
                    <span>
                        <FontAwesomeIcon
                            icon={isBrands}
                            style={{fontSize: 24}}
                        />
                    </span>
                    <p>{text}</p>
                </button>
            </a>
        </Link>
    );
};

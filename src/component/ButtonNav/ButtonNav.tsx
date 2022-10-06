import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./ButtonNav.module.scss";
import classNames from "classnames";
import {HTMLAttributes} from "react";
import {fas} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface ButtonNavProps extends HTMLAttributes<HTMLButtonElement> {
    icon: string;
    text: string| null;
    href: string;
    clickHandler?: React.MouseEventHandler<HTMLButtonElement>;
}

export const ButtonNav = ({
    icon = "faCircleExclamation",
    className,
    text,
    href,
    clickHandler,
    ...rest
}: ButtonNavProps) => {
    const ButtonNavClasses = classNames(styles.ButtonNav, className);
    return (
        <Link href={`${href}`}>
            <a href={href} style={{textDecoration: "none"}}>
                <button className={ButtonNavClasses} onClick={clickHandler}>
                    <span>
                        <FontAwesomeIcon
                            icon={fas[icon]}
                            style={{fontSize: 24}}
                        />
                    </span>
                    {text}
                </button>
            </a>
        </Link>
    );
};

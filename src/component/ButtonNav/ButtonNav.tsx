import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import styles from "./ButtonNav.module.scss";
import classNames from "classnames";
import {HTMLAttributes} from "react";

interface ButtonNavProps extends HTMLAttributes<HTMLButtonElement> {
    icon: IconProp;
    text: string;
    clickHandler?: React.MouseEventHandler<HTMLButtonElement>;
}

export const ButtonNav = ({
    icon,
    className,
    text,
    clickHandler,
    ...rest
}: ButtonNavProps) => {
    const ButtonNavClasses = classNames(styles.ButtonNav, className);
    return (
        <button className={ButtonNavClasses} onClick={clickHandler}>
            <span>
                <FontAwesomeIcon icon={icon} style={{fontSize: 24}} />
            </span>
            {text}
        </button>
    );
};

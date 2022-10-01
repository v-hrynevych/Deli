import styles from "./ButtonIcon.module.scss";
import classNames from "classnames";
import {HTMLAttributes} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface ButtonIconProps extends HTMLAttributes<HTMLButtonElement> {
    icon: IconProp;
    handleClick?: ()=> void;
}

export const ButtonIcon = ({
    className,
    icon,
    handleClick,
    children,
    ...rest
}: ButtonIconProps) => {
    const ButtonIconClasses = classNames(styles.buttonIcon, className);

    return (
        <button className={ButtonIconClasses} onClick={handleClick} {...rest}>
            <FontAwesomeIcon icon={icon} />
        </button>
    );
};

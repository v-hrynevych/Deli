import styles from "./ButtonIcon.module.scss";
import classNames from "classnames";
import {HTMLAttributes} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface ButtonIconProps extends HTMLAttributes<HTMLDivElement> {
    icon: IconProp;
    handleClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
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
        <div className={ButtonIconClasses} onClick={handleClick} {...rest}>
            <FontAwesomeIcon icon={icon} />
        </div>
    );
};

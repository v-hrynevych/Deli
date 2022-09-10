import styles from "./MobileMenuLogo.module.scss";
import classNames from "classnames";
import {HTMLAttributes} from "react";
interface MobileMenuLogoProps extends HTMLAttributes<HTMLDivElement> {
    handleClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const MobileMenuLogo = ({
    className,
    handleClick,
    ...rest
}: MobileMenuLogoProps) => {
    const mobileLogoClasses = classNames(styles.container, className);

    return (
        <div className={mobileLogoClasses} onClick={handleClick} {...rest}>
            <div className={styles.logo}></div>
        </div>
    );
};

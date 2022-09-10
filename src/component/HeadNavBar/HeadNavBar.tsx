import styles from "./HeadNavBar.module.scss";
import {HTMLAttributes} from "react";
import {SideMenu} from "../index";
import {MobileMenuLogo} from "../index";
import {Modal} from "../Modal/Modal";
interface HeadNavBarProps extends HTMLAttributes<HTMLDivElement> {}
export const HeadNavBar = ({className, ...rest}: HeadNavBarProps) => {
    return (
        <>
            <div {...rest} className={styles.container}>
                <nav>
                    <ul className={styles.container__ul}>
                        <li>
                            <MobileMenuLogo />
                        </li>
                        <li className={styles.logo}>
                            <a href="">Ecom</a>
                        </li>
                        <li className={styles.catalog}></li>
                        <li className={styles.searchForm}></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <Modal>
                        <SideMenu />
                    </Modal>
                    
                </nav>
            </div>
        </>
    );
};

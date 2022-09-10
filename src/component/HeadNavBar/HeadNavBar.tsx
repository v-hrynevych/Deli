import styles from "./HeadNavBar.module.scss";
import {HTMLAttributes} from "react";
import {ButtonNav} from "../index";
import {SideMenu} from "../index";
import {ButtonIcon} from "../index";
import {Modal} from "../Modal";
import {
    faStore,
    faMicrophone,
    faUser,
    faShoppingCart,
    faBars,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface HeadNavBarProps extends HTMLAttributes<HTMLDivElement> {}

export const HeadNavBar = ({className, ...rest}: HeadNavBarProps) => {
    return (
        <>
            <div {...rest} className={styles.HeadNavBar__container}>
                <nav>
                    <ul className={styles.HeadNavBar__containerUl}>
                        <li>
                            <ButtonIcon icon={faBars} />
                        </li>
                        <li className={styles.HeadNavBar__logo}>
                            <Link href="">
                                <a href="">Ecom</a>
                            </Link>
                        </li>
                        <li className={styles.HeadNavBar__catalog}>
                            <div className={styles.HeadNavBar__catalogItem}>
                                <ButtonIcon icon={faStore} />
                                <p>Catalog</p>
                            </div>
                        </li>
                        <li>
                            <form className={styles.HeadNavBar__searchForm} action="">
                                <div className={styles.HeadNavBar__searchFormItem}>
                                    <input
                                        type="search"
                                        placeholder="I'm looking for..."
                                    />

                                    <button
                                        className={
                                            styles.HeadNavBar__searchFormItemMicro
                                        }
                                    >
                                        <FontAwesomeIcon icon={faMicrophone} />
                                    </button>
                                </div>

                                <button
                                    className={
                                        styles.HeadNavBar__searchFormItemSearchButton
                                    }
                                >
                                    Search
                                </button>
                            </form>
                        </li>
                        <li className={styles.HeadNavBar__actions}>
                            <ul className={styles.HeadNavBar__actionsUl}>
                                <li
                                    className={
                                        styles.HeadNavBar__actionsLanguage
                                    }
                                >
                                    <Link href={"/pl"}>PL</Link>
                                    <Link href={"/ua"}>UA</Link>
                                </li>
                                <li className={styles.HeadNavBar__actionsUser}>
                                    <ButtonIcon icon={faUser} />
                                </li>
                                <li className={styles.HeadNavBar__actionsCart}>
                                    <ButtonIcon icon={faShoppingCart} />
                                </li>
                            </ul>
                        </li>
                        <li></li>
                    </ul>
                    {/* <Modal>
                        <SideMenu />
                    </Modal> */}
                </nav>
            </div>
        </>
    );
};

import styles from "./HeadNavBar.module.scss";

import {HTMLAttributes} from "react";
import {SearchForm} from "../index";
import {ButtonIcon} from "../index";

import {
    faStore,
    faUser,
    faShoppingCart,
    faBars,
    faTableList,
    faHeart,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {userValue} from "src/store/userSlice";

interface HeadNavBarProps extends HTMLAttributes<HTMLDivElement> {}

export const HeadNavBar = ({className, ...rest}: HeadNavBarProps) => {
    const router = useRouter();

    const {userEmail} = useSelector(userValue);

    const openSideMenu = () => {
        router.replace("/side-menu");
    };
    const openSignIn = () => {
        router.push("sign-in");
    };
    const openCabinet = () => {
        router.push("cabinet");
    };
    const openWishlist = () => {
       router.replace('cabinet/wishlist')
    };
    const routCart = () => {
        router.replace("/cart");
    };

    return (
        <>
            <div {...rest} className={styles.HeadNavBar__container}>
                <nav>
                    <ul className={styles.HeadNavBar__containerUl}>
                        <li>
                            <ButtonIcon
                                icon={faBars}
                                handleClick={openSideMenu}
                            />
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
                            <SearchForm />
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
                                {userEmail === null && (
                                    <li
                                        className={
                                            styles.HeadNavBar__actionsUser
                                        }
                                    >
                                        <ButtonIcon
                                            icon={faUser}
                                            handleClick={openSignIn}
                                        />
                                    </li>
                                )}
                                {userEmail !== null && (
                                    <>
                                        <li>
                                            <ButtonIcon
                                                handleClick={openCabinet}
                                                icon={faTableList}
                                            />
                                        </li>
                                        <li>
                                            <ButtonIcon
                                                handleClick={openWishlist}
                                                icon={faHeart}
                                            />
                                        </li>
                                    </>
                                )}

                                <li className={styles.HeadNavBar__actionsCart}>
                                    <ButtonIcon
                                        icon={faShoppingCart}
                                        handleClick={routCart}
                                    />
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

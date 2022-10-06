import styles from "./HeadNavBar.module.scss";

import { HTMLAttributes } from "react";
import { SearchForm } from "../index";
import { ButtonIcon } from "../index";

import {
    faStore,
    faUser,
    faShoppingCart,
    faBars,
    faTableList,
    faHeart,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { userValue } from "src/store/userSlice";
import { useCollection } from "src/hooks";

interface HeadNavBarProps extends HTMLAttributes<HTMLDivElement> {}

export const HeadNavBar = ({ className, ...rest }: HeadNavBarProps) => {
    const router = useRouter();
    const { userEmail } = useSelector(userValue);

    const openSideMenu = () => {
        router.replace("/side-menu");
    };
    const openSignIn = () => {
        router.replace("sign-in");
    };
    const openCabinet = () => {
        router.replace("cabinet");
    };
    const openWishlist = () => {
        router.replace("cabinet/wishlist");
    };
    const routCart = () => {
        router.replace("/cart");
    };
    return (
        <div {...rest} className={styles.container}>
            <nav>
                <ul className={styles.containerUl}>
                    <li>
                        <ButtonIcon icon={faBars} handleClick={openSideMenu} />
                    </li>
                    <li className={styles.logo}>
                        <Link href="/">
                            <a href="/">Ecom</a>
                        </Link>
                    </li>
                    <li className={styles.catalog}>
                        <div
                            onClick={() => {
                                router.replace("catalog");
                            }}
                            className={styles.catalogItem}
                        >
                            <ButtonIcon icon={faStore} />
                            <p>Catalog</p>
                        </div>
                    </li>
                    <li>
                        <SearchForm />
                    </li>
                    <li className={styles.actions}>
                        <ul className={styles.actionsUl}>
                            <li className={styles.actionsLanguage}>
                                <Link href={"/pl"}>PL</Link>
                                <Link href={"/ua"}>UA</Link>
                            </li>
                            {userEmail === null && (
                                <li className={styles.actionsUser}>
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

                            <li className={styles.actionsCart}>
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
    );
};

import styles from "./HeadNavBar.module.scss";

import {HTMLAttributes} from "react";
import {ButtonNav, SearchForm} from "../index";
import {ButtonIcon} from "../index";

import Link from "next/link";

import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {userValue} from "src/store/userSlice";

interface HeadNavBarProps extends HTMLAttributes<HTMLDivElement> {}

export const HeadNavBar = ({className, ...rest}: HeadNavBarProps) => {
    const router = useRouter();
    const {userEmail} = useSelector(userValue);

    return (
        <div {...rest} className={styles.container}>
            <nav>
                <ul className={styles.containerUl}>
                    <li>
                        <ButtonIcon href={"/side-menu"} icon={"faBars"} />
                    </li>
                    <li className={styles.logo}>
                        <Link href={"/"}>
                            <a href="/">Ecom</a>
                        </Link>
                    </li>
                    <li className={styles.catalog}>
                        <ButtonNav
                            href={"/catalog"}
                            icon={"faStore"}
                            text={"Catalog"}
                        />
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
                                        icon={"faUser"}
                                        href={"/sign-in"}
                                    />
                                </li>
                            )}
                            {userEmail !== null && (
                                <>
                                    <li>
                                        <ButtonIcon
                                            icon={"faTableList"}
                                            href={"/cabinet/products"}
                                        />
                                    </li>
                                    <li>
                                        <ButtonIcon
                                            icon={"faHeart"}
                                            href={"/cabinet/wishlist"}
                                        />
                                    </li>
                                </>
                            )}

                            <li className={styles.actionsCart}>
                                <ButtonIcon
                                    icon={"faShoppingCart"}
                                    href={"/cart"}
                                />
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

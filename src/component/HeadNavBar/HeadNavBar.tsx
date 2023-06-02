import styles from "./HeadNavBar.module.scss";

import {HTMLAttributes, useEffect, useState} from "react";
import {ButtonNav, SearchForm} from "../index";
import {ButtonIcon} from "../index";

import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {wishListValue} from "src/store/wishListSlice";
import {cartValue} from "src/store/cartSlice";

import {userValue} from "src/store/userSlice";

interface HeadNavBarProps extends HTMLAttributes<HTMLDivElement> {
    setIsSideMenu: (value: boolean | ((prevVar: boolean) => boolean)) => void;
    setIsCatalog: (value: boolean | ((prevVar: boolean) => boolean)) => void;
    isSideMenu: boolean;
    isCatalog: boolean;
}

export const HeadNavBar = ({
    className,
    setIsSideMenu,
    setIsCatalog,
    isSideMenu,
    isCatalog,
    ...rest
}: HeadNavBarProps) => {
    const {userId} = useSelector(userValue);
    const {cartData} = useSelector(cartValue);
    const {wishList} = useSelector(wishListValue);

    return (
        <div {...rest} className={styles.container}>
            <nav>
                <ul className={styles.containerUl}>
                    <li>
                        <ButtonIcon
                            onClick={() => setIsSideMenu(!isSideMenu)}
                            icon={"faBars"}
                        />
                    </li>
                    <li className={styles.logo}>
                        <Link href={"/"}>
                            <a href="/">Deli</a>
                        </Link>
                    </li>
                    <li className={styles.catalog}>
                        <ButtonNav
                            clickHandler={() => setIsCatalog(!isCatalog)}
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
                            {userId === null && (
                                <li className={styles.actionsUser}>
                                    <ButtonIcon
                                        icon={"faUser"}
                                        href={"/sign-in"}
                                    />
                                </li>
                            )}
                            {userId && (
                                <>
                                    <li>
                                        <ButtonIcon
                                            icon={"faTableList"}
                                            href={{
                                                pathname: "/cabinet/products",
                                                query: {name: "My Products"},
                                            }}
                                        />
                                    </li>
                                    <li>
                                        <ButtonIcon
                                            after={wishList?.length}
                                            icon={"faHeart"}
                                            href={{
                                                pathname: "/cabinet/wishlist",
                                                query: {name: "A wish list"},
                                            }}
                                        />
                                    </li>
                                </>
                            )}

                            <li className={styles.actionsCart}>
                                <ButtonIcon
                                    icon={"faShoppingCart"}
                                    after={cartData?.length}
                                    href={{
                                        pathname: "/cart",
                                        query: {name: "Cart"},
                                    }}
                                />
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

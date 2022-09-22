import styles from "./HeadNavBar.module.scss";
import { HTMLAttributes, useState } from "react";
import { SearchForm } from "../index";
import { SideMenu } from "../index";
import { ButtonIcon } from "../index";
import { Modal } from "../Modal";
import {
    faStore,
    faUser,
    faShoppingCart,
    faBars,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import { useRouter } from "next/router";
import { SignIn, SignUp } from "../../views/Authentication";

interface HeadNavBarProps extends HTMLAttributes<HTMLDivElement> {}

export const HeadNavBar = ({ className, ...rest }: HeadNavBarProps) => {
    const [isSideNav, setIsSideNav] = useState(false);
    const [isActiveModal,setIsActiveModal] = useState(true);

    const router = useRouter();

    const openClose = () => {
        setIsSideNav(!isSideNav);
    };
    const routCart =()=>{
        router.push('cart')
    }
    return (
        <>
            <div {...rest} className={styles.HeadNavBar__container}>
                <nav>
                    <ul className={styles.HeadNavBar__containerUl}>
                        <li>
                            <ButtonIcon icon={faBars} handleClick={openClose} />
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
                                <li className={styles.HeadNavBar__actionsUser}>
                                    <ButtonIcon icon={faUser} />
                                </li>
                                <li className={styles.HeadNavBar__actionsCart}>
                                    <ButtonIcon icon={faShoppingCart}  handleClick={routCart}/>
                                </li>
                            </ul>
                        </li>
                        <li></li>
                    </ul>
                    {isSideNav && (
                        <Modal isActive={isSideNav} setIsActive={setIsSideNav}>
                            <SideMenu handleClick={openClose} />
                        </Modal>
                    )}
                    {
                    <Modal isActive={isActiveModal} setIsActive={setIsActiveModal}>
                        {/* <SignUp/> */}
                        <SignIn/>
                    </Modal>
                    }
                </nav>
            </div>
        </>
    );
};

import styles from "./SideMenu.module.scss";
import classNames from "classnames";
import {HTMLAttributes} from "react";
import {useState} from "react";

import Link from "next/link";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faUser} from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import GoogleApp from "../../svg/Google_Play.svg";
import AppleApp from "../../svg/App_StoreSVG.svg";
import {ButtonNav} from "../ButtonNav";
import {ButtonIcon} from "../ButtonIcon";
import {useRouter} from "next/router";

import {useSelector} from "react-redux";
import {userValue} from "src/store/userSlice";
import {useSignOut} from "src/views/Authentication/hooks";
import Head from "next/head";

interface SideMenuProps extends HTMLAttributes<HTMLDivElement> {
    setIsSideMenu: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

export const SideMenu = ({
    className,
    setIsSideMenu,
    ...rest
}: SideMenuProps) => {
    const {signOutUser} = useSignOut();

    const [IsServices, setIsServices] = useState(false);
    const [IsPartners, setIsPartners] = useState(false);
    const {userName, userEmail} = useSelector(userValue);
    const router = useRouter();
    const SideMenuClasses = classNames(styles.SideMenu, className);
    return (
        <>
            <Head>
                <title>Side Menu</title>
                <meta name="" content="" />
            </Head>
            <div className={SideMenuClasses} {...rest}>
                <div className={styles.logo}>
                    <p>Ecom</p>
                    <ButtonIcon
                        icon={"faXmark"}
                        onClick={() => setIsSideMenu(false)}
                    />
                </div>
                <div className={styles.auth}>
                    {userEmail ? (
                        <div className={styles.user}>
                            <div className={styles.avatar}>
                                <ButtonIcon
                                    href="cabinet/personal-information"
                                    icon={"faUser"}
                                />
                            </div>
                            <div className={styles.userInfo}>
                                <p>{userName}</p>
                                <p>{userEmail}</p>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.logOutUser}>
                            <div className={styles.avatar}>
                                <ButtonIcon href="sign-in" icon={"faUser"} />
                            </div>
                            <div className={styles.buttons}>
                                <div className={styles.item}>
                                    <button
                                        onClick={() => router.push("sign-in")}
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => router.push("sign-up")}
                                    >
                                        Registration
                                    </button>
                                </div>
                                <p>Log in to get advanced features</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.SideMenu__donation}></div>

                <ul className={styles.SideMenu__list}>
                    <li className={styles.SideMenu__listCatalog}>
                        <ButtonNav
                            href={"product"}
                            text="Product catalog"
                            icon={"faStore"}
                        />
                    </li>
                    <li className={styles.SideMenu__listBasket}>
                        <ButtonNav
                            href="cart"
                            text="Basket"
                            icon={"faCartShopping"}
                        />
                    </li>
                </ul>

                <div className={styles.SideMenu__language}>
                    <p>language</p>
                    <Link className={styles.active} href="/pl">
                        <a href=""> PL</a>
                    </Link>
                    <Link href="/ua">
                        <a href="">UA</a>
                    </Link>
                </div>
                <ul className={styles.SideMenu__containerUl}>
                    <li className={styles.SideMenu__city}>
                        <p>City</p>
                        <span>Lublin</span>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </li>
                    <li className={styles.SideMenu__helpCenter}>
                        <ButtonNav
                            text="Reference center"
                            icon={"faCircleQuestion"}
                            href={"/"}
                        />
                        <ButtonNav
                            href="contact"
                            text="Contact us"
                            brands
                            icon={"faTelegram"}
                        />
                    </li>
                    <li>
                        <div className={styles.SideMenu__companyInfo}>
                            <h3>Information about the company</h3>
                            <div className={styles.SideMenu__companyInfoItem}>
                                <Link href={"/about"}>About us</Link>
                                <Link href={"/terms"}>
                                    Terms of use of the site
                                </Link>
                                <Link href={"/contacts"}>Contacts</Link>
                            </div>
                        </div>
                        <div className={styles.SideMenu__assistance}>
                            <h3>Help</h3>

                            <div className={styles.SideMenu__assistanceItem}>
                                <Link href=""> Delivery and payment</Link>
                                <Link href="">Credit</Link>
                                <Link href="">Guarantee</Link>
                                <Link href="">Return of goods</Link>
                                <Link href="">Service centers</Link>
                            </div>
                        </div>
                        <div className={styles.SideMenu__services}>
                            <div className={styles.SideMenu__servicesTitle}>
                                <h3>Services</h3>
                                <FontAwesomeIcon
                                    onClick={() => setIsServices(!IsServices)}
                                    icon={faChevronDown}
                                />
                            </div>
                            {IsServices && (
                                <ul className={styles.SideMenu__servicesItems}>
                                    <li>
                                        <Link href={"/loyalty"}>
                                            Bonus account
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={"/premium"}> Premium </Link>
                                    </li>
                                    <li>
                                        <Link href={"/certificates"}>
                                            Gift certificates
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={"/exchange"}>Exchange</Link>
                                    </li>
                                    <li>
                                        <Link href={"/travel"}>
                                            Tours and recreation
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </div>
                        <div className={styles.SideMenu__partners}>
                            <div className={styles.SideMenu__partnersTitle}>
                                <h3>To partners</h3>
                                <FontAwesomeIcon
                                    onClick={() => setIsPartners(!IsPartners)}
                                    icon={faChevronDown}
                                />
                            </div>

                            {IsPartners && (
                                <ul className={styles.SideMenu__partnersItems}>
                                    <li>
                                        <Link href={"/sell"}>Sell on Ecom</Link>
                                    </li>
                                    <li>
                                        <Link href={"/cooperation"}>
                                            Cooperation with us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={"/franchising"}>
                                            Franchising
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={"/rent"}>
                                            Rent of premises
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </li>
                    <li>
                        <div className={styles.SideMenu__applications}>
                            <h3>Download application</h3>
                            <div className={styles.SideMenu__applicationsImg}>
                                <Image
                                    height={50}
                                    width={100}
                                    src={GoogleApp}
                                />
                                <Image height={50} width={100} src={AppleApp} />
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className={styles.SideMenu__socialNetworks}>
                            <h3>We are on social networks</h3>
                            <div
                                className={styles.SideMenu__socialNetworksItem}
                            >
                                <ButtonIcon
                                    icon={"faFacebook"}
                                    color={"#506098"}
                                    brands
                                    href={"https://www.facebook.com"}
                                />
                                <ButtonIcon
                                    color="#76c9fd"
                                    brands
                                    icon={"faTwitter"}
                                    href={"https://www.twitter.com"}
                                />
                                <ButtonIcon
                                    color="red"
                                    brands
                                    icon={"faYoutube"}
                                    href={""}
                                />
                                <ButtonIcon
                                    color="#cb217d "
                                    brands
                                    href=""
                                    icon={"faInstagram"}
                                />
                                <ButtonIcon
                                    color="#7d3daf"
                                    href=""
                                    brands
                                    icon={"faViber"}
                                />
                                <ButtonIcon
                                    color="#08c"
                                    href=""
                                    brands
                                    icon={"faTelegram"}
                                />
                            </div>
                        </div>
                    </li>
                    {userEmail !== null && (
                        <li>
                            <ButtonNav
                                icon={"faRightFromBracket"}
                                text="log out of the account"
                                href="/"
                                clickHandler={signOutUser}
                            />
                        </li>
                    )}
                </ul>
            </div>
        </>
    );
};

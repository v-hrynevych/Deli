import styles from "./SideMenu.module.scss";
import classNames from "classnames";
import {HTMLAttributes} from "react";
import {useState} from "react";

import Link from "next/link";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faInstagram,
    faFacebook,
    faTwitter,
    faYoutube,
    faViber,
    faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import {
    faChevronDown,
    faCircleQuestion,
    faCartShopping,
    faStore,
    faXmark,
    faUser,
} from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import GoogleApp from "../../sgv/Google_Play.svg";
import AppleApp from "../../sgv/App_StoreSVG.svg";
import {ButtonNav} from "../ButtonNav";

interface SideMenuProps extends HTMLAttributes<HTMLDivElement> {}

export const SideMenu = ({className, ...rest}: SideMenuProps) => {
    const SideMenuClasses = classNames(styles.SideMenu, className);
    const [IsServices, setIsServices] = useState(false);
    const [IsPartners, setIsPartners] = useState(false);
    return (
        <div className={SideMenuClasses} {...rest}>
            <div className={styles.SideMenu__logo}>
                <p>Ecom</p>
                <button>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
            <div className={styles.SideMenu__auth}>
                <div className={styles.SideMenu__authAvatar}>
                    <FontAwesomeIcon
                        icon={faUser}
                        style={{fontSize: 24, color: "#fff"}}
                    />
                </div>
                <div className={styles.SideMenu__authContent}>
                    <div className={styles.SideMenu__authButton}>
                        <button>Login</button>
                        <button>Registration</button>
                    </div>
                    <p>Log in to get advanced features</p>
                </div>
            </div>
            <div className={styles.SideMenu__donation}></div>

            <ul className={styles.SideMenu__list}>
                <li className={styles.SideMenu__listCatalog}>
                    <ButtonNav text="Product catalog" icon={faStore} />
                </li>
                <li className={styles.SideMenu__listBasket}>
                    <ButtonNav text="Basket" icon={faCartShopping} />
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
                    <FontAwesomeIcon
                        onClick={() => console.log("City clicked")}
                        icon={faChevronDown}
                    />
                </li>
                <li className={styles.SideMenu__helpCenter}>
                    <ButtonNav
                        text="Reference center"
                        icon={faCircleQuestion}
                    />
                    <ButtonNav text="Contact us" icon={faTelegram} />
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
                                    <Link href={"/loyalty"}>Bonus account</Link>
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
                                    <Link href={"/sell"}> Sell on Ecom</Link>
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
                                    <Link href={"/rent"}>Rent of premises</Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </li>
                <li>
                    <div className={styles.SideMenu__applications}>
                        <h3>Download application</h3>
                        <div className={styles.SideMenu__applicationsImg}>
                            <Image height={50} width={100} src={GoogleApp} />
                            <Image height={50} width={100} src={AppleApp} />
                        </div>
                    </div>
                </li>
                <li>
                    <div className={styles.SideMenu__socialNetworks}>
                        <h3>We are on social networks</h3>
                        <div className={styles.SideMenu__socialNetworksItem}>
                            <FontAwesomeIcon
                                icon={faFacebook}
                                style={{fontSize: 25, color: "#506098"}}
                            />
                            <FontAwesomeIcon
                                icon={faTwitter}
                                style={{fontSize: 25, color: "#76c9fd"}}
                            />
                            <FontAwesomeIcon
                                icon={faYoutube}
                                style={{fontSize: 25, color: "#e90000"}}
                            />
                            <FontAwesomeIcon
                                icon={faInstagram}
                                style={{fontSize: 25, color: "#7d3daf"}}
                            />
                            <FontAwesomeIcon
                                icon={faViber}
                                style={{fontSize: 25, color: "#7d3daf"}}
                            />
                            <FontAwesomeIcon
                                icon={faTelegram}
                                style={{fontSize: 25, color: "#08c"}}
                            />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};

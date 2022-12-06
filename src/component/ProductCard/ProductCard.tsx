import {ButtonIcon} from "../ButtonIcon";
import Image from "next/image";
import styles from "./ProductCard.module.scss";
import Link from "next/link";
import {StarRating} from "../StarRating";
import {WishIcon} from "../WishList";
import {HTMLAttributes} from "react";

interface CardProp extends HTMLAttributes<HTMLDivElement> {
    src: string;
    title: string;
    stars: number;
    price: string;
    oldPrice: string;
    href: string;
    quantity: string;
    productId: number;
    quantityComments: number;
    isCart?: boolean;
}
export const ProductCard = ({
    src,
    productId,
    title,
    stars,
    href,
    price,
    oldPrice,
    isCart = true,
    quantity,
    quantityComments,
    ...rest
}: CardProp) => {
    return (
        <div {...rest} className={styles.container}>
            <div className={styles.icon}>
                <WishIcon id={productId} />
            </div>
            <div className={styles.img}>
                <Link href={href}>
                    <a href={href}>
                        <Image
                            src={
                                src
                                    ? src
                                    : "https://firebasestorage.googleapis.com/v0/b/ecom-47894.appspot.com/o/default%2Fimg%2F%D0%97%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D0%B8.PNG?alt=media&token=75064ecd-5807-413c-bc7b-65a5e82ddbfb"
                            }
                            width={140}
                            height={140}
                        />
                    </a>
                </Link>
            </div>
            <div className={styles.title}>
                <Link href={href}>
                    <a href={href}>{title}</a>
                </Link>
            </div>
            <div className={styles.response}>
                <StarRating star={stars} />
                <p>{quantityComments} comments</p>
            </div>
            <div className={styles.oldPrice}>
                <p>{oldPrice}</p>
            </div>
            <div className={styles.price}>
                {price}
                {isCart && <ButtonIcon icon="faCartShopping" color="#00a046" />}
            </div>
            <div className={styles.available}>
                {quantity ? (
                    <p className={styles.isAvailable}>Is available</p>
                ) : (
                    <p className={styles.noAvailable}>no available</p>
                )}
            </div>
        </div>
    );
};

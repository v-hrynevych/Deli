import {ButtonIcon} from "../ButtonIcon";
import Image from "next/image";
import styles from "./ProductCard.module.scss";
import Link from "next/link";
import {StarRating} from "../StarRating";

interface CardProp {
    src: string;
    title: string;
    stars: number;
    price: string;
    oldPrice: string;
    quantity: string;
    quantityComments: number;
}
export const ProductCard = ({
    src,
    title,
    stars,
    price,
    oldPrice,
    quantity,
    quantityComments,
}: CardProp) => {
    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                <ButtonIcon className="hover" icon="faHeart" color="#ffa900" />
            </div>
            <div className={styles.img}>
                <Image src={src} width={140} height={140} />
            </div>
            <div className={styles.title}>
                <Link href={""}>
                    <a href="">{title}</a>
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
                <ButtonIcon icon="faCartShopping" color="#00a046" />
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

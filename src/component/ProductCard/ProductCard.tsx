import { ButtonIcon } from "../ButtonIcon";
import Image from "next/image";
import styles from "./ProductCard.module.scss";
import Link from "next/link";
import { StarRating } from "../StarRating";
import { WishIcon } from "../WishList";
import { ProductCardProp } from "./interfaces";
import { useDoc } from "src/hooks";
import { useDispatch, useSelector } from "react-redux";
import { userValue } from "src/store/userSlice";
import { cartValue, setCart } from "src/store/cartSlice";
import { toast } from "react-toastify";

export const ProductCard = ({
    photoUrl = [
        "https://firebasestorage.googleapis.com/v0/b/ecom-47894.appspot.com/o/default%2Fimg%2F%D0%97%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D0%B8.PNG?alt=media&token=75064ecd-5807-413c-bc7b-65a5e82ddbfb",
    ],
    productId,
    title,
    stars = 0,
    href,
    price,
    productOwner,
    name,
    isCart = true,
    tel,
    oldPrice,
    category,
    data,
    description,
    email,
    location,
    quantity = 1,
    quantityComments = 0,
    ...rest
}: ProductCardProp) => {
    const { userId } = useSelector(userValue);
    const { cartData } = useSelector(cartValue);
    const dispatch = useDispatch();
    const { postDoc, docError } = useDoc("user");

    const isOldPriceObj = oldPrice
        ? {
              photoUrl: photoUrl,
              title: title,
              price: price,
              oldPrice: oldPrice,
              id: productId,
              quantity: 1,
          }
        : {
              photoUrl: photoUrl,
              title: title,
              price: price,
              id: productId,
              quantity: 1,
          };
    const cardItem = cartData ? [...cartData, isOldPriceObj] : [isOldPriceObj];

    const shopItem = () => {
        if (userId) {
            postDoc({
                documentItem: {
                    photoUrl: photoUrl,
                    title: title,
                    price: price,
                    id: productId,
                    quantity: 1,
                },
                path: `${userId}/cart`,
                subCollection: `productId${productId}`,
            })
                .then(() => {
                    toast.success("Shop Item");
                })
                .catch(() => {
                    toast.error(`${docError}`);
                });
        }
        dispatch(setCart(cardItem));
    };

    return (
        <>
            <div {...rest} className={styles.container}>
                <div className={styles.icon}>
                    <WishIcon
                        productProps={{
                            productOwner,
                            name,
                            tel,
                            productId,
                            title,
                            href,
                            price,
                            quantity,
                            category,
                            description,
                            email,
                            location,
                            photoUrl,
                            stars,
                            quantityComments,
                        }}
                    />
                </div>
                <div className={styles.img}>
                    <Link href={href}>
                        <a href={href}>
                            <Image quality={50} priority={false} src={photoUrl[0]} width={140} height={140} />
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
                    <p>{oldPrice && oldPrice}</p>
                </div>
                <div className={styles.price}>
                    {price}
                    {isCart && (
                        <ButtonIcon
                            onClick={shopItem}
                            icon="faCartShopping"
                            color="#00a046"
                        />
                    )}
                </div>
                <div className={styles.available}>
                    {quantity > 0 ? (
                        <p className={styles.isAvailable}>Is available</p>
                    ) : (
                        <p className={styles.noAvailable}>no available</p>
                    )}
                </div>
            </div>
        </>
    );
};

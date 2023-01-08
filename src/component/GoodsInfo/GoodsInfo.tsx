import {StarRating} from "../StarRating";
import styles from "./GoodsInfo.module.scss";
import Link from "next/link";
import {ImgSlider} from "../ImgSlider";
import {Button} from "../Button";
import {ButtonIcon} from "../ButtonIcon";
import {useRouter} from "next/router";
import Head from "next/head";

import {useDoc} from "src/hooks";
import {WishIcon} from "../WishList";
import {useDispatch, useSelector} from "react-redux";
import {userValue} from "src/store/userSlice";
import {ProductCardProp} from "../ProductCard/interfaces";
import {cartValue, setCart} from "src/store/cartSlice";
import {toast} from "react-toastify";

interface GoodsInfoProps {
    productProps: ProductCardProp;
}
export const GoodsInfo = ({productProps}: GoodsInfoProps) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {userName, userId} = useSelector(userValue);
    const {postDoc, docError} = useDoc("user");
    const {cartData} = useSelector(cartValue);
    const {
        category,
        data,
        description,
        email,
        href,
        location,
        name,
        photoUrl,
        price,
        quantity,
        tel,
        title,
        productOwner,
        productId,
    } = productProps;

    const cardItem = cartData
        ? [
              ...cartData,
              {
                  photoUrl: photoUrl,
                  title: title,
                  price: price,

                  id: productId,
                  quantity: 1,
              },
          ]
        : [
              {
                  photoUrl: photoUrl,
                  title: title,
                  price: price,

                  id: productId,
                  quantity: 1,
              },
          ];

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
            <Head>
                <title>{title}</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <div className={styles.container}>
                <div className={styles.head}>
                    <div>
                        <div>
                            <h1>{title}</h1>
                        </div>
                        <div>
                            <StarRating star={0} />
                            <Link href={`${router.asPath}/comment`}>
                                <a href={`${router.asPath}/comment`}>
                                    <p>0 comment</p>
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.id}>id: {productId}</div>
                </div>
                <div className={styles.content}>
                    <div className={styles.about}>
                        <div className={styles.aboutLeft}>
                            <ImgSlider alt={title} imgArr={photoUrl} />
                            <div>
                                <p>{description}</p>
                            </div>
                        </div>

                        <div className={styles.aboutRight}>
                            <div className={styles.quantity}>
                                {quantity ? (
                                    <>
                                        <ButtonIcon
                                            color="green"
                                            icon="faCircleCheck"
                                        />
                                        <p>In stock</p>
                                    </>
                                ) : (
                                    <>
                                        <ButtonIcon
                                            color="#F5F5F5"
                                            icon="faCircleXmark"
                                        />
                                        <p>unavailable</p>
                                    </>
                                )}
                            </div>
                            <div className={styles.price}>
                                {false && (
                                    <p className={styles.oldPrice}>
                                        {/* {oldPrice} */}
                                    </p>
                                )}

                                <p>{price}</p>
                                <Button
                                    onClick={() => shopItem()}
                                    color="#00BC52"
                                >
                                    <span>Buy</span>
                                </Button>
                                <WishIcon productProps={productProps} />
                            </div>
                            <div className={styles.seller}>
                                <p>Seller: {userName}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

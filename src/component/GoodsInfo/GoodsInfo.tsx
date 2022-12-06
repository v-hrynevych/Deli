import {StarRating} from "../StarRating";
import styles from "./GoodsInfo.module.scss";
import Link from "next/link";
import {ImgSlider} from "../ImgSlider";
import {Button} from "../Button";
import {ButtonIcon} from "../ButtonIcon";
import {useRouter} from "next/router";
import Head from "next/head";

import {useLocalStorage} from "src/hooks";
import {WishIcon} from "../WishList";

interface GoodsInfoProps {
    title: string;
    star: number;
    comment: number;
    imgArr: string[];
    id: number;
    description: string;
    price: string;
    oldPrice: string;
    quantity: string;
    sellerName: string;
}
export const GoodsInfo = ({
    title,
    quantity,
    star,
    description,
    price,
    oldPrice,
    imgArr,
    comment,
    id,
    sellerName,
}: GoodsInfoProps) => {
    const router = useRouter();
    const [cart, setCart] = useLocalStorage<Array<number>>("cart", []);
    const addInCart = () => {
        if (cart.includes(id)) return cart;
        setCart([...cart, id]);
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
                            <StarRating star={star} />
                            <Link href={`${router.asPath}/comment`}>
                                <a href={`${router.asPath}/comment`}>
                                    <p>{comment} comment</p>
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.id}>id: {id}</div>
                </div>
                <div className={styles.content}>
                    <div className={styles.about}>
                        <div className={styles.aboutLeft}>
                            <ImgSlider alt={title} imgArr={imgArr} />
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
                                {oldPrice && (
                                    <p className={styles.oldPrice}>
                                        {oldPrice}
                                    </p>
                                )}

                                <p>{price}</p>
                                <Button onClick={addInCart} color="#00BC52">
                                    <span>Buy</span>
                                </Button>
                                <WishIcon id={id} />
                            </div>
                            <div className={styles.seller}>
                                <p>Seller: {sellerName}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

import styles from "./CartItem.module.scss";
import Image from "next/image";
import CartImg from "../../default/svg/modal-cart-dummy.svg";
import {useDeleteDoc} from "src/hooks";
import {useDispatch, useSelector} from "react-redux";
import {ButtonIcon} from "../ButtonIcon";
import {useState} from "react";
import {Button} from "../Button";
import {
    cartValue,
    decrementQuantityCartItem,
    incrementQuantityCartItem,
    removeItem,
} from "src/store/cartSlice";
import {userValue} from "src/store/userSlice";
import {useRouter} from "next/router";

export const CartItem = () => {
    const router = useRouter();
    const {userId} = useSelector(userValue);
    const {cartData} = useSelector(cartValue);
    const [isOptions, setIsOptions] = useState({
        isActive: false,
        id: 0,
    });
    const {deleteDocument, isDeleteLoading} = useDeleteDoc();
    const dispatch = useDispatch();
    const deleteItemCart = (id: number) => {
        deleteDocument(`user/${userId}/cart/productId${id}`);
        dispatch(removeItem(id));
    };
    return (
        <div className={styles.container}>
            <h1>Cart</h1>
            {cartData ? (
                cartData.map((item, index) => {
                    return (
                        <div className={styles.content} key={item.id}>
                            <div>
                                <Image
                                    width={100}
                                    height={100}
                                    src={item.photoUrl[0]}
                                />
                            </div>
                            <div className={styles.title}>
                                <div>
                                    <p>{item.title}</p>
                                </div>
                                <div className={styles.quantity}>
                                    <ButtonIcon
                                        icon="faMinus"
                                        color="#d2d2d2"
                                        onClick={() => {
                                            dispatch(
                                                decrementQuantityCartItem(
                                                    item.id,
                                                ),
                                            );
                                        }}
                                    />
                                    <input
                                        value={cartData[index].quantity}
                                        readOnly
                                        type="number"
                                    />
                                    <ButtonIcon
                                        onClick={() => {
                                            dispatch(
                                                incrementQuantityCartItem(
                                                    item.id,
                                                ),
                                            );
                                        }}
                                        icon="faPlus"
                                        color="#3e77aa"
                                    />
                                </div>
                            </div>
                            <div className={styles.price}>
                                {isOptions.isActive &&
                                    isOptions.id === item.id && (
                                        <div className={styles.cartOption}>
                                            <ButtonIcon
                                                icon="faTrash"
                                                color="#3e77aa"
                                            />
                                            <p
                                                onClick={() =>
                                                    deleteItemCart(item.id)
                                                }
                                            >
                                                Remove
                                            </p>
                                        </div>
                                    )}
                                <ButtonIcon
                                    onClick={() =>
                                        setIsOptions({
                                            isActive: !isOptions.isActive,
                                            id: item.id,
                                        })
                                    }
                                    color="#3e77aa"
                                    icon="faEllipsisVertical"
                                />

                                <p>{item.price * cartData[index].quantity}</p>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className={styles.cart}>
                    <Image width={240} height={240} src={CartImg} />
                    <h4>The basket is empty</h4>
                    <p>But it's never too late to fix it :)</p>
                </div>
            )}
            {cartData && (
                <div className={styles.order}>
                    <p>
                        {cartData?.reduce(
                            (accumulator, currentValue) =>
                                accumulator +
                                currentValue.price * currentValue.quantity,

                            0,
                        )}
                    </p>
                    <Button
                        onClick={() => router.push("checkout")}
                        variant="primary"
                    >
                        Order
                    </Button>
                </div>
            )}
        </div>
    );
};

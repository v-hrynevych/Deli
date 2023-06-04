import {useEffect} from "react";
import {useSelector} from "react-redux";
import {Details} from "src/component/Details";
import {Fieldset} from "src/component/Fieldset";
import {Spinner} from "src/component/Spiner";
import {useCollection, useDeleteDoc} from "src/hooks";
import {userValue} from "src/store/userSlice";
import Image from "next/image";

import styles from "./Orders.module.scss";
import {ButtonIcon} from "src/component/ButtonIcon";
import {useRouter} from "next/router";
import {toast} from "react-toastify";

interface OrderData {
    price: number;
    cart: Array<Cart>;
    orderId: number;
    deliveryAddress: string;
    name: string;
    email: string;
    surName: string;
    phone: string;
    payment: string;
    deliveryCost: number;
}
interface Cart {
    id: number;
    photoUrl: Array<string>;
    price: number;
    quantity: number;
    title: string;
}
export const Orders = () => {
    const {userId} = useSelector(userValue);
    const {getData, collectionData, isLoading, error} = useCollection();
    const {
        deleteDocument,
        isDeleteLoading,
        error: deleteError,
    } = useDeleteDoc();
    const router = useRouter();
    useEffect(() => {
        getData(`user/${userId}/orders`);
    }, [userId]);
    const closeOrder = (orderId: number) => {
        deleteDocument(`user/${userId}/orders/order${orderId}`)
            .then(() => {
                router.reload();
                toast.success("Order updated successfully");
            })
            .catch(() => {
                toast.error(deleteError?.message);
            });
    };
    return (
        <div className={styles.orderWrapper}>
            {collectionData ? (
                collectionData.map((item: OrderData, index: number) => {
                    const OrderDetailTitle = (
                        <div className={styles.orderDetailTitleWrapper}>
                            <div className={styles.status}>
                                <p className={styles.statusLabel}>Status:</p>
                                <p>Preparing</p>
                            </div>
                            <div className={styles.price}>
                                <p className={styles.priceLabel}>
                                    Order amount:
                                </p>
                                <p>{item.price}</p>
                            </div>
                            <div className={styles.orderLogo}>
                                {item.cart.map((cart) => (
                                    <Image
                                        key={cart.id}
                                        width={50}
                                        height={50}
                                        src={cart.photoUrl[0]}
                                    />
                                ))}
                            </div>
                        </div>
                    );

                    return (
                        <Fieldset
                            key={item.orderId}
                            number={index + 1}
                            title={`Order №${item.orderId}`}
                            borderBottom
                        >
                            <Details isOpen={false} jsxTitle={OrderDetailTitle}>
                                <div className={styles.detail}>
                                    <div className={styles.summary}>
                                        <p className={styles.title}>
                                            Order information:
                                        </p>
                                        {item.deliveryAddress === "pickup" ? (
                                            ""
                                        ) : (
                                            <p>{item.deliveryAddress}</p>
                                        )}
                                        <p>{`${item.name} ${item.surName}`}</p>
                                        <p>{item.email}</p>
                                        <p>{item.phone}</p>
                                    </div>
                                    <div className={styles.goods}>
                                        <div className={styles.header}>
                                            <h4>Goods</h4>
                                            <ButtonIcon
                                                onClick={() => {
                                                    closeOrder(item.orderId);
                                                }}
                                                title="Close Order"
                                                color="red"
                                                icon="faRectangleXmark"
                                            />
                                        </div>
                                        <div className={styles.items}>
                                            <ul>
                                                {item.cart.map((item) => {
                                                    return (
                                                        <li key={item.id}>
                                                            <figure>
                                                                <Image
                                                                    width={50}
                                                                    height={50}
                                                                    src={
                                                                        item
                                                                            .photoUrl[0]
                                                                    }
                                                                />
                                                                <figcaption>
                                                                    {item.title}
                                                                </figcaption>
                                                            </figure>
                                                            <dl>
                                                                <div>
                                                                    <dt>
                                                                        Price
                                                                    </dt>
                                                                    <dd>
                                                                        {
                                                                            item.price
                                                                        }
                                                                    </dd>
                                                                </div>
                                                                <div>
                                                                    <dt>
                                                                        Quantity
                                                                    </dt>
                                                                    <dd>
                                                                        {
                                                                            item.quantity
                                                                        }
                                                                    </dd>
                                                                </div>
                                                                <div>
                                                                    <dt>Sum</dt>
                                                                    <dd>
                                                                        {item.price *
                                                                            item.quantity}
                                                                    </dd>
                                                                </div>
                                                            </dl>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                        <ul className={styles.payment}>
                                            <li>
                                                <span>Payment</span>
                                                <span>{item.payment}</span>
                                            </li>
                                            <li>
                                                <span>Delivery</span>
                                                <span>{item.deliveryCost}</span>
                                            </li>
                                            <li>
                                                <span>Total</span>
                                                <span>{item.price}</span>
                                            </li>
                                        </ul>
                                        <div className={styles.action}></div>
                                    </div>
                                </div>
                            </Details>
                        </Fieldset>
                    );
                })
            ) : isLoading ? (
                <Spinner />
            ) : (
                <div className={styles.missingOrder}>
                    <p>No orders yet</p>
                </div>
            )}
        </div>
    );
};

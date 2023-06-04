import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useCollection, useDeleteDoc, useDoc, useId, useUser } from "src/hooks";
import { cartValue, setCart } from "src/store/cartSlice";
import { Button } from "../Button";
import { Fieldset } from "../Fieldset";
import { InputField } from "../InputField";
import { Spinner } from "../Spiner";
import Card from "react-credit-card-flipping";

import styles from "./CheckoutItem.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { userValue } from "src/store/userSlice";
import { ButtonIcon } from "../ButtonIcon";

interface orderInfo {
    name: string;
    surName: string;
    phone?: string;
    email: string;
    orderId: number;
    price?: number;
    deliveryAddress: string;
    cart?: Array<cart>;
    creditCard?: CreditCard;
    payment: string;
    deliveryCost?: number | string;
}
interface CreditCard {
    name?: string;
    number?: string;
    expiry?: string;
    cvv?: string;
}
interface cart {
    id: number;
    price: number;
    quantity: number;
    photoUrl: string;
    title: string;
}
export const CheckoutItem = () => {
    const { user } = useUser();
    const { userEmail, userId } = useSelector(userValue);
    const router = useRouter();
    const { id: orderId, updateId } = useId("orderId");
    const dispatch = useDispatch();
    const {
        collectionData: cartCollection,
        isSuccess: isSuccessCart,
        getData: getCartData,
    } = useCollection();
    const { getDocument, dataDoc } = useDoc("user");
    const { postDoc, docError, isLoadingDoc } = useDoc("user");
    const { cartData } = useSelector(cartValue);
    const { deleteDocument, error } = useDeleteDoc();
    const [orderInfo, setOrderInfo] = useState<orderInfo>({
        orderId: 0,
        name: "",
        surName: "",
        phone: "",
        price: undefined,
        payment: "",
        email: "",
        deliveryAddress: "",
        cart: undefined,
        deliveryCost: "Free",
    });
    const [coupons, setCoupons] = useState("");
    const [creditCard, setCreditCard] = useState<CreditCard>({
        name: "",
        number: "",
        expiry: "",
        cvv: "",
    });
    const [isAddress, setIsAddress] = useState<boolean>(false);
    const [isCreditCard, setIsCreditCard] = useState(false);
    const isFillCreditCard =
        creditCard.cvv &&
        creditCard.expiry &&
        creditCard.name &&
        creditCard.number
            ? true
            : false;

    const confirmOrder = () => {
        if (user.userId) {
            postDoc({
                documentItem: orderInfo,
                path: `${user.userId}/orders`,
                subCollection: `order${orderId}`,
            })
                .then(() => {
                    updateId();
                    orderInfo.cart?.map((item) => {
                        deleteDocument(
                            `user/${user.userId}/cart/productId${item.id}`
                        );
                    });
                    dispatch(setCart(null));
                    toast.success("Order placed");
                    setTimeout(() => {
                        router.push("/");
                    }, 2000);
                })
                .catch(() => toast.error(docError?.message));
        }
    };

    useEffect(() => {
        if (user.userId) {
            getDocument(user.userId);
        }
        if (cartData === null && user.userId) {
            getCartData(`user/${user.userId}/cart`);
        }
    }, [user.userId]);
    useEffect(() => {
        if (cartData === null && user.userId) {
            dispatch(setCart(cartCollection));
        }
    }, [isSuccessCart]);
    useEffect(() => {
        if (dataDoc) {
            setOrderInfo({
                ...orderInfo,
                name: dataDoc.userName,
                surName: dataDoc.surname,
                phone: dataDoc.phone,
                email: `${userEmail}`,
            });
        }
    }, [dataDoc]);
    useEffect(() => {
        if (cartData) {
            setOrderInfo((prevState) => ({
                ...prevState,
                cart: cartData,
                price: cartData.reduce(
                    (accumulator, currentValue) =>
                        accumulator +
                        currentValue.price * currentValue.quantity,

                    0
                ),
            }));
        }
    }, [cartData]);
    useEffect(() => {
        setOrderInfo((prevState) => ({
            ...prevState,
            orderId: orderId,
        }));
    }, [orderId]);
    const addCoupons = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (coupons === "" && orderInfo.price) {
            setCoupons(e.target.value);
            const discountAmount = (25 / 100) * orderInfo.price;
            const discountedPrice = orderInfo.price - discountAmount;
            setOrderInfo({ ...orderInfo, price: discountedPrice });
            toast.success("Added Coupon -25% !", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };
    return (
        <section className={styles.section}>
            <Head>
                <title>Checkout</title>
                <meta />
            </Head>
            <div className={styles.content}>
                <header>
                    <div className={styles.logo}>
                        <h3>ECOM</h3>
                    </div>
                </header>
                <div className={styles.title}>
                    <h1>Checkout</h1>
                    <ButtonIcon icon="faX" color="black" href={"/cart"} />
                </div>
                <div className={styles.checkoutForm}>
                    <main className={styles.content}>
                        <Fieldset title="Your contact details" number={1}>
                            {orderInfo.name && orderInfo.surName ? (
                                <div>
                                    <InputField
                                        type="text"
                                        label="Name"
                                        value={orderInfo.name}
                                        onChange={(e) =>
                                            setOrderInfo({
                                                ...orderInfo,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                    <InputField
                                        type="text"
                                        label="Surname"
                                        value={orderInfo.surName}
                                        onChange={(e) =>
                                            setOrderInfo({
                                                ...orderInfo,
                                                surName: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            ) : (
                                <Spinner />
                            )}
                            {userEmail ? (
                                <div>
                                    <InputField
                                        type="text"
                                        label="Phone Number"
                                        value={orderInfo.phone}
                                        onChange={(e) =>
                                            setOrderInfo({
                                                ...orderInfo,
                                                phone: e.target.value,
                                            })
                                        }
                                    />
                                    <InputField
                                        onChange={() =>
                                            toast.error("can not  Edit !", {
                                                position:
                                                    toast.POSITION.TOP_RIGHT,
                                            })
                                        }
                                        type="text"
                                        label="Email"
                                        value={userEmail}
                                    />
                                </div>
                            ) : (
                                <Spinner />
                            )}
                        </Fieldset>
                        <div className={styles.order}>
                            <div className={styles.title}>
                                <h2>Order</h2>
                                <p>
                                    amount:&nbsp;
                                    {orderInfo.price}
                                </p>
                            </div>
                            <Fieldset
                                number={1}
                                title={"Products of the seller"}
                            >
                                <ul>
                                    {cartData ? (
                                        cartData.map((item) => {
                                            return (
                                                <li key={item.id}>
                                                    <div
                                                        className={
                                                            styles.product
                                                        }
                                                    >
                                                        <figure>
                                                            <Image
                                                                width={56}
                                                                height={56}
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
                                                                <dt>Price</dt>
                                                                <dd>
                                                                    {item.price}
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
                                                                <dt>Amount</dt>
                                                                <dd>
                                                                    {item.quantity *
                                                                        item.price}
                                                                </dd>
                                                            </div>
                                                        </dl>
                                                    </div>
                                                </li>
                                            );
                                        })
                                    ) : (
                                        <li className={styles.empty}>
                                            <p>no products</p>
                                        </li>
                                    )}
                                </ul>
                            </Fieldset>
                            <Fieldset borderBottom title=" Delivery" number={2}>
                                <div className={styles.variant}>
                                    <div className={styles.free}>
                                        <InputField
                                            name="delivery"
                                            label="Pickup"
                                            value={"Free"}
                                            checked={
                                                orderInfo.deliveryCost ===
                                                "Free"
                                            }
                                            onChange={(e) => {
                                                if (orderInfo.price) {
                                                    setOrderInfo({
                                                        ...orderInfo,
                                                        deliveryCost:
                                                            e.target.value,
                                                        price:
                                                            orderInfo.price -
                                                            50,
                                                    });
                                                }
                                                setIsAddress(false);
                                            }}
                                            type={"radio"}
                                        />
                                        <div className={styles.price}>
                                            <span>Free</span>
                                        </div>
                                    </div>
                                    <div className={styles.courier}>
                                        <InputField
                                            value={50}
                                            name="delivery"
                                            label="Courier"
                                            onChange={(e) => {
                                                if (orderInfo.price) {
                                                    setOrderInfo({
                                                        ...orderInfo,
                                                        deliveryCost:
                                                            e.target.value,
                                                        price:
                                                            orderInfo.price +
                                                            50,
                                                    });
                                                }

                                                setIsAddress(true);
                                            }}
                                            type={"radio"}
                                        />
                                        <div className={styles.price}>
                                            <span>50</span>
                                        </div>
                                    </div>
                                    {isAddress && (
                                        <div>
                                            <InputField
                                                onChange={(e) =>
                                                    setOrderInfo({
                                                        ...orderInfo,
                                                        deliveryAddress:
                                                            e.target.value,
                                                    })
                                                }
                                                value={
                                                    orderInfo.deliveryAddress
                                                }
                                                placeholder="Please write your address"
                                                type={"text"}
                                            />
                                        </div>
                                    )}
                                </div>
                            </Fieldset>
                            <Fieldset title="Payment" number={4} borderBottom>
                                <ul>
                                    <li>
                                        <InputField
                                            name="payment"
                                            value={"upon delivery"}
                                            onChange={(e) => {
                                                setOrderInfo({
                                                    ...orderInfo,
                                                    payment: e.target.value,
                                                });
                                                setIsCreditCard(false);
                                            }}
                                            label="Payment upon receipt of goods"
                                            type={"radio"}
                                        />
                                    </li>
                                    <li>
                                        <InputField
                                            value={"credit card"}
                                            onChange={(e) => {
                                                setOrderInfo({
                                                    ...orderInfo,
                                                    payment: e.target.value,
                                                });
                                                setIsCreditCard(true);
                                            }}
                                            name="payment"
                                            label="Pay now (Credit card)"
                                            type={"radio"}
                                        />
                                    </li>
                                    {isCreditCard && (
                                        <li className={styles.creditCard}>
                                            <Card
                                                name={
                                                    creditCard?.name
                                                        ? creditCard.name
                                                        : ""
                                                }
                                                number={
                                                    creditCard?.number
                                                        ? creditCard.number
                                                        : ""
                                                }
                                                expiry={
                                                    creditCard?.expiry
                                                        ? creditCard.expiry
                                                        : "00/00"
                                                }
                                                brand="https://www.ixbt.com/img/n1/news/2022/2/0/vizza_large.png"
                                                cvv={
                                                    creditCard?.cvv
                                                        ? creditCard.cvv
                                                        : ""
                                                }
                                                flipCard={
                                                    creditCard?.cvv !== ""
                                                }
                                            />
                                            <div className={styles.cardInput}>
                                                <InputField
                                                    label="Name Surname:"
                                                    onChange={(e) => {
                                                        setCreditCard({
                                                            ...creditCard,
                                                            name: e.target
                                                                .value,
                                                        });
                                                    }}
                                                    value={creditCard?.name}
                                                    type={"text"}
                                                    placeholder="Name"
                                                />
                                                <InputField
                                                    label="Card Number:"
                                                    onChange={(e) => {
                                                        setCreditCard({
                                                            ...creditCard,
                                                            number: e.target
                                                                .value,
                                                        });
                                                    }}
                                                    value={creditCard?.number}
                                                    type={"text"}
                                                    placeholder="Number"
                                                />
                                                <InputField
                                                    label="Card is valid until"
                                                    onChange={(e) => {
                                                        setCreditCard({
                                                            ...creditCard,
                                                            expiry: e.target
                                                                .value,
                                                        });
                                                    }}
                                                    value={creditCard?.expiry}
                                                    type={"text"}
                                                    placeholder="Expiry"
                                                />
                                                <InputField
                                                    label="CVV"
                                                    onChange={(e) => {
                                                        setCreditCard({
                                                            ...creditCard,
                                                            cvv: e.target.value,
                                                        });
                                                    }}
                                                    value={creditCard?.cvv}
                                                    type={"text"}
                                                    placeholder="CVV"
                                                />
                                            </div>
                                            <div className={styles.action}>
                                                <Button
                                                    onClick={(e) => {
                                                        setOrderInfo({
                                                            ...orderInfo,
                                                            creditCard:
                                                                creditCard,
                                                        });
                                                        toast.info(
                                                            "OK added card"
                                                        );
                                                    }}
                                                    disabled={!isFillCreditCard}
                                                    variant={
                                                        isFillCreditCard
                                                            ? "primary"
                                                            : "ghost"
                                                    }
                                                >
                                                    <p> Add Card</p>
                                                </Button>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </Fieldset>
                        </div>
                    </main>
                    {isLoadingDoc ? (
                        <aside className={styles.total}>
                            <Spinner />
                        </aside>
                    ) : (
                        <aside className={styles.total}>
                            <h4>Total</h4>
                            <dl>
                                <dt>goods worth</dt>
                                <dd>{orderInfo.price}</dd>
                            </dl>
                            <dl className={styles.delivery}>
                                <dt>Cost of delivery</dt>
                                <dd>{orderInfo.deliveryCost}</dd>
                            </dl>
                            <dl className={styles.toPay}>
                                <dt>To pay</dt>
                                <dd>{orderInfo.price}</dd>
                            </dl>
                            <div className={styles.confirm}>
                                <InputField
                                    style={{
                                        padding: "10px",
                                        marginBottom: "3px",
                                    }}
                                    value={coupons}
                                    placeholder="Select coupon"
                                    onChange={(e) => addCoupons(e)}
                                />
                                <Button
                                    variant={
                                        orderInfo.payment ? "primary" : "ghost"
                                    }
                                    disabled={orderInfo.payment === ""}
                                    onClick={() => confirmOrder()}
                                >
                                    Confirm order
                                </Button>
                            </div>
                        </aside>
                    )}
                </div>
            </div>
            <ToastContainer />
        </section>
    );
};

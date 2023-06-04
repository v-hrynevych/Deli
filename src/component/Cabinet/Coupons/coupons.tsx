import Image from "next/image";
import ImgCoup from "src/default/img/Coupon.jpg";
import styles from "./coupons.module.scss";
import { Button } from "src/component/Button";
import { useEffect, useState } from "react";
import { useDoc, useCollection } from "src/hooks";
import { toast } from "react-toastify";

export const Coupons = () => {
    const { postDoc, docError } = useDoc("coupons");
    const { getData, collectionData } = useCollection();

    const [coupons, setCoupons] = useState<number>(0);
    const randomNumber = () => {
        return Math.floor(Math.random() * 1000000000);
    };

    const addCoupon = () => {
        postDoc({
            documentItem: {
                number: coupons,
            },
            path: `${coupons}`,
        })
            .then(() => {
                toast.success("Added Coupon !", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
            .catch((error) => {
                toast.error(error, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            });
    };
    useEffect(() => {
        setCoupons(randomNumber);
        getData("coupons");
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.couponIntem}>
                {collectionData &&
                    collectionData.map((item: any) => {
                        let number = item.number;
                        return (
                            <div key={item.number} className={styles.item}>
                                <div>
                                    <Image
                                        width={"250px"}
                                        height={"150px"}
                                        src={ImgCoup}
                                    />
                                </div>
                                <p>Coupon({number})</p>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            `${number}`
                                        );
                                        toast.success("Copy !", {
                                            position: toast.POSITION.TOP_RIGHT,
                                        });
                                    }}
                                >
                                    Copy Number
                                </button>
                            </div>
                        );
                    })}
            </div>
            <div className={styles.coupon}>
                <div>
                    <Image width={"250px"} height={"150px"} src={ImgCoup} />
                </div>
                <div>
                    <p>Coupon ({coupons})</p>
                </div>
                <div className={styles.button}>
                    <Button
                        onClick={() => {
                            addCoupon();
                        }}
                    >
                        <p>Add new Coupon</p>
                    </Button>
                    <Button onClick={() => setCoupons(randomNumber)}>
                        <p>Generete Number</p>
                    </Button>
                </div>
            </div>
        </div>
    );
};

import {useEffect} from "react";
import {useCollection} from "src/hooks";
import {ProductCard} from "../ProductCard";
import styles from "./Goods.module.scss";

export const Goods = () => {
    const {getData, collectionData} = useCollection();
    useEffect(() => {
        getData("product");
    });
    return (
        <div className={styles.goods}>
            {collectionData &&
                collectionData.map((item) => {
                    return (
                        <ProductCard
                            href={item.href}
                            key={item.id}
                            photoUrl={item.photoUrl[0]}
                            title={item.name}
                            stars={item.stars}
                            price={item.price}
                            oldPrice={item.oldPrice}
                            quantity={item.quantity}
                            quantityComments={item.quantityComments}
                        />
                    );
                })}
        </div>
    );
};

import {useCollection} from "src/hooks";
import {ProductCard} from "../ProductCard";
import styles from "./Goods.module.scss";

export const Goods = () => {
    const {data} = useCollection("product");

    return (
        <div className={styles.goods}>
            {data &&
                Object.values(data).map((item) => {
                    for (const key in item) {
                        let goods = item[key];
                        return (
                            <ProductCard
                                href={goods.href}
                                key={goods.id}
                                src={goods.photoUrl[0]}
                                title={goods.name}
                                stars={goods.stars}
                                price={goods.price}
                                oldPrice={goods.oldPrice}
                                quantity={goods.quantity}
                                quantityComments={goods.quantityComments}
                            />
                        );
                    }
                })}
        </div>
    );
};

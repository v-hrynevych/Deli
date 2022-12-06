import {useEffect, useState} from "react";
import {useLocalStorage} from "src/hooks";
import {useQueryFilter} from "src/hooks/useQueryFilter";
import {ProductCard} from "../ProductCard";

export const WishList = () => {
    const [wish, setWish] = useLocalStorage<Array<number>>("wish", []);
    const {queryFilter, queryError, data} = useQueryFilter("products");
    useEffect(() => {
        queryFilter({filterField: "id", value: wish});
    }, []);
    return (
        <>
            {data &&
                data.map((item: any, index: any) => {
                    return (
                        <ProductCard
                            key={item.id}
                            src={item.photoUrl[0]}
                            href={item.href}
                            title={item.title}
                            price={item.price}
                            productId={item.id}
                            stars={item.stars}
                            oldPrice={item.oldPrice}
                            quantity={item.quantity}
                            quantityComments={item.quantityComments}
                        />
                    );
                })}
        </>
    );
};

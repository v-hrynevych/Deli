import {useEffect} from "react";
import {useSelector} from "react-redux";
import {ProductCard} from "src/component";
import {useQueryFilter} from "src/hooks";

import {userValue} from "src/store/userSlice";

export const Products = () => {
    const {userId} = useSelector(userValue);
    const {queryFilter, data} = useQueryFilter("products");
    console.log(data);

    useEffect(() => {
        queryFilter({
            filterField: "userId",
            value: userId,
        });
    }, []);

    return (
        <>
            {data &&
                data.map((item: any) => (
                    <ProductCard
                        isCart={false}
                        productId={item.id}
                        href={item.href}
                        key={item.id}
                        src={item.photoUrl[0]}
                        title={item.name}
                        stars={item.stars}
                        price={item.price}
                        oldPrice={item.oldPrice}
                        quantity={item.quantity}
                        quantityComments={item.quantityComments}
                    />
                ))}
        </>
    );
};

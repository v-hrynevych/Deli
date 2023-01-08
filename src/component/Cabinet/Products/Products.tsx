import {useEffect} from "react";
import {useSelector} from "react-redux";
import {ProductCard} from "src/component";
import {ProductCardProp} from "src/component/ProductCard/interfaces";
import {useQueryFilter} from "src/hooks";

import {userValue} from "src/store/userSlice";

export const Products = () => {
    const {userId} = useSelector(userValue);
    const {queryFilter, data} = useQueryFilter("products");
    useEffect(() => {
        queryFilter({
            filterField: "productOwner",
            value: userId,
            queryOperator: "==",
            orderLimit: 50,
        });
    }, [userId]);

    return (
        <>
            {data &&
                data.map((item: ProductCardProp) => (
                    <ProductCard
                        name={item.name}
                        location={item.location}
                     
                        tel={item.tel}
                        productOwner={item.productOwner}
                        category={item.category}
                        data={item.data}
                        description={item.description}
                        email={item.email}
                        isCart={false}
                        productId={item.productId}
                        href={item.href}
                        key={item.productId}
                        photoUrl={item.photoUrl}
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

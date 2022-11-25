import {MainLayout} from "layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {ProductCard} from "src/component";
import {useDoc} from "src/hooks";

const Category = () => {
    const {data, getDocument} = useDoc("user");
    const router = useRouter();
    const routerName = router.query.name;
    
    useEffect(() => {
        getDocument(`${routerName}`);
    }, [routerName]);
    return (
        <MainLayout isSidebar={true}>
            {data &&
                Object.values(data).map((item, index) => (
                    <ProductCard
                        key={item.name}
                        src={item.photoUrlTitle}
                        title={item.name}
                        stars={item.stars}
                        price={item.price}
                        oldPrice={item.oldPrice}
                        quantity={item.quantity}
                        quantityComments={item.quantityComments}
                    />
                ))}
        </MainLayout>
    );
};
export default Category;

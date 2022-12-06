import {MainLayout} from "layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {ProductCard} from "src/component";
import {useDoc} from "src/hooks";
import {useQueryFilter} from "src/hooks/useQueryFilter";

const Category = () => {
    // const {data, getDocument} = useDoc("product");
    const router = useRouter();
    const routerCategory = router.query.category;

    const {queryFilter, queryError, data} = useQueryFilter("products");
    useEffect(() => {
        queryFilter({filterField: "category", value: routerCategory});
    }, [routerCategory]);
    return (
        <MainLayout isSidebar={true}>
            {data &&
                data.map((item: any) => (
                    <ProductCard
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
        </MainLayout>
    );
};
export default Category;

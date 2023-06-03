import { MainLayout } from "layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ProductCard } from "src/component";
import { ProductCardProp } from "src/component/ProductCard/interfaces";
import { useQueryFilter } from "src/hooks/useQueryFilter";

const Category = () => {
    const router = useRouter();
    const routerCategory = router.query.category;
    const searchText = router.query.searchText;
    const routName = router.query.name;

    const { queryFilter, searchFilter, queryError, data } =
        useQueryFilter("products");

    useEffect(() => {
        if (searchText) {
            searchFilter({
                filterField: "title",
                value: searchText,
            });
        }
        if (routName) {
            queryFilter({
                filterField: "category",
                value: routerCategory,
                queryOperator: "==",
                orderLimit: 50,
            });
        }
    }, [routerCategory, searchText]);

    return (
        <MainLayout isSidebar={true}>
            {data &&
                data.map((item: ProductCardProp) => {
                    if (item.category === routerCategory) {
                        return (
                            <ProductCard
                                name={item.name}
                                productOwner={item.productOwner}
                                category={item.category}
                                location={item.location}
                                data={item.data}
                                description={item.description}
                                email={item.email}
                                productId={item.productId}
                                href={item.href}
                                key={item.productId}
                                photoUrl={item.photoUrl}
                                title={item.title}
                                stars={item.stars}
                                price={item.price}
                                oldPrice={item.oldPrice}
                                quantity={item.quantity}
                                quantityComments={item.quantityComments}
                                tel={item.tel}
                            />
                        );
                    }
                })}
        </MainLayout>
    );
};
export default Category;

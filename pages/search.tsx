import {MainLayout} from "layout";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {ProductCard} from "src/component";
import {useQueryFilter} from "src/hooks";

const Search = () => {
    const router = useRouter();
    const searchText = router.query.searchText;

    const {queryFilter, queryError, data} = useQueryFilter("products");

    useEffect(() => {
        queryFilter({
            filterField: "name",
            queryOperator: ">=",
            value: searchText,
            orderLimit: 10,
        });
    }, [searchText]);
    return (
        <MainLayout isSidebar={true}>
            {data &&
                data.map((item: any) => {
                    return (
                        <ProductCard
                            data={item.data}
                            location={item.location}
                            description={item.description}
                            email={item.email}
                            category={item.category}
                            productId={item.productId}
                            href={item.href}
                            key={item.id}
                            src={item.photoUrl}
                            title={item.title}
                            stars={item.stars}
                            price={item.price}
                            oldPrice={item.oldPrice}
                            quantity={item.quantity}
                            quantityComments={item.quantityComments}
                        />
                    );
                })}
        </MainLayout>
    );
};

export default Search;

import { MainLayout } from "layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ProductCard } from "src/component";
import { useQueryFilter } from "src/hooks";

const Search = () => {
    const router = useRouter();
    const searchText = router.query.searchText;

    const { searchFilter, queryError, data } = useQueryFilter("products");

    useEffect(() => {
        searchFilter({
            filterField: "title",

            value: searchText,
        });
    }, [searchText]);

    console.log(data);

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
                            key={item.productId}
                            photoUrl={item.photoUrl}
                            name={item.name}
                            productOwner={item.productOwner}
                            tel={item.tel}
                            title={item.title}
                            stars={item.stars}
                            price={item.price}
                            oldPrice={item.oldPrice}
                            quantity={item.quantity}
                            quantityComments={item.quantityComments}
                        />
                    );
                })}
            {data?.length === 0 && <h3 style={{color:"#ADB8C8"}} >...nothing found</h3>}
        </MainLayout>
    );
};

export default Search;

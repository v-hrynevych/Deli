import type {NextPage} from "next";
import {useEffect} from "react";
import {ProductCard} from "src/component";
import {useQueryDocLimit} from "src/hooks";

import {MainLayout} from "../layout";

const Home: NextPage = () => {
    const {queryLimit, data} = useQueryDocLimit("products");

    useEffect(() => {
        queryLimit();
    }, []);

    return (
        <MainLayout isSidebar={true}>
            {data &&
                data.map((item: any) => {
                    return (
                        <ProductCard
                            productId={item.id}
                            key={item.id}
                            href={item.href}
                            title={item.name}
                            stars={3}
                            price={item.price}
                            quantity={item.quantity}
                            oldPrice={item.oldPrice}
                            src={item.photoUrl[0]}
                            quantityComments={item.quantityComments}
                        />
                    );
                })}
        </MainLayout>
    );
};

export default Home;

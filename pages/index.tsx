import {DocumentData} from "firebase/firestore";
import type {NextPage} from "next";
import {useEffect, useState} from "react";
import {ProductCard} from "src/component";
import {useQueryDocLimit, useWindowSize} from "src/hooks";

import {MainLayout} from "../layout";

const Home: NextPage = () => {
    const {scrollPosition, height} = useWindowSize();
    const {queryLimit, lastQueryRef, data, isEmpty} =
        useQueryDocLimit("products");
    const [homeItem, setHomeItem] = useState<Array<DocumentData>>([]);
    const pageEnd = height - scrollPosition <= 50;

    useEffect(() => {
        if (pageEnd && isEmpty === false) queryLimit(50, lastQueryRef);
    }, [pageEnd]);
    useEffect(() => {
        if (data) {
            setHomeItem((prevState) => [...prevState, ...data]);
        }
    }, [data]);

    return (
        <MainLayout isSidebar={true}>
            {homeItem &&
                homeItem.map((item) => {
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
                })}
        </MainLayout>
    );
};

export default Home;

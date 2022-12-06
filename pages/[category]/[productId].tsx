import {MainLayout} from "layout";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {GoodsInfo} from "src/component";
import {useDoc} from "src/hooks";

const Product = () => {
    const router = useRouter();
    const productId = router.query.productId;

    const {getDocument, data} = useDoc("products");

    useEffect(() => {
        getDocument(`id${productId}`);
    }, [productId]);

    return (
        <MainLayout isSidebar={false}>
            {data &&
                data.map((item: any) => {
                    return (
                        <GoodsInfo
                            price={item.price}
                            oldPrice={item.oldPrice}
                            key={item.id}
                            id={item.id}
                            quantity={item.quantity}
                            title={item.name}
                            star={item.star}
                            comment={item.comment}
                            imgArr={item.photoUrl}
                            description={item.description}
                            sellerName={item.userName}
                        />
                    );
                })}
        </MainLayout>
    );
};

export default Product;

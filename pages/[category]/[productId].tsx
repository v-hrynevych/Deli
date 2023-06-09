import {MainLayout} from "layout";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {GoodsInfo} from "src/component";
import {useDoc} from "src/hooks";

const Product = () => {
    const router = useRouter();
    const productId = router.query.productId;

    const {getDocument, dataDoc} = useDoc("products");

    useEffect(() => {
        getDocument(`id${productId}`);
    }, [productId]);

    return (
        <MainLayout isSidebar={false}>
            {dataDoc && (
                <GoodsInfo
                    productProps={{
                        stars: dataDoc.stars,
                        productId: dataDoc.productId,
                        category: dataDoc.category,
                        data: dataDoc.data,
                        description: dataDoc.description,
                        email: dataDoc.email,
                        href: dataDoc.href,
                        location: dataDoc.location,
                        name: dataDoc.name,
                        photoUrl: dataDoc.photoUrl,
                        price: dataDoc.price,
                        quantity: dataDoc.quantity,
                        tel: dataDoc.tel,
                        title: dataDoc.title,
                        productOwner: dataDoc.productOwner,
                    }}
                />
            )}
        </MainLayout>
    );
};

export default Product;

import {MainLayout} from "layout";
import {ProductCard} from "src/component";

const Category = () => {
    return (
        <MainLayout isSidebar={true}>
            <ProductCard />
        </MainLayout>
    );
};

export default Category;

import {MainLayout} from "layout";
import {CartItem} from "src/component/CartItem";

const Cart = () => {
    return (
        <MainLayout isSidebar={false}>
            <CartItem />
        </MainLayout>
    );
};

export default Cart;

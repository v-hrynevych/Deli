import { MainLayout } from "layout";
import { UserInfo, CartItem, CartContainer } from "src/component";

const Cart = () => {
    return (
        <MainLayout isSidebar={false}>
            <CartContainer>
                <UserInfo isOpenInfo />
                <CartItem />
            </CartContainer>
        </MainLayout>
    );
};

export default Cart;

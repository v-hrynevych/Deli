import { MainLayout } from "layout";
import { UserInfo, CartItem, CartContainer, Box } from "src/component";
import { GoogleM } from "src/component";

const Cart = () => {
    return (
        <MainLayout isSidebar={false}>
            <CartContainer>
                <Box width="800px">
                    <UserInfo isOpenInfo />
                    {/* <GoogleM /> */}
                </Box>
                <CartItem />
            </CartContainer>
        </MainLayout>
    );
};

export default Cart;

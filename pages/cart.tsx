import { MainLayout } from "layout";
import { useSelector } from "react-redux";
import { UserInfo, CartItem, CartContainer, Box } from "src/component";
import { GoogleM } from "src/component";
import { userValue } from "src/store/userSlice";

const Cart = () => {
    const { userEmail, userId } = useSelector(userValue);
    return (
        <MainLayout isSidebar={false}>
            <CartContainer>
                {userId && (
                    <Box width="800px">
                        <UserInfo isOpenInfo />
                        {/* <GoogleM /> */}
                    </Box>
                )}
                <Box width="1500px">
                    <CartItem />
                </Box>
            </CartContainer>
        </MainLayout>
    );
};

export default Cart;

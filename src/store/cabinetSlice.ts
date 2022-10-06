import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "src/store";

interface CabinetItem {
    name: string;
    icon: string;
    href: string;
}
interface CabinetList {
    [key: string]: CabinetItem;
}
interface CabinetState {
    cabinetList: CabinetList;
}

const initialState: CabinetState = {
    cabinetList: {
        MyOrders: {name: "My Orders", icon: "faTableList", href: "orders"},
        WithList: {
            name: "A wish list",
            icon: "faHeart",
            href: "personal-information",
        },
        Products: {name: "Products viewed", icon: "faEye", href: "wishlist"},
        Newsletters: {
            name: "Newsletters",
            icon: "faBell",
            href: "recently-viewed",
        },
        Wallet: {name: "My wallet", icon: "faWallet", href: "subscribes"},
        Bonus: {name: "My bonus account", icon: "faB", href: "wallet"},
        Premium: {name: "Premium subscription", icon: "faP", href: "premium"},
        reviews: {name: "My reviews", icon: "faMessage", href: "reviews"},
        correspondence: {
            name: "My correspondence",
            icon: "faEnvelope",
            href: "message",
        },
        Participation: {
            name: "Participation in promotions",
            icon: "faCalendarDays",
            href: "promotions",
        },
    },
};

export const cabinetSlice = createSlice({
    name: "cabinet",
    initialState,
    reducers: {},
});

// Action creators are generated for each case reducer function
export const cabinetValue = (state: RootState) => state.cabinet;
export default cabinetSlice.reducer;

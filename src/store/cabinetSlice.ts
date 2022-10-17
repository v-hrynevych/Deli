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
        MyOrders: {name: "My Products", icon: "faTableList", href: "products"},
        WithList: {
            name: "A wish list",
            icon: "faHeart",
            href: "wishlist",
        },
        Products: {
            name: "Products viewed",
            icon: "faEye",
            href: "recently-viewed",
        },
        AddProducts: {
            name: "Add Product",
            icon: "faPlus",
            href: "add-product",
        },
        Newsletters: {
            name: "Newsletters",
            icon: "faBell",
            href: "subscribes",
        },
        Wallet: {name: "Wallet", icon: "faWallet", href: "wallet"},
        Bonus: {name: "Bonus account", icon: "faB", href: "bonus"},
        Premium: {name: "Premium", icon: "faP", href: "premium"},
        reviews: {name: "My reviews", icon: "faMessage", href: "reviews"},
        correspondence: {
            name: "Correspondence",
            icon: "faEnvelope",
            href: "message",
        },
        Participation: {
            name: "Participation",
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

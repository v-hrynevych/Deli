import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";

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
        MyOrders: {
            name: "My Products",
            icon: "faTableList",
            href: "products",
        },
        WithList: {
            name: "A wish list",
            icon: "faHeart",
            href: "wishlist",
        },
        Products: {
            name: "Orders",
            icon: "faEye",
            href: "orders",
        },
        AddProducts: {
            name: "Add Product",
            icon: "faPlus",
            href: "add-product",
        },
        Newsletters: {
            name: "History",
            icon: "faBell",
            href: "history",
        },
        Bonus: { name: "Coupons", icon: "faB", href: "coupons" },
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

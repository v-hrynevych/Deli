import {createSlice} from "@reduxjs/toolkit";

import {RootState} from "src/store";
interface CartState {
    cartData: Array<Cart> | null;
}
interface Cart {
    title: string;
    id: number;
    price: number;
    photoUrl: string;
    oldPrice: string;
    quantity: number;
}
const initialState: CartState = {
    cartData: null,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, {payload}) => {
            state.cartData = payload;
        },
        incrementQuantityCartItem: (state, {payload}) => {
            if (state.cartData) {
                return {
                    ...state,
                    cartData: [
                        ...state.cartData.map((item) => {
                            if (item.id === payload) {
                                return {...item, quantity: item.quantity + 1};
                            }

                            return item;
                        }),
                    ],
                };
            }
        },
        decrementQuantityCartItem: (state, {payload}) => {
            if (state.cartData) {
                return {
                    ...state,
                    cartData: [
                        ...state.cartData.map((item) => {
                            if (item.id === payload) {
                                return {...item, quantity: item.quantity - 1};
                            }

                            return item;
                        }),
                    ],
                };
            }
        },
        removeItem: (state, {payload}) => {
            if (state.cartData === null) return {...state, wishList: null};
            if (state.cartData.length === 1) {
                return {...state, cartData: null};
            }
            if (state.cartData) {
                return {
                    ...state,
                    cartData: [
                        ...state.cartData.filter((item) => {
                            item.id !== payload;
                        }),
                    ],
                };
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setCart,
    removeItem,
    incrementQuantityCartItem,
    decrementQuantityCartItem,
} = cartSlice.actions;
export const cartValue = (state: RootState) => state.cart;
export default cartSlice.reducer;

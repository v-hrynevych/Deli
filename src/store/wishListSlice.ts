import {createSlice} from "@reduxjs/toolkit";
import {ProductCardProp} from "src/component/ProductCard/interfaces";
import {RootState} from "src/store";
interface WishListState {
    wishList: Array<ProductCardProp> | null;
}
const initialState: WishListState = {
    wishList: null,
};

export const wishListSlice = createSlice({
    name: "wishList",
    initialState,
    reducers: {
        setWishList: (state, {payload}) => {
            if (state.wishList === null) {
                return {
                    ...state,
                    wishList: payload,
                };
            }
            if (state.wishList) {
                state.wishList = payload;
            }
        },
        addToWishList: (state, {payload}) => {
            if (state.wishList) {
                return {
                    ...state,
                    wishList: [...state.wishList, payload],
                };
            }
            if (state.wishList === null) {
                return {
                    ...state,
                    wishList: [payload],
                };
            }
        },
        removeWishListItem: (state, {payload}) => {
            if (state.wishList === null) return {...state, wishList: null};
            if (state.wishList.length === 1) {
                return {...state, wishList: null};
            }
            return {
                ...state,
                wishList: [
                    ...state.wishList.filter(
                        (item) => item.productId !== payload,
                    ),
                ],
            };
        },
    },
});

// Action creators are generated for each case reducer function
export const {setWishList, addToWishList, removeWishListItem} =
    wishListSlice.actions;
export const wishListValue = (state: RootState) => state.wishList;
export default wishListSlice.reducer;

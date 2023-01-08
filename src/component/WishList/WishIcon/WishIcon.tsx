import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {ButtonIcon} from "src/component/ButtonIcon";
import {ProductCardProp} from "src/component/ProductCard/interfaces";
import {useDeleteDoc, useDoc} from "src/hooks";
import {userValue} from "src/store/userSlice";
import {
    addToWishList,
    removeWishListItem,
    wishListValue,
} from "src/store/wishListSlice";

interface WishIconProps {
    productProps: ProductCardProp;
}
export const WishIcon = ({productProps}: WishIconProps) => {
    const {productId} = productProps;
    const {userId} = useSelector(userValue);
    const {wishList} = useSelector(wishListValue);
    const {postDoc, docError} = useDoc("user");
    const {deleteDocument} = useDeleteDoc();
    const dispatch = useDispatch();

    const addWish = () => {
        postDoc({
            documentItem: productProps,
            path: `${userId}/wish`,
            subCollection: `productId${productId}`,
        })
            .then(() => {
                toast.success("Great!");
                dispatch(addToWishList(productProps));
            })
            .catch(() => toast.error(`${docError}`));
    };

    const removeWish = () => {
        deleteDocument(`user/${userId}/wish/productId${productId}`)
            .then(() => {
                toast.info("Remove!");
            })
            .catch(() => toast.error(`${docError}`));
        dispatch(removeWishListItem(productId));
    };

    return (
        <>
            {wishList?.some((prod) => prod.productId === productId) ? (
                <ButtonIcon
                    title="Remove from the wish list"
                    onClick={removeWish}
                    icon="faHeart"
                    color="#FBC75C"
                />
            ) : (
                <ButtonIcon
                    title="Add to wish list "
                    onClick={addWish}
                    icon="faHeart"
                    color="#dfdede"
                />
            )}
        </>
    );
};

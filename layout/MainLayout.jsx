import {Modal, HeadNavBar, SideMenu, CatalogItem} from "src/component";
import Head from "next/head";
import {useRouter} from "next/router";
import {useUser, useCollection} from "src/hooks";

import {useDispatch} from "react-redux";
import {setWishList, wishListValue} from "src/store/wishListSlice";
import {setCart, cartValue} from "src/store/cartSlice";

import styles from "./MainLayout.module.scss";
import {useSelector} from "react-redux";
import {catalogValue} from "src/store/catalogSlice";
import {useState, useEffect, useMemo} from "react";
import {userValue} from "src/store/userSlice";
import {ToastContainer} from "react-toastify";

export const MainLayout = ({children, isSidebar}) => {
    const user = useUser();
    const {userId} = useSelector(userValue);
    const {
        collectionData: cartCollection,
        isSuccess: isSuccessCart,
        getData: getCartData,
    } = useCollection();
    const {
        collectionData: wishCollection,
        isSuccess: isSuccessWishList,
        getData: getWishData,
    } = useCollection();

    const {catalog} = useSelector(catalogValue);
    const {cartData} = useSelector(cartValue);
    const {wishList} = useSelector(wishListValue);
    const [isCatalog, setIsCatalog] = useState(false);
    const [isSideMenu, setIsSideMenu] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    if (router.asPath === "/") {
        router.query.name = "Ecom";
    }
    useEffect(() => {
        if (userId && cartData === null) {
            getCartData(`user/${userId}/cart`);
        }
        if (userId && wishList === null) {
            getWishData(`user/${userId}/wish`);
        }
    }, [userId]);
    useEffect(() => {
        if (cartData === null && cartCollection) {
            dispatch(setCart(cartCollection));
        }
    }, [isSuccessCart]);
    useEffect(() => {
        if (wishList === null && wishCollection)
            dispatch(setWishList(wishCollection));
    }, [isSuccessWishList]);

    return (
        <>
            <Head>
                <title>
                    {router.isReady && router.query.name
                        ? router.query.name
                        : "Loading"}
                </title>
                <meta name="" content="" />
            </Head>
            <HeadNavBar
                isCatalog={isCatalog}
                isSideMenu={isSideMenu}
                setIsCatalog={setIsCatalog}
                setIsSideMenu={setIsSideMenu}
            />
            <div className={styles.container}>
                {isSidebar && (
                    <div className={styles.sideBar}>
                        <CatalogItem variant="standard" itemData={catalog} />
                    </div>
                )}
                <div className={styles.content}>{children}</div>
            </div>
            {isSideMenu && (
                <Modal handleClick={() => setIsSideMenu(false)} variant="start">
                    <SideMenu setIsSideMenu={setIsSideMenu} />
                </Modal>
            )}
            {isCatalog && (
                <Modal variant="center" handleClick={() => setIsCatalog(false)}>
                    <CatalogItem variant="modal" itemData={catalog} />
                </Modal>
            )}
            <ToastContainer />
        </>
    );
};

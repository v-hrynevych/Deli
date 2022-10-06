import {HeadNavBar} from "src/component";
import {CatalogItem} from "src/component";

import Head from "next/head";
import {useRouter} from "next/router";
import {useUser} from "src/hooks";
import {useCollection} from "src/hooks";

import styles from "./MainLayout.module.scss";
import {useEffect} from "react";

export const MainLayout = ({children}) => {
    const user = useUser();
    const router = useRouter();
    const {data, isLoading} = useCollection("catalog");
    const titleRout = router.route.split("/").at(-1);
    const titleName = router.route === "/" ? "Ecom" : titleRout;

    const isHomePage =
        titleRout === "" ||
        titleRout === "side-menu" ||
        titleRout === "sign-in" ||
        titleRout === "sign-up" ||
        titleRout === "catalog";
    return (
        <>
            <Head>
                <title>{titleName}</title>
                <meta name="" content="" />
            </Head>
            <HeadNavBar />

            {isHomePage && (
                <div className={styles.container}>
                    <div className={styles.sideBar}>
                        <CatalogItem
                            variant="standard"
                            isLoading={isLoading}
                            itemData={data}
                        />
                    </div>
                    <div className={styles.content}></div>
                </div>
            )}
            {children}
        </>
    );
};

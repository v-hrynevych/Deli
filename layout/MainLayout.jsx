import {HeadNavBar} from "src/component";
import {CatalogItem} from "src/component";

import Head from "next/head";
import {useRouter} from "next/router";
import {useUser} from "src/hooks";
import {useCollection} from "src/hooks";

import styles from "./MainLayout.module.scss";

export const MainLayout = ({children}) => {
    const user = useUser();
    const router = useRouter();
    const {data, isLoading} = useCollection("catalog");
    const titleRout = router.route.split("/").at(1);
    const titleName = titleRout === "" ? "Ecom" : titleRout.toUpperCase();
    const isRenderPage = [
        "",
        "side-menu",
        "sign-in",
        "sign-up",
        "catalog",
    ].includes(titleRout);
    return (
        <>
            <Head>
                <title>{titleName}</title>
                <meta name="" content="" />
            </Head>
            <HeadNavBar />

            {isRenderPage && (
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

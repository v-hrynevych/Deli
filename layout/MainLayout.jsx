import {HeadNavBar} from "src/component";
import {CatalogItem} from "src/component";

import Head from "next/head";
import {useRouter} from "next/router";
import {useUser} from "src/hooks";

import styles from "./MainLayout.module.scss";
import {useSelector} from "react-redux";
import {catalogValue} from "src/store/catalogSlice";

export const MainLayout = ({children,isSidebar}) => {
    const user = useUser();
    const {catalog} = useSelector(catalogValue);

    const router = useRouter();
    const titleRout = router.route.split("/").at(1);
    const titleName = titleRout === "" ? "Ecom" : titleRout.toUpperCase();
    return (
        <>
            <Head>
                <title>{titleName}</title>
                <meta name="" content="" />
            </Head>
            <HeadNavBar />
            <div className={styles.container}>
                {isSidebar && (
                    <div className={styles.sideBar}>
                        <CatalogItem variant="standard" itemData={catalog} />
                    </div>
                )}
                <div className={styles.content}>{children}</div>
            </div>
        </>
    )
};

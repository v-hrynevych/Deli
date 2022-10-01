import {HeadNavBar} from "src/component";
import Head from "next/head";
import {useRouter} from "next/router";
export const MainLayout = ({children}) => {
    const router = useRouter();
    const titleRout = router.route.split("/").at(-1);
    const titleName = router.route === "/" ? "Ecom" : titleRout;
    return (
        <>
            <Head>
                <title>{titleName}</title>
                <meta name="" content="" />
            </Head>
            <HeadNavBar />
            {children}
        </>
    );
};

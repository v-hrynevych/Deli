import type {NextPage} from "next";
import Head from "next/head";
import { HeadNavBar } from "../src/component";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Ecom</title>
                <meta
                    name=""
                    content=""
                />
            </Head>
            <HeadNavBar/>
        </div>
    );
};

export default Home;

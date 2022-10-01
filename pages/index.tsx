import type {NextPage} from "next";
import {useUser} from "src/hooks";


import {MainLayout} from "../layout";

const Home: NextPage = () => {
    const user = useUser();
    return <MainLayout>

    </MainLayout>;
};

export default Home;


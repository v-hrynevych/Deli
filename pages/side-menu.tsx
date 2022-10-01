import {MainLayout} from "layout";
import {useRouter} from "next/router";
import {Modal, SideMenu} from "src/component";

const SideMenuPage = () => {
    const router = useRouter();
    const backHome = () => {
        router.push("/");
    };
    return (
        <MainLayout>
            <Modal handleClick={backHome} variant="start">
                <SideMenu />
            </Modal>
        </MainLayout>
    );
};
export default SideMenuPage;

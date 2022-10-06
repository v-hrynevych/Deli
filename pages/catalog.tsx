import {MainLayout} from "layout";
import {CatalogItem, Modal} from "src/component";
import {useRouter} from "next/router";
import {useCollection} from "src/hooks";

const Catalog = () => {
    const router = useRouter();
    const {data, isLoading} = useCollection("catalog");
    const backHome = () => {
        router.replace("/");
    };
    return (
        <MainLayout>
            <Modal variant="top" handleClick={backHome}>
                <CatalogItem variant="modal" isLoading={isLoading} itemData={data} />
            </Modal>
        </MainLayout>
    );
};

export default Catalog;

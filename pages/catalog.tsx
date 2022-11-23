import {MainLayout} from "layout";
import {CatalogItem, Modal} from "src/component";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {catalogValue} from "src/store/catalogSlice";

const Catalog = () => {
    const router = useRouter();
    const {catalog} = useSelector(catalogValue);

    const back = () => {
        router.back();
    };
    return (
        <MainLayout isSidebar={true}>
            <Modal variant="center" handleClick={back}>
                <CatalogItem variant="modal" itemData={catalog} />
            </Modal>
        </MainLayout>
    );
};

export default Catalog;

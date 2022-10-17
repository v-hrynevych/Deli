import {MainLayout} from "layout";
import {UserInfo} from "src/component";
import {ButtonNav} from "src/component";
import styles from "styles/Cabinet.module.scss";

import {useSelector} from "react-redux";
import {cabinetValue} from "src/store/cabinetSlice";
import {userValue} from "src/store/userSlice";
import {useRouter} from "next/router";
import { AddProduct } from "src/component";
import { Products } from "src/component/Cabinet";

const Cabinet = () => {
    const {cabinetList} = useSelector(cabinetValue);
    const {userEmail, userName} = useSelector(userValue);
    const router = useRouter();
    const rout = router.asPath.split("/").at(2);
    

    const cabinetRouting = (rout?: string) => {
        switch (rout) {
            case "personal-information":
                return <UserInfo />;
            case "products":
            return <Products />;
            case "add-product":
                return <AddProduct />;
            default:
                break;
        }
    };

    return (
        <MainLayout>
            <div className={styles.container}>
                <nav className={styles.sideMenu}>
                    <div className={styles.user}>
                        <ButtonNav
                            href="personal-information"
                            icon={"faUser"}
                            text={userEmail}
                        />
                    </div>
                    <div className={styles.navItem}>
                        {Object.values(cabinetList).map(
                            ({name, icon, href}) => {
                                return (
                                    <ButtonNav
                                        key={name}
                                        icon={icon}
                                        text={name}
                                        href={href}
                                    />
                                );
                            },
                        )}
                    </div>
                </nav>
                <div className={styles.content}>{cabinetRouting(rout)}</div>
            </div>
        </MainLayout>
    );
};

export default Cabinet;

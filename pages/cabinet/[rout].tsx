import {MainLayout} from "layout";
import {Box, UserInfo, WishList} from "src/component";
import {ButtonNav} from "src/component";
import styles from "styles/Cabinet.module.scss";

import {useSelector} from "react-redux";
import {cabinetValue} from "src/store/cabinetSlice";
import {userValue} from "src/store/userSlice";
import {useRouter} from "next/router";
import {AddProduct} from "src/component";
import {Products} from "src/component/Cabinet";
import {SignIn} from "src/views/Authentication";
import {Orders} from "src/component/Cabinet/Orders";
import { Spinner } from "src/component/Spiner";


const Cabinet = () => {
    const {cabinetList} = useSelector(cabinetValue);
    const {userEmail, userId} = useSelector(userValue);
    const router = useRouter();
    const queryName = router.query.name;
    const queryRout = router.query.rout;

    const cabinetRouting = (rout: string | string[] | undefined) => {
        switch (rout) {
            case "personal-information":
                return <UserInfo />;
            case "products":
                return <Products />;
            case "add-product":
                return <AddProduct />;
            case "wishlist":
                return <WishList />;
            case "orders":
                return <Orders />;
            default:
                break;
        }
    };
    return (
        <MainLayout isSidebar={false}>
            {userId ? (
                <div className={styles.container}>
                    <nav className={styles.sideMenu}>
                        <div className={styles.user}>
                            <ButtonNav
                                isActive={
                                    queryName === "personal-information"
                                        ? "active"
                                        : ""
                                }
                                href={{
                                    pathname: "personal-information",
                                    query: {name: "personal-information"},
                                }}
                                icon={"faUser"}
                                text={userEmail}
                            />
                        </div>
                        <div className={styles.navItem}>
                            {Object.values(cabinetList).map(
                                ({name, icon, href}) => {
                                    return (
                                        <ButtonNav
                                            isActive={
                                                name === queryName
                                                    ? "active"
                                                    : ""
                                            }
                                            key={name}
                                            icon={icon}
                                            text={name}
                                            href={{
                                                pathname: href,
                                                query: {
                                                    name: name,
                                                },
                                            }}
                                        />
                                    );
                                },
                            )}
                        </div>
                    </nav>
                    <div className={styles.content}>
                        {cabinetRouting(queryRout)}
                    </div>
                </div>
            ) : (
                <div style={{display:'flex' ,justifyContent: 'center',width:'100%'}}>
                    <Spinner />
                </div>
            )}
        </MainLayout>
    );
};

export default Cabinet;

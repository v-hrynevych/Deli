import {MainLayout} from "layout";
import {ButtonNav} from "src/component";
import styles from "styles/Cabinet.module.scss";

import {useSelector} from "react-redux";
import {cabinetValue} from "src/store/cabinetSlice";
import {userValue} from "src/store/userSlice";
const Cabinet = () => {
    const {cabinetList} = useSelector(cabinetValue);
    const {userEmail, userName} = useSelector(userValue);

    return (
        <MainLayout>
            <div className={styles.container}>
                <nav className={styles.sideMenu}>
                    <div className={styles.user}>
                        <ButtonNav
                            href="cabinet/personal-information"
                            icon={"faUser"}
                            text={userEmail}
                        />
                    </div>
                    <div className={styles.navItem}>
                        {Object.values(cabinetList).map(
                            ({name, icon, href}) => {
                                return (
                                    <ButtonNav key={name}
                                        icon={icon}
                                        text={name}
                                        href={href}
                                    ></ButtonNav>
                                );
                            },
                        )}
                    </div>
                </nav>
                <div className={styles.content}></div>
            </div>
        </MainLayout>
    );
};

export default Cabinet;

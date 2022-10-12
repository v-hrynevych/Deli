import {useSelector} from "react-redux";
import {Details} from "src/component";
import {userValue} from "src/store/userSlice";

import styles from "./UserInfo.module.scss";

export const UserInfo = () => {
    const {personalData, userEmail, userName} = useSelector(userValue);

    return (
        <div className={styles.container}>
            <div>
                <h1>Personal data</h1>
            </div>
            <Details icon="faUser" title="Personal data">
                <ul className={styles.list}>
                    <li>
                        <label>Surname</label>
                        <p>{personalData?.surname}</p>
                    </li>
                    <li>
                        <label>Name</label>
                        <p>{userName}</p>
                    </li>
                    <li>
                        <label>Date of Birth</label>
                        <p>{personalData?.birthday}</p>
                    </li>
                    <li>
                        <label>Sex</label>
                        <p>{personalData?.sex}</p>
                    </li>
                    <li>
                        <label>Language</label>
                        <p>{personalData?.language}</p>
                    </li>
                </ul>
                <div></div>
            </Details>
            <Details title="Contacts" icon="faEnvelope">
                <ul className={styles.list}>
                    <li>
                        <label>Verified phone</label>
                        <p></p>
                    </li>
                    <li>
                        <label htmlFor="">Email</label>
                        <p>{userEmail}</p>
                    </li>
                </ul>
            </Details>
            <Details title="Delivery address" icon="faTruck">
                <ul className={styles.list}>
                    <li>
                        <label>Delivery address</label>
                        <p></p>
                    </li>
                </ul>
            </Details>
        </div>
    );
};

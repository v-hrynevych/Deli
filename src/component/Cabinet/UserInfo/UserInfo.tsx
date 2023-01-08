import {DocumentData} from "firebase/firestore";
import {useEffect, useState} from "react";
import {Button, Details} from "src/component";
import {useDoc, useUpdateDoc} from "src/hooks";

import {getAuth, updateProfile} from "firebase/auth";

import styles from "./UserInfo.module.scss";
import {userValue} from "src/store/userSlice";
import {useSelector} from "react-redux";

interface userData extends DocumentData {
    deliveryAddress: string;
    userName: string;
    surname: string;
    dateOfBirth: string;
    sex: string;
    language: string;
    email: string | null;
    phone: string;
}
export const UserInfo = () => {
    const {userEmail, userId} = useSelector(userValue);
    const {getDocument, dataDoc} = useDoc("user");
    const {updateDocument, updateError} = useUpdateDoc("user");
    const [isDelivery, setIsDelivery] = useState(false);
    const [isContact, setIsContact] = useState(false);
    const [isPersonalData, setIsPersonalData] = useState(false);

    const [userData, setUserData] = useState<userData>({
        deliveryAddress: "",
        userName: "",
        surname: "",
        dateOfBirth: "",
        sex: "",
        language: "",
        email: "",
        phone: "",
    });
    const auth = getAuth();
    const editPersonalData = () => {
        setIsPersonalData(!isPersonalData);
        if (isPersonalData === true) {
            updateDocument({
                nameDoc: `${userId}`,
                updateObj: {
                    surname: userData.surname,
                    userName: userData.userName,
                    dateOfBirth: userData.dateOfBirth,
                    sex: userData.sex,
                    language: userData.language,
                },
            });
        } else if (auth.currentUser) {
            updateProfile(auth.currentUser, {
                displayName: userData.userName,
            });
        }
    };
    const editContact = () => {
        setIsContact(!isContact);
        if (isContact === true) {
            updateDocument({
                nameDoc: `${userId}`,
                updateObj: {
                    phone: userData.phone,
                },
            });
        }
    };

    const editDelivery = () => {
        setIsDelivery(!isDelivery);
        if (isDelivery === true) {
            updateDocument({
                nameDoc: `${userId}`,
                updateObj: {
                    deliveryAddress: userData.deliveryAddress,
                },
            });
        }
    };
    useEffect(() => {
        getDocument(`${userId}`);
    }, [userId]);
    useEffect(() => {
        setUserData({
            deliveryAddress: dataDoc?.deliveryAddress,
            email: dataDoc?.email,
            userName: dataDoc?.userName,
            surname: dataDoc?.surname,
            dateOfBirth: dataDoc?.dateOfBirth,
            sex: dataDoc?.sex,
            language: dataDoc?.language,
            phone: dataDoc?.phone,
        });
    }, [dataDoc]);

    return (
        <div className={styles.container}>
            <div>
                <h1>Personal data</h1>
            </div>

            <Details icon="faUser" title="Personal data">
                <ul className={styles.list}>
                    {isPersonalData ? (
                        <>
                            <li>
                                <label>Surname</label>
                                <input
                                    type="text"
                                    value={userData.surname}
                                    onChange={(e) =>
                                        setUserData({
                                            ...userData,
                                            surname: e.target.value,
                                        })
                                    }
                                />
                            </li>
                            <li>
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={userData.userName}
                                    onChange={(e) =>
                                        setUserData({
                                            ...userData,
                                            userName: e.target.value,
                                        })
                                    }
                                />
                            </li>
                            <li>
                                <label>Date of Birth</label>
                                <input
                                    type={"date"}
                                    value={userData.dateOfBirth}
                                    onChange={(e) =>
                                        setUserData({
                                            ...userData,
                                            dateOfBirth: e.target.value,
                                        })
                                    }
                                />
                            </li>
                            <li>
                                <label>Sex</label>
                                <input
                                    type="text"
                                    value={userData.sex}
                                    onChange={(e) =>
                                        setUserData({
                                            ...userData,
                                            sex: e.target.value,
                                        })
                                    }
                                />
                            </li>
                            <li>
                                <label>Language</label>
                                <input
                                    type="text"
                                    value={userData.language}
                                    onChange={(e) =>
                                        setUserData({
                                            ...userData,
                                            language: e.target.value,
                                        })
                                    }
                                />
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <label>Surname</label>
                                <p>{userData.surname}</p>
                            </li>
                            <li>
                                <label>Name</label>
                                <p>{userData.userName}</p>
                            </li>
                            <li>
                                <label>Date of Birth</label>
                                <p>{userData.dateOfBirth}</p>
                            </li>
                            <li>
                                <label>Sex</label>
                                <p>{userData.sex}</p>
                            </li>
                            <li>
                                <label>Language</label>
                                <p>{userData.language}</p>
                            </li>
                        </>
                    )}
                </ul>
                <div className={styles.button}>
                    <Button
                        onClick={() => editPersonalData()}
                        variant="primary"
                    >
                        Edit
                    </Button>
                </div>
            </Details>
            <Details title="Contacts" icon="faEnvelope">
                <ul className={styles.list}>
                    <li>
                        <label>Verified phone</label>
                        {isContact ? (
                            <input
                                type="text"
                                value={userData.phone}
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        phone: e.target.value,
                                    })
                                }
                            />
                        ) : (
                            <p>{userData.phone}</p>
                        )}
                    </li>
                    <li>
                        <label htmlFor="">Email</label>
                        <p>{userData.email}</p>
                    </li>
                </ul>
                <div className={styles.button}>
                    <Button onClick={() => editContact()} variant="primary">
                        Edit
                    </Button>
                </div>
            </Details>
            <Details title="Delivery address" icon="faTruck">
                <ul className={styles.list}>
                    <li>
                        <label>Delivery address:</label>
                        {isDelivery ? (
                            <input
                                type="text"
                                value={userData.deliveryAddress}
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        deliveryAddress: e.target.value,
                                    })
                                }
                            />
                        ) : (
                            <p>{userData.deliveryAddress}</p>
                        )}
                    </li>
                </ul>
                <div className={styles.button}>
                    <Button onClick={() => editDelivery()} variant="primary">
                        Edit
                    </Button>
                </div>
            </Details>
        </div>
    );
};

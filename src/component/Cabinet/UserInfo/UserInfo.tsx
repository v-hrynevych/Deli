import {DocumentData} from "firebase/firestore";
import {useEffect, useState} from "react";
import {Button, Details} from "src/component";
import {useDoc, useUpdateDoc} from "src/hooks";

import styles from "./UserInfo.module.scss";
interface UserInfoProps {
    userId: string | null;
}
interface userData extends DocumentData {
    deliveryAddress: string;
    email: string;
    userName: string;
    surname: string;
    dateOfBirth: string;
    sex: string;
    language: string;
    userEmail: string;
    phone: string;
}
export const UserInfo = ({userId}: UserInfoProps) => {
    const {getDocument, data} = useDoc("user");
    const {updateDocument, isLoading, updateError} = useUpdateDoc("user");

    const [isDelivery, setIsDelivery] = useState(false);
    const [isContact, setIsContact] = useState(false);
    const [isPersonalData, setIsPersonalData] = useState(false);

    const [userData, setUserData] = useState<userData>({
        deliveryAddress: "",
        email: "",
        userName: "",
        surname: "",
        dateOfBirth: "",
        sex: "",
        language: "",
        userEmail: "",
        phone: "",
    });
    console.log(updateError, userData);
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
            deliveryAddress: data?.deliveryAddress,
            email: data?.email,
            userName: data?.userName,
            surname: data?.surname,
            dateOfBirth: data?.dateOfBirth,
            sex: data?.sex,
            language: data?.language,
            userEmail: data?.userEmail,
            phone: data?.phone,
        });
    }, [data]);

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

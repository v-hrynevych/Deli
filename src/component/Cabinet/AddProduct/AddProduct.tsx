import { FormEventHandler, useState } from "react";
import { Button, InputField } from "src/component";
import {
    faCity,
    faEnvelope,
    faMoneyBill,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./AddProduct.module.scss";
import { useStorage } from "src/hooks/useStorage";
import { useSelector } from "react-redux";
import { userValue } from "src/store/userSlice";
import { useDoc } from "src/hooks";
import { Timestamp } from "firebase/firestore";

export const AddProduct = () => {
    const { userId } = useSelector(userValue);
    const { postFiles } = useStorage();
    const { postDoc } = useDoc("user", `${userId}`);
    const [title, setTitle] = useState("");
    const [NamePhoto, setNamePhoto] = useState(["", "", "", "", "", ""]);
    const [textArea, setTextArea] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [price, setPrice] = useState("");
    const [photoFiles, setPhotoFiles] = useState<any>([
        null,
        null,
        null,
        null,
        null,
        null,
    ]);
    const productObj = {
        [title]: {
            data: Timestamp.fromDate(new Date()),
            name: title,
            description: textArea,
            location: city,
            email: email,
            tel: tel,
            price: price,
        },
    };
    const onChangePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, files } = event.target;
        const numId = parseInt(id);
        const filePhoto = files![0];

        setNamePhoto((prevState) => [
            ...prevState.fill(filePhoto?.name, numId, numId + 1),
        ]);
        setPhotoFiles((prevState: File[]) => [
            ...prevState.fill(filePhoto, numId, numId + 1),
        ]);
    };

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (userId) {
            // postFiles(photoFiles, userId, `/products/${title}`);
            postDoc({
                products: productObj,
            });
        }
    };

    return (
        <form onSubmit={onSubmit} className={styles.form}>
            <h2>Add product</h2>
            <div className={styles.title}>
                <InputField
                    placeholder="anything"
                    value={title}
                    type={"text"}
                    onChange={(e) => setTitle(e.target.value)}
                    label="Ad Title"
                />
            </div>
            <div className={styles.photo}>
                <h2>Pictures</h2>
                <div className={styles.item}>
                    {NamePhoto.map((item, index) => {
                        return (
                            <InputField
                                key={index}
                                value={item}
                                id={index.toString()}
                                onChange={(e) => onChangePhoto(e)}
                                type="file"
                                hidden
                                accept="image/heic, image/png, image/jpeg, image/webp"
                            />
                        );
                    })}
                </div>
            </div>
            <div className={styles.description}>
                <h3>Description</h3>
                <textarea
                    onChange={(e) => setTextArea(e.target.value)}
                    name="description"
                    value={textArea}
                    cols={100}
                    rows={11}
                ></textarea>
            </div>
            <div className={styles.infoItem}>
                <div className={styles.info}>
                    <div className={styles.city}>
                        <h3>Location</h3>
                        <InputField
                            type={"text"}
                            icon={faCity}
                            value={city}
                            label="City"
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div className={styles.contact}>
                        <h3>Contact information</h3>
                        <InputField
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            value={email}
                            label="E-mail address"
                            icon={faEnvelope}
                        />
                        <InputField
                            onChange={(e) => setTel(e.target.value)}
                            type="text"
                            value={tel}
                            label="Phone number"
                            icon={faPhone}
                        />
                    </div>
                </div>
                <div className={styles.price}>
                    <h3>Price</h3>
                    <InputField
                        onChange={(e) => setPrice(e.target.value)}
                        type="text"
                        value={price}
                        label="Price"
                        icon={faMoneyBill}
                    />
                </div>
            </div>

            <div>
                <Button type="submit">Add product</Button>
            </div>
        </form>
    );
};

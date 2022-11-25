import {FormEventHandler, useEffect, useRef, useState} from "react";
import {Button, InputField} from "src/component";
import {
    faCity,
    faEnvelope,
    faMoneyBill,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./AddProduct.module.scss";
import {useStorage} from "src/hooks/useStorage";
import {useSelector} from "react-redux";
import {userValue} from "src/store/userSlice";
import {useDoc} from "src/hooks";
import {Timestamp} from "firebase/firestore";
import {catalogValue} from "src/store/catalogSlice";

export const AddProduct = () => {
    const {catalog} = useSelector(catalogValue);
    const {userId} = useSelector(userValue);
    const {postFiles, fileUrlArr} = useStorage();
    const {postDoc, error} = useDoc("user");

    const [title, setTitle] = useState("");
    const [NamePhoto, setNamePhoto] = useState(["", "", "", "", "", ""]);
    const [textArea, setTextArea] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [photoFiles, setPhotoFiles] = useState<Array<File | null>>([]);

    const formRef = useRef<HTMLFormElement>(null);

    const productObj = {
        [title]: {
            data: Timestamp.fromDate(new Date()),
            name: title,
            description: textArea,
            location: city,
            email: email,
            tel: tel,
            price: price,
            photoUrl: fileUrlArr,
            photoUrlTitle: fileUrlArr[0],
            userId: userId,
            category: category,
        },
    };

    const onChangePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {id, files} = event.target;
        const photoId = parseInt(id);
        const PhotoFile = files![0];
        setNamePhoto((prevState) => [
            ...prevState.fill(PhotoFile?.name, photoId, photoId + 1),
        ]);
        setPhotoFiles((prevState) => [...prevState, PhotoFile]);
    };
    const handleCategoryChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setCategory(event.target.value);
    };
    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        postFiles({
            listFiles: photoFiles,
            user: userId,
        })
            .then(() => {
                postDoc({
                    products: productObj,
                    nameDoc: category,
                });
            })
            .then(() => {
                alert("Great");
                setTitle("");
                setCity("");
                setEmail("");
                setPrice("");
                setNamePhoto(["", "", "", "", "", ""]);
                setPhotoFiles([]);
                setTextArea("");
                setTel("");
                setCategory("");
                formRef.current?.reset();
            });
    };

    return (
        <form onSubmit={onSubmit} ref={formRef} className={styles.form}>
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
            <div className={styles.category}>
                <h3>Category</h3>
                <div className={styles.select}>
                    <select
                        name="category-list"
                        id="category-list"
                        onChange={handleCategoryChange}
                    >
                        {catalog?.map((item, index) => {
                            return (
                                <option key={index} value={item.name}>
                                    {item.name}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
            <div className={styles.photo}>
                <h3>Pictures</h3>
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
                            value={email!}
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
                <Button disabled={false} type="submit">
                    Add product
                </Button>
            </div>
        </form>
    );
};

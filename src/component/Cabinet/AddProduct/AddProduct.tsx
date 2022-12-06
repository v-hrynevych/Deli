import {FormEventHandler, useEffect, useRef, useState} from "react";
import {Button, InputField, ErrorText} from "src/component";
import {
    faArrowUp19,
    faCity,
    faEnvelope,
    faMoneyBill,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./AddProduct.module.scss";
import {useStorage} from "src/hooks/useStorage";
import {useSelector} from "react-redux";
import {userValue} from "src/store/userSlice";
import {useDoc, useId} from "src/hooks";
import {Timestamp} from "firebase/firestore";
import {catalogValue} from "src/store/catalogSlice";

export const AddProduct = () => {
    const {catalog} = useSelector(catalogValue);
    const {userId, userName} = useSelector(userValue);
    const {postFiles, fileError, fileUrlArr} = useStorage();
    const {postDoc, DocError} = useDoc("products");
    const {getId, id, updateId} = useId();

    const [title, setTitle] = useState("");
    const [NamePhoto, setNamePhoto] = useState(["", "", "", "", "", ""]);
    const [textArea, setTextArea] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("alcohol");
    const [photoFiles, setPhotoFiles] = useState<Array<File | null>>([]);
    const [quantity, setQuantity] = useState("0");
    const [href, setHref] = useState("");

    const formRef = useRef<HTMLFormElement>(null);

    const isFillForm = [title, category, price, city, email, tel].some(
        (value) => value === "",
    );
    const productObj = {
        id: id,
        data: Timestamp.fromDate(new Date()),
        name: title,
        description: textArea,
        location: city,
        email: email,
        tel: tel,
        price: price,
        photoUrl: fileUrlArr,
        userId: userId,
        category: category,
        quantity: quantity,
        href: href,
        userName: userName,
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
                    documentItem: productObj,
                    nameDoc: `${"id" + id}`,
                });
                updateId("productId");
            })
            .then(() => {
                setTitle("");
                setCity("");
                setEmail("");
                setPrice("");
                setNamePhoto(["", "", "", "", "", ""]);
                setPhotoFiles([]);
                setTextArea("");
                setTel("");
                setCategory("");
                setQuantity("0");
                formRef.current?.reset();
            });
    };
    useEffect(() => {
        getId("productId");
    }, []);
    useEffect(() => {
        setHref(`/${category}/${id}`);
    }, [category]);

    return (
        <form onSubmit={onSubmit} ref={formRef} className={styles.form}>
            <h2>Add product</h2>
            <div className={styles.title}>
                <InputField
                    placeholder="anything"
                    value={title}
                    type={"text"}
                    onChange={(e) => setTitle(e.target.value)}
                    label="*Ad Title"
                />
            </div>
            <div className={styles.category}>
                <h3>*Category</h3>
                <div className={styles.select}>
                    <select
                        name="category-list"
                        id="category-list"
                        onChange={handleCategoryChange}
                    >
                        {catalog?.map((item, index) => {
                            return (
                                <option key={index} value={item.href}>
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
                        <h3>*Location</h3>
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
                            label="*E-mail address"
                            icon={faEnvelope}
                        />
                        <InputField
                            onChange={(e) => setTel(e.target.value)}
                            type="text"
                            value={tel}
                            label="*Phone number"
                            icon={faPhone}
                        />
                    </div>
                    <div className={styles.quantity}>
                        <h3>Quantity</h3>
                        <InputField
                            type={"text"}
                            icon={faArrowUp19}
                            value={quantity}
                            label="Quantity"
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.price}>
                    <h3>*Price</h3>
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
                <Button
                    disabled={isFillForm}
                    variant={!isFillForm ? "primary" : "ghost"}
                    type="submit"
                >
                    Add product
                </Button>
                <ErrorText text={`${DocError?.message}`} isError={DocError} />
                <ErrorText text={`${fileError?.message}`} isError={DocError} />
            </div>
        </form>
    );
};

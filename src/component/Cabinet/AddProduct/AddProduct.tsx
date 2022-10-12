import {FormEventHandler, useState} from "react";
import {Button, InputField} from "src/component";
import {faCity,faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons";

import styles from "./AddProduct.module.scss";

export const AddProduct = () => {
    const [title, setTitle] = useState("");
    const [NamePhoto, setNamePhoto] = useState(["", "", "", "", "", ""]);
    const [area, setArea] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    

    const onChangePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value, files} = event.target;
        const numId = parseInt(id);
        const filePhoto = files![0];

        setNamePhoto((prevState) => [
            ...prevState.fill(filePhoto.name, numId, numId + 1),
        ]);
    };

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
    };
    console.log(city);
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
                    onChange={(e) => setArea(e.target.value)}
                    name="description"
                    value={area}
                    cols={100}
                    rows={11}
                ></textarea>
            </div>
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
            <div>
                <Button type="submit">Add product</Button>
            </div>
        </form>
    );
};

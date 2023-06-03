import {
    ChangeEvent,
    FormEventHandler,
    useEffect,
    useRef,
    useState,
} from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, InputField, ErrorText, Modal } from "src/component";
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
import { useDoc, useId } from "src/hooks";
import { Timestamp } from "firebase/firestore";
import { catalogValue } from "src/store/catalogSlice";
import { Spinner } from "src/component/Spiner";

interface Product {
    productId: undefined | number;
    title: undefined | string;
    data: undefined | Timestamp;
    description: undefined | string;
    location: undefined | string;
    email: undefined | string;
    tel: undefined | string;
    price: undefined | number;
    photoUrl: string[];
    productOwner: undefined | string;
    category: undefined | string;
    href: undefined | string;
    userName: undefined | string;
}
const initialState = {
    productId: undefined,
    title: "",
    data: undefined,
    description: "",
    location: "",
    email: "",
    tel: "",
    price: 0,
    photoUrl: [],
    productOwner: undefined,
    category: undefined,
    href: undefined,
    userName: undefined,
};

export const AddProduct = () => {
    const { catalog } = useSelector(catalogValue);
    const { userId, userName } = useSelector(userValue);
    const { postFiles, fileError, fileUrlArr } = useStorage();
    const { postDoc, docError, isLoadingDoc, isSendDocumentSuccess } =
        useDoc("products");
    const { id, error, updateId, getId, createId } = useId("productId");

    const [productObj, setProductObj] = useState<Product>(initialState);

    const [NamePhoto, setNamePhoto] = useState(["", "", "", "", "", ""]);
    const [photoFiles, setPhotoFiles] = useState<Array<File | null>>([]);

    const onChangePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, files } = event.target;
        const photoId = parseInt(id);
        const PhotoFile = files![0];
        setNamePhoto((prevState) => [
            ...prevState.fill(PhotoFile?.name, photoId, photoId + 1),
        ]);
        setPhotoFiles((prevState) => [...prevState, PhotoFile]);
    };

    const handleCategoryChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setProductObj({ ...productObj, category: event.target.value });
    };
    console.log(productObj, id);

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        postFiles({
            listFiles: photoFiles,
            user: userId,
        })
            .then(() => {
                productObj.photoUrl = fileUrlArr;

                postDoc({
                    documentItem: productObj,
                    path: `${"id" + id}`,
                })
                    .then(() => {
                        updateId();
                        setProductObj({
                            ...productObj,
                            title: "",
                            description: "",
                            location: "",
                            email: "",
                            tel: "",
                            price: 0,
                        });
                        setNamePhoto(["", "", "", "", "", ""]);
                        setPhotoFiles([]);
                        toast.success("Great !", {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    })
                    .catch((error) => {
                        toast.error("Error!", {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                        console.log(error);
                    });
            })

            .catch((error) => {
                console.log(error);
                toast.error("Error!", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            });
    };
    const isValidForm =
        productObj.title !== undefined &&
        productObj.description !== undefined &&
        productObj.location !== undefined &&
        productObj.email !== undefined &&
        productObj.tel !== undefined &&
        productObj.price !== undefined;

    useEffect(() => {
        setProductObj({
            ...productObj,
            data: Timestamp.fromDate(new Date()),
            href: `/${productObj.category}/${id}`,
            productId: id,
            category: "mcdonny",
            productOwner: `${userId}`,
            userName: `${userName}`,
        });
    }, [id]);

    return (
        <>
            <form onSubmit={onSubmit} className={styles.form}>
                <h2>Add product</h2>
                <div className={styles.title}>
                    <InputField
                        placeholder="anything"
                        value={productObj.title}
                        type={"text"}
                        onChange={(e) =>
                            setProductObj({
                                ...productObj,
                                title: e.target.value,
                            })
                        }
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
                        onChange={(e) =>
                            setProductObj({
                                ...productObj,
                                description: e.target.value,
                            })
                        }
                        name="description"
                        value={productObj.description}
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
                                value={productObj.location}
                                label="City"
                                onChange={(e) =>
                                    setProductObj({
                                        ...productObj,
                                        location: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className={styles.contact}>
                            <h3>Contact information</h3>
                            <InputField
                                onChange={(e) =>
                                    setProductObj({
                                        ...productObj,
                                        email: e.target.value,
                                    })
                                }
                                type="text"
                                value={productObj.email}
                                label="*E-mail address"
                                icon={faEnvelope}
                            />
                            <InputField
                                onChange={(e) =>
                                    setProductObj({
                                        ...productObj,
                                        tel: e.target.value,
                                    })
                                }
                                type={"number"}
                                value={productObj.tel}
                                name="phoneNum"
                                label="*Phone number"
                                icon={faPhone}
                            />
                        </div>
                    </div>
                    <div className={styles.price}>
                        <h3>*Price</h3>
                        <InputField
                            onChange={(e) =>
                                setProductObj({
                                    ...productObj,
                                    price: parseInt(e.target.value),
                                })
                            }
                            type="number"
                            value={productObj.price}
                            name="price"
                            label="Price"
                            icon={faMoneyBill}
                        />
                    </div>
                </div>

                <div>
                    <Button
                        disabled={!isValidForm}
                        variant={isValidForm ? "primary" : "ghost"}
                        type="submit"
                    >
                        Add product
                    </Button>
                    <ErrorText
                        text={`${docError?.message}`}
                        isError={docError}
                    />
                    <ErrorText
                        text={`${fileError?.message}`}
                        isError={fileError}
                    />
                    {!isValidForm && (
                        <p style={{ color: "red" }}>Please Fill form</p>
                    )}
                </div>
            </form>
            {isLoadingDoc && (
                <Modal>
                    <Spinner />;
                </Modal>
            )}
        </>
    );
};

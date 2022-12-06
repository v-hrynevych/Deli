import {FirebaseError} from "firebase/app";
import styles from "./ErrorText.module.scss";

interface ErrorProps {
    text: string;
    isError: FirebaseError | null;
}
export const ErrorText = ({text, isError}: ErrorProps) => {
    return <>{isError && <p className={styles.error}>{text}</p>}</>;
};

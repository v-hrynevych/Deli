import styles from "./Spinner.module.scss";
export const Spinner = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.ldsRoller}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

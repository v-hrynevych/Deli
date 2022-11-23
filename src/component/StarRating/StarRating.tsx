import styles from "./StarRating.module.scss";
interface StarProps {
    star: number;
}
export const StarRating = ({star}: StarProps) => {
    const disable = <span className={styles.disableStar}>&#9734;</span>;
    const activStar = <span className={styles.activStar}>&#9733;</span>;
    const rating = Array(5).fill(activStar, 0, star).fill(disable, star);

    return (
        <div className={styles.starRrating}>
            {rating.map((item) => {
                return item;
            })}
        </div>
    );
};

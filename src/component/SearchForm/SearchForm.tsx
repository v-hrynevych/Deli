import styles from "./SearchForm.module.scss";
import {HTMLAttributes} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMicrophone} from "@fortawesome/free-solid-svg-icons";
interface SearchFormProps extends HTMLAttributes<HTMLFormElement> {}
export const SearchForm = ({}: SearchFormProps) => {
    return (
        <form className={styles.searchForm}>
            <div className={styles.searchForm__Item}>
                <input type="search" placeholder="I'm looking for..." />

                <button className={styles.searchForm__ItemMicro}>
                    <FontAwesomeIcon icon={faMicrophone} />
                </button>
            </div>

            <button
                type="submit"
                className={styles.searchForm__ItemSearchButton}
            >
                Search
            </button>
        </form>
    );
};

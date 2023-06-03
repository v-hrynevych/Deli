import styles from "./SearchForm.module.scss";
import { HTMLAttributes, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useQueryFilter } from "src/hooks";
import { ButtonIcon } from "../ButtonIcon";
import Link from "next/link";

interface SearchFormProps extends HTMLAttributes<HTMLFormElement> {}

export const SearchForm = ({}: SearchFormProps) => {
    const { queryFilter, queryError, data } = useQueryFilter("products");
    const [searchText, setSearchText] = useState("");
    const [searchCategory, setSearchCategory] = useState(false);
    const router = useRouter();
    const hendlerSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };
    useEffect(() => {
        queryFilter({
            filterField: "title",
            queryOperator: ">=",
            value: searchText,
        });
    }, []);

    return (
        <form className={styles.searchForm}>
            <div className={styles.searchForm__Item}>
                <input
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            router.push({
                                pathname: "/search",
                                query: { searchText: searchText },
                            });
                        }
                    }}
                    value={searchText}
                    onBlur={() =>
                        setTimeout(() => {
                            setSearchCategory(false);
                        }, 500)
                    }
                    onFocus={() => setSearchCategory(true)}
                    onChange={(e) => hendlerSearch(e)}
                    type="search"
                    placeholder="I'm looking for..."
                />

                <button className={styles.searchForm__ItemMicro}>
                    <FontAwesomeIcon icon={faMicrophone} />
                </button>
            </div>

            <button
                onClick={() =>
                    router.push({
                        pathname: "/search",
                        query: { searchText: searchText },
                    })
                }
                type="button"
                className={styles.searchForm__ItemSearchButton}
            >
                Search
            </button>
            {searchCategory && (
                <div className={styles.search}>
                    <p>Search in category</p>
                    {data &&
                        searchText &&
                        data.map((item: any) => {
                            return (
                                <div
                                    key={item.productId}
                                    className={styles.category}
                                >
                                    <ButtonIcon
                                        href={{
                                            pathname: `/${item.category}`,
                                            query: { searchText: searchText },
                                        }}
                                        icon="faSearch"
                                        color="#908f8f"
                                    />
                                    <Link
                                        href={{
                                            pathname: `/${item.category}`,
                                            query: { searchText: searchText,name: item.category },
                                        }}
                                    >
                                        <a href={item.category}>
                                            <p style={{ fontWeight: "bold" }}>
                                                {searchText}
                                            </p>
                                            <p>in category {item.category}</p>
                                        </a>
                                    </Link>
                                </div>
                            );
                        })}
                </div>
            )}
        </form>
    );
};

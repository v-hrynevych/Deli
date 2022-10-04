import { HTMLAttributes } from "react";
import classnames from "classnames";
import styles from "./CatalogItem.module.scss";
import Link from "next/link";
import { Box } from "../Box";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fas from "@fortawesome/free-solid-svg-icons";

interface ItemData {}
interface CatalogItemProp {
    itemData: ItemData | null;
    isLoading: boolean;
}

export const CatalogItem = ({ isLoading, itemData }: CatalogItemProp) => {
    if (isLoading) {
        return (
            <Box>
                <h3 style={{ color: "#fff" }}>Loading</h3>
            </Box>
        );
    }

    return (
        <div className={styles.container}>
            <ul className={styles.item}>
                {itemData !== null &&
                    Object.entries(itemData).map((el) => {
                        let linkName = el[0];
                        let array = el[1];
                        let icon = array[0]?.icon;
                        return (
                            <li key={linkName}>
                                <FontAwesomeIcon icon={fas[icon]} />
                                <Link href={"1"}>
                                    <a>{linkName}</a>
                                </Link>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

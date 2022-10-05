import {HTMLAttributes} from "react";
import classnames from "classnames";
import styles from "./CatalogItem.module.scss";
import Link from "next/link";
import {Box} from "../Box";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as fas from "@fortawesome/free-solid-svg-icons";

interface CatalogItemProp {
    itemData: [];
    isLoading: boolean;
}

export const CatalogItem = ({isLoading, itemData}: CatalogItemProp) => {
    if (isLoading) {
        return (
            <Box>
                <h3 style={{color: "#fff"}}>Loading</h3>
            </Box>
        );
    }

    return (
        <div className={styles.container}>
            <ul className={styles.item}>
                {itemData.map(({name, icon, href}) => {
                    return (
                        <li>
                            <FontAwesomeIcon icon={fas[icon]} />

                            <Link key={name} href={`${href}`}>
                                <a href={href}>{name}</a>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

import {HTMLAttributes} from "react";
import classnames from "classnames";
import styles from "./CatalogItem.module.scss";
import Link from "next/link";
import {Box} from "../Box";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as fas from "@fortawesome/free-solid-svg-icons";

interface CatalogItemProp {
    itemData: {}[];
    isLoading: boolean;
    variant: "standard" | "modal";
}
export const CatalogItem = ({
    isLoading,
    itemData,
    variant = "standard",
}: CatalogItemProp) => {
    if (isLoading) {
        return (
            <Box>
                <h3 style={{color: "#fff"}}>Loading</h3>
            </Box>
        );
    }
    const catalogItemClass = classnames(styles.container, styles[variant]);
    return (
        <div className={catalogItemClass}>
            <ul className={styles.item}>
                {itemData?.map(
                    ({name, id, icon = "faCircleExclamation", href}: any) => {
                        return (
                            <li key={id}>
                                <FontAwesomeIcon
                                    icon={fas[icon as keyof typeof fas]}
                                />
                                <Link href={`${href}`}>
                                    <a href={href}>{name}</a>
                                </Link>
                            </li>
                        );
                    },
                )}
            </ul>
        </div>
    );
};

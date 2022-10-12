import classnames from "classnames";
import styles from "./CatalogItem.module.scss";
import Link from "next/link";
import {Box} from "../Box";
import {ButtonIcon} from "../ButtonIcon";

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
                            <li className={styles.li} key={name}>
                                <ButtonIcon
                                    color="#ADB8C8"
                                    href={href}
                                    icon={icon}
                                />
                                <Link href={"href"}>
                                    <a href={"href"}>
                                        <p>{name}</p>
                                    </a>
                                </Link>
                            </li>
                        );
                    },
                )}
            </ul>
        </div>
    );
};

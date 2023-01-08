import classNames from "classnames";
import {FieldsetHTMLAttributes} from "react";
import styles from "./Fieldset.module.scss";

interface FieldsetProp extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
    title: string;
    number?: number;
    borderBottom?: boolean;
}
export const Fieldset = ({
    children,
    borderBottom,
    title,
    number,
    ...rest
}: FieldsetProp) => {
    const fieldsetClass = classNames(styles.fieldset, {
        [styles.borderBottom]: borderBottom === true,
    });
    return (
        <fieldset className={fieldsetClass} {...rest}>
            <legend>
                <span>{number}</span>
                {title}
            </legend>
            <div className={styles.content}>{children}</div>
        </fieldset>
    );
};

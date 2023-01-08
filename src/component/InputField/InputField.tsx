import {ChangeEventHandler, InputHTMLAttributes, forwardRef} from "react";
import classNames from "classnames";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFile} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

import styles from "./InputField.module.scss";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    isInvalid?: boolean;
    errorMessage?: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    label?: string;
    icon?: IconDefinition;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    (
        {
            isInvalid = false,
            errorMessage,
            value,
            onChange,
            label = "",
            accept,
            icon,
            hidden,
            name,
            type,
            id,
            ...rest
        },
        ref,
    ) => {
        const isErrorMessageVisible = errorMessage !== undefined && isInvalid;
        const isIconVisible = icon !== undefined;

        const inputFieldClasses = classNames(styles.input, {
            [styles.inputError]: isInvalid,
            [styles.inputWithIcon]: isIconVisible,
        });
        const inputFileClasses = classNames(styles.file, inputFieldClasses);
        const labelClasses = classNames(styles.inputWrapper, {
            [styles.radio]: type === "radio",
        });
        return (
            <>
                <label className={labelClasses}>
                    <span>{label}</span>
                    {type === "tel" && (
                        <PhoneInput
                            inputClass={inputFieldClasses}
                            buttonClass={styles.button}
                            specialLabel={label}
                            onChange={function () {
                                onChange(arguments[2]);
                            }}
                            value={value}
                        />
                    )}
                    {type === "file" ? (
                        <div className={inputFileClasses}>
                            <FontAwesomeIcon icon={faFile} />
                            <label htmlFor={id}>{value}</label>
                            <input
                                {...rest}
                                hidden={hidden}
                                accept={accept}
                                onChange={onChange}
                                id={id}
                                ref={ref}
                                type={type}
                                name={name}
                                autoComplete="on"
                            />
                        </div>
                    ) : typeof value === "number" ? (
                        <input
                            value={value}
                            onChange={onChange}
                            className={inputFieldClasses}
                            ref={ref}
                            type={type}
                            name={name}
                            autoComplete="on"
                            {...rest}
                        />
                    ) : (
                        <input
                            value={value}
                            onChange={onChange}
                            className={inputFieldClasses}
                            ref={ref}
                            type={type}
                            name={name}
                            autoComplete="on"
                            {...rest}
                        />
                    )}
                    {isIconVisible && (
                        <FontAwesomeIcon
                            width={20}
                            height={20}
                            icon={icon}
                            className={styles.inputIcon}
                        />
                    )}
                </label>
                {isErrorMessageVisible && (
                    <div className={styles.inputErrorMessage}>
                        {errorMessage}
                    </div>
                )}
            </>
        );
    },
);

InputField.displayName = "InputField";

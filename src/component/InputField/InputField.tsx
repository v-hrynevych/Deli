import { ChangeEventHandler, InputHTMLAttributes, forwardRef } from "react";
import classNames from "classnames";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

import styles from "./InputField.module.css";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
  errorMessage?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
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
      icon,
      type,
      ...rest
    },
    ref
  ) => {
    const isErrorMessageVisible = errorMessage !== undefined && isInvalid;
    const isIconVisible = icon !== undefined;

    const inputFieldClasses = classNames(styles.input, {
      [styles.inputError]: isInvalid,
      [styles.inputWithIcon]: isIconVisible,
    });

    return (
      <>
        <label className={styles.inputWrapper}>
          <span>{label}</span>
          {type === "tel" ? (
            <PhoneInput
              inputClass={inputFieldClasses}
              buttonClass={styles.button}
              specialLabel={label}
              onChange={function () {
                onChange(arguments[2]);
              }}
              value={value}
            />
          ) : (
            <input
              {...rest}
              value={value}
              onChange={onChange}
              className={inputFieldClasses}
              ref={ref}
              type={type}
              name={type}
              autoComplete='on'
            />
          )}
          {isIconVisible && (
            <FontAwesomeIcon icon={icon} className={styles.inputIcon} />
          )}
        </label>
        {isErrorMessageVisible && (
          <div className={styles.inputErrorMessage}>{errorMessage}</div>
        )}
      </>
    );
  }
);

InputField.displayName = "InputField";

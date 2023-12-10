import React from "react";
import styles from "./Form.module.scss";

const Form = ({
  fields,
  title,
  onSubmit,
  submitTitle,
  customSubmitButton,
  alternButtons
}) => {
  const handleDataCollection = (e) => {
    e.preventDefault();

    const data = fields.reduce((acc, field) => {
      const inputElement = document.getElementById(field.name);
      if (inputElement) {
        acc[field.name] = inputElement.value;
      }
      return acc;
    }, {});

    if (onSubmit) {
      onSubmit(data);
      fields.forEach((field) => {
        const inputElement = document.getElementById(field.name);
        if (inputElement) {
          inputElement.value = "";
        }
      });
    } else {
      console.log(data);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleDataCollection}>
        <h2 className={styles.title}>{title}</h2>

        {fields &&
          fields.map((field, index) => (
            <div className={styles.fieldContainer} key={index}>
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                className={styles.input}
                placeholder={field.placeholder}
              />
            </div>
          ))}
        <div className={styles.alternativeButtonsContainer}>
          {alternButtons && (
            <div className={styles.alternativeButtons}>
              {alternButtons}
            </div>
          )}
        </div>
        <div className={styles.buttonContainer}>
          {customSubmitButton && (
            <div className={styles.customButtonContainer}>
              {customSubmitButton}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;

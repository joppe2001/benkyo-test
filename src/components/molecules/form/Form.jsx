import React from 'react';
import styles from './Form.module.scss';

const Form = ({ fields, title, onSubmit }) => {

  const handleDataCollection = () => {
    const data = fields.reduce((acc, field) => {
      const inputElement = document.getElementById(field.name);
      if (inputElement) {
        acc[field.name] = inputElement.value;
      }
      return acc;
    }, {});

    if (onSubmit) {
      onSubmit(data);
      // empty fields after submitting
      fields.forEach((field) => {
        const inputElement = document.getElementById(field.name);
        if (inputElement) {
          inputElement.value = '';
        }
      });
    } else {
      console.log(data);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>
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
        <div className={styles.buttonContainer}>
          <button onClick={handleDataCollection} className={styles.submitButton}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;

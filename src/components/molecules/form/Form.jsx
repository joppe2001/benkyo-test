import React from 'react';
import styles from './Form.module.scss';

const Form = ({ fields, title }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
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
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;

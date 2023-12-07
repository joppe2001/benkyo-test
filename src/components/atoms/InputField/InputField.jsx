import React from 'react';
import styles from './InputField.module.scss'; // Import SCSS module

const InputField = ({ value, onChange, onKeyDown, placeholder }) => (
  <input
    type="text"
    className={styles.inputField}
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
    placeholder={placeholder}
  />
);

export default InputField;

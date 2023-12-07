import React from 'react';
import styles from './Button.module.scss'; // Import SCSS module

const Button = ({ onClick, children, className }) => (
  <button className={`${styles.button} ${className}`} onClick={onClick}>
    {children}
  </button>
);

export default Button;

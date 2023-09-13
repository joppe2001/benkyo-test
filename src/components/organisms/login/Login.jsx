import Form from '../../molecules/form/Form';
import styles from './Login.module.scss';
import background from '../../../images/binky-login.png';
import { login, isLoggedIn, signup, auth } from '../../../firebase/auth';
import { useState, useEffect } from 'react';
import { LoadingSpinner } from '../../atoms/Loading/Loading';

const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      setTimeout(() => setLoading(false), 1000);
    });

    return () => unsubscribe();
  }, []);

  const commonFields = [
    {
      label: 'email',
      name: 'email',
      type: 'text',
      placeholder: 'email'
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: 'Password'
    }
  ];

  const signUpFields = [
    ...commonFields,
    {
      label: 'Confirm Password',
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password'
    }
  ];

  const handleAuth = (data) => {
    if (isAuthenticated) {
      login(data.email, data.password);
    } else {
      signup(data.email, data.password);
    }
  };

  if (loading) {
    return (
      <div className="login">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={styles.login}>
      <div className={styles.header}>
        <h1>{isAuthenticated ? 'Log In' : 'Sign Up'}</h1>
      </div>
      <div className={styles.imageContainer}>
        <img src={background} alt="imag" className={styles.image} />
      </div>
      <Form
        fields={isAuthenticated ? commonFields : signUpFields}
        onSubmit={handleAuth}
      />
    </div>
  );
};

export default Login;

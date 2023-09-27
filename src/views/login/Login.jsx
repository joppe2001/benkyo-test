import Form from '../../components/molecules/form/Form';
import styles from './Login.module.scss';
import background from '../../images/binky-login.jpg';
import { login, signup, auth } from '../../firebase/auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '../../components/atoms/ErrorMessage/ErrorMessage';
import { createUserWithGoogle } from '../../firebase/db';

const Login = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      setTimeout(() => {}, 1000);
    });

    return () => unsubscribe();
  }, []);

  const commonFields = [
    {
      label: 'email',
      name: 'email',
      type: 'text',
      placeholder: 'Email'
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: 'Password'
    }
  ];

  const signUpFields = [
    {
      label: 'Display Name',
      name: 'displayName',
      type: 'text',
      placeholder: 'Display Name'
    },
    ...commonFields,
    {
      label: 'Confirm Password',
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password'
    }
  ];
  const handleAuth = async (data) => {
    if (showLogin) {
      login(data.email, data.password)
        .then(() => {
          setMessage('You have successfully logged in!');
          navigate('/');
          setTimeout(() => setMessage(''), 3000);
        })
        .catch(() => {
          setMessage('Incorrect login credentials. Please try again.');
        });
    } else {
      signup(data.email, data.password, data.displayName)
        .then(() => {
          if (data.email.length !== 0 && data.password.length !== 0) {
            setMessage('You have successfully signed up!');
            navigate('/');
            setTimeout(() => setMessage(''), 3000);
          }
          setMessage('we Need your email and password to sign you up');
          setTimeout(() => setMessage(''), 4000);
        })
        .catch(() => {
          if (data.email.length === 0 || data.password.length === 0) {
            setMessage('we need your email and password to sign you up');
          } else if (data.password !== data.confirmPassword) {
            setMessage('passwords do not match');
          } else if (data.password.length < 6 || data.email.length < 10) {
            setMessage(
              'password and email must be at least 6 - 10 characters long'
            );
          }
        });
    }
  };

  const handleGoogleSignup = async () => {
    await createUserWithGoogle('', '');

    const currentUser = auth.currentUser;
    if (currentUser) {
        setMessage('You have successfully signed up with Google!');
        navigate('/');
        setTimeout(() => setMessage(''), 3000);
    } else {
        setMessage('There was an issue signing up with Google.');
    }
};

const googleSvg = <svg xmlns="http://www.w3.org/2000/svg" width="97.53" height="32" viewBox="0 0 512 168"><path fill="#FF302F" d="m496.052 102.672l14.204 9.469c-4.61 6.79-15.636 18.44-34.699 18.44c-23.672 0-41.301-18.315-41.301-41.614c0-24.793 17.816-41.613 39.308-41.613c21.616 0 32.206 17.193 35.633 26.475l1.869 4.735l-55.692 23.049c4.236 8.348 10.84 12.584 20.183 12.584c9.345 0 15.823-4.61 20.495-11.525ZM452.384 87.66l37.19-15.45c-2.056-5.17-8.16-8.845-15.45-8.845c-9.281 0-22.176 8.223-21.74 24.295Z"/><path fill="#20B15A" d="M407.407 4.931h17.94v121.85h-17.94V4.93Z"/><path fill="#3686F7" d="M379.125 50.593h17.318V124.6c0 30.711-18.128 43.357-39.558 43.357c-20.183 0-32.33-13.58-36.878-24.606l15.885-6.604c2.865 6.79 9.78 14.827 20.993 14.827c13.767 0 22.24-8.535 22.24-24.482v-5.98h-.623c-4.112 4.983-11.961 9.468-21.928 9.468c-20.807 0-39.87-18.128-39.87-41.488c0-23.486 19.063-41.8 39.87-41.8c9.905 0 17.816 4.423 21.928 9.282h.623v-5.98Zm1.245 38.499c0-14.702-9.78-25.417-22.239-25.417c-12.584 0-23.174 10.715-23.174 25.417c0 14.514 10.59 25.042 23.174 25.042c12.46.063 22.24-10.528 22.24-25.042Z"/><path fill="#FF302F" d="M218.216 88.78c0 23.984-18.688 41.613-41.613 41.613c-22.924 0-41.613-17.691-41.613-41.613c0-24.108 18.689-41.675 41.613-41.675c22.925 0 41.613 17.567 41.613 41.675Zm-18.19 0c0-14.95-10.84-25.23-23.423-25.23c-12.583 0-23.423 10.28-23.423 25.23c0 14.826 10.84 25.23 23.423 25.23c12.584 0 23.423-10.404 23.423-25.23Z"/><path fill="#FFBA40" d="M309.105 88.967c0 23.984-18.689 41.613-41.613 41.613c-22.925 0-41.613-17.63-41.613-41.613c0-24.108 18.688-41.613 41.613-41.613c22.924 0 41.613 17.443 41.613 41.613Zm-18.253 0c0-14.95-10.839-25.23-23.423-25.23c-12.583 0-23.423 10.28-23.423 25.23c0 14.826 10.84 25.23 23.423 25.23c12.646 0 23.423-10.466 23.423-25.23Z"/><path fill="#3686F7" d="M66.59 112.328c-26.102 0-46.534-21.056-46.534-47.158c0-26.101 20.432-47.157 46.534-47.157c14.079 0 24.357 5.544 31.957 12.646l12.522-12.521C100.479 7.984 86.338.258 66.59.258C30.833.259.744 29.414.744 65.17c0 35.758 30.089 64.912 65.846 64.912c19.312 0 33.889-6.354 45.289-18.19c11.711-11.712 15.324-28.158 15.324-41.489c0-4.174-.498-8.472-1.059-11.649H66.59v17.318h42.423c-1.246 10.84-4.672 18.253-9.718 23.298c-6.105 6.168-15.76 12.958-32.705 12.958Z"/></svg>

const GoogleSignUpButton = () => (
  <button onClick={handleGoogleSignup}>{googleSvg}</button>
);
const GoogleSignInButton = () => (
  <button onClick={handleGoogleSignup}>{googleSvg}</button>
);

  return (
    <div className={styles.login}>
      <div className={styles.header}>
        <h1>{showLogin ? 'Log In ' : 'Sign Up '}</h1>
        <button onClick={() => setShowLogin(!showLogin)}>
          {showLogin ? '/ Signup' : '/ Login'}
        </button>
      </div>
      <div className={styles.imageContainer}>
        <img src={background} alt="imag" className={styles.image} />
      </div>
      <Form
      fields={showLogin ? commonFields : signUpFields}
      onSubmit={handleAuth}
      customSubmitButton={
        showLogin 
          ? <><input type="submit" value="Log In" className={styles.googleLogSign}/><GoogleSignInButton /></>
          : <><input type="submit" value="Sign Up" className={styles.googleLogSign}/><GoogleSignUpButton /></>
      }
    />
      {message && <ErrorMessage msg={message} />}{' '}
    </div>
  );
};

export default Login;

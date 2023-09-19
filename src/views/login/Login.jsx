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


const GoogleSignUpButton = () => (
  <button onClick={handleGoogleSignup}>google signUp</button>
);
const GoogleSignInButton = () => (
  <button onClick={handleGoogleSignup}>google signIn</button>
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
          ? <><input type="submit" value="Log In" /><GoogleSignInButton /></>
          : <><input type="submit" value="Sign Up" /><GoogleSignUpButton /></>
      }
    />
      {message && <ErrorMessage msg={message} />}{' '}
    </div>
  );
};

export default Login;

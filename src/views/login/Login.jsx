import Form from '../../components/molecules/form/Form';
import styles from './Login.module.scss';
import background from '../../images/binky-login.png';
import { login, signup, auth, logOut } from '../../firebase/auth';
import { useState, useEffect } from 'react';
import { LoadingSpinner } from '../../components/atoms/Loading/Loading';
import { useAuthState } from '../../store/authState';
import { getUser } from '../../firebase/db';

const Login = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const { user, isLoggedIn } = useAuthState();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
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
      console.log(data);
      login(data.email, data.password)
        .then(() => {
          setMessage('You have successfully logged in!');
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

  const handleLogout = () => {
    logOut();
  };
  
  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchUserInfo = async () => {
        try {
            const userInfo = await getUser(user.uid);
            if (userInfo && userInfo.displayName) {
                setUserName(userInfo.displayName);
            } else {
                console.error("User doesn't have a displayName or userInfo is undefined");
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    fetchUserInfo();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [isLoggedIn]);


  if (loading) {
    return (
      <div className="login">
        <LoadingSpinner />
      </div>
    );
  }


  return (
    <div className={styles.login}>
      <div className={styles.logOut}>
        {isLoggedIn ? (
          <>
            <span>Welcome, {userName}</span>
            <button onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <span>Please log in.</span>
        )}
      </div>
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
        submitTitle={showLogin ? 'Log In' : 'Sign Up'}
      />
      {message && <div className={styles.message}>{message}</div>}{' '}
    </div>
  );
};

export default Login;

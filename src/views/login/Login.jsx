import Form from "../../components/molecules/form/Form";
import styles from "./Login.module.scss";
import background from "../../images/binky-login.jpg";
import { login, signup, auth } from "../../firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../../components/atoms/ErrorMessage/ErrorMessage";
import { createUserWithGoogle, createUserWithGithub } from "../../firebase/db";

const Login = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      setTimeout(() => {}, 1000);
    });

    return () => unsubscribe();
  }, []);

  const commonFields = [
    {
      label: "email",
      name: "email",
      type: "text",
      placeholder: "Email"
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Password"
    }
  ];

  const signUpFields = [
    {
      label: "Display Name",
      name: "displayName",
      type: "text",
      placeholder: "Display Name"
    },
    ...commonFields,
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password"
    }
  ];
  const handleAuth = async (data) => {
    if (showLogin) {
      login(data.email, data.password)
        .then(() => {
          setMessage("You have successfully logged in!");
          navigate("/");
          setTimeout(() => setMessage(""), 3000);
        })
        .catch(() => {
          setMessage("Incorrect login credentials. Please try again.");
        });
    } else {
      signup(data.email, data.password, data.displayName)
        .then(() => {
          if (data.email.length !== 0 && data.password.length !== 0) {
            setMessage("You have successfully signed up!");
            navigate("/");
            setTimeout(() => setMessage(""), 3000);
          }
          setMessage("we Need your email and password to sign you up");
          setTimeout(() => setMessage(""), 4000);
        })
        .catch(() => {
          if (data.email.length === 0 || data.password.length === 0) {
            setMessage("we need your email and password to sign you up");
          } else if (data.password !== data.confirmPassword) {
            setMessage("passwords do not match");
          } else if (data.password.length < 6 || data.email.length < 10) {
            setMessage(
              "password and email must be at least 6 - 10 characters long"
            );
          }
        });
    }
  };

  const handleGoogleSignup = async () => {
    await createUserWithGoogle("", "");

    const currentUser = auth.currentUser;
    if (currentUser) {
      setMessage("You have successfully signed up with Google!");
      navigate("/");
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage("There was an issue signing up with Google.");
    }
  };

  const handleGithubSignup = async () => {
    await createUserWithGithub("", "");

    const currentUser = auth.currentUser;
    if (currentUser) {
      setMessage("You have successfully signed up with Github!");
      navigate("/");
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage("There was an issue signing up with Github.");
    }
  }

  const googleSvg = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='31.27'
      height='32'
      viewBox='0 0 256 262'
    >
      <path
        fill='#4285F4'
        d='M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027'
      />
      <path
        fill='#34A853'
        d='M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1'
      />
      <path
        fill='#FBBC05'
        d='M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782'
      />
      <path
        fill='#EB4335'
        d='M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251'
      />
    </svg>
  );

  const githubSvg = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='32'
      height='32'
      viewBox='0 0 24 24'
    >
      <path
        fill='currentColor'
        d='M12 0a12 12 0 1 0 0 24a12 12 0 0 0 0-24zm3.163 21.783h-.093a.513.513 0 0 1-.382-.14a.513.513 0 0 1-.14-.372v-1.406c.006-.467.01-.94.01-1.416a3.693 3.693 0 0 0-.151-1.028a1.832 1.832 0 0 0-.542-.875a8.014 8.014 0 0 0 2.038-.471a4.051 4.051 0 0 0 1.466-.964c.407-.427.71-.943.885-1.506a6.77 6.77 0 0 0 .3-2.13a4.138 4.138 0 0 0-.26-1.476a3.892 3.892 0 0 0-.795-1.284a2.81 2.81 0 0 0 .162-.582c.033-.2.05-.402.05-.604c0-.26-.03-.52-.09-.773a5.309 5.309 0 0 0-.221-.763a.293.293 0 0 0-.111-.02h-.11c-.23.002-.456.04-.674.111a5.34 5.34 0 0 0-.703.26a6.503 6.503 0 0 0-.661.343c-.215.127-.405.249-.573.362a9.578 9.578 0 0 0-5.143 0a13.507 13.507 0 0 0-.572-.362a6.022 6.022 0 0 0-.672-.342a4.516 4.516 0 0 0-.705-.261a2.203 2.203 0 0 0-.662-.111h-.11a.29.29 0 0 0-.11.02a5.844 5.844 0 0 0-.23.763c-.054.254-.08.513-.081.773c0 .202.017.404.051.604c.033.199.086.394.16.582A3.888 3.888 0 0 0 5.702 10a4.142 4.142 0 0 0-.263 1.476a6.871 6.871 0 0 0 .292 2.12c.181.563.483 1.08.884 1.516c.415.422.915.75 1.466.964c.653.25 1.337.41 2.033.476a1.828 1.828 0 0 0-.452.633a2.99 2.99 0 0 0-.2.744a2.754 2.754 0 0 1-1.175.27a1.788 1.788 0 0 1-1.065-.3a2.904 2.904 0 0 1-.752-.824a3.1 3.1 0 0 0-.292-.382a2.693 2.693 0 0 0-.372-.343a1.841 1.841 0 0 0-.432-.24a1.2 1.2 0 0 0-.481-.101c-.04.001-.08.005-.12.01a.649.649 0 0 0-.162.02a.408.408 0 0 0-.13.06a.116.116 0 0 0-.06.1a.33.33 0 0 0 .14.242c.093.074.17.131.232.171l.03.021c.133.103.261.214.382.333c.112.098.213.209.3.33c.09.119.168.246.231.381c.073.134.15.288.231.463c.188.474.522.875.954 1.145c.453.243.961.364 1.476.351c.174 0 .349-.01.522-.03c.172-.028.343-.057.515-.091v1.743a.5.5 0 0 1-.533.521h-.062a10.286 10.286 0 1 1 6.324 0v.005z'
      />
    </svg>
  );

  // atleast 3 buttons so make some templates, they need an onclick and an svg
  const alternativeButtons = [
    {
      onClick: handleGoogleSignup,
      svg: googleSvg
    },
    {
      onClick: handleGithubSignup,
      svg: githubSvg
    }
  ];

  return (
    <div className={styles.login}>
      <div className={styles.header}>
        <h1>{showLogin ? "Log In " : "Sign Up "}</h1>
        <button onClick={() => setShowLogin(!showLogin)}>
          {showLogin ? "/ Signup" : "/ Login"}
        </button>
      </div>
      <div className={styles.imageContainer}>
        <img src={background} alt='imag' className={styles.image} />
      </div>
      <Form
        fields={showLogin ? commonFields : signUpFields}
        onSubmit={handleAuth}
        customSubmitButton={
          <input type='submit' value={showLogin ? "Log In" : "Sign Up"} />
        }
        alternButtons={alternativeButtons.map((button, index) => (
          <button key={index} onClick={button.onClick}>
            {button.svg}
          </button>
        ))}
      />
      {message && <ErrorMessage msg={message} />}{" "}
    </div>
  );
};

export default Login;

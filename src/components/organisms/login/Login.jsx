import Form from '../../molecules/form/Form';
import styles from './Login.module.scss';
import background from '../../../images/binky-login.png';

const Login = () => {
  const fields = [
    {
      label: 'Username',
      name: 'username',
      type: 'text',
      placeholder: 'Username'
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: 'Password'
    }
  ];

  console.log(fields);
  return (
    <div className={styles.login}>
      <div className={styles.imageContainer}>
        <img src={background} alt="imag" className={styles.image} />
      </div>
      <Form fields={fields} />
    </div>
  );
};

export default Login;

import styles from './ErrorMessage.module.scss';

export const ErrorMessage = ({msg}) => {

    const message = msg;
    console.log(message);
    return (
        <div className={styles.message}>
            {message}
        </div>
    )
}

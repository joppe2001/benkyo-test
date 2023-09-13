import styles from './Menu.module.scss';

const mainNav = () => {
    return(
    <div className={styles.navContainer}>
        <div className={styles.leftSide}>
            <p>Home</p>
            <p>Communities</p>
            <p>Courses</p>
            <p>Contact Us</p>
        </div>
        <div className={styles.rightSide}></div>
    </div>)
}

export default mainNav;
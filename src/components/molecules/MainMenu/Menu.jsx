import styles from './Menu.module.scss';

const mainNav = () => {
    return(
    <div className={styles.navContainer}>
        <ul>
            <li>menuItemn</li>
            <li>menuItemn</li>
            <li>menuItemn</li>
        </ul>
        <div className={styles.rightSide}></div>
    </div>)
}

export default mainNav;
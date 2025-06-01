import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../App.module.scss";
import clsx from "clsx";

function Header() {

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen)

    return(
        <header className={styles.header}>
            <div className={styles.header__row}>
                <img className={clsx(styles.header__logo, menuOpen && styles.logoShifted)} src="/src/assets/EDos.png" alt="EDos" />
                <div className={clsx(styles.header__menu, styles.menu)}>
                    <div className={clsx(styles.iconMenu, { [styles.active]: menuOpen})} onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <nav className={clsx(styles.menu__body, {[styles.active]: menuOpen})}>
                        <ul className={styles.menu__list}>
                            <li><Link className={styles.menu__link} onClick={() => setMenuOpen(false)} to="/">Головна</Link></li>
                            <li><Link className={styles.menu__link} onClick={() => setMenuOpen(false)} to="/students">Студенти</Link></li>
                            <li><Link className={styles.menu__link} onClick={() => setMenuOpen(false)} to="/contacts">Контакти</Link></li>
                            <li><Link className={clsx(styles.menu__link, styles.menu__linkL)} onClick={() => setMenuOpen(false)} to="/contacts">Вхід</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header;
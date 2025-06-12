// src/components/Header.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../App.module.scss";
import clsx from "clsx";
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className={styles.header}>
      <div className={styles.header__row}>
        <img
          className={clsx(styles.header__logo, menuOpen && styles.logoShifted)}
          src="/src/assets/EDos.png"
          alt="EDos"
        />
        <div className={clsx(styles.header__menu, styles.menu)}>
          <div
            className={clsx(styles.iconMenu, { [styles.active]: menuOpen })}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <nav className={clsx(styles.menu__body, { [styles.active]: menuOpen })}>
            <ul className={styles.menu__list}>
            <li><Link className={styles.menu__link} onClick={() => setMenuOpen(false)} to="/">Головна</Link></li>
            <li><Link className={styles.menu__link} onClick={() => setMenuOpen(false)} to="/students">Студенти</Link></li>
            <li><Link className={styles.menu__link} onClick={() => setMenuOpen(false)} to="/contacts">Контакти</Link></li>
            {user ? (<>
                  <li className={styles.menu__user}>
                    <span>{user.username} ({user.role})</span>
                  </li>
                  <li>
                    <button className={clsx(styles.menu__link, styles.menu__linkL)} onClick={() => { logout(); setMenuOpen(false);}}>Вийти</button>
                  </li>
                </>
              ) : (
                <li><Link className={clsx(styles.menu__link, styles.menu__linkL)} onClick={() => setMenuOpen(false)}to="/auth">Вхід</Link></li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StudentsPage from './pages/StudentsPage';
import Contacts from './pages/Contacts';
import styles from './App.module.scss'

function App() {
  return (
    <>
      <Router>
        <header className={styles.header}>
          <nav className={styles.header__nav}>
            <h1>Електронна база даних студентів</h1>
            <ul className={styles.header__nav}>
              <li><Link to="/">Головна</Link></li>
              <li><Link to="/students">Студенти</Link></li>
              <li><Link to="/contacts">Контакти</Link></li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </header>
      </Router>
    </>
  );
}

export default App
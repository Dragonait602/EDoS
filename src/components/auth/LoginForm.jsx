import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import styles from "../../App.module.scss";
import { useNavigate } from "react-router-dom"; // ДОДАНО

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // ДОДАНО
    const { login } = useAuth();
    const navigate = useNavigate(); // ДОДАНО

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(username, password);
            navigate('/students'); // Редирект на сторінку студентів
        } catch (error) {
            setError(error.response?.data?.message || 'Невірний логін або пароль');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.authForm}>
            <h2>Вхід</h2>
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Логін:</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} required type="text" />
                </div>
                <div className={styles.formGroup}>
                    <label>Пароль:</label>
                    {/* ВИПРАВЛЕНО type="text" на type="password" */}
                    <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" />
                </div>
                <button type="submit" className={styles.authButton} disabled={loading}>
                    {loading ? 'Вхід...' : 'Увійти'}
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
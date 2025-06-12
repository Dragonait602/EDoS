import { useEffect, useState } from "react";
import styles from '../App.module.scss';

// Додаємо email до початкового стану
const INITIAL_STATE = { name: '', surname: '', group: '', email: '' };

function ModalEditStudent({ student, onClose, onSave }) {
    const [localStudent, setLocalStudent] = useState(student || INITIAL_STATE);
    const isEditing = !!student;

    useEffect(() => {
        setLocalStudent(student || INITIAL_STATE);
    }, [student]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalStudent(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveClick = () => {
        // Додаємо перевірку на email
        if (!localStudent.name || !localStudent.surname || !localStudent.group || !localStudent.email) {
            alert('Будь ласка, заповніть усі поля, включно з email.');
            return;
        }
        onSave(localStudent);
        onClose();
    };

    return (
        <div className={styles.modal} onClick={onClose}>
            <div className={styles.modal__window} onClick={(e) => e.stopPropagation()}>
                <button className={styles.modal__button} aria-label='Закрити' onClick={onClose}>
                    <img src="/src/assets/krest.png" alt="Закрити" style={{ width: '30px', height: '30px' }} />
                </button>
                <h3>{isEditing ? 'Редагування студента' : 'Створення студента'}</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
                    <input className={styles.modal__input} type="text" placeholder="Ім'я" name="name" value={localStudent.name} onChange={handleChange} required />
                    <input className={styles.modal__input} type="text" placeholder="Прізвище" name="surname" value={localStudent.surname} onChange={handleChange} required />
                    <input className={styles.modal__input} type="text" placeholder="Група" name="group" value={localStudent.group} onChange={handleChange} required />
                    {/* ДОДАНО: Поле для Email */}
                    <input className={styles.modal__input} type="email" placeholder="Email" name="email" value={localStudent.email} onChange={handleChange} required />
                </div>
                
                <div style={{ marginTop: '25px', fontSize: '20px', textAlign: 'center' }}>
                    <button onClick={handleSaveClick}>Зберегти</button>
                </div>
            </div>
        </div>
    );
}

export default ModalEditStudent;
import { useState } from "react";
import styles from '../App.module.scss';

// !!! ВИПРАВЛЕНО: Додаємо новий пропс canEditGrades !!!
function ModalGrades({ student, onClose, onSaveGrade, canEditGrades }) {
    const [subject, setSubject] = useState('');
    const [grade, setGrade] = useState('');

    const handleSave = () => {
        if (!subject || grade === '') {
            alert('Будь ласка, заповніть предмет та оцінку.');
            return;
        }
        onSaveGrade({
            subject,
            grade: Number(grade)
        });
        setSubject('');
        setGrade('');
    };

    return (
        <div className={styles.modal} onClick={onClose}>
            <div className={styles.modal__window} onClick={(e) => e.stopPropagation()}>
                <button className={styles.modal__button} aria-label='Закрити' onClick={onClose}>
                    <img src="/src/assets/krest.png" alt="Закрити" style={{ width: '30px', height: '30px' }} />
                </button>
                <h3>Оцінки студента: {student.name} {student.surname}</h3>
                
                <div style={{ margin: '20px 0', maxHeight: '200px', overflowY: 'auto' }}>
                    {student.grades && student.grades.length > 0 ? (
                        <ul>
                            {student.grades.map((g, index) => (
                                <li key={index} style={{ fontSize: '18px', marginBottom: '5px' }}>
                                    {g.subject}: <strong>{g.grade}</strong>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Оцінок ще немає.</p>
                    )}
                </div>

                {/* !!! ВИПРАВЛЕНО: Форма буде видима тільки тим, хто може редагувати !!! */}
                {canEditGrades && (
                    <>
                        <hr />
                        <h4 style={{ marginTop: '20px' }}>Додати / Оновити оцінку</h4>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <input 
                                type="text" 
                                placeholder="Назва предмету" 
                                value={subject} 
                                onChange={(e) => setSubject(e.target.value)}
                                className={styles.modal__input}
                            />
                            <input 
                                type="number" 
                                placeholder="Оцінка" 
                                value={grade} 
                                onChange={(e) => setGrade(e.target.value)}
                                className={styles.modal__input}
                            />
                            <button onClick={handleSave}>Зберегти</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ModalGrades;
import styles from '../App.module.scss';

function StudentCard ({ student, onEdit, onDelete, onResetPassword, onOpenGrades }) {
    return (
        <div className={styles.card}>
            <h2>{student.name} {student.surname}</h2>
            <p>Група: {student.group}</p>
            {student.email && <p>Email: {student.email}</p>}
            
            {student.userId && student.userId.username && (
                <p><b>Логін:</b> {student.userId.username}</p>
            )}
            
            <div style={{ marginTop: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {onEdit && <button onClick={() => onEdit(student)}>Редагувати</button>}
                
                {onOpenGrades && <button onClick={() => onOpenGrades(student)}>Оцінки</button>}
                
                {onResetPassword && student.userId && (
                    <button onClick={() => onResetPassword(student.userId._id)}>Скинути пароль</button>
                )}

                {onDelete && <button className={styles.delete} onClick={() => onDelete(student._id)}>Видалити</button>}
            </div>
        </div>
    );
}

export default StudentCard;
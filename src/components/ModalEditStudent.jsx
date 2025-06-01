import { useEffect, useState } from "react";
import styles from '../App.module.scss'

function ModalEditStudent({student, onClose, onSave}) {
    const [localStudent, setLocalStudent] = useState(student);

    useEffect(() => {
        setLocalStudent(student)
    }, [student])

    if(!student) return null;

    return (
        <div className={styles.modal} onClick={onClose}>
            <div className={styles.modal__window} onClick={(e) => e.stopPropagation()}>
                <button className={styles.modal__button} aria-label='Закрити' onClick={onClose}>
                <img src="/src/assets/krest.png" alt="Закрити" style={{ width: '30px', height: '30px' }} />
                </button>
                <h3>Редагування студента</h3>
                <p style={{ fontSize: '20px', margin: '10px 0' }}>
                    Ви редагуєте: <strong>{student.name}</strong>
                </p>
                <input className={styles.modal__input} type="text" value={localStudent.name} onChange={(e) => setLocalStudent({ ...localStudent, name: e.target.value })}/>
                <input className={styles.modal__input} type="text" value={localStudent.group} onChange={(e) => setLocalStudent({ ...localStudent, group: e.target.value })}/>
                <div style={{ marginTop: '25px', fontSize: '20px' }}>
                    <button onClick={() => {onSave(localStudent); onClose();}}>Зберегти</button>
                </div>
            </div>
        </div>
    );
}
export default ModalEditStudent;
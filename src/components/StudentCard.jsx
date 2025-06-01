import styles from '../App.module.scss'

function StudentCard ({id, name, group, onDelete, onEdit}){
    return (
        <div className={styles.card}>
            <h2>{name}</h2>
            <p>Група: {group}</p>
            <button onClick={() => onDelete(id)}>Видалити</button>
            <button className={styles.delete} onClick={() => onEdit({ id, name, group })}>Редагувати</button>
        </div>
    );
}

export default StudentCard;
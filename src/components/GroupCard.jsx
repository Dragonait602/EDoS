import styles from '../App.module.scss'

function StudentCard ({group}){
    return (
        <>
            <button className={styles.groups}>{group}</button>
        </>
    );
}

export default StudentCard;
import styles from '../App.module.scss'

function GroupCard ({group}){
    return (
        <>
            <button className={styles.groups}>{group}</button>
        </>
    );
}

export default GroupCard;
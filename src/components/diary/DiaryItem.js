import styles from "./DiaryItem.module.scss";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const DiaryItem = ({id, emotion, date, content}) => {

    const navigate = useNavigate();

    const handleMoveDiary = useCallback((targetId) => {
        navigate(`/diary/${targetId}`);
    },[]);

    return (
        <div className={styles.DiaryItem}>
            <div className={[styles.emotion_img_wrapper, styles[`emotion_img_wrapper_${emotion}`]].join(" ")}
                onClick={() => {handleMoveDiary(id)}}
            >
                <img src={process.env.PUBLIC_URL+`/assets/emotion${emotion}.png`}/>
            </div>
            <div className={styles.info_wrapper} onClick={() => {handleMoveDiary(id)}}>
                <div className={styles.diary_date}>
                    {new Date(date.seconds*1000).toLocaleDateString()}
                </div>
                <div className={styles.diary_content} onClick={() => {handleMoveDiary(id)}}>
                    {content}
                </div>
            </div>
        </div>
    );
}

export default React.memo(DiaryItem);
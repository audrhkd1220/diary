import styles from "./EmotionItem.module.scss";
import React from "react";

const EmotionItem = ({emotion_id, emotion_img, emotion_descript, onClick, isSeleted}) => {
    return (
        <div className={[styles.EmotionItem, isSeleted ? styles[`EmotionItem_on_${emotion_id}`] : styles.EmotionItem_off].join(" ")} 
            onClick={() => onClick(emotion_id)}
        >
            <img src={emotion_img}/>
            <span>{emotion_descript}</span>
        </div>
    );
}

export default React.memo(EmotionItem);
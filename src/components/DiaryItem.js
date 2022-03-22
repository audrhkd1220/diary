import React from "react";
import Button from "./Button";

const DiaryItem = ({diaryItem, handleEdit, handleMoveDiary, handleRemove}) => {
    return (
        <div className="DiaryItem">
            <div className={["emotion_img_wrapper", `emotion_img_wrapper_${diaryItem.emotion}`].join(" ")}
                onClick={() => {handleMoveDiary(diaryItem.id)}}
            >
                <img src={process.env.PUBLIC_URL+`/assets/emotion${diaryItem.emotion}.png`}/>
            </div>
            <div className="info_wrapper" onClick={() => {handleMoveDiary(diaryItem.id)}}>
                <div className="diary_date">
                    {new Date(diaryItem.date.seconds*1000).toLocaleDateString()}
                </div>
                <div className="diary_content" onClick={() => {handleMoveDiary(diaryItem.id)}}>
                    {diaryItem.content}
                </div>
            </div>
            <div className="btn_wrapper">
                <Button text="수정하기" type="default" onClick={() => {handleEdit(diaryItem.id)}}/>
                <Button text="삭제하기" type="negative" onClick={() => {handleRemove(diaryItem.id)}}/>
            </div>
        </div>
    );
}

export default React.memo(DiaryItem);
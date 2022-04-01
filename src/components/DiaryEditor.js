import { type } from "@testing-library/user-event/dist/type";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";
import Button from "./Button";
import Header from "./Header";
import { EmotionList } from "../util/EmotionList";
import EmotionItem from "./EmotionItem";
import { getStringDate } from "../util/Date";

const DiaryEditor = ({isEdit, originData}) => {

    const {onCreate, onEdit} = useContext(DiaryDispatchContext);

    const [emotion, setEmotion] = useState(3);
    const [date, setDate] = useState(getStringDate(new Date()));
    const [content, setContent] = useState("");

    const contentRef = useRef();

    const navigate = useNavigate();

    const handleClickRemot = useCallback((emotion) => {
        setEmotion(emotion);
    },[]);

    const handleSubmit = () => {
        if(content.length < 1) {
            contentRef.current.focus();
            return;
        }
        
        if(window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")) {
            if(!isEdit) {
                onCreate(date, content, emotion);
            } else {
                onEdit(originData.id, date, content, emotion);
            }
            navigate("/",{replace: true});
        }
    };

    useEffect(()=>{
        if(isEdit){
            setEmotion(originData.emotion);
            setDate(getStringDate(new Date(parseInt(originData.date.seconds)*1000)));
            setContent(originData.content);
        }
    },[isEdit, originData]);

    


    return (
        <div className="DiaryEditor">
            <Header leftChild={<Button text="< 뒤로가기" onClick={useCallback(() => navigate(-1),[])}/> } 
                headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
            />
            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div>
                        <input className="input_date" type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                    </div>
                </section>
                <section>
                    <h4>오늘의 감정</h4>
                    <div className="input_box emotion_list_wrapper">
                        {EmotionList.map((it) => (
                            <EmotionItem key={it.emotion_id}
                                {...it}
                                onClick={handleClickRemot}
                                isSeleted={it.emotion_id === emotion} 
                            />
                        ))}
                    </div>
                </section>
                <section>
                    <h4>오늘의 일기</h4>
                    <div className="text_wrapper">
                        <textarea placeholder="오늘은 어땠나요" 
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            ref={contentRef}
                        >
                        </textarea>
                    </div>
                </section>
                <section>
                    <div className="control_box">
                        <Button text="취소하기" onClick={useCallback(() => {navigate("/")},[])}/>
                        <Button text="작성완료" type="positive" onClick={handleSubmit}/>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default DiaryEditor;
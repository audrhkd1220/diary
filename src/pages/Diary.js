import Header from "../components/Header";
import Button from "../components/Button";

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import { EmotionList } from "../util/EmotionList";
import { getStringDate } from "../util/date";

const Diary = () => {

    const diaryList = useContext(DiaryStateContext);
    const {onRemove} = useContext(DiaryDispatchContext);
    const {id} = useParams();
    const [data, setData] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        document.getElementsByTagName("title")[0].innerHTML = `감정 일기장 - ${id}번 일기`;
    },[]);

    useEffect(() => {
        if(diaryList.length > 0) {
            const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id));
            if(targetDiary) {
                setData(targetDiary);
            }else {
                alert("없는 일기입니다.");
                navigate("/", {replace: true});
            }
        }
    },[id, diaryList]);

    const handleRemove = (targetId) => {
        if(window.confirm("정말 일기를 삭제하시겠습니까?")){
            onRemove(targetId);
            navigate("/",{replace: true});
        }
    }

    if(!data){
        return <div className="Diary">로딩중입니다...</div>;
    }else {
        const curEmotionData = EmotionList.find((it) => parseInt(it.emotion_id) === parseInt(data.emotion));

        return (
            <div className="Diary">
                <Header 
                    leftChild={<Button text="< 뒤로가기" onClick={() => navigate(-1)}/>} 
                    headText={`${getStringDate(new Date(parseInt(data.date.seconds*1000)))} 기록`} 
                />
                <article>
                    <section>
                        <h4>오늘의 감정</h4>
                        <div className={["diary_img_wrapper", `diary_img_wrapper_${data.emotion}`].join(" ")}>
                            <img src={process.env.PUBLIC_URL+`/assets/emotion${curEmotionData.emotion_id}.png`}/>
                            <div className="emotion_descript">
                                <p>{curEmotionData.emotion_descript}</p>
                            </div>
                        </div>
                    </section>
                    <section>
                        <h4>오늘의 일기</h4>
                        <div className="diary_content_wrapper">
                            <p>{data.content}</p>
                        </div>
                    </section>
                    <section>
                        <div className="button_werapper">
                            <Button text="수정하기" onClick={() => {navigate(`/edit/${data.id}`)}}/>
                            <Button text="삭제하기" type="negative" onClick={() => {handleRemove(data.id)}}/>
                        </div>
                    </section>
                </article>
            </div>
        );
    }
}

export default Diary;
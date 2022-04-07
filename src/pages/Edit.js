import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/diary/DiaryEditor";

const Edit = () => {

    const {id} = useParams();
    const diaryList = useContext(DiaryStateContext);
    const [originData, setOriginData] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        if(diaryList.length > 0) {
            const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id));
            if(targetDiary) {
                setOriginData(targetDiary);
            } else {
                alert("없는 일기입니다.");
                navigate("/",{replace: true});
            }
        }
    },[diaryList, id]);

    useEffect(() => {
        document.getElementsByTagName("title")[0].innerHTML = `감정 일기장 - ${id}번 일기 수정`;
    },[]);

    return (
        <div>
            {originData && <DiaryEditor isEdit={true} originData={originData} />}
        </div>
    );
}

export default Edit;
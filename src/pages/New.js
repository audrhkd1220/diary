import DiaryEditor from "../components/DiaryEditor";
import { useEffect } from "react";

const New = () => {

    useEffect(() => {
        document.getElementsByTagName("title")[0].innerHTML = `감정 일기장 - 새 일기`;
    },[]);


    return (
        <div className="New">
            <DiaryEditor />
        </div>
    );
}

export default New;
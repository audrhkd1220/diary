import { useEffect } from "react";
import Login from "../components/Login";
import DiaryList from "../components/diary/DiaryList";


const Home = ({forceUpdate, user}) => {

    useEffect(() => {
        if(user === undefined || user === null) {
            document.getElementsByTagName("title")[0].innerHTML = "감정 일기장 - 로그인";
        } else {
            document.getElementsByTagName("title")[0].innerHTML = "감정 일기장";
        }
    },[user]);

    return (
        <>
            { user != null ? <DiaryList forceUpdate={forceUpdate} user={user}/> : <Login forceUpdate={forceUpdate}/> }
        </>
    );
}

export default Home;
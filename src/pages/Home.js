import { useContext, useEffect } from "react";
import Login from "../components/Login";
import DiaryList from "../components/DiaryList";
import { UserStateContext } from "../App";


const Home = () => {

    const {user, setUser} = useContext(UserStateContext);

    useEffect(() => {
        setUser(sessionStorage.getItem("user"));
        if(user) {
            document.getElementsByTagName("title")[0].innerHTML = "감정 일기장";
        } else {
            document.getElementsByTagName("title")[0].innerHTML = "감정 일기장 - 로그인";
        }
    },[user]);

    return (
        <>
            { user != null ? <DiaryList /> : <Login /> }
        </>
    );
}

export default Home;
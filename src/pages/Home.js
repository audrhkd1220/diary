import { useContext, useEffect } from "react";
import Login from "../components/Login";
import DiaryList from "../components/DiaryList";
import { UserStateContext } from "../App";


const Home = () => {

    const {user, setUser} = useContext(UserStateContext);

    useEffect(() => {
        setUser(sessionStorage.getItem("user"));
    },[user]);

    return (
        <>
            { user != null ? <DiaryList /> : <Login /> }
        </>
    );
}

export default Home;
import { useEffect, useState } from "react";
import { signIn, signUp } from "./../util/Auth";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Diary from "./Diary";

const Home = () => {

    const [user, setUser] = useState(null);

    useEffect(()=>{
        setUser(sessionStorage.getItem('email'));
    },[user]);
    

    return (
        <>
            { user != null ? <Diary /> : <Login user={user} setUser={setUser}/> }
        </>
    );
}

export default Home;
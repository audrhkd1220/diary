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
        <div>
            { user != null ? <Diary /> : <Login user={user} setUser={setUser}/> }
        </div>
    );
}

export default Home;
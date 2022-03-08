import { useState } from "react";
import { signIn } from "./../util/Auth";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const [email,setEmail]= useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();

    if(sessionStorage.getItem("email") === null){
        return (
            <div className="Home">
                <div>
                    <img src={`${process.env.PUBLIC_URL}assets/main.svg`}/>
                    <h1>Emotion Diary</h1>
                </div>
                <div className="signIn">
                    <input type="text" placeholder="아이디" onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)}/>
                    <button type="button" onClick={() => signIn(email, password, navigate)}>로그인</button>
                </div>
                <div className="assistance">
                    <button >비밀번호 변경&찾기</button>
                    <button>회원가입</button>
                </div>
            </div>
        );
    }else {
        return (
            <div>

            </div>
        );
    }

    
}

export default Home;
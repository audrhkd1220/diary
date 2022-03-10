import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, socialLogin } from "./../util/Auth";

const Login = () => {

    const [email,setEmail]= useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();
        signIn(email, password, navigate);
    }


    return (
        <div className="Login">
            <div className="login_img_wrapper">
                    <img src={`${process.env.PUBLIC_URL}assets/main.svg`}/>
                    <h1>Emotion Diary</h1>
            </div>
            <div className="login_form_wrapper">
                <form className="login_form" onSubmit={onSubmit}>
                    <input type="text" placeholder="아이디" onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)}/>
                    <button type="submit" >로그인</button>
                </form>
            </div>
            <div className="social_login_wrapper">
                <button onClick={() => socialLogin("google", navigate)}>
                    <img src={`${process.env.PUBLIC_URL}/assets/google_btn.svg`} />
                    <figcaption>구글로 시작하기</figcaption>
                </button>
                <button onClick={() => socialLogin("facebook", navigate)}>
                    <img src={`${process.env.PUBLIC_URL}/assets/facebook_btn.svg`} />
                    <figcaption>페이스북으로 시작하기</figcaption>
                </button>
            </div>
            <div className="assistance">
                <button ></button>
                <button>회원가입</button>
            </div>
        </div>
    );
}

export default Login;
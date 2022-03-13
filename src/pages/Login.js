import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, socialLogin } from "./../util/Auth";

import {EmailContext, EmailDispatchContext} from '../App';

const Login = (props) => {

    const [email,setEmail]= useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();
    

    const onSubmit = (event) => {
        event.preventDefault();

        const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

        if(! regEmail.test(email)){
            alert('아이디(이메일) 형식을 확인해주세요.');
            document.getElementById("email").focus();
            return;
        }

        signIn(email, password, props.setUser);
    }


    return (
        <div className="Login">
            <div className="login_img_wrapper">
                    <img src={`${process.env.PUBLIC_URL}assets/main.svg`}/>
                    <h1>Emotion Diary</h1>
            </div>
            <div className="login_form_wrapper">
                <form className="login_form" onSubmit={onSubmit}>
                    <input type="text" id="email" placeholder="아이디" required onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" id="password" placeholder="비밀번호" required onChange={(e) => setPassword(e.target.value)}/>
                    <button type="submit" >로그인</button>
                </form>
            </div>
            <div className="signUp_wrapper">
                <button onClick={() => navigate("/signUp")}>회원가입</button>
            </div>
            <div className="social_login_wrapper">
                <button onClick={() => socialLogin("google", props.setUser)}>
                    <img src={`${process.env.PUBLIC_URL}/assets/google_btn.svg`} />
                    <figcaption>구글로 시작하기</figcaption>
                </button>
                <button onClick={() => socialLogin("facebook", props.setUser)}>
                    <img src={`${process.env.PUBLIC_URL}/assets/facebook_btn.svg`} />
                    <figcaption>페이스북으로 시작하기</figcaption>
                </button>
            </div>
        </div>
    );
}

export default Login;
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { signIn, socialLogin } from "../util/Auth";
import Icon from "@mdi/react";
import { mdiEmail, mdiLock } from '@mdi/js';
import { UserStateContext } from "../App";


const Login = () => {
    const {setUser} = useContext(UserStateContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mdiEmailColor, setMdiEmailColor] = useState('black');
    const [mdiLockColor, setMdiLockColor] = useState('black');
    const [emailMsg, setEmailMsg] = useState(false);
    const [passwordMsg, setPasswordMsg] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(true);

    const navigate = useNavigate();
    

    const handleSubmit = (event) => {
        event.preventDefault();
  
        signIn(email, password, setUser);
    }

    useEffect(() => {
        if(mdiEmailColor === 'blue' && mdiLockColor === 'blue'){
            setBtnDisabled(false);
        }else {
            setBtnDisabled(true);
        }
    },[mdiEmailColor, mdiLockColor]);

    useEffect(()=>{
        const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
        const regPassword =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*+=-])[A-Za-z\d!@#$%^&*+=-]{8,}$/;

        if(email.length === 0) {
            setMdiEmailColor('black');
            setEmailMsg(false);
        }else if(regEmail.test(email)) {
            setMdiEmailColor('blue');
            setEmailMsg(false);
        } else {
            setMdiEmailColor('red');
            setEmailMsg(true);
        }

        if(password.length === 0) {
            setMdiLockColor('black');
            setPasswordMsg(false);
        }else if(regPassword.test(password)) {
            setMdiLockColor('blue');
            setPasswordMsg(false);
        } else {
            setMdiLockColor('red');
            setPasswordMsg(true);
        }
    },[email, password]);



    return (
        <div className="Login">
            <div className="login_img_wrapper">
                    <img src={`${process.env.PUBLIC_URL}assets/main.svg`}/>
                    <h1>Emotion Diary</h1>
            </div>
            <div>
                <div className="login_form_wrapper">
                    <form className="login_form" onSubmit={handleSubmit}>
                        <div>
                            <p><label for="email">Email address</label></p>
                            <div className={`input_wrapper border_${mdiEmailColor}`}>
                                <Icon path={ mdiEmail } size={1.2} color={mdiEmailColor}/>
                                <input type="text" id="email" placeholder="아이디" required onChange={(e) => setEmail(e.target.value)}/>
                            </div>     
                            { emailMsg && <span className="color_red">이메일 형식을 확인해주세요.</span> }
                        </div>
                        <div>
                            <p><label for="password">Password</label></p>
                            <div className={`input_wrapper border_${mdiLockColor}`}>
                                <Icon path={ mdiLock } size={1.2} color={mdiLockColor}/>
                                <input type="password" id="password" placeholder="비밀번호" required onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            { passwordMsg && <span className="color_red">비밀번호를 확인해주세요.(영문,숫자,특수문자 조합 8자 이상)</span> }
                        </div>
                        <button className={`disabled_btn_${btnDisabled}`} type="submit" disabled={btnDisabled}>로그인</button>
                    </form>
                </div>
                <div className="signUp_wrapper">
                    <button onClick={() => navigate("/signUp")}>회원가입</button>
                </div>
                <div className="social_login_wrapper">
                    <button onClick={() => socialLogin("google", setUser)}>
                        <img src={`${process.env.PUBLIC_URL}/assets/google_btn.svg`} />
                        <figcaption>구글로 시작하기</figcaption>
                    </button>
                    <button onClick={() => socialLogin("facebook", setUser)}>
                        <img src={`${process.env.PUBLIC_URL}/assets/facebook_btn.svg`} />
                        <figcaption>페이스북으로 시작하기</figcaption>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
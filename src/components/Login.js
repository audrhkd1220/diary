import styles from "./Login.module.scss";

import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { signIn, socialLogin } from "../util/Auth";
import Icon from "@mdi/react";
import { mdiEmail, mdiLock } from '@mdi/js';
import { UserStateContext } from "../App";


const Login = ({forceUpdate}) => {
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
  
        signIn(email, password, forceUpdate);
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
        const regPassword =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*+~=-?])[A-Za-z\d!@#$%^&*+~=-?]{8,}$/;

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
        <div className={styles.Login}>
            <div className={styles.login_img_wrapper}>
                    <img src={`${process.env.PUBLIC_URL}assets/main.svg`}/>
                    <h1>Emotion Diary</h1>
            </div>
            <div className={styles.login_content_wrapper}>
                <div className={styles.login_form_wrapper}>
                    <form className={styles.login_form} onSubmit={handleSubmit}>
                        <div>
                            <p><label for="email">Email address</label></p>
                            <div className={[styles.input_wrapper, `input_wrapper border_${mdiEmailColor}`].join(" ")}>
                                <Icon path={ mdiEmail } size={1.2} color={mdiEmailColor}/>
                                <input type="text" id="email" placeholder="?????????" required onChange={(e) => setEmail(e.target.value)}/>
                            </div>     
                            { emailMsg && <span className="color_red">????????? ????????? ??????????????????.</span> }
                        </div>
                        <div>
                            <p><label for="password">Password</label></p>
                            <div className={[styles.input_wrapper, `input_wrapper border_${mdiLockColor}`].join(" ")}>
                                <Icon path={ mdiLock } size={1.2} color={mdiLockColor}/>
                                <input type="password" id="password" placeholder="????????????" required onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            { passwordMsg && <span className="color_red">??????????????? ??????????????????.(??????,??????,???????????? ?????? 8??? ??????)</span> }
                        </div>
                        <button className={`disabled_btn_${btnDisabled}`} type="submit" disabled={btnDisabled}>?????????</button>
                    </form>
                </div>
                <div className={styles.signUp_wrapper}>
                    <button onClick={() => navigate("/signUp")}>????????????</button>
                </div>
                <div className={styles.social_login_wrapper}>
                    <hr></hr>
                    <span>?????? ?????????</span>
                    <div className={styles.social_login_btn_wrapper}>
                        <button onClick={() => socialLogin("google", forceUpdate)} className={styles.google_btn}>
                            <img src={`https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg`} />
                            <span>Sign with google</span>
                        </button>
                        <button onClick={() => socialLogin("facebook", forceUpdate)} className={styles.facebook_btn}>
                            <img src={`${process.env.PUBLIC_URL}/assets/facebook_btn.svg`} />
                            <span>Sign with facebook</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
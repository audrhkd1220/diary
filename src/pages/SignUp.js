import { useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";

import Icon from "@mdi/react";
import { mdiCheckCircleOutline } from '@mdi/js';
import { signUp, signIn, emailDbCheck } from "../util/Auth";

const SignUp = () => {
    const emailInput = useRef();
    const pwInput = useRef();
    const pwCheckInput = useRef();

    const [emailColor, setEmailColor] = useState("red");
    const [msgList, setMsgList] = useState({});
    const [checkedInputs, setCheckedInputs] = useState([]);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [checkList, setCheckList] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        document.getElementsByTagName("title")[0].innerHTML = `감정 일기장 - 회원가입`;
    },[]);


    //이메일 유효성 및 중복확인 함수
    const emailCheck = () => {
        const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
        const email = emailInput.current.value;

        if(email.length === 0) {
            if(msgList.email){
                setEmailColor("red");
                setMsgList({...msgList, "email" : "필수 정보입니다."});
                setCheckList({...checkList, "email" : false});
            }       
        } else if (regEmail.test(email)) {
            emailDbCheck(email).then((res) => {
                if(res === "auth/user-not-found") {
                    setEmailColor("blue");
                    setMsgList({...msgList, "email" : "멋진 아이디네요!"});
                    setCheckList({...checkList, "email" : true});
                }else {
                    setEmailColor("red");
                    setMsgList({...msgList, "email" : "이미 사용중인 이메일입니다."});
                    setCheckList({...checkList, "email" : false});
                }
            });
        }else {
            setEmailColor("red");
            setMsgList({...msgList, "email" : "이메일 형식이 아닙니다."});
            setCheckList({...checkList, "email" : false});
        }
    }
    //비밀번호 유효성 검사 함수
    const passwordCheck = () => {
        const regPassword =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*+=-])[A-Za-z\d!@#$%^&*+=-]{8,}$/;
        const password = pwInput.current.value;

        if(password.length === 0){
            if(msgList.password){
                setMsgList({...msgList, "password" : "필수 정보입니다."});
                setCheckList({...checkList, "password" : false});
            }
        } else if (regPassword.test(password)) {
            setMsgList({...msgList, "password" : ""});
            setCheckList({...checkList, "password" : true});
        } else {
            setMsgList({...msgList, "password" : "영문, 숫자, 특수문자를 조합한 8자 이상을 입력해주세요"});
            setCheckList({...checkList, "password" : false});
        }
    }
    //비밀번호 재확인 함수
    const pwReCheck = () => {
        const pwCheck = pwCheckInput.current.value;
        const password = pwInput.current.value;

        if(pwCheck.length === 0){
            if(msgList.pwCheck){
                setMsgList({...msgList, "pwCheck" : "필수 정보입니다."});
                setCheckList({...checkList, "pwCheck" : false});
            }
        }else if(pwCheck != password){
            setMsgList({...msgList, "pwCheck" : "비밀번호가 일치하지 않습니다."});
            setCheckList({...checkList, "pwCheck" : false});
        }else {
            setMsgList({...msgList, "pwCheck" : ""});
            setCheckList({...checkList, "pwCheck" : true});
        }
    }

    //체크박스 체크 함수
    const checkHandler = useCallback((id, checked) => {
        if(checked) {
            if(id === 'allAgree') setCheckedInputs(['allAgree', 'agree1', 'agree2', 'agree3']);
            else setCheckedInputs([...checkedInputs, id]);
        }else {
            if(id === 'allAgree') setCheckedInputs([]);
            else setCheckedInputs(checkedInputs.filter((it) => it != id));
        }
    },[]);

    //회원가입 버튼 활성화 함수
    useEffect(() => {
        if(checkList.email && checkList.password && checkList.pwCheck){
            if(checkedInputs.includes('allAgree')){       
                if(checkedInputs.length === 4) setBtnDisabled(false);
                else setBtnDisabled(true);
            }else {
                if(checkedInputs.length === 3) setBtnDisabled(false);
                else setBtnDisabled(true);
            }
        } else setBtnDisabled(true);
    },[checkList, checkedInputs]);

    //회원가입 전송 함수.
    const handleSubmit = (event) => {
        event.preventDefault();

        signUp(emailInput.current.value, pwInput.current.value, ()=>{navigate("/",{replace: true})});
    }

    

    return (
        <div className="SignUp">
            <Header headText={"회원가입"} leftChild={<Button text="< 뒤로가기" type="title" onClick={useCallback(() => navigate(-1),[])}/>} />
            <form className="signUp_form" onSubmit={handleSubmit}>
                <div className="signUp_info_div">
                    <p><label for="email">이메일</label></p>
                    <div>
                        <input type="text" id="email" required onBlur={emailCheck} ref={emailInput}/>
                        {checkList.email && <Icon path={mdiCheckCircleOutline} size={1.5} color="#3bb735" />}
                    </div>
                    { msgList.email && <span className={`color_${emailColor}`}>{msgList.email}</span> }
                </div>
                <div className="signUp_info_div">
                    <p><label for="password">비밀번호</label></p>
                    <div>
                        <input type="password" id="password" required onBlur={passwordCheck} ref={pwInput}/>
                        {checkList.password && <Icon path={mdiCheckCircleOutline} size={1.5} color="#3bb735" />}
                    </div>
                    { msgList.password && <span className="color_red">{msgList.password}</span> }
                </div>
                <div className="signUp_info_div">
                    <p><label for="passwordCheck">비밀번호 재확인</label></p>
                    <div>
                        <input type="password" id="passwordCheck" required onBlur={pwReCheck} ref={pwCheckInput}/>
                        {checkList.pwCheck && <Icon path={mdiCheckCircleOutline} size={1.5} color="#3bb735" />}
                    </div>
                    { msgList.pwCheck && <span className="color_red">{msgList.pwCheck}</span> }
                </div>
                <div className="signUp_agree_div">
                    <CheckBox id="allAgree"  text="전체 약관 동의" checkHandler={checkHandler} checked={checkedInputs.includes('allAgree') ? true : false} />
                    <div>
                        <CheckBox id="agree1" text="회원가입 및 운영약관 동의" checkHandler={checkHandler} checked={checkedInputs.includes('agree1') ? true : false} />
                        <CheckBox id="agree2" text="개인정보 수집 및 동의" checkHandler={checkHandler} checked={checkedInputs.includes('agree2') ? true : false} />
                        <CheckBox id="agree3" text="위치정보 이용약관 동의" checkHandler={checkHandler} checked={checkedInputs.includes('agree3') ? true : false} />
                    </div> 
                </div>
                <button className={`disabled_btn_${btnDisabled}`} type="submit" disabled={btnDisabled}>회원가입</button>
            </form>
        </div>
    );
}

export default SignUp;


const CheckBox = React.memo(({id, text, checkHandler, checked}) => {
    return (
        <span>
            <input type="checkbox" id={id} onChange={(e) => checkHandler(id, e.currentTarget.checked)} checked={checked} />
            <p><label for={id}>{text}</label></p>
        </span>
    );
});
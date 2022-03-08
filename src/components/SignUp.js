import React, {useState} from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { signUp, signIn } from "./../util/Auth";

const SignUp = () => {

    const [email,setEmail]= useState("");
    const [password,setPassword]=useState("");

    return (
        <div className="SignUp">
            <input type="text" placeholder="이메일을 입력하세요." onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="비밀번호를 입력하세요." onChange={(e) => setPassword(e.target.value)}/>
            <button type="button" onClick={() => signUp(email, password)}>회원가입</button>
            <button type="button" onClick={() => signIn(email, password)}>로그인</button>
        </div>
    );
}

export default SignUp;
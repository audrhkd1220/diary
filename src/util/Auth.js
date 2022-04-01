import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { authService } from "../firebase";


export async function signUp(email, password, page) {
    await createUserWithEmailAndPassword(authService,email,password).then((userCredential) => {
        alert("회원가입에 성공하였습니다. 로그인 후 이용해주세요.");
        page();
    }).catch((err) => {
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    });
}

export async function emailDbCheck(email) {
    let msg = "";
    await signInWithEmailAndPassword(authService,email,1).then((userCredential)=> {
    }).catch((err)=>{
        msg = err.code;
    });
    return msg;
}

export async function signIn(email, password, forceUpdate) {
    await signInWithEmailAndPassword(authService,email,password).then((userCredential)=> {
        sessionStorage.setItem("user", email);
        forceUpdate();
        //setUser(email);
    }).catch((err)=>{
        alert('로그인에 실패했습니다. 아이디, 비밀번호를 확인하세요.');
    });
}

export async function socialLogin(type, setUser) {
    let provider;
    if(type === 'google'){
        provider = new GoogleAuthProvider();  
    } else if (type === 'facebook'){
        provider = new FacebookAuthProvider();
    }

    await signInWithPopup(authService, provider).then((result) => {
        sessionStorage.setItem('user', result.user.email);
        setUser(result.user.email);
    }).catch((err)=> {
        alert('로그인에 실패했습니다.');
    });
}


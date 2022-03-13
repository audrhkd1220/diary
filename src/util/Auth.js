import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { authService } from "../firebase";


export async function signUp(email, password) {
    await createUserWithEmailAndPassword(authService,email,password).then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
    }).catch((err) => {
        console.log(err.code);
        console.log(err.message);
        alert('회원가입 실패!');
    });
}

export async function signIn(email, password, setUser) {
    await signInWithEmailAndPassword(authService,email,password).then((userCredential)=> {
        sessionStorage.setItem("email", email);
        setUser(email);
    }).catch((err)=>{
        alert('로그인에 실패했습니다. 아이디나 비밀번호를 확인하세요.');
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
        sessionStorage.setItem('email', result.user.email);
        setUser(result.user.email);
    }).catch((err)=> {
        alert('로그인에 실패했습니다. 아이디나 비밀번호를 확인하세요.');
    });
}

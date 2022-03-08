import app from "./../firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export const signUp = async (email, password) => {
    const result = await createUserWithEmailAndPassword(auth,email,password).then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
    }).catch((err) => {
        console.log(err.code);
        console.log(err.message);
        alert('회원가입 실패!');
    });
    console.log(result);
}

export const signIn = async (email, password, navigate) => {
    const result = await signInWithEmailAndPassword(auth,email,password).then((userCredential)=> {
        sessionStorage.setItem("email", email);
        navigate("/",{replace: true});
    }).catch((err)=>{
        console.log(err.code);
        console.log(err.message);
        alert('로그인 실패!');
    });
    console.log(result);
}


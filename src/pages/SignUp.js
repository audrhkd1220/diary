import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const SignUp = () => {

    const navigate = useNavigate();

    return (
        <div className="SignUp">
            <div className="title_wrapper">
                <Button text="< 이전으로" type="title" onClick={() => navigate(-1)}/>
                <h2>회원가입</h2>
            </div>
            <form className="signUp_form">
                <label>
                    <p>이메일&nbsp;<span>*</span></p>
                    <input type="text"/>
                </label>
                <label>
                    <p>비밀번호&nbsp;<span>*</span></p>
                    <input type="password"/>
                </label>
                <label>
                    <p>비밀번호 확인&nbsp;<span>*</span></p>
                    <input type="password"/>
                </label>
                <div>
                    <label>
                        <input type="checkbox"/>전체 약관 동의
                    </label>
                    <ul>
                        <li>
                            <label>
                                <input type="checkbox"/>회원가입 및 운양약관 동의
                            </label>
                            <label>
                                <input type="checkbox"/>개인정보 수집 및 동의
                            </label>
                            <label>
                                <input type="checkbox"/>위치정보 이용약관 동의
                            </label>
                        </li>
                    </ul>
                </div>
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}

export default SignUp;
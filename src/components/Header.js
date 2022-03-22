import React from "react";

const Header = ({headText, leftChild, rightChild, user, logOut}) => {
    return (
       <header>
            {user && <div className="header_user_wrapper">
                <span>{user}의 일기장</span>
                <button onClick={logOut}>로그아웃</button>
            </div>}
            <div className="header_btn_wrapper">
                <div className="head_btn_left">
                    {leftChild}
                </div>
                <div className="head_text">
                    {headText}
                </div>
                <div className="head_btn_right">
                    {rightChild}
                </div>
            </div>
       </header>
    );
}

export default React.memo(Header);
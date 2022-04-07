import styles from "./Button.module.scss";
import React from "react";

const Button = ({text, type, onClick}) => {
    let prev = text === "< 뒤로가기" ? "<" : text;
    return (
        <button 
            desktop={text}
            mobile-prev={prev} 
            className={[styles.Button, styles[`Button_${type}`]].join(" ")} 
            onClick={onClick}>
        </button>
    );
}

Button.defaultProps = {
    type: "default"
};

export default React.memo(Button);
import React from "react";

const Button = ({text, type, onClick}) => {
    return (
        <button className={["Button", `Button_${type}`].join(" ")} onClick={onClick}>{text}</button>
    );
}

Button.defaultProps = {
    type: "default"
};

export default React.memo(Button);
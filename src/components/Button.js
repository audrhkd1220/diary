const Button = ({text, type, onClick}) => {
    return (
        <button className={["Button", `Button_${type}`].join(" ")} onClick={onClick}>{text}</button>
    );
}

Button.defaultProps = {
    type: "default"
};

export default Button;
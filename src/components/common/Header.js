import styles from "./Header.module.scss";
import React from "react";

const Header = ({headText, leftChild, rightChild}) => {
    return (
       <header>
            <div className={styles.header_btn_wrapper}>
                <div className={styles.head_btn_left}>
                    {leftChild}
                </div>
                <div className={styles.head_text}>
                    {headText}
                </div>
                <div className={styles.head_btn_right}>
                    {rightChild}
                </div>
            </div>
       </header>
    );
}

export default React.memo(Header);
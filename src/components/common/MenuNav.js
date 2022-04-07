import styles from "./MenuNav.module.scss";
import Icon from "@mdi/react";
import { mdiClose } from '@mdi/js';
import React from "react";

const MenuNav = ({handleNewDiary, logOut, menuFlag, setMenuFlag}) => {
    return (
        <div className={[styles.MenuNav, styles[`MenuNav_${menuFlag}`]].join(" ")}>
            <div className={styles.menuClose}>
                <Icon path={mdiClose} size={1} onClick={() => setMenuFlag(!menuFlag)} />
            </div>
            <div className={styles.menuContent} onClick={() => logOut()}>
                로그아웃
            </div>
            <div className={styles.menuContent} onClick={() => handleNewDiary()}>
                새 일기쓰기
            </div>
        </div>
    );
}

export default React.memo(MenuNav);
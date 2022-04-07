import styles from "./DiaryList.module.scss";

import { DiaryStateContext } from "../../App";
import { useNavigate } from "react-router-dom";
import React, { useCallback, useContext, useEffect, useState } from "react";

import Header from "../common/Header";
import Button from "../common/Button";
import DiaryItem from "./DiaryItem";
import MenuNav from "../common/MenuNav";

import Icon from "@mdi/react";
import { mdiMenu } from '@mdi/js';
import { mdiMagnify } from '@mdi/js';
import { mdiClose } from '@mdi/js';


const sortOptionList = [
    {value: "latest", name: "최신순"},
    {value: "oldest", name: "오래된 순"}
]

const filterOptionList = [
    {value: "all", name: "All"},
    {value: "good", name: "Good Emotion"},
    {value: "bad", name: "Bad Emotion"},
]

const Option = React.memo(({value, onChange, optionList}) => {
    return (
        <select className={styles.Option} value={value} onChange={(e)=> onChange(e.target.value)}>
            {optionList.map((it, i) => {
                return <option key={i} value={it.value}>{it.name}</option>;
            })}
        </select>
    );
 });

const DiaryList = ({forceUpdate, user}) => {
    const diaryList = useContext(DiaryStateContext);

    const [curDate, setCurDate] = useState(new Date());
    const [data, setData] = useState([]);
    const [sortValue, setSortValue] = useState("latest");
    const [filterValue, setFilterValue] = useState("all");
    const [menuFlag, setMenuFlag] = useState(false);
    const [searchData, setSearchData] = useState("");
    const [iconNone, setIconNone] = useState(false);

    const navigate = useNavigate();

    const increaseMonth = useCallback(() => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth()+1, curDate.getDate())
        );
    },[curDate]);
    const decreaseMonth = useCallback(() => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth()-1, curDate.getDate())
        );
    },[curDate]);

    useEffect(() => {
        if(diaryList.length > 0) {
            const firstDay = new Date(curDate.getFullYear(), curDate.getMonth(), 1).getTime();
            const lastDay = new Date(curDate.getFullYear(), curDate.getMonth()+1, 0, 23, 59, 59).getTime();
            setData(diaryList.filter((it) => firstDay <= parseInt(it.date.seconds) * 1000 && parseInt(it.date.seconds) * 1000 <= lastDay));
        } else {
            setData([]);
        }
    },[diaryList, curDate]);

    const getProcessDiaryList = () => {
        const sortCompare = (a, b) => {
            if(sortValue === 'latest'){
                return b.date.seconds - a.date.seconds;
            }else {
                return a.date.seconds - b.date.seconds;
            }
        }

        const filterCallback = (item) => {
            if(filterValue === 'good'){
                return parseInt(item.emotion) >= 3;
            }else {
                return parseInt(item.emotion) < 3;
            }
        }

        const filterList = filterValue === 'all' ? data : data.filter((it) => filterCallback(it));
        const sortList = filterList.sort(sortCompare);
        return sortList;
    }

    const handleNewDiary = useCallback(() => {
        navigate("/new")
    },[]);

    const logOut = useCallback(() => {
        sessionStorage.removeItem("user"); 
        forceUpdate();
        setData([]);
    },[]);

    window.onresize = function() {
        if(window.innerWidth > 650) setMenuFlag(false);
    }

    useEffect(() => {
        if(searchData.length > 0) setIconNone(true);
        else setIconNone(false);
    },[searchData]);


    return (
        <div className={styles.DiaryList}>     
            <MenuNav handleNewDiary={handleNewDiary} logOut={logOut} menuFlag={menuFlag} setMenuFlag={setMenuFlag}/>
            <div className={styles[`menuNav_${menuFlag}`]} onClick={() => setMenuFlag(false)}></div>
            <div className={styles.mobileMenu} onClick={() => setMenuFlag(!menuFlag)}>
                <Icon path={mdiMenu} size={1}/>    
            </div>  
            <div className={styles[`menuFlag_${menuFlag}`]}>
                <div className={styles.user_wrapper}>
                    <span>{user}의 일기장</span>
                    <button onClick={logOut}>로그아웃</button>                   
                </div>
                <Header 
                    leftChild={<Button text={"<"} onClick={decreaseMonth}/>} 
                    headText={`${curDate.getFullYear()}년 ${curDate.getMonth()+1}월`} 
                    rightChild={<Button text={">"} onClick={increaseMonth} />}
                />
                <div className={styles.flex_menu}>
                    <div className={styles.menu_wrapper}>
                        <div className={styles.left_menu}>
                            <Option value={sortValue} onChange={setSortValue} optionList={sortOptionList}/>
                            <Option value={filterValue} onChange={setFilterValue} optionList={filterOptionList}/>
                        </div>
                        <div className={styles.right_menu}>
                            <Button text="새 일기쓰기" type="positive" onClick={handleNewDiary}/>
                        </div>
                    </div>
                    <div className={styles.searchBar}>
                        <Icon path={mdiMagnify} size={1.2}/>
                        <input type="text" placeholder="내용으로 검색" value={searchData} 
                            onChange={(e) => {setSearchData(e.target.value)}}
                        />
                        <Icon path={mdiClose} size={1.2} className={styles[`icon_${iconNone}`]} 
                            onClick={() => setSearchData("")}
                        />
                    </div>
                </div>
                {getProcessDiaryList().filter((it)=>it.content.indexOf(searchData) > -1 ).map((it) => (<DiaryItem key={it.id} {...it}/>))}
            </div>
        </div>
    );
}

export default DiaryList;
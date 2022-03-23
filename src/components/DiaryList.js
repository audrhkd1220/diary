import { DiaryDispatchContext, DiaryStateContext, UserStateContext } from "../App";
import { useNavigate } from "react-router-dom";
import React, { useCallback, useContext, useEffect, useState } from "react";

import Header from "../components/Header";
import Button from "../components/Button";
import DiaryItem from "./DiaryItem";


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
        <select className="Option" value={value} onChange={(e)=> onChange(e.target.value)}>
            {optionList.map((it, i) => {
                return <option key={i} value={it.value}>{it.name}</option>;
            })}
        </select>
    );
 });

const DiaryList = () => {
    const diaryList = useContext(DiaryStateContext);
    const {user, setUser} = useContext(UserStateContext);
    const {onRemove} = useContext(DiaryDispatchContext);

    const [curDate, setCurDate] = useState(new Date());
    const [data, setData] = useState([]);
    const [sortValue, setSortValue] = useState("latest");
    const [filterValue, setFilterValue] = useState("all");

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

    const handleRemove = useCallback((targetId) => {
        if(window.confirm("정말 삭제하시겠습니까?")){
            onRemove(targetId);
            navigate("/",{replace: true});
        }
    },[]);

    const handleMoveDiary = useCallback((targetId) => {
        navigate(`/diary/${targetId}`);
    },[]);
   
    const handleEdit = useCallback((targetId) => {
        navigate(`/edit/${targetId}`);
    },[]);

    const logOut = useCallback(() => {
        sessionStorage.removeItem("user"); setUser(null);
        setData([]);
    },[]);
    
    return (
        <div className="DiaryList">
            <Header 
                leftChild={<Button text={"<"} onClick={decreaseMonth}/>} 
                headText={`${curDate.getFullYear()}년 ${curDate.getMonth()+1}월`} 
                rightChild={<Button text={">"} onClick={increaseMonth} />}
                user={user}
                logOut={logOut}
            />
            <div className="menu_wrapper">
                <div className="left_menu">
                    <Option value={sortValue} onChange={setSortValue} optionList={sortOptionList}/>
                    <Option value={filterValue} onChange={setFilterValue} optionList={filterOptionList}/>
                </div>
                <div className="right_menu">
                    <Button text="새 일기쓰기" type="positive" onClick={useCallback(() => {navigate("/new")},[])}/>
                </div>
            </div>
            {getProcessDiaryList().map((it) => (
                <DiaryItem key={it.id} diaryItem={it} handleEdit={handleEdit} handleMoveDiary={handleMoveDiary} handleRemove={handleRemove}/>
            ))}
        </div>
    );
}

export default DiaryList;
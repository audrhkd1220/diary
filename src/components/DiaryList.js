import Header from "../components/Header";
import Button from "../components/Button";

import { useEffect, useRef, useState } from "react";
import DiaryItem from "./DiaryItem";

import Icon from "@mdi/react";
import { mdiUnfoldMoreHorizontal } from '@mdi/js';
import { useNavigate } from "react-router-dom";


const sortOptionList = [
    {value: "latest", name: "최신순"},
    {value: "oldest", name: "오래된 순"}
]

const filterOptionList = [
    {value: "all", name: "All"},
    {value: "good", name: "Good"},
    {value: "bad", name: "Bad"},
]

const OptionBar = ({optionList, optionRef, value, optionHandle}) => {
    console.log(optionList.filter((it) => it.value === value));
    return (
         <div className="OptionBar" ref={optionRef}>      
             <div className="arrowImage_wrapper" onClick={optionHandle}>
                <div>{optionList.filter((it) => it.value === value)[0].name}</div>
                 <Icon className="arrowImage" path={mdiUnfoldMoreHorizontal} size={0.8} />
             </div>
             <ul className="optionList">
                 {optionList.map((it, i) => {
                     return <li key={i} value={it.value}>{it.name}</li>
                 })}
             </ul>
         </div>
    );
 }

const DiaryList = () => {

    const [optionList, setOptionList] = useState([{}]);
    const [sortValue, setSortValue] = useState("latest");
    const [filterValue, setFilterValue] = useState("all");

    const sortRef = useRef();
    const filterRef = useRef();
    const navigate = useNavigate();
    
    const optionHandle = (type) => {
        if(type === "sort"){
            sortRef.current.children[1].classList.toggle("active");
            sortRef.current.classList.toggle("active");
        }else {
            filterRef.current.children[1].classList.toggle("active");
            filterRef.current.classList.toggle("active");
        }
    }

    return (
        <div className="DiaryList">
            <Header 
                leftChild={<Button text={"<"} type={"prev"} />} 
                headText={"2022-03-17"} 
                rightChild={<Button text={">"} type={"prev"} />}
            />
            <div className="menu_wrapper">
                <div className="left_menu">
                    <OptionBar optionList={sortOptionList} optionRef={sortRef} value={sortValue} optionHandle={() => {optionHandle("sort")}}/>
                    <OptionBar optionList={filterOptionList} optionRef={filterRef} value={filterValue} optionHandle={() => {optionHandle("filter")}}/>
                </div>
                <div className="right_menu">
                    <Button text="새 글쓰기" onClick={() => {navigate("/new")}}/>
                </div>
            </div>
            <DiaryItem />
        </div>
    );
}

export default DiaryList;
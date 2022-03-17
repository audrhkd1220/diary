import Header from "../components/Header";
import Button from "../components/Button";

import { useEffect } from "react";

const Diary = () => {

    return (
        <div className="Diary">
            <Header 
                leftChild={<Button text={"<"} type={"prev"} onClick={() => {}}/>} 
                headText={"2022-03-17"} 
                rightChild={<Button text={">"} type={"prev"} onClick={() => {}}/>}/>
        </div>
    );
}

export default Diary;
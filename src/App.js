import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useEffect, useReducer, useRef, useState, useCallback } from 'react';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import New from './pages/New';
import { addDiary, getDiary } from "./util/Database";



const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT" : {
      return action.data;
    }
    case "CREATE" : {
      console.log(state);
      newState = [action.data, ...state];
      addDiary(action.user, newState);
      action.setReload(!action.reload);
      break;
    }
    case "EDIT" : {
      newState = state.map((it) => parseInt(it.id) === parseInt(action.targetId) ? {...action.data} : it);
      addDiary(action.user, newState);
      action.setReload(!action.reload);
      break;
    }
    case "REMOVE" : {
      newState = state.filter((it) => parseInt(it.id) != parseInt(action.targetId));
      addDiary(action.user, newState);
      action.setReload(!action.reload);
      break;
    }
    default : return state;
  }
  return newState;
}

export const UserStateContext = React.createContext();
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();


function App() {
  const [user, setUser] = useState();
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);


  const [data, dispatch] = useReducer(reducer, []);
  const [diaryList, setDiaryList] = useState([]);
  const [reload, setReload] = useState(false);

  const dataId = useRef(0);

  useEffect(() => {
    setUser(sessionStorage.getItem("user"));
  },[ignored]);

  useEffect(() => {
    if(user != undefined || user != null){
      getDiary(user).then((res) => {
        if(res.regions){
          setDiaryList(res.regions.sort((a,b) => parseInt(b.id) - parseInt(a.id)));
        } else {
          setDiaryList([]);
        }     
      });
    }
  }, [user,reload]);

  useEffect(() => {
    if(diaryList.length > 0){
      dataId.current = parseInt(diaryList[0].id) + 1 ;
      dispatch({type: "INIT", data: diaryList});
    } else {
      dispatch({type: "INIT", data: []});
    }
  },[diaryList]);

  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      user,
      data: {
        id: dataId.current,
        date: new Date(date),
        content: content,
        emotion: emotion
      },
      reload,
      setReload
    });
  }

  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      user,
      data: {
        id: targetId,
        date: new Date(date),
        content: content,
        emotion: emotion
      },
      targetId,
      reload,
      setReload
    });
  }

  const onRemove = (targetId) => {
    dispatch({type: "REMOVE", user, targetId, reload, setReload});
  }

  return (
    <DiaryStateContext.Provider value={diaryList}>
      <DiaryDispatchContext.Provider value={{onCreate, onEdit, onRemove}}>
          <div className="App">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={ <Home forceUpdate={forceUpdate} user={user}/> }/>
                <Route path="/signUp" element={ <SignUp /> } />
                <Route path="/new" element={ <New /> } />
                <Route path="/edit/:id" element={ <Edit /> } />
                <Route path="/diary/:id" element={ <Diary /> } />
              </Routes>
            </BrowserRouter>
          </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;

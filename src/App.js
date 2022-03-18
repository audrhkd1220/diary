import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import New from './pages/New';

import { collection, setDoc, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "./firebase";
import { mdiGmail } from '@mdi/js';




function App() {

  const [test, setTest] = useState({name : "jws" , age : 27},{name : "jhm", age : 27});

  const washingtonRef = doc(db, "web-diary", "test");
  //web-diary컬렉션에 test문서에 필드저장
  const addData = async () => {
    try {
      const res = await setDoc(doc(db, "web-diary", "test"), test);
      console.log(res); // res는 undefined입니다.
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    const docRef = doc(db, 'web-diary', 'test');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  const updateData = async () => {
    await updateDoc(washingtonRef, {
      'aaa@gmail.com': arrayUnion(test)
    });
  }

  useEffect(() => {
  },[]);
  
  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home /> }/>
          <Route path="/signUp" element={ <SignUp /> } />
          <Route path="/new" element={ <New /> } />
          <Route path="/edit/:id" element={ <Edit /> } />
          <Route path="/diary/:id" element={ <Diary /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import SignUp from './pages/SignUp';

import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";



function App() {

  const [test, setTest] = useState({name : "jws" , age : 27});

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
  
  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home /> }/>
          <Route path="/signUp" element={ <SignUp /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

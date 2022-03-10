import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';



function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const email = sessionStorage.getItem('email');
    email != null ? setUser(email) : setUser(null);
  },[user]);
  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ user ? <Home /> : <Login /> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

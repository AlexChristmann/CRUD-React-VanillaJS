import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Personenliste from "./components/Personenliste";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Eingabemaske from "./components/Eingabemaske";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const isAuth = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/verified", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await res.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    isAuth();
  });
//Routing; Personenliste und Eingabemaske sind nur aufrufbar, wenn der Benutzer authentifiziert ist
  return (
    <>
      <Header isAuthenticated={isAuthenticated} setAuth={setAuth} />
      <Routes>
        <Route path="/" element={!isAuthenticated ? (<Login setAuth={setAuth} />) 
            : 
            (<Navigate to="/personenliste" />)
          }/>
        <Route path="register" element={!isAuthenticated ? (<Register setAuth={setAuth} />) 
            : 
            (<Navigate to="/personenliste" />)
          }/>
        <Route path="personenliste"
          element={isAuthenticated ? <Personenliste /> : <Navigate to="/" />}/>
        <Route path="addperson"
          element={isAuthenticated ? <Eingabemaske /> : <Navigate to="/" />}/>
      </Routes>
    </>
  );
};

export default App;

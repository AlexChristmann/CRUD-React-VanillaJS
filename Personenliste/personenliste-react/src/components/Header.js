import React, { useState, useEffect } from "react";

const Header = ({ isAuthenticated, setAuth }) => {
  const logout = (e) => {
    e.preventDefault();
    setAuth(false);
    localStorage.removeItem("token");
    window.alert("Erfolgreich abgemeldet.");
  };

  const [benutzername, setBenutzername] = useState("");

  const getBenutzername = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/personenliste/getbenutzername",
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );
      const parseRes = await res.json();
      setBenutzername(parseRes.benutzername);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getBenutzername();
  });

  return (
    <nav className="navbar navbar-light bg-light">
      <h1 style={{ position: "relative", top: "10px" }}>Personenliste</h1>
      {isAuthenticated && (
        <button
          style={{ position: "absolute", top: "10px", right: "10px" }}
          className="btn btn-success"
          onClick={(e) => logout(e)}>
          Abmelden</button>)}
      <div style={{ position: "absolute", top: "18px", right: "200px" }}>
        {isAuthenticated && `Angemeldet als: ${benutzername}`}
      </div>
    </nav>
  );
};

export default Header;

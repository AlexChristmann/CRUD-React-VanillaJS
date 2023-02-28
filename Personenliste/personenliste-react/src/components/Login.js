import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Login = ({ setAuth }) => {
  const [input, setInput] = useState({
    benutzername: "",
    passwort: "",
  });

  const { benutzername, passwort } = input;

  const onChange = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = input;
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await res.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        window.alert("Erfolgreich angemeldet.");
      } else {
        window.alert(parseRes);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <>
        <h1 className="text-center my-5">Anmelden</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <form className="row g-3" onSubmit={onSubmitForm}>
            <div className="col-auto">
              <input
                type="text" name="benutzername" className="form-control my-3" placeholder="Benutzername" 
                value={benutzername} onChange={(e) => onChange(e)}/>
              <input
                type="password" name="passwort" className="form-control my-3" placeholder="Passwort" 
                value={passwort} onChange={(e) => onChange(e)}/>
              <button className="btn btn-success">Anmelden</button> <br/><br/>
              Noch nicht registriert? Klicke{" "}
              {<Link to={"/register"}>hier</Link>}.
            </div>
          </form>
        </div>
      </>
    </>
  );
};

export default Login;

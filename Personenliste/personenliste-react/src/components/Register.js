import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ setAuth }) => {
  const [input, setInput] = useState({
    benutzername: "",
    passwort: "",
    email: "",
  });

  const { benutzername, passwort, email } = input;

  const onChange = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { benutzername, passwort, email };
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await res.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        window.alert("Erfolgreich registriert.");
      } else {
        window.alert(parseRes);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <h1 className="text-center my-5">Registrierung</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form className="row g-3" onSubmit={(e) => onSubmitForm(e)}>
          <div className="col-auto">
            <input
              type="text" name="benutzername" className="form-control my-3" placeholder="Benutzername" 
              value={benutzername} onChange={(e) => onChange(e)}/>
            <input
              type="password" name="passwort" className="form-control my-3" placeholder="Passwort" 
              value={passwort} onChange={(e) => onChange(e)}/>
            <input
              name="email" className="form-control my-3" placeholder="E-Mail" value={email} onChange={(e) => onChange(e)}/>
            <button className="btn btn-success">Registrieren</button><br/><br/>
            Bereits registriert? Klicke {<Link to={"/"}>hier</Link>} zum
            Anmelden.
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;

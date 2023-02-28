import React, { useState } from "react";
import { Link } from "react-router-dom";

const Eingabemaske = () => {
  //Value der Input Felder werden mit onChange in der Variable input gespeichert
  const [input, setInput] = useState({
    vorname: "",
    nachname: "",
    strasse: "",
    hausnummer: "",
    plz: "",
    ort: "",
    email: "",
    mobilrufnummer: "",
  });
//Destrukturieren der Variable input
  const {
    vorname,
    nachname,
    strasse,
    hausnummer,
    plz,
    ort,
    email,
    mobilrufnummer,
  } = input;

  const onChange = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });
//Personendaten werden ans Backend gesendet
  const onSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const body = input;
      const res = await fetch("http://localhost:5000/personenliste/addperson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await res.json();
      if (parseRes.vorname) {
        window.alert("Person erfolgreich hinzugefügt.");
        window.location = "/personenliste";
      } else {
        window.alert(parseRes);
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  return (
    <>
      <h1 className="text-center my-5">Datensatz zu einer Person erstellen</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form className="row g-3" onSubmit={onSubmitForm}>
          <div className="col-auto">
            <label>Vorname:<input type="text" name="vorname" className="form-control my-3" placeholder="Vorname"
              value={vorname} onChange={onChange}/></label>
            <label>Nachname:<input type="text" name="nachname" className="form-control my-3" placeholder="Nachname"
              value={nachname} onChange={onChange}/></label>
            <label>Straße:<input type="text" name="strasse" className="form-control my-3" placeholder="Strasse"
              value={strasse} onChange={onChange}/></label>
            <label>Hausnummer:<input type="text" name="hausnummer" className="form-control my-3" placeholder="Hausnummer"
              value={hausnummer} onChange={onChange}/></label>
            <div>
            <label>PLZ:<input type="text" name="plz" className="form-control my-3" placeholder="PLZ"
              value={plz} onChange={onChange}/></label>
            <label>Ort:<input type="text" name="ort" className="form-control my-3" placeholder="Ort"
              value={ort} onChange={onChange}/></label>
            <label>E-Mail:<input type="text" name="email" className="form-control my-3" placeholder="E-Mail"
              value={email} onChange={onChange}/></label>
            <label>Mobilrufnummer:<input type="text" name="mobilrufnummer" className="form-control my-3" placeholder="Mobilrufnummer"
              value={mobilrufnummer} onChange={onChange}/></label>
            </div>
            <div className="text-center my-5">
              <button className="btn btn-success">Hinzufügen</button>
              <Link to={"/personenliste"}>
                <button className="btn btn-danger">Abbrechen</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Eingabemaske;

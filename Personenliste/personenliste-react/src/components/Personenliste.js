import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Bearbeitungsmaske from "./Bearbeitungsmaske";

export const Personenliste = () => {

  const [allePersonen, setAllePersonen] = useState([]);


  const getAllPersonen = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/personenliste/getpersonen"
      );
      const parseRes = await res.json();
      setAllePersonen(parseRes);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deletePerson = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/personenliste/deleteperson/${id}`,
        {
          method: "DELETE",
        }
      );
      setAllePersonen(
        allePersonen.filter((person) => person.personen_id !== id)
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getAllPersonen();
  }, []);

  return (
    <>
      <Link
        to={"/addperson"}
        className="btn btn-primary"
        style={{ position: "relative", top: "40px", left: "50px" }}
      >
        Person hinzufügen
      </Link>
      <div className="container">
      <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Vorname</th>
              <th scope="col">Nachname</th>
              <th scope="col">Straße</th>
              <th scope="col">Nr.</th>
              <th scope="col">PLZ</th>
              <th scope="col">Ort</th>
              <th scope="col">E-Mail</th>
              <th scope="col">Tel.</th>
            </tr>
          </thead>
          <tbody>
                //Mapping der Personendaten für die Tabelle
            {allePersonen.map((person) => (
              <tr key={person.personen_id}>
                <td>{person.personen_id}</td>
                <td>{person.vorname}</td>
                <td>{person.nachname}</td>
                <td>{person.strasse}</td>
                <td>{person.hausnummer}</td>
                <td>{person.plz}</td>
                <td>{person.ort}</td>
                <td>{person.email}</td>
                <td>{person.mobilrufnummer}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deletePerson(person.personen_id)}
                  >
                    Löschen
                  </button>
                <Bearbeitungsmaske person={person}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Personenliste;

import React, { useState } from "react";

const Bearbeitungsmaske = ({ person }) => {
    //Value der Input Felder werden mit onChange in der Variable input gespeichert
    const [input, setInput] = useState(person);

    const onChange = (e) =>
        setInput({ ...input, [e.target.name]: e.target.value });
    //Bearbeitete Personendaten werden ans Backend gesendet
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = input;
            const res = await fetch(
                `http://localhost:5000/personenliste/editperson/${person.personen_id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                }
            );
            const parseRes = await res.json();
            if (parseRes === true) {
                window.alert("Person erfolgreich bearbeitet.")
                window.location = "/";
            } else {
                window.alert(parseRes);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#id${person.personen_id}`}>
                Bearbeiten
            </button>
            <div className="modal fade" id={`id${person.personen_id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Person bearbeiten
                            </h1>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <div className="col-auto">
                                        <div>
                                            <label>Vorname:<input type="text" name="vorname" className="form-control my-3 value={vorname}"
                                                placeholder="Vorname" onChange={onChange} value={input.vorname} /></label>
                                            <label>Nachname:<input type="text" name="nachname" className="form-control my-3"
                                                placeholder="Nachname" onChange={onChange} value={input.nachname} /></label>
                                        </div>
                                        <div>
                                            <label>Straße:<input type="text" name="strasse" className="form-control my-3"
                                                placeholder="Straße" onChange={onChange} value={input.strasse} /></label>
                                            <label>Hausnummer:<input type="number" name="hausnummer" className="form-control my-3"
                                                placeholder="Hausnummer" onChange={onChange} value={input.hausnummer} /></label>
                                        </div>
                                        <div>
                                            <label>PLZ:<input type="number" name="plz" className="form-control my-3"
                                                placeholder="PLZ" onChange={onChange} value={input.plz} /></label>
                                            <label>Ort:<input type="text" name="ort" className="form-control my-3"
                                                placeholder="Ort" onChange={onChange} value={input.ort} /></label>
                                        </div>
                                        <div>
                                            <label>E-Mail:<input name="email" className="form-control my-3"
                                                placeholder="E-Mail" onChange={onChange} value={input.email} /></label>
                                            <label>Mobilrufnummer:<input type="number" name="mobilrufnummer"
                                                className="form-control my-3" placeholder="Mobilrufnummer" onChange={onChange} value={input.mobilrufnummer} /></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="modalfooter" className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Schließen
                            </button>
                            <button type="button" className="btn btn-primary" onClick={onSubmitForm}>Änderungen speichern</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Bearbeitungsmaske;

CREATE DATABASE personenmanagement;

CREATE TABLE benutzer(
    benutzer_id SERIAL PRIMARY KEY,
    benutzername VARCHAR(255) NOT NULL,
    passwort VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE personen(
    personen_id SERIAL PRIMARY KEY,
    vorname VARCHAR(255) NOT NULL,
    nachname VARCHAR(255) NOT NULL,
    strasse VARCHAR(255) NOT NULL,
    hausnummer INT NOT NULL,
    plz INT NOT NULL,
    ort VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobilrufnummer BIGINT
);

const router = require("express").Router();
const pool = require("../db.js");
const authorization = require("../middleware/authorization");
const inputvalidation = require("../middleware/inputvalidation");

router.get("/getbenutzername", authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT benutzername FROM benutzer WHERE benutzer_id = $1",
      [req.benutzer_id]
    );
    res.json(user.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/getpersonen", async (req, res) => {
  try {
    const personen = await pool.query(
      "SELECT * FROM personen ORDER BY personen_id ASC"
    );
    res.json(personen.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/addperson", inputvalidation, async (req, res) => {
  try {
    const {
      vorname,
      nachname,
      strasse,
      hausnummer,
      plz,
      ort,
      email,
      mobilrufnummer,
    } = req.body;
    const neuePerson = await pool.query(
      "INSERT INTO personen (vorname, nachname, strasse, hausnummer, plz, ort, email, mobilrufnummer) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [vorname, nachname, strasse, hausnummer, plz, ort, email, mobilrufnummer]
    );
    return res.json(neuePerson.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/deleteperson/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM personen WHERE personen_id = $1", [id]);
    res.json("Person wurde gelöscht.");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/getperson/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const person = await pool.query("SELECT * FROM personen WHERE personen_id = $1", [
      id,
    ]);
    res.json(person.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

router.put("/editperson/:id", inputvalidation, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      vorname,
      nachname,
      strasse,
      hausnummer,
      plz,
      ort,
      email,
      mobilrufnummer,
    } = req.body;
    await pool.query(
      "UPDATE personen SET vorname = $2, nachname = $3, strasse = $4, hausnummer = $5, plz = $6, ort = $7, email = $8, mobilrufnummer = $9 WHERE personen_id = $1",
      [
        id,
        vorname,
        nachname,
        strasse,
        hausnummer,
        plz,
        ort,
        email,
        mobilrufnummer,
      ]
    );
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

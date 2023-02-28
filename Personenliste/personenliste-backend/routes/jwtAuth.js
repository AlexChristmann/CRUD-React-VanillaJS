const router = require("express").Router();
const pool = require("../db.js");
const jwtGenerator = require("../utils/jwtGenerator");
const authorization = require("../middleware/authorization");
const inputvalidation = require("../middleware/inputvalidation");

//Im folgenden trycatch Block wird die Route zum Registrieren implementiert
router.post("/register", inputvalidation, async (req, res) => {
  try {
    //Destrukturierung des Anfragebodys, um auf den Inhalt zuzugreifen.
    const { benutzername, passwort, email } = req.body;

    //Hier wird überprüft, ob die Email oder der Benutzername bereits in der Datenbank vorhanden sind
    //Wenn ja, wird eine Fehlermeldung geworfen.
    const uniqueBenutzer = await pool.query(
      "SELECT * FROM benutzer WHERE email = $1 OR benutzername = $2",
      [email, benutzername]
    );
    if (uniqueBenutzer.rows.length !== 0) {
      return res
        .status(401)
        .json("E-Mail oder Benutzername ist bereits in Verwendung.");
    }

    //Kommt die Email nicht in der Datenbank vor, wird anschließend ein neuer Benutzer in der Datenbank gespeichert
    const neuerBenutzer = await pool.query(
      "INSERT INTO benutzer (benutzername, passwort, email) VALUES ($1, $2, $3) RETURNING *",
      [benutzername, passwort, email]
    );

    //Für den neuen Benutzer wird ein JSON Web Token generiert
    const token = jwtGenerator(neuerBenutzer.rows[0].benutzer_id);
    return res.json({ token });
    //Ist der Server nicht erreichbar, wird eine Fehlermeldung geworfen
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/login", inputvalidation, async (req, res) => {
  try {
    const { benutzername, passwort } = req.body;
    const benutzer = await pool.query(
      "SELECT * FROM benutzer WHERE benutzername = $1",
      [benutzername]
    );

    if (benutzer.rows.length === 0) {
      return res.status(401).json("Falscher Benutzername oder Passwort.");
    }

    const gültigesPasswort = benutzer.rows[0].passwort === passwort;

    if (!gültigesPasswort) {
      return res.status(401).json("Falscher Benutzername oder Passwort.");
    }

    const token = jwtGenerator(benutzer.rows[0].benutzer_id);

    return res.send({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/verified", authorization, async (req, res) => {
  try {
    res.send(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

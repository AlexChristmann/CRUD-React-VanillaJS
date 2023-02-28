const jwt = require("jsonwebtoken");
require("dotenv").config();

//In dieser Funktion wird das JSON Web Token signiert.
//Die Benutzer-ID wird im Objekt "payload" gespeichert und and die sign() Funktion weitergegeben.
//Damit ein Token signiert werden kann, wird ein Secret benötigt, welches in einer .env Datei gespeichert wird.
const jwtGenerator = (benutzer_id) => {
  const payload = {
    benutzer_id,
  };

  return jwt.sign(payload, process.env.JSON_WEBTOKEN_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = jwtGenerator;

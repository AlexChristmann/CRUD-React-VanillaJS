module.exports = (req, res, next) => {
  const { id } = req.params;
  const {
    benutzername,
    passwort,
    email,
    vorname,
    nachname,
    strasse,
    hausnummer,
    plz,
    ort,
    mobilrufnummer,
  } = req.body;

  validVorname = (vorname) => {
    return /^[A-ZÖÄÜa-zäöüß-\s]+$/.test(vorname);
  };

  validNachname = (nachname) => {
    return /^[A-ZÖÄÜa-zäöüß-\s]+$/.test(nachname);
  };

  validStrasse = (strasse) => {
    return /^[A-ZÖÄÜa-zäöüß-\s]+$/.test(strasse);
  };

  validHausnummer = (hausnummer) => {
    return /^[0-9]+$/.test(hausnummer);
  };

  validPlz = (plz) => {
    return /^[0-9]{5}$/.test(plz);
  };

  validOrt = (ort) => {
    return /^[A-ZÖÄÜa-zäöüß-\s]+$/.test(ort);
  };

  validEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  validMobilrufnummer = (mobilrufnummer) => {
    return /^[0-9]+$/.test(mobilrufnummer);
  };

  if (req.path === "/register") {
    if (![benutzername, passwort, email].every(Boolean)) {
      return res.status(401).json("Daten nicht vollständig ausgefüllt.");
    } else if (!validEmail(email)) {
      return res.status(401).json("Ungültige E-Mail.");
    }
  } else if (req.path === "/login") {
    if (![benutzername, passwort].every(Boolean)) {
      return res.status(401).json("Anmeldedaten nicht vollständig ausgefüllt.");
    }
  } else if (req.path === "/addperson") {
    if (!validVorname(vorname)) {
      return res.status(401).json("Ungültiger Vorname.");
    } else if (!validNachname(nachname)) {
      return res.status(401).json("Ungültiger Nachname.");
    } else if (!validStrasse(strasse)) {
      return res.status(401).json("Ungültige Straße.");
    } else if (!validHausnummer(hausnummer)) {
      return res.status(401).json("Ungültige Hausnummer.");
    } else if (!validPlz(plz)) {
      return res.status(401).json("Ungültige PLZ.");
    } else if (!validOrt(ort)) {
      return res.status(401).json("Ungültiger Ort.");
    } else if (!validEmail(email)) {
      return res.status(401).json("Ungültige E-Mail.");
    } else if (!validMobilrufnummer(mobilrufnummer)) {
      return res.status(401).json("Ungültige Mobilrufnummer.");
    }
  } else if (req.path === `/editperson/${id}`) {
    if (!validVorname(vorname)) {
      return res.status(401).json("Ungültiger Vorname.");
    } else if (!validNachname(nachname)) {
      return res.status(401).json("Ungültiger Nachname.");
    } else if (!validStrasse(strasse)) {
      return res.status(401).json("Ungültige Straße.");
    } else if (!validHausnummer(hausnummer)) {
      return res.status(401).json("Ungültige Hausnummer.");
    } else if (!validPlz(plz)) {
      return res.status(401).json("Ungültige PLZ.");
    } else if (!validOrt(ort)) {
      return res.status(401).json("Ungültiger Ort.");
    } else if (!validEmail(email)) {
      return res.status(401).json("Ungültige E-Mail.");
    } else if (!validMobilrufnummer(mobilrufnummer)) {
      return res.status(401).json("Ungültige Mobilrufnummer.");
    }
  }
  next();
};

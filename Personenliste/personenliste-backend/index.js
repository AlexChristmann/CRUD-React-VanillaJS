const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use("/auth", require("./routes/jwtAuth"));
app.use("/personenliste", require("./routes/personenliste"))

app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`)
});

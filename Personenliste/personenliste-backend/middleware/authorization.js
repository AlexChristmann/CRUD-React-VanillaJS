const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
    try {
        const token = req.header("token");
        if (!token) {
            res.status(403).json("Nicht autorisiert.")
        }
        const payload = jwt.verify(token, process.env.JSON_WEBTOKEN_SECRET);
        req.benutzer_id = payload.benutzer_id;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(403).json("Nicht autorisiert.")
    }
}
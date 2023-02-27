const express = require("express");
const router = express();

//teste
router.get("/", (req, res) => {
    res.send("primeira rota");
})

module.exports = router;
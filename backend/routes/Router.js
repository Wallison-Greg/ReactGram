const express = require("express");
const router = express();

router.use("/api/users", require("./UserRoutes"));

//teste
router.get("/", (req, res) => {
    res.send("primeira rota");
})

module.exports = router;
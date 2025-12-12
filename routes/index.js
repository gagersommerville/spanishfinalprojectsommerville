const express = require("express");
const router = express.Router();
const data = require("../data/states.es.json");

router.get("/", (req, res) => {
  res.render("index", {
    title: "Mapa cultural de México",
    states: data.states
  });
});

module.exports = router;
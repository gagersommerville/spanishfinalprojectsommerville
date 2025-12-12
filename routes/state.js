const express = require("express");
const router = express.Router();
const data = require("../data/states.es.json");

router.get("/:slug", (req, res) => {
  const state = data.states.find(s => s.slug === req.params.slug);
  if (!state) return res.status(404).send("Estado no encontrado");

  res.render("state", {
    title: state.name,
    state
  });
});

module.exports = router;
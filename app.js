const express = require("express");
const path = require("path");

const indexRouter = require("./routes/index");
const stateRouter = require("./routes/state");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/estado", stateRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

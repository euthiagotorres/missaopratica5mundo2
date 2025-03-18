const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors"); // Importa o sistema CORS

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const livroRouter = require("./routes/livros"); // Importa as rotas de livros

const app = express();

// Configura o sistema de CORS
app.use(cors());

// Configurações padrão do Express
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Rotas padrão
app.use("/", indexRouter);
app.use("/users", usersRouter);

// Rotas de livros
app.use("/livros", livroRouter);

// Tratamento de erros
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

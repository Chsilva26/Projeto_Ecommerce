const compression = require('compression');
const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

// STARTnp 

app.use(compression());
app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// AMBIENTE
const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000; 

// ARQUIVOS ESTÁTICOS
app.use("/public", express.static(__dirname + "/public"));
app.use("/public/images", express.static(__dirname + "/public/images"));

// SETUP MONGODB
const dbs = require("../config/database.json")
dbURI = isProduction ? dbs.dbProduction : dbs.dbTest;
mongoose.connect(dbURI, {useNewUrlParser: true});

// SETUP EJS
app.set("view engine", "ejs");

// CONFIGURACOES
if(!isProduction) app.use(morgan("dev"));
app.use(cors());
app.disable("x-powered-by");
app.use(compression());

// SETUP BODY PARSER
app.use(bodyParser.urlencoded({extended: false, limit: 1.5*1024*1024 }));
app.use(bodyParser.json({limit: 1.5*1024*1024 }));


// MODELS
require("./models");

// ROTAS
app.get("/", (req, res) => {
    res.json({ ok: true, msg: "API Ecommerce rodando!" });
});
app.use("/api/v1", require("./routes/api/v1"));

// 404 - ROTA
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// ROTA - 422, 500, 401
app.use((err, req, next) => {
    res.status(err.status || 500);
    if(err.status !== 404) console.warn("Error: ", err.message, new Date());
    res.json(err);
}); 

// ESCUTAR
app.listen(PORT, (err) => {
    if(err) throw err;
    console.log(`Rodando na //localhost:${PORT}`);
});
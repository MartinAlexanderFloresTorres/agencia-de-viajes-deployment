/* const express = require("express"); */
import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";

import { config } from "dotenv";
config({path: './variables.env'});

const app = express();

//=============== conectar la base de datos ===============
db.authenticate()
    .then(() => console.log("Datos conectados"))
    .catch((error) => console.log(error));

//=============== habilitar pug ===============
app.set("view engine", "pug");

//=============== obtener el año actual ===============
app.use((req, res, next) => {
    const year = new Date();
    res.locals.ActualYear = year.getFullYear();
    res.locals.InicioSitio = "Agencia de Viajes";
    next();
});

//=============== agregar body parser para leer los datos del formulario ===============
app.use(express.urlencoded({ extended: true }));

//=============== definir la carpeta publica ===============
app.use(express.static("public"));

//=============== agregar router ===============
app.use("/", router);


//=============== puerto y host para la app ===============
const port = process.env.PORT || 4200;

const host = process.env.HOST || "0.0.0.0";

//=============== Iniciar servidor ===============
app.listen(port, host, () => console.log("EL SERVIDOR ESTA FUNCIONANDO"));

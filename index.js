import fs from "fs";
import bodyParser from "body-parser";
import express from "express";
import reservesRoutes from "./routes/reservesss.js";
import recursosRoutes from "./routes/recursosss.js";

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));//carpeta publica pel css
app.set('view engine','ejs');//Fem servir el motor ejs
app.set('views', './views'); //carpeta on desem els arxius .ejs

//Ruta inicial 
app.get("/", (req, res) => {
    res.render("home");
});

app.use("/recursosss", recursosRoutes);
app.use("/reservesss", reservesRoutes);

//Escucho
app.listen(3002, () => {
    console.log("Server listening on port 3002");
});
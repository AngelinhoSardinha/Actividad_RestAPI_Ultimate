import fs from "fs";
import bodyParser from "body-parser";
import express from "express";
import reservesRoutes from "./routes/reserves.js";
import recursosRoutes from "./routes/recursos.js"; 
import notificationsRoutes from "./routes/notifications.js"; 
import usuarisRoutes from "./routes/usuaris.js"; 


const app = express();
app.use(express.json());
app.use(express.static("public"));//carpeta publica pel css
app.use(express.urlencoded({extended: true}));
app.set('view engine','ejs');//Fem servir el motor ejs
app.set('views', './views'); //carpeta on desem els arxius .ejs

//Ruta inicial 
app.get("/", (req, res) => {
    res.render("home");
});

app.use("/recursos", recursosRoutes);
app.use("/reserves", reservesRoutes);
app.use("/notifications", notificationsRoutes);
app.use("/usuaris", usuarisRoutes);

//Escucho
app.listen(3002, () => {
    console.log("Server listening on port 3002");
});
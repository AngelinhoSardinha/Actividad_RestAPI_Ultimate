import fs from "fs";
import bodyParser from "body-parser";
import express from "express";

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));//carpeta publica pel css
app.set('view engine','ejs');//Fem servir el motor ejs
app.set('views', './views'); //carpeta on desem els arxius .ejs

const readDataReservas = () => {
    try {
        const data = fs.readFileSync("./reserves.json");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

const readDataRecursos = () => {
    try {
        const data = fs.readFileSync("./recursos.json");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

const writeDataReservas = (data) => {
    try {
        fs.writeFileSync("./reserves.json", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
};

const writeDataRecursos = (data) => {
    try {
        fs.writeFileSync("./recursos.json", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
};


//Ruta inicial 
app.get("/", (req, res) => {
    res.render("home");
});

//Endpoint recusos
app.get('/recursos', (req, res) => {
    const user={name:"Angel"}
    const htmlMessage = `
    <p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
    <a href="https://www.example.com">Visita Example</a>`;
    const data = readDataRecursos();
    res.render("recursos",{user, data,htmlMessage})
    //res.json(data.products);
 }); 

//Endpoint reservas
app.get('/reserves', (req, res) => {
    const user={name:"Angel"}
    const htmlMessage = `
    <p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
    <a href="https://www.example.com">Visita Example</a>`;
    const data = readDataReservas();
    res.render("reserves",{user, data,htmlMessage})
    //res.json(data.products);
 });

 // Endpoint per obtenir una reserva per id
app.get("/reserves/:id", (req, res) => {
    const data = readDataReservas();
    const user = {name:"Angel"}
    const id = parseInt(req.params.id);
    const reserva = data.reserves.find((reserva) => reserva.id === id);
    res.render("reservesDetall", {user, reserva});
});

// Endpoint per obtenir un recurs per un id
app.get("/recursos/:id", (req, res) => {
    const data = readDataRecursos();
    const user = {name:"Angel"}
    const id = parseInt(req.params.id);
    const recurso = data.recursos.find((recurso) => recurso.id === id);
    res.render("recursosDetall", {user, recurso})
});

//Escucho
app.listen(3002, () => {
    console.log("Server listening on port 3002");
});
import express from "express";
import fs from "fs"; // Treballar amb arxius
import bodyParser from "body-parser"; // Ho afegim per entendre que estem rebent un json des de la petició post.

// Creo l'objecte de l'aplicació
const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./reserves.json");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

// Funció per escriure informació
const writeData = (data) => {
    try {
        fs.writeFileSync("./reserves.json", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
};

// Ruta inicial
app.get("/", (req, res) => {
    res.send("Welcome to my API with Node.js for managing reserves");
});

// Endpoint per obtenir totes les reserves
app.get("/reserves", (req, res) => {
    const data = readData();
    res.json(data.reserves);
});

// Endpoint per obtenir una reserva per id
app.get("/reserves/:id", (req, res) => { 
    const data = readData();
    const id = parseInt(req.params.id);
    const reserve = data.reserves.find((reserve) => reserve.id === id);
    res.json(reserve);
});

// Endpoint POST per afegir una reserva
app.post("/reserves", (req, res) => {
    const data = readData();
    const body = req.body;
    const newReserve = {
        id: data.reserves.length + 1,
        ...body,
    };
    data.reserves.push(newReserve);
    writeData(data);
    res.json(newReserve);
});

// Endpoint PUT per modificar una reserva
app.put("/reserves/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const reserveIndex = data.reserves.findIndex((reserve) => reserve.id === id);
    data.reserves[reserveIndex] = {
        ...data.reserves[reserveIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "Reserva actualitzada amb èxit" });
});

// Endpoint DELETE per eliminar una reserva
app.delete("/reserves/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const reserveIndex = data.reserves.findIndex((reserve) => reserve.id === id);
    data.reserves.splice(reserveIndex, 1);
    writeData(data);
    res.json({ message: "Reserva eliminada amb èxit" });
});

// Funció per escoltar
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

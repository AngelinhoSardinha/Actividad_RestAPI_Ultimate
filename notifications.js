import express from "express";
import fs from "fs"; // Treballar amb arxius
import bodyParser from "body-parser"; // Ho afegim per entendre que estem rebent un json des de la petició post.

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./notifications.json");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./notifications.json", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
};

app.get("/", (req, res) => {
    res.send("Welcome to my first API with Node.js");
});

// Endpoint per obtenir totes les notificacions
app.get("/notificacions", (req, res) => {
    const data = readData();
    res.json(data.notificacions);
});

// Endpoint per obtenir una notificació per id
app.get("/notificacions/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const notificacio = data.notificacions.find((notif) => notif.id === id);
    res.json(notificacio);
});

// Endpoint per afegir una nova notificació
app.post("/notificacions", (req, res) => {
    const data = readData();
    const body = req.body;
    const newNotificacio = {
        id: data.notificacions.length + 1,
        ...body,
    };
    data.notificacions.push(newNotificacio);
    writeData(data);
    res.json(newNotificacio);
});

// Endpoint per modificar una notificació
app.put("/notificacions/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const notificacioIndex = data.notificacions.findIndex((notif) => notif.id === id);
    data.notificacions[notificacioIndex] = {
        ...data.notificacions[notificacioIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "Notificació actualitzada correctament" });
});

// Endpoint per eliminar una notificació
app.delete("/notificacions/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const notificacioIndex = data.notificacions.findIndex((notif) => notif.id === id);
    data.notificacions.splice(notificacioIndex, 1);
    writeData(data);
    res.json({ message: "Notificació eliminada correctament" });
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
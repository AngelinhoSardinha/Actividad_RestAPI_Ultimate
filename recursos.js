import express from "express";
import fs from "fs"; // Treballar amb arxius
import bodyParser from "body-parser"; // Ho afegim per entendre que estem rebent un json des de la petició post.

// Creo l'objecte de l'aplicació
const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./recursos.json");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

// Funció per escriure informació
const writeData = (data) => {
    try {
        fs.writeFileSync("./recursos.json", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
};

// Ruta inicial
app.get("/", (req, res) => {
    res.send("Welcome to my first API with Node.js");
});

// Endpoint per obtenir tots els recursos
app.get("/recursos", (req, res) => {
    const data = readData();
    res.json(data.recursos);
}); 

// Endpoint per obtenir un recurs per un id
app.get("/recursos/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const recurso = data.recursos.find((recurso) => recurso.id === id);
    res.json(recurso);
});

// Endpoint POST per afegir un recurs
app.post("/recursos", (req, res) => {
    const data = readData();
    const body = req.body;
    const newRecurso = {
        id: data.recursos.length + 1,
        ...body,
    };
    data.recursos.push(newRecurso);
    writeData(data);
    res.json(newRecurso);
});

// Endpoint PUT per modificar un recurs
app.put("/recursos/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const recursoIndex = data.recursos.findIndex((recurso) => recurso.id === id);
    data.recursos[recursoIndex] = {
        ...data.recursos[recursoIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "Recurso actualizado con éxito" });
});

// Endpoint DELETE per eliminar un recurs
app.delete("/recursos/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const recursoIndex = data.recursos.findIndex((recurso) => recurso.id === id);
    data.recursos.splice(recursoIndex, 1);
    writeData(data);
    res.json({ message: "Recurso eliminado con éxito" });
});

// Funció per escoltar
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

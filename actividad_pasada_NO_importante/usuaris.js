import express from "express";
import fs from "fs"; // Treballar amb arxius
import bodyParser from "body-parser"; // Ho afegim per entendre que estem rebent un json des de la petició post.

// Creo l'objecte de l'aplicació
const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./usuaris.json");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
}; 

// Funció per escriure informació
const writeData = (data) => {
    try {
        fs.writeFileSync("./usuaris.json", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
};

// Ruta inicial
app.get("/", (req, res) => {
    res.send("Welcome to my API for managing users");
});

// Endpoint per obtenir tots els usuaris
app.get("/usuaris", (req, res) => {
    const data = readData();
    res.json(data.Usuaris);
});

// Endpoint per obtenir un usuari per id
app.get("/usuaris/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const user = data.Usuaris.find((user) => user.id === id);
    res.json(user);
});

// Endpoint POST per afegir un usuari
app.post("/usuaris", (req, res) => {
    const data = readData();
    const body = req.body;
    const newUser = {
        id: data.Usuaris.length + 1,
        ...body,
    };
    data.Usuaris.push(newUser);
    writeData(data);
    res.json(newUser);
});

// Endpoint PUT per modificar un usuari
app.put("/usuaris/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const userIndex = data.Usuaris.findIndex((user) => user.id === id);
    console.log(userIndex);
    data.Usuaris[userIndex] = {
        ...data.Usuaris[userIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "Usuari actualitzat amb èxit" });
});

// Endpoint DELETE per eliminar un usuari
app.delete("/usuaris/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const userIndex = data.Usuaris.findIndex((user) => user.id === id);
    data.Usuaris.splice(userIndex, 1);
    writeData(data);
    res.json({ message: "Usuari eliminat amb èxit" });
});

// Funció per escoltar
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

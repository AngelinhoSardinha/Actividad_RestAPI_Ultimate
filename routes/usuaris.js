import express from 'express';
import fs from 'fs';

const router = express.Router();

const readDataUsuaris = () => {
    try {
        const data = fs.readFileSync("./usuaris.json");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

const writeDataUsuaris = (data) => {
    try {
        fs.writeFileSync("./usuaris.json", JSON.stringify(data, null, 2)); // formato bonito
    } catch (error) {
        console.log(error);
    }
};

// Endpoint para obtener todos los usuarios
router.get('/', (req, res) => {
    const user = { name: "Angel" };
    const htmlMessage = `<a href="http://localhost:3002/">Home</a>`;
    const data = readDataUsuaris();
    res.render("usuaris", { user, data, htmlMessage });
});

// Endpoint para obtener un usuario por ID
router.get("/:id", (req, res) => {
    const data = readDataUsuaris();
    const user = { name: "Angel" };
    const id = parseInt(req.params.id);
    const usuari = data.Usuaris.find((usuari) => usuari.id === id); // --> CORREGIDO "Usuaris"

    if (!usuari) {
        return res.status(404).send("Usuari no trobat");
    }

    res.render("usuarisDetail", { user, usuari });
});

export default router;
import express from 'express';
import fs from 'fs';

const router = express.Router()


const readDataRecursos = () => {
    try {
        const data = fs.readFileSync("./recursos.json");
        return JSON.parse(data);
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

//Endpoint recusos
router.get('/', (req, res) => {
    const user={name:"Angel"}
    const htmlMessage = `
    <a href="http://localhost:3002/">Home</a>`;
    const data = readDataRecursos();
    res.render("recursos",{user, data,htmlMessage})
    //res.json(data.products);
 }); 

// Endpoint per obtenir un recurs per un id
router.get("/:id", (req, res) => {
    const data = readDataRecursos();
    const user = {name:"Angel"}
    const id = parseInt(req.params.id);
    const recurso = data.recursos.find((recurso) => recurso.id === id);
    res.render("recursosDetall", {user, recurso})
});

export default router;
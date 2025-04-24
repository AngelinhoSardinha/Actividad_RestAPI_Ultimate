import express from 'express';
import fs from 'fs';

const router = express.Router()


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
        fs.writeFileSync("./usuaris.json", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
}; 

//Endpoint recusos
router.get('/', (req, res) => {
    const user={name:"Angel"}
    const htmlMessage = `
    <p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
    <a href="http://localhost:3002/">Home</a>`;
    const data = readDataUsuaris();
    res.render("usuaris",{user, data,htmlMessage})
    //res.json(data.products);
 }); 

// Endpoint per obtenir un recurs per un id
router.get("/:id", (req, res) => {
    const data = readDataUsuaris();
    const user = {name:"Angel"}
    const id = parseInt(req.params.id);
    const usuari = data.usuaris.find((usuari) => usuari.id === id);
    res.render("usuarisDetail", {user, usuari})
});

export default router;
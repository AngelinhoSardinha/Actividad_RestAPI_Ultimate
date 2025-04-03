import express from 'express';
import fs from 'fs';

const router = express.Router()

const readDataReservas = () => {
    try {
        const data = fs.readFileSync("./reserves.json");
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
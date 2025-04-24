import express from 'express';
import fs from 'fs';

const router = express.Router()

const readDataNotifications = () => {
    try{
        const data = fs.readFileSync("./notifications.json");
        return JSON.parte(data)
    } catch (error) {
        console.log(error);
    }
};

const writeDataNotifications = (data) => {
    try {
        fs.writeFileSync("./notifications.json", JSON.stringify(data));
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
    const data = readDataNotifications();
    res.render("notifications",{user, data,htmlMessage})
    //res.json(data.products);
 }); 

// Endpoint per obtenir un recurs per un id
router.get("/:id", (req, res) => {
    const data = readDataNotifications();
    const user = {name:"Angel"}
    const id = parseInt(req.params.id);
    const notification = data.notifications.find((notification) => notification.id === id);
    res.render("notificationsDetail", {user, notification})
});

export default router;
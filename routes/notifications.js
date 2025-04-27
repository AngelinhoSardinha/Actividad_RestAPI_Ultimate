import express from 'express';
import fs from 'fs';

const router = express.Router();

const readDataNotifications = () => {
    try {
        const data = fs.readFileSync("./notifications.json");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

const writeDataNotifications = (data) => {
    try {
        fs.writeFileSync("./notifications.json", JSON.stringify(data, null, 2)); // Formato bonito
    } catch (error) {
        console.log(error);
    }
};

// Endpoint para obtener todas las notificaciones
router.get('/', (req, res) => {
    const user = { name: "Angel" };
    const htmlMessage = `<a href="http://localhost:3002/">Home</a>`;
    const data = readDataNotifications();
    res.render("notifications", { user, data, htmlMessage });
});

// Endpoint para obtener una notificación por ID
router.get("/:id", (req, res) => {
    const data = readDataNotifications();
    const user = { name: "Angel" };
    const id = parseInt(req.params.id);
    const notification = data.notificacions.find((notification) => notification.id === id); // <-- corregido

    if (!notification) {
        return res.status(404).send("Notificació no trobada");
    }

    res.render("notificationsDetail", { user, notification });
});

export default router;
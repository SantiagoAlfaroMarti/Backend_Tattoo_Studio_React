"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const services_controller_1 = require("./controllers/services.controller");
const users_controller_1 = require("./controllers/users.controller");
const appointments_controller_1 = require("./controllers/appointments.controller");
const db_1 = require("./database/db");
const app = (0, express_1.default)();
//Middleware
app.use(express_1.default.json());
const PORT = process.env.PORT || 4000;
app.get('/healthy', (req, res) => {
    //res.send('Server is healthy')
    res.status(200).json({
        success: true,
        message: "Server is healthy"
    });
});
//Services
app.post('/services', services_controller_1.createService);
app.put('/services/:id', services_controller_1.updateServiceById);
app.delete('/services/:id', services_controller_1.deleteServiceById);
//Appointments
app.get('/appointments', (req, res) => {
    res.send('GET ALL APPOINTMENTS');
});
app.post('/appointments', appointments_controller_1.createAppointment);
app.put('/appointments/:id', appointments_controller_1.updateAppointmentById);
app.delete('/appointments/:id', appointments_controller_1.deleteAppointmentById);
//Users
app.get('/users', (req, res) => {
    res.send('GET ALL USERS');
});
app.post('/users', users_controller_1.createUser);
app.put('/users/:id', users_controller_1.updateUserById);
app.delete('/users/:id', users_controller_1.deleteUserById);
db_1.AppDataSource.initialize()
    .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch(error => {
    console.log(error);
});

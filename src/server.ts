import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { createService, deleteServiceById, updateServiceById } from './controllers/services.controller';
import { createUser, deleteUserById, updateUserById } from './controllers/users.controller';
import { createAppointment, deleteAppointmentById, updateAppointmentById } from './controllers/appointments.controller';
import { AppDataSource } from './database/db';
import { createRole, deleteRoleById, updateRoleById } from './controllers/roles.controller';

const app = express();

// MIDDLEWARE
app.use(express.json())

const PORT = process.env.PORT || 4000;

app.get('/healthy', (req, res) => {
    res.status(200).json(
        {
     success: true,
     message: "Server is healthy"
    }
)
})


// Services CRUD
app.get('/services', (req, res) => {
    res.send('GET ALL SERVICES')
})
app.post('/services', createService)
app.put('/services/:id', updateServiceById);
app.delete('/services/:id', deleteServiceById);

// Appointments CRUD
app.get('/appointments', (req, res) => {
    res.send('GET ALL APPOINTMENTS')
})
app.post('/appointments', createAppointment);
app.put('/appointments/:id', updateAppointmentById);
app.delete('/appointments/:id', deleteAppointmentById);

// Users CRUD
app.get('/users', (req, res) => {
    res.send('GET ALL USERS')
})
app.post('/users', createUser);
app.put('/users/:id', updateUserById);
app.delete('/users/:id', deleteUserById);

// Roles CRUD
app.get('/roles', (req, res) => {
    res.send('GET ALL USERS')
})
app.post('/roles', createRole);
app.put('/roles/:id', updateRoleById);
app.delete('/roles/:id', deleteRoleById);


AppDataSource.initialize()
    .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    })
})
.catch(error => {
console.log(error)
})
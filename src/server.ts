import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { createService, deleteServiceById, updateServiceById } from './controllers/services.controller';
import { createUser, deleteUserById, updateUserById } from './controllers/users.controller';
import { createAppointment, deleteAppointmentById, updateAppointmentById } from './controllers/appointments.controller';
import { AppDataSource } from './database/db';



const app = express();

//Middleware
app.use(express.json())

const PORT = process.env.PORT || 4000;

app.get('/healthy', (req, res) => {
    //res.send('Server is healthy')

    res.status(200).json(
        {
     success: true,
     message: "Server is healthy"
    }
)
})

//Services
app.post('/services', createService)
app.put('/services/:id', updateServiceById);
app.delete('/services/:id', deleteServiceById);

//Appointments
app.get('/appointments', (req, res) => {
    res.send('GET ALL APPOINTMENTS')
})

app.post('/appointments', createAppointment);
app.put('/appointments/:id', updateAppointmentById);
app.delete('/appointments/:id', deleteAppointmentById);

//Users
app.get('/users', (req, res) => {
    res.send('GET ALL USERS')
})
app.post('/users', createUser);
app.put('/users/:id', updateUserById);
app.delete('/users/:id', deleteUserById);





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
import express from 'express';
import 'dotenv/config'

import { AppDataSource } from './database/db';
import { getAllUsers, getProfileByUserId, getUserProfile, modifyUserProfile } from './controllers/users.controller';
import { register, userLogIn } from './controllers/auth.controller';
import { createService, deleteService, getAllServices, updateSerivce } from './controllers/services.controller';
import { auth } from './middlewares/auths';
import { isAdmin } from './middlewares/isAdmin';
import { createAppointment, deleteAppointment, findAppointmendById, showMyAppointments, updateAppointment } from './controllers/appointments.controllers';
import { createRole, getRoles, updateRole } from './controllers/roles.controllers';

const app = express();
app.use(express.json())

const PORT = process.env.port || 4000;

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch(error => {
        console.log(error)
    })

// Autenticación //

// Crear nuevo usuario //
app.post('/api/auth/register', register)
// Login usuario //
app.post('/api/auth/login', userLogIn)

// Usuarios //

// Mostrar todos los usuarios de la DB //
app.get('/api/users', auth, isAdmin, getAllUsers) 
// Ver el perfil del usuario //   
app.get('/api/users/profile',  auth, getUserProfile)
// Modificar el perfil del usuario //     
app.put('/api/users/profile', auth, modifyUserProfile)
app.get('/api/users/profile/:id', auth, isAdmin, getProfileByUserId)


// Citas //

// Crear nueva cita //
app.post('/api/appointments/create', auth, createAppointment)
// Actualizar una cita //
app.put('/api/appointments/change', auth, updateAppointment)
// Mostrar todas mis citas //
app.get('/api/appointments/scheduled', auth, showMyAppointments)
// Eliminar una cita //
app.delete('/api/appointments/delete', auth, deleteAppointment)
// Mostrar una cita por Id //
app.get('/api/appointments/:id', auth, findAppointmendById)              

// Servicios //

// Mostrar todo los servicios //
app.get('/api/services', getAllServices)
// Crear un nuevo servicio //
app.post('/api/services', auth, isAdmin, createService)
// Actualizar un servicio //
app.put('/api/services/:id', auth, isAdmin, updateSerivce)
// Eliminar un servicio //
app.delete('/api/services/:id', auth, isAdmin, deleteService)

// Roles //

// Mostrar todos los roles //
app.get('/api/roles', auth, isAdmin, getRoles)
// Crear nuevo rol //
app.post('/api/roles/create', auth, isAdmin, createRole)
// Actualizar un rol //
app.put('/api/roles/update/:id', auth, isAdmin, updateRole)
// Eliminar un rol //
app.delete('/api/roles/delete', auth, isAdmin) 
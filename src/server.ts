import express from 'express';
import 'dotenv/config'
import { AppDataSource } from './database/db';
import { changeUserRole, deleteUserById, getAllUsers, getUserByEmail, getUserProfile, modifyUserProfile } from './controllers/users.controller';
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



// AUTHENTICATION CRUD

app.post('/api/auth/register', register)       // to create new user  - pass to Thunder > body > email + password
app.post('/api/auth/login', userLogIn)   //to log in to your account   - pass to Thunder > auth > your token hash


// USERS CRUD

app.get('/api/users', auth, isAdmin, getAllUsers)       //To show all users in our DB in admin POV         - pass to Thunder > auth > your token hash
app.get('/api/users/profile',  auth, getUserProfile)             //To see user profile as user POV          - pass to Thunder > auth > your token hash
app.put('/api/users/profile', auth, modifyUserProfile)             // To modify(update) user profile as user POV    - pass to Thunder > auth > your token hash + body > info to be updated ex. email
app.get('/api/users/:email', auth, isAdmin, getUserByEmail)         // to get user by mail
app.delete('/api/users/:id', auth, isAdmin, deleteUserById)        //to eliminate User finded by ID
app.put('/api/users/:id/role', auth, isAdmin, changeUserRole)      // to change User role finded by ID


//APPOINTMENTS CRUD

app.post('/api/appointments/create', auth, createAppointment)          //Create new appointment           - pass to Thunder > auth > your token hash
app.put('/api/appointments/change', auth, updateAppointment)          //Update an appointment           - pass to Thunder > auth > your token hash
app.get('/api/appointments/scheduled', auth, showMyAppointments)     //Show all my appointments        - pass to Thunder > auth > your token hash
app.delete('/api/appointments/delete', auth, deleteAppointment)      //to delete selected appoitnment
app.get('/api/appointments/:id', auth, findAppointmendById)         //Show an appointment by ID                - pass to Thunder > auth > your token hash


// SERVICES CRUD

app.get('/api/services', getAllServices)                            // to see all the services
app.post('/api/services', auth, isAdmin, createService)             //to create a service
app.put('/api/services/:id', auth, isAdmin, updateSerivce)          // to update a service by its ID
app.delete('/api/services/:id', auth, isAdmin, deleteService)        // to delete a service by its ID


// ROLES CRUD

app.get('/api/roles', auth, isAdmin, getRoles)                     // to see all roles
app.post('/api/roles/create', auth, isAdmin, createRole)           //to make new role
app.put('/api/roles/update/:id', auth, isAdmin, updateRole)      //to update role by its ID
app.delete('/api/roles/delete', auth, isAdmin)                  //to delete a role by its ID 
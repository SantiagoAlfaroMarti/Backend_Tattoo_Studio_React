import 'dotenv/config'
import express from 'express';




const app = express();

//Middleware
app.use(express.json())

const PORT = process.env.port || 4000;

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

app.post('/appointments', createApointment);
app.put('/appointments/:id', updateAppointmentById);
app.delete('/appointments/:id', deleteAppointmentById);

//Users
app.get('/users', (req, res) => {
    res.send('GET ALL USERS')
})
app.post('/users', createUser);
app.put('/users/:id', updateUserById);
app.delete('/users/:id', deleteUserById);

//Roles
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
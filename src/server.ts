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
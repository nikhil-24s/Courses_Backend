require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user')
const addCourse = require('./routes/courses')
const connectToDB = require('./config/db')
const {Admin} = require('./controller/user')

const express = require('express')
const app = express()
const path = require("path");

// connect to DB
connectToDB()

// Admin created 
Admin()

// Middleware 
app.use(cors({origin:'http://localhost:5173', credentials: true}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use('/api',userRoutes)
app.use('/api',addCourse)

// Server Start 
const port = process.env.port || 4000

app.listen(port , (error)=>{
    if (error) {
        console.log(`Failed to start server : ${error}`);
    } else {
        console.log(`server running on port ${port}`);
    }
})
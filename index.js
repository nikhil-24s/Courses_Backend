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
app.use(cors({
    origin: ['https://courses-frontend-three.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/" ,(req , res)=>{
    res.send("hello server is running")
})
// Routes
app.use('/api',userRoutes)
app.use('/api',addCourse)

// Server Start 
const port = process.env.PORT || 4000

app.listen(port , (error)=>{
    if (error) {
        console.log(`Failed to start server : ${error}`);
    } else {
        console.log(`server running on port ${port}`);
    }
})
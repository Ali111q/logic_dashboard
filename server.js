const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const universityRoutes = require('./routes/universityRoutes')
const colleageRoutes = require('./routes/colleageRoutes')
const courseRoutes = require('./routes/courseRoutes')
const videoRoutes = require('./routes/videoRoutes')
const authRoutes = require('./routes/authRoutes')
const branchRoutes = require('./routes/branchRoutes')
const bodyParser = require('body-parser');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // maximum 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});

const app = express()

dotenv.config()

app.use(bodyParser.json())
app.use(cors())
app.use(limiter)

const port = process.env.PORT
//done
app.use('/', authRoutes.postAdminSignUp)
//done
app.use('/', universityRoutes.getAllUniversities)

app.use('/', colleageRoutes.getAllColleages)
app.use('/', courseRoutes.getAllCourses)
app.use('/', videoRoutes.getAllVideos)
app.use('/', branchRoutes.getAllBranchs)


// connect to the database and establish the server
mongoose.connect(`${process.env.MONGOOSE_HOST}`)
    .then(() => { app.listen(port || 5000) })
    .catch(error=>console.log(error))

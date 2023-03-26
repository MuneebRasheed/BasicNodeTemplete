const express = require('express');
const path = require('path');
const connectDB = require('./config/db')
const dotenv = require('dotenv');
const morgan = require('morgan')
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
var cors = require('cors')
const errorHandler = require('./middleware/error');
const auth = require('./routes/auth')
const users = require('./routes/users');


//for load env variable 
dotenv.config({ path: './config/.env' });

const app= express()
connectDB();


if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'))
}


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser
app.use(express.json());

//Sanitize the data
app.use(mongoSanitize());

//set Security Headers
app.use(helmet());

//prevent xss attack adding script tag
app.use(xss());


const Limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(Limiter)

//prevet http param polution
app.use(hpp())

//Enable CORS
app.use(cors())



app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use(errorHandler);

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
  });
  
const express = require('express');
const http = require('http');
const socket = require('socket.io');
const dotenv = require('dotenv').config();
const cors = require('cors');
const bodyParser = require("body-parser");
const db = require('./config/keys').MongoURI;
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportAuth = require('./controllers/passport');

// Middleware
const errorMiddleware = require('./middleware/error');

// Routes
const indexRouter = require('./routes/index');

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socket(server);

// Passport Config
passportAuth(passport);

// Body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    secure: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use(cors());
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        server.listen(PORT, () => {
            console.log(`Server is running, go to http://localhost:${PORT}/`);
        })
    } catch (e) {
        console.log(e);
    }
}

start();
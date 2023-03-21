const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

dotenv.config();
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//ROUTES
app.use('/v1/auth', authRoute);
app.use('/v1/user', userRoute);

mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to DB');
        app.listen(process.env.PORT, () => {
            console.log('sever is running');
        });
    })
    .catch((err) => console.error(err));

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const app = express();
const port = process.env.port;
const expressFileupload = require('express-fileupload');

// Import routers
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const jobRoutes = require('./routes/job');
const company = require('./routes/company');
const cors = require('cors');

// Middlewares 
app.use(cors())
app.use(bodyParser.json());
app.use(expressFileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))

// Routes
app.use('/user', authRoutes);
app.use('/user', userRoutes);
app.use('/job', jobRoutes);
app.use('/company', company);

// DB connection
const sequelize = new Sequelize(process.env.dbName, process.env.uName, process.env.password, {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate()
    .then(() => console.log("DB is connected"))
    .catch((err) => console.log(err))

// Run server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
const bodyParser = require("body-parser");
const express = require('express');
const cors = require("cors");
require('dotenv').config();
const spinners = require('cli-spinners');
const router = require('./src/routes/index');
const db = require("./src/models");
const { version } = require("./package.json");
const app = express();

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', router)
app.use(express.static('public'));
app.use('/images', express.static('/images'));

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to saint backend..."
    });
});

const loadingSpinner = spinners.dots12; // Choose a spinner style

// Start the spinner
const loadingInterval = setInterval(() => {
    process.stdout.write(`\r${loadingSpinner.frames[0]} Starting the server...`);
    loadingSpinner.frames.push(loadingSpinner.frames.shift());
}, loadingSpinner.interval);

db.sequelize.sync({
    force: false, alter: true
}).then(() => {
    clearInterval(loadingInterval); // Stop the spinner
    console.log("\nDrop and re-sync db.");
    startServer();
}).catch((error) => {
    console.error("An error occurred:", error);
});

function startServer() {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
        console.log(`Code version is ${version}`);
    });
}
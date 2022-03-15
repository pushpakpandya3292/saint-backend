// Imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const env = require('./environment');

// Inits
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);

app.listen(env.PORT, () => {
    console.log('Server is up & running on port :: ', process.env.PORT);
});
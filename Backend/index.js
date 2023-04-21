'use strict'
const cors = require('cors');
const express = require('express');
const app = express();
const propierties = require('./config/properties');
const DB = require('./config/db');
// iniciamos la base de datos
DB();

app.use(cors());
app.use(express.json());

app.use('/api', require('./routes/user.router'));

app.listen(propierties.PORT, () => console.log(`Server runing on port ${propierties.PORT}`));
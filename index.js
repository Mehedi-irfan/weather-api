const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(cors());

app.use(express.static('Client'))


const PORT = process.env.PORT || 9413;

app.listen(PORT, () => {
    console.log("App is running on Port" + PORT);
})
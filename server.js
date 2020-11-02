const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

const api = require('./api/api');
app.use('/api', api);



app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
})
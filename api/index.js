const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const settings = require('./settings');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

app.listen(settings.port, () => {
    console.log('Live on ', `http://localhost:${settings.port}/`);
})


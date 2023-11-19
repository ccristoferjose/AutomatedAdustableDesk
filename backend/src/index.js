require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./db/database');
const WebSocket = require('ws');
const dataService = require('./controllers/data.controller');


const port = process.env.PORT || 3000;

const data = require('./router/data.router');

let dataBuffer;

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use('/api/data', data);

app.get('/', (req, res) => {
    console.log(req.method, req.url);
    res.json({
        message: 'Hello World!',
    }).status(200);
});

const wsUrl = 'ws://192.168.1.175:81';
const wsClient = new WebSocket(wsUrl);

wsClient.on('open', function open() {
    console.log('Connected to WebSocket server.');
});

wsClient.on('message', function incoming(data) {
    dataBuffer = data.toString().split('-').map(Number);
    console.log(dataBuffer);
    
});

wsClient.on('close', function close() {
    console.log('Disconnected from WebSocket server.');
});


wsClient.on('error', function error(error) {
    console.error('Error en la conexión WebSocket:', error);
});

setInterval(() => {
    if (dataBuffer) {
        const [ airQuality, lux, humidity, temperature ] = dataBuffer;
        dataService.insertData(airQuality,lux,humidity,temperature);
    }
}, 120000);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

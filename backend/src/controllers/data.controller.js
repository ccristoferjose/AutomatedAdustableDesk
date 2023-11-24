const db = require('../db/database');
const axios = require('axios');

exports.getData = async (req, res) => {
    
    try {
        const sql = 'CALL getLast30SensorRecords();';
        const response = await db.query(sql);
        res.json(response[0]).status(200);
    } catch (error) {
        console.log(error);
        res.json({ error: error.message }).status(500);
    }
    
    
};

exports.getNotifications = async (req, res) => {
    try {
        const sql = 'CALL getUnreadNotifications(1);';
        const response = await db.query(sql);
        res.json(response[0]).status(200);
    } catch (error) {
        console.log(error);
        res.json({ error: error.message }).status(500);
    }
};

exports.updateNotification = async (req, res) => {

}



exports.insertNotification = async (req, res) => {
    const { title, message } = req.body;
    const params = [1, title, message];
    const sql = 'CALL insertNotification(?,?,?)';
    try {
        const response = await db.query(sql, params);
        res.json(response[0]).status(200);
    } catch (error) {
        console.log(error);
        res.json({ error: error.message }).status(500);
    }
};

exports.insertNotification = async (title, message) => {
    const params = [1, title, message]; // Asumiendo que 1 es un ID de usuario o similar
    const sql = 'CALL insertNotification(?,?,?)';
    try {
        const response = await db.query(sql, params);
        console.log("Notificación insertada", response);
    } catch (error) {
        console.log(error);
    }
};


exports.updateNotification = async (req, res) => {
    const { id } = req.params;
    const params = [id,1];
    const sql = 'CALL updateNotificationStatus(?,?)';
    try {
        const response = await db.query(sql, params);
        res.json(response[0]).status(200);
    } catch (error) {
        console.log(error);
        res.json({ error: error.message }).status(500);
    }
};


exports.insertData = async (airQuality, lux, humidity, temperature) => {
    
    const params = [airQuality, lux, humidity, temperature];
    if (airQuality < 0 || airQuality > 100) {
        return console.log('AirQuality is not valid');
    }
    const sql = 'CALL insertDataSensor(?,?,?,?)';
    try {
        const response = await db.query(sql, params);

    } catch (error) {
        console.log(error);
    }
      
};

exports.getHistoricalData = async (req, res) => {
    const { sensorId } = req.params;
    const sql1 = `CALL getTempHistory()`;
    const sql2 = `CALL getLuxHistory()`;
    const sql3 = `CALL getHumidityHistory()`;
    const sql4 = `CALL getAQHistory()`;

    try {
        let sql = "";
        switch (sensorId) {
            case 1:
                sql = sql1;
                break;
            case 2:
                sql = sql2;
                break;
            case 3:
                sql = sql3;
                break;
            case 4:
                sql = sql4;
                break;
            default:
                break;
        }
        const response = await db.query(sql);
        res.json(response[0]).status(200);
    } catch (error) {
        console.log(error);
        res.json({ error: error.message }).status(500);
    }

};


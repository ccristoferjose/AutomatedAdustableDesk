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

exports.updateNotification = async (req, res) => {
    const { id } = req.params;
    const params = [1,id];
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
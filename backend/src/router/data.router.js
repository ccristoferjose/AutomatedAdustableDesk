 const express = require('express');
 const router = express.Router();

 const dataController = require('../controllers/data.controller');

router.get('/', dataController.getData); 
router.get('/notifications', dataController.getNotifications);
router.post('/notifications', dataController.insertNotification);
router.put('/notifications/:id', dataController.updateNotification);
router.get('/historical/:id', dataController.getHistoricalData);


 module.exports = router;
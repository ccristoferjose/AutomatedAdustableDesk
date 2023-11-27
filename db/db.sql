CREATE TABLE SensorData (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    AirQuality FLOAT NOT NULL,
    Lux FLOAT NOT NULL,
    Humidity FLOAT NOT NULL,
    Temperature FLOAT NOT NULL,
    Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Notification (
    NotificationID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    Title VARCHAR(255),
    Message TEXT NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    IsRead BOOLEAN DEFAULT FALSE
);



DROP PROCEDURE IF EXISTS insertDataSensor;
DELIMITER //
CREATE PROCEDURE insertDataSensor(
    IN airQualityVal FLOAT,
    IN luxVal FLOAT,
    IN humidityVal FLOAT,
    IN temperatureVal FLOAT
)
BEGIN
    INSERT INTO SensorData (AirQuality, Lux, Humidity, Temperature) 
    VALUES (airQualityVal, luxVal, humidityVal, temperatureVal);
END //
DELIMITER ;


SELECT * FROM SensorData;



DROP PROCEDURE IF EXISTS insertNotification;
DELIMITER //
CREATE PROCEDURE insertNotification(
    IN _UserID INT,
    IN _Title VARCHAR(255),
    IN _Message TEXT
)
BEGIN
    INSERT INTO Notification(UserID, Title, Message) 
    VALUES (_UserID, _Title, _Message);
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS getUnreadNotifications;
DELIMITER //
CREATE PROCEDURE getUnreadNotifications(
    IN _UserID INT
)
BEGIN
    SELECT * FROM Notification 
    WHERE UserID = _UserID AND IsRead = FALSE
    ORDER BY CreatedAt DESC;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS getLast30SensorRecords;
DELIMITER //
CREATE PROCEDURE getLast30SensorRecords()
BEGIN
    SELECT * FROM SensorData
    ORDER BY Timestamp DESC
    LIMIT 30;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS getTempHistory;
DELIMITER //
CREATE PROCEDURE getTempHistory()
BEGIN
	SELECT Temperature, Timestamp FROM SensorData
    ORDER BY Timestamp ASC 
    LIMIT 15;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS getLuxHistory;
DELIMITER //
CREATE PROCEDURE getLuxHistory()
BEGIN
	SELECT Lux, Timestamp FROM SensorData
    ORDER BY Timestamp ASC 
    LIMIT 15;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS getAQHistory;
DELIMITER //
CREATE PROCEDURE getAQHistory()
BEGIN
	SELECT AirQuality, Timestamp FROM SensorData
    ORDER BY Timestamp ASC 
    LIMIT 15;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS getHumidityHistory;
DELIMITER //
CREATE PROCEDURE getHumidityHistory()
BEGIN
	SELECT Humidity, Timestamp FROM SensorData
    ORDER BY Timestamp ASC
    LIMIT 15;
END //
DELIMITER ;



DROP PROCEDURE IF EXISTS updateNotificationStatus;
DELIMITER //
CREATE PROCEDURE updateNotificationStatus(
    IN _NotificationID INT,
    IN _UserID INT
)
BEGIN
    DECLARE num_rows INT;

    UPDATE Notification
    SET IsRead = TRUE
    WHERE NotificationID = _NotificationID AND UserID = _UserID;
	
END //
DELIMITER ;

CALL updateNotificationStatus(3,1);

SELECT * FROM SensorData;
SELECT * FROM Notification;


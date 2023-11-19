#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_TSL2561_U.h>
#include "DHT.h"

#define DHTPIN 29     // Pin donde está conectado el sensor
#define DHTTYPE DHT11   // DHT 11

Adafruit_TSL2561_Unified tsl = Adafruit_TSL2561_Unified(TSL2561_ADDR_FLOAT, 12345);

int sensorPin = A15; // selecciona el pin de entrada para el MQ135
int sensorValue = 0; // variable para almacenar el valor del sensor

unsigned long previusMillis = 0;
const long interval = 25000; 

DHT dht(DHTPIN, DHTTYPE);

void setup(void) {

  //Serial 
  Serial.begin(9600);

  //Sensor Luz
  if (!tsl.begin()) {
    Serial.print("No se encontró el sensor TSL2561");
    while (1);
  }
  tsl.enableAutoRange(true); // Habilita el rango automático
  tsl.setIntegrationTime(TSL2561_INTEGRATIONTIME_13MS); // Configura el tiempo de integración

  //Humity Sensor 
  dht.begin();

}

void loop(void) {

  serialDataSend();
}

void readAirQuality(){
  sensorValue = analogRead(sensorPin); // lee el valor del sensor
  //Serial.print("Air Quality: ");
  Serial.print(sensorValue); // envía el valor a la computadora
}

void readLux(){
  sensors_event_t event;
  tsl.getEvent(&event);
  // Lee y muestra la lectura de luz
  //Serial.print("Lectura de Luz: ");
  Serial.print(event.light); //Serial.print(" lux");
}

void readTemperature(){
    // Lee la humedad relativa
  float h = dht.readHumidity();
  // Lee la temperatura en Celsius
  float t = dht.readTemperature();

  // Verifica si alguna lectura falló y sale temprano (para intentar de nuevo)
  if (isnan(h) || isnan(t)) {
    Serial.println("¡Error al leer del DHT11!");
    return;
  }

  //Serial.print("Humedad: ");
  Serial.print(h);
  Serial.print("-");
  Serial.println(t);
  //Serial.println(" *C");
}


void serialDataSend(){
  unsigned long currentMillis = millis();

  if(currentMillis - previusMillis >= interval){
    // AirQuality - Lux - Hum - Temp
    readAirQuality();
    Serial.print("-");
    readLux();
    Serial.print("-");
    readTemperature();

    // Actualizar previusMillis al tiempo actual después de enviar los datos
    previusMillis = currentMillis;
  }
}


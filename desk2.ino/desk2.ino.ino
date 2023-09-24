#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

const char* ssid = "SpectrumSetup-B1";
const char* password = "freeregion321";

ESP8266WebServer server(80);

const int pinSubir = D1;
const int pinBajar = D2;

enum State {
  SUBIENDO,
  BAJANDO,
  CONFIGURANDO,
  PAUSA
};

State currentState = PAUSA;

unsigned long lastStateTime = 0;
const unsigned long actionDuration = 10000; // 10 segundos

void setup() {
  pinMode(pinSubir, OUTPUT);
  pinMode(pinBajar, OUTPUT);

  Serial.begin(9600);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to Wifi...");
  }

  Serial.println("Connecting a WiFi");
  Serial.print("Dirección IP: ");
  Serial.println(WiFi.localIP());

  server.on("/controlActions", HTTP_GET, handleControlActions);
  server.begin();
}

void loop() {
  server.handleClient();
  manageDesk();
  delay(200);
}

void handleControlActions() {
  String action = server.arg("action");
  Serial.println(action);
  server.sendHeader("Access-Control-Allow-Origin", "*");

  if (action == "subir") {
    currentState = SUBIENDO;
    lastStateTime = millis();  // Mueve esta línea antes del return
    server.send(201, "text/plain", "Subiendo");
  } else if (action == "bajar") {
    currentState = BAJANDO;
    lastStateTime = millis();  // Mueve esta línea antes del return
    server.send(201, "text/plain", "Bajando");
  } else if (action == "configurar") {
    currentState = CONFIGURANDO;
    server.send(201, "text/plain", "Modo Configuracion");
  } else if (action == "pausa") {
    currentState = PAUSA;
    server.send(201, "text/plain", "Pausado");
  } else {
    server.send(200, "text/plain", "Comando no Reconocido");
  }
}


void manageDesk() {
  unsigned long currentTime = millis();
  unsigned long elapsedTime = currentTime - lastStateTime;

  // Serial.print("Elapsed Time: ");
  // Serial.println(elapsedTime);
  // Serial.print("Last State Time: ");
  // Serial.println(lastStateTime);
  // Serial.print("Current Time: ");
  // Serial.println(currentTime);

  switch (currentState) {
    case SUBIENDO:
      //Serial.println("Subiendo");
      if (elapsedTime < actionDuration) {
        digitalWrite(pinSubir, HIGH);
      } else {
        currentState = PAUSA;
        lastStateTime = millis();  // Actualizar el tiempo al entrar en pausa
      }
      break;
    case BAJANDO:
     //Serial.println("Bajando");
      if (elapsedTime < actionDuration) {
        digitalWrite(pinBajar, HIGH);
      } else {
        currentState = PAUSA;
        lastStateTime = millis();  // Actualizar el tiempo al entrar en pausa
      }
      break;
    case CONFIGURANDO:
      Serial.println("Configuracion");
      // Código para configuración aquí
      break;
    case PAUSA:
      //Serial.println("Pausa");
      digitalWrite(pinSubir, LOW);
      digitalWrite(pinBajar, LOW);
      break;
  }
}

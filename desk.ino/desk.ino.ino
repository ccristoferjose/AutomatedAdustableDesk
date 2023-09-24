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
}

void handleControlActions() {
  String action = server.arg("action");
  Serial.prinln(action);
  server.sendHeader("Access-Control-Allow-Origin", "*");

  if (action == "subir") {
    currentState = SUBIENDO;
    lastStateTime = millis();
  } else if (action == "bajar") {
    currentState = BAJANDO;
    lastStateTime = millis();
  } else if (action == "configurar") {
    currentState = CONFIGURANDO;
  } else if (action == "pausa") {
    currentState = PAUSA;
  }

  server.send(200, "text/json", {"mensaje":"Estado cambiado"});
}

void manageDesk() {
  unsigned long currentTime = millis();
  unsigned long elapsedTime = currentTime - lastStateTime;

  switch (currentState) {
    case SUBIENDO:
      if (elapsedTime < actionDuration) {
        digitalWrite(pinSubir, HIGH);
      } else {
        currentState = PAUSA;
      }
      break;
    case BAJANDO:
      if (elapsedTime < actionDuration) {
        digitalWrite(pinBajar, HIGH);
      } else {
        currentState = PAUSA;
      }
      break;
    case CONFIGURANDO:
      // Código para configuración aquí
      break;
    case PAUSA:
      digitalWrite(pinSubir, LOW);
      digitalWrite(pinBajar, LOW);
      break;
  }
}


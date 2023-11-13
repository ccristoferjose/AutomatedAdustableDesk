import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Switch } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { View, Text, Image ,Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Alert } from 'react-native';


const lightBanner = require('./src/images/baner3.png');
const darkBanner = require('./src/images/baner4.png'); // Asumiendo que tienes una versión oscura del banner



const App = () => {
  // light 
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const [ temperature, setTemperature ] = useState(0);
  const [ airQuality, setAirQuality ] = useState(0);
  const [ lux , setLux ] = useState(0);
  const [ humidity, setHumidity ] = useState(0);

  const [miWebSocket, setMiWebSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket('ws://192.168.1.175:81');

    socket.onopen = () => {
      console.log('Conectado al servidor');
    };
    socket.onmessage = (e) => {
      //console.log('Mensaje recibido:', e.data);
      const splitData = e.data.split('-');
      if(splitData.length === 4){
        setAirQuality(splitData[0]);
        let l = parseInt(splitData[1]);
        setLux(Math.round(l));
        setHumidity(splitData[2]);
        let t = parseInt(splitData[3]);
        setTemperature(Math.round(t));
      }
      
    };
    socket.onerror = (e) => {
      console.log('Error:', e);
    };
    socket.onclose = (e) => {
      console.log('Desconectado del servidor');
    };

    setMiWebSocket(socket);


    return () => {
      socket.close();
    };

  }, []);

  

  //baner
  const scheme = useColorScheme(); // 'light' o 'dark'
  const themeStyles = scheme === 'dark' ? darkStyles : lightStyles;
  const bannerImage = scheme === 'dark' ? darkBanner : lightBanner;

  //Desktop actions
  const upAction = async () => {
    try {
      const response = await fetch('http://192.168.1.175/controlActions?action=subir');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseText = await response.text();
      console.log('Respuesta del servidor:', responseText);
    } catch (error) {
      console.error('Hubo un problema con la operación fetch:', error);
    }
  };
  
  

  const pauseAction = async () => {
    try {
      const response = await fetch('http://192.168.1.175/controlActions?action=pausa');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseText = await response.text();
      console.log('Respuesta del servidor:', responseText);
    } catch (error) {
      console.error('Hubo un problema con la operación fetch:', error);
    }
  };

  const downAction = async () => {
    try {
      const response = await fetch('http://192.168.1.175/controlActions?action=bajar');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseText = await response.text();
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <View style={themeStyles.container}>
      {/* Barra de Estado: Dejar que React Native lo maneje automáticamente */}

      {/* Barra de Navegación Superior */}
      <View style={themeStyles.header}>
        {/* Contenido del header */}
      </View>

      {/* Sección de Contenido Principal */}
      <ScrollView style={themeStyles.content}>
        {/* Anuncio "Govee Fan Fest 2023" */}
        <View style={themeStyles.banner}>
          <Image 
            source = {bannerImage}
            resizeMode='contain'
            style= {themeStyles.image}
          ></Image>
          
        </View>

        {/* Botones de Categoría */}
        <View style={themeStyles.categoryButtons}>

          <TouchableOpacity style={themeStyles.button}><Text>Air Quality</Text></TouchableOpacity>
          <TouchableOpacity style={themeStyles.button}><Text> ligth </Text></TouchableOpacity>
          <TouchableOpacity style={themeStyles.button}><Text> Temperature </Text></TouchableOpacity>
          <TouchableOpacity style={themeStyles.button}><Text> All </Text></TouchableOpacity>

        </View>

        {/* Tarjetas de Dispositivos */}
        <View style={themeStyles.deviceCards}>
          <View style={themeStyles.deviceCard}>
            <Image 
            source = {require('./src/images/temp.png')}
            resizeMode='contain'
            style= {themeStyles.imageCard}/>
            <Text style={themeStyles.dataSensor}>{ temperature } °C</Text>
          </View>
          <View style={themeStyles.deviceCard}>
            <Image 
            source = {require('./src/images/air_quality.png')}
            resizeMode='contain'
            style= {themeStyles.imageCard}/>
            <Text style={themeStyles.dataSensor}>{ airQuality } ppm</Text>
          </View>
        </View>
        <View style={themeStyles.deviceCards}>
          <View style={themeStyles.deviceCard }>
            <Image 
            source = {require('./src/images/dsktp_levl.png')}
            resizeMode='contain'
            style= {themeStyles.imageCard}/>
            <View style={themeStyles.actionButtons}>
              <TouchableOpacity style={themeStyles.buttonLeft} onPress={ downAction }>
                <Text style={themeStyles.buttonText} >Down</Text>
              </TouchableOpacity>
              <TouchableOpacity style={themeStyles.buttonCenter} onPress={ pauseAction }>
                <Text style={themeStyles.buttonText}>Pause</Text>
              </TouchableOpacity>
              <TouchableOpacity style={themeStyles.buttonRight} onPress={ upAction }>
                <Text style={themeStyles.buttonText}>Up</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={themeStyles.deviceCard}>
            <Image 
            source = {require('./src/images/ligh_control.png')}
            resizeMode='contain'
            style= {themeStyles.imageCard}/>
            <Text style={themeStyles.dataSensor}> {lux} lux </Text>
            <View style={themeStyles.switchContainer}>
              <Switch
                style={themeStyles.switch}
                value={isSwitchOn}
                onValueChange={onToggleSwitch}
                color={isSwitchOn ? '#81b0ff' : '#f5dd4b'}
              />
            </View>
          </View>
          
        </View>
      </ScrollView>

      {/* Barra de Navegación Inferior */}
      <View style={themeStyles.footer}>
        {/* Iconos o texto para la navegación */}
        <Icon name="timer" size={30} color="#000" />
        <Icon name="person" size={30} color="#000" />
        <Icon name="home" size={30} color="#000" />
        <Icon name="notifications" size={30} color="#000" />
      </View>
    </View>
  );
}

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF0C8',
  },
  header: {
    height: 50,
    backgroundColor: '#FCF0C8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
  },
  content: {
    flex:1,
    backgroundColor: '#FCF0C8',
  },

  image: {
    width: 300,
    height: 250,
  },

  imageCard: {
    width: 150,
    height: 150,
    marginBottom: 0,
  },

  banner: {
    height: 150,
    backgroundColor: '#FCF0C8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    fontSize: 24,
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  button: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#81b0ff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    elevation: 2,
    shadowColor: '#81b0ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  buttonLeft: {

    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#81b0ff',
    borderRadius: 20,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    paddingVertical: 8,
    paddingHorizontal: 5,
    elevation: 2,
    shadowColor: '#81b0ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  buttonRight: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#81b0ff',
    borderRadius: 20,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingVertical: 8,
    paddingHorizontal: 10,
    elevation: 2,
    shadowColor: '#81b0ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  buttonCenter: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#81b0ff',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingVertical: 8,
    paddingHorizontal: 5,
    elevation: 2,
    shadowColor: '#81b0ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  buttonText: {
    color: '#81b0ff',
    fontSize: 16,
    textAlign: 'center',
  },
  search: {
    flex: 1,
    backgroundColor: '#dedede',
    justifyContent: 'center',
    padding: 10,
  },
  deviceCards: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 0,
  },
  deviceCard: {
    flex: 1,
    flexDirection: 'column', // Para alinear elementos verticalmente
    justifyContent: 'flex-start', // Distribuye el espacio uniformemente
    alignItems: 'center', // Centra los elementos horizontalmente
    backgroundColor: '#033f4e', // Un color de fondo claro similar al de la imagen
    borderRadius: 20, // Bordes redondeados
    padding: 10, // Espacio interior
    margin: 10, // Espacio entre tarjetas
    shadowColor: '#000', // Color de la sombra
    shadowOffset: { width: 0, height: 2 }, // Posición de la sombra
    shadowOpacity: 0.25, // Opacidad de la sombra
    shadowRadius: 3.84, // Radio de la sombra
    elevation: 5, // Elevación para Android (produce la sombra)
  },
  footer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginHorizontal: 25,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 35,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 2,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F5F5F5', // Color de borde del contenedor
    marginTop: 0,
    
  },
  switch: {
    transform: [{ scaleX: 1 }, { scaleY: 1 }],
    margin: 0,
  },

  dataSensor: {
    fontSize: 30,
    color: '#fff',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  header: {
    height: 50,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
  },
  content: {
    flex:1,
    backgroundColor: '#1A1A1A',
  },

  image: {
    width: 300,
    height: 250,
  },

  imageCard: {
    width: 150,
    height: 150,
    marginBottom: 0,
  },

  banner: {
    height: 150,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    fontSize: 24,
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  button: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#81b0ff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    elevation: 2,
    shadowColor: '#81b0ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  buttonLeft: {

    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#81b0ff',
    borderRadius: 20,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    paddingVertical: 8,
    paddingHorizontal: 5,
    elevation: 2,
    shadowColor: '#81b0ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  buttonRight: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#81b0ff',
    borderRadius: 20,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingVertical: 8,
    paddingHorizontal: 10,
    elevation: 2,
    shadowColor: '#81b0ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  buttonCenter: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#81b0ff',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingVertical: 8,
    paddingHorizontal: 5,
    elevation: 2,
    shadowColor: '#81b0ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  buttonText: {
    color: '#81b0ff',
    fontSize: 16,
    textAlign: 'center',
  },
  search: {
    flex: 1,
    backgroundColor: '#dedede',
    justifyContent: 'center',
    padding: 10,
  },
  deviceCards: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 0,
  },
  deviceCard: {
    flex: 1,
    flexDirection: 'column', // Para alinear elementos verticalmente
    justifyContent: 'flex-start', // Distribuye el espacio uniformemente
    alignItems: 'center', // Centra los elementos horizontalmente
    backgroundColor: '#033f4e', // Un color de fondo claro similar al de la imagen
    borderRadius: 20, // Bordes redondeados
    padding: 10, // Espacio interior
    margin: 10, // Espacio entre tarjetas
    shadowColor: '#000', // Color de la sombra
    shadowOffset: { width: 0, height: 2 }, // Posición de la sombra
    shadowOpacity: 0.25, // Opacidad de la sombra
    shadowRadius: 3.84, // Radio de la sombra
    elevation: 5, // Elevación para Android (produce la sombra)
  },
  footer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginHorizontal: 25,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 35,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 2,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F5F5F5', // Color de borde del contenedor
    marginTop: 0,
    
  },
  switch: {
    transform: [{ scaleX: 1 }, { scaleY: 1 }],
    margin: 0,
  },

  dataSensor: {
    fontSize: 30,
    color: '#fff',
  },
});


export default App;

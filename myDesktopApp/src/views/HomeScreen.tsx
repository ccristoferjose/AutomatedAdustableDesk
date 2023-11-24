import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { View, Text, Image ,StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import FunctionalCard from '../components/FunctionalCard';
import SensorCard from '../components/SensorCard';
import MenuBar from '../components/MenuBar';
import { GenericNavigationProp } from './navigationTypes';
import GraphCard from '../components/GraphsCard';

type Props = {
  navigation: GenericNavigationProp;
};

const HomeScreen: React.FC<Props> = ( {navigation} ) => {
  // light 
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const [ temperature, setTemperature ] = useState(0);
  const [ airQuality, setAirQuality ] = useState(0);
  const [ lux , setLux ] = useState(0);
  const [ humidity, setHumidity ] = useState(0);

  const [miWebSocket, setMiWebSocket] = useState<WebSocket | null>(null);


  const lightBanner = require('../images/baner3.png');
  const darkBanner = require('../images/baner4.png'); 
  

  useEffect(() => {
    const socket = new WebSocket('ws://192.168.1.175:81');

    socket.onopen = () => {
      console.log('Conectado al servidor');
    };
    socket.onmessage = (e) => {
      console.log('Mensaje recibido:', e.data);
      const splitData = e.data.split('-');
      if(splitData.length === 4){
        let a = parseInt(splitData[0]);
        setAirQuality(Math.trunc(a));
        let l = parseInt(splitData[1]);
        setLux(Math.trunc(l));
        let h = parseInt(splitData[2]);
        setHumidity(Math.trunc(h));
        let t = parseInt(splitData[3]);
        setTemperature(Math.trunc(t));
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

          <TouchableOpacity style={lightStyles.button}><Text>Air Quality</Text></TouchableOpacity>
          <TouchableOpacity style={lightStyles.button}><Text> ligth </Text></TouchableOpacity>
          <TouchableOpacity style={lightStyles.button}><Text> Temperature </Text></TouchableOpacity>
          <TouchableOpacity style={lightStyles.button}><Text> All </Text></TouchableOpacity>

        </View>

        {/* Tarjetas de Dispositivos */}
        <View >
          <FunctionalCard/>
        </View>
        <View style={themeStyles.deviceCards}>
          <SensorCard
          sensorImage={require('../images/temp.png')}
          data={temperature}
          dataType="°C"
          />
          <SensorCard
            sensorImage={require('../images/air_quality.png')}
            data={airQuality}
            dataType="ppm"
          />
        </View>
        <View style={themeStyles.deviceCards}>
          <SensorCard
            sensorImage = {require('../images/light_sensor.png')}
            data = {lux}
            dataType = 'lux'
          />
          <SensorCard
            sensorImage = {require('../images/hum.png')}
            data = {humidity}
            dataType = '%'
          />
        </View>
        <View>
          <GraphCard />
        </View>

      </ScrollView>

    </View>
  );
}

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF0C8',
  },
  header: {
    height: 0,
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

  
});

const darkStyles = StyleSheet.create({
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
  content: {
    flex:1,
    backgroundColor: '#FCF0C8',
  },
  image: {
    width: 300,
    height: 250,
  },

  banner: {
    height: 150,
    backgroundColor: '#FCF0C8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  deviceCards: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 0,
  },
});



export default HomeScreen;

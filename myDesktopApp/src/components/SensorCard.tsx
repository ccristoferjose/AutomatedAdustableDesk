import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface ComponentProps {
  data: number;
  dataType: string;
  sensorImage: any; // Cambiado a any para permitir la importación de módulos de imagen
}

const SensorCard: React.FC<ComponentProps> = ({ sensorImage, data, dataType }) => {
  return (
    <View style={themeStyles.deviceCard}>
      <Image 
        source={sensorImage} // Pasamos la imagen directamente como un módulo
        resizeMode='contain'
        style={themeStyles.imageCard}
      />
      <Text style={themeStyles.dataSensor}>{data} {dataType}</Text>
    </View>
  );
}

const themeStyles = StyleSheet.create({
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
      imageCard: {
        width: 150,
        height: 150,
        marginBottom: 0,
      },
      dataSensor: {
        fontSize: 30,
        color: '#fff',
      },
});

export default SensorCard;
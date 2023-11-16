import React from 'react';
import { View,Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const FunctionalCard: React.FC = () => {

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
    <View style={styles.deviceCard}>
        <Image 
            source={require('../images/dsktp_levl.png')}
            resizeMode='contain'
            style={styles.imageCard}
        />
        <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.buttonLeft} onPress={ downAction }>
            <Text style={styles.buttonText}>Down</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCenter} onPress={ pauseAction }>
            <Text style={styles.buttonText}>Pause</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonRight} onPress={ upAction }>
            <Text style={styles.buttonText}>Up</Text>
            </TouchableOpacity>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    imageCard: {
        width: 150,
        height: 150,
        marginBottom: 0,
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
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
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
});

export default FunctionalCard;
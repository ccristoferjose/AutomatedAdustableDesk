import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = () => {
  const [data, setData] = useState(null);

  const fetchEndpoint1 = async () => {
    try {
      const response = await fetch('http://192.168.1.175/controlActions?action=subir');
      const jsonData = await response.json();
      setData(jsonData);
      // Aquí podrías navegar a otra pantalla o manejar la respuesta
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEndpoint2 = async () => {
    try {
      const response = await fetch('http://192.168.1.175/controlActions?action=pausa');
      const jsonData = await response.json();
      setData(jsonData);
      // Aquí podrías navegar a otra pantalla o manejar la respuesta
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEndpoint3 = async () => {
    try {
      const response = await fetch('http://192.168.1.175/controlActions?action=bajar');
      const jsonData = await response.json();
      setData(jsonData);
      // Aquí podrías navegar a otra pantalla o manejar la respuesta
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button title="Subir" onPress={fetchEndpoint1} />
      <Button title="Pausar" onPress={fetchEndpoint2} />
      <Button title="Bajar" onPress={fetchEndpoint3} />
      {/* Mostrar los datos del endpoint si están disponibles */}
      {data && <Text>{JSON.stringify(data, null, 2)}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;

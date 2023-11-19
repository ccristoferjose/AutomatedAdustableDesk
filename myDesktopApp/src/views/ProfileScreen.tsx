import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { View, Text, StyleSheet, ScrollView, Linking,TouchableOpacity, Image } from 'react-native';
import MenuBar from '../components/MenuBar';
import { GenericNavigationProp } from './navigationTypes';


type Props = {
  navigation: GenericNavigationProp
};

const ProfileScreen: React.FC<Props> = ({ navigation }) => {

  const profileImage = require('../images/profile.png');

  const openGitHubProfile = () => {
    const url = 'https://github.com/ccristoferjose';
    Linking.openURL(url).catch(err => console.error('Error opening URL:', err));
  };

  const openLinkedinProfile = () => {
    const url = 'https://www.linkedin.com/in/christtopher-chitay-b541ab201/';
    Linking.openURL(url).catch(err => console.error('Error opening URL:', err));
  }

  const openGitlabProfile = () => {
    const url = 'https://gitlab.com/ccristoferjose2011';
    Linking.openURL(url).catch(err => console.error('Error opening URL:', err));
  }

  // Aquí puedes añadir estado y lógica específica para la pantalla de perfil

  return (
    <View style={styles.container}>
      {/* Barra de Navegación Superior, si es necesaria */}
      <View style={styles.header}>
        {/* Contenido del header, por ejemplo, título de la pantalla */}
      </View>

      {/* Sección de Contenido Principal */}
      <ScrollView style={styles.content}>
        {/* Aquí puedes añadir el contenido del perfil */}
        <View style={styles.banner}>
          <View style={styles.profileContainer}>
            <Image 
              source = {profileImage}
              resizeMode='contain'
              style= {styles.image}
            />
          </View>
          
          <View style= { styles.contactInfo}>
            <View style = { styles.contactInfoItem}>
            <Text>Christtopher Chitay</Text>
            </View>
            <View style = { styles.contactInfoItem}>
              <Icon2 name="email" size={25} color="#000" />
              <Text>chris.chitay@gmail.com</Text>
            </View>

            <View style = { styles.contactInfoItem}>
              <TouchableOpacity style={styles.contactInfoItem} onPress={openLinkedinProfile}>
                <Icon name="linkedin-square" size={25} color="#000" />
                <Text> linkedin profile </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.contactInfoItem}>
            <TouchableOpacity style={styles.contactInfoItem} onPress={openGitHubProfile}>
              <Icon name="github" size={25} color="#000" />
              <Text> @ccristoferjose</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactInfoItem}>
            <TouchableOpacity style={styles.contactInfoItem} onPress={openGitlabProfile}>
              <Icon name="gitlab" size={25} color="#000" />
              <Text> @ccristoferjose2011</Text>
            </TouchableOpacity>
          </View>

        </View>
        {/* Añadir más componentes según sea necesario */}
      </ScrollView>

      {/* MenuBar */}
    </View>
  );
}

// Añade estilos específicos para ProfileScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF0C8',
    // Otros estilos para el contenedor
  },
  header: {
    // Estilos para la cabecera
    height: 0,
    backgroundColor: '#FCF0C8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    // Estilos para el texto del encabezado
  },
  content: {
    // Estilos para el contenido principal
    flex:1,
    backgroundColor: '#FCF0C8',
  },
  banner: {
    // Estilos para el banner
    flexDirection: 'column',
    backgroundColor: '#FCF0C8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,  // El tamaño del contenedor que quieres para la imagen
    height: 100, // Igual al ancho para hacer un círculo perfecto
    borderRadius: 50, // La mitad del tamaño del contenedor para hacerlo redondo
    backgroundColor: '#F5F5F5',
    overflow: 'hidden', // Asegura que la imagen no se salga de los bordes redondeados
  },
  image: {
    width: '100%', // Ocupa todo el ancho del contenedor
    height: '100%', // Ocupa todo el alto del contenedor
    borderRadius: 50, // La mitad del tamaño del contenedor
    resizeMode: 'cover', // Cambia a 'contain' si no quieres que la imagen se recorte
  },
  contactInfo: {
    // Estilos para el contenedor de información de contacto
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  contactInfoItem: {
    // Estilos para cada elemento de información de contacto
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,

  },
  
});

export default ProfileScreen;

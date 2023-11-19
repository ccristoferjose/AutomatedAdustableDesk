import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/views/HomeScreen';
import ProfileScreen from './src/views/ProfileScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <SafeAreaView style={{flex:1, backgroundColor:"#FCF0C8"}}>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Notifications':
                iconName = 'notifications';
                break;
              case 'Timer':
                iconName = 'timer';
                break;
              case 'Profile':
                iconName = 'person';
                break;
              // Define un caso para cada nombre de ruta en tu Tab.Navigator
              
              default:
                iconName = 'default-icon-name'; // Ícono por defecto para rutas no especificadas
                break;
            }
            // Puedes añadir más casos para otras pantallas
            return <Icon name={iconName} size={30} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 55,
            backgroundColor: 'rgba(255, 255, 255, 0.7)', 
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.15,
            shadowRadius: 3,
            elevation: 5,
            marginBottom: 0,
            paddingHorizontal: 25,
            marginHorizontal: 20,
            
          },
          tabBarLabelStyle: {
            
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} 
          options={{
            headerStyle: {
              backgroundColor: '#FCF0C8', // El color que deseas para tu header
            },
            //headerTintColor: '#fff', // Color para el texto del header y los íconos
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            title: 'Home', // Título para la pantalla Home
        }}
        />
        <Tab.Screen name="Notifications" component={HomeScreen} 
          options={{
            headerStyle: {
              backgroundColor: '#FCF0C8', // El color que deseas para tu header
            },
            //headerTintColor: '#fff', // Color para el texto del header y los íconos
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            title: 'Notifications', // Título para la pantalla Home
          }}
        />
        <Tab.Screen name="Timer" component={HomeScreen} 
          options={{
            headerStyle: {
              backgroundColor: '#FCF0C8', // El color que deseas para tu header
            },
            //headerTintColor: '#fff', // Color para el texto del header y los íconos
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            title: 'Timer', // Título para la pantalla Home
          }}        
        />
        <Tab.Screen name="Profile" component={ProfileScreen} 
          options={{
            headerStyle: {
              backgroundColor: '#FCF0C8', // El color que deseas para tu header
            },
            //headerTintColor: '#fff', // Color para el texto del header y los íconos
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            title: 'Profile', // Título para la pantalla Home
          }}        
        
        />
        

        {/* Añade otras pantallas aquí */}
      </Tab.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
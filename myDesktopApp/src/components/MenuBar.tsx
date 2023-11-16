import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, StyleSheet } from 'react-native';

const MenuBar = () => {
    return (
        // Barra de Navegación Inferior
        <View style={styles.footer}>
            {/* Iconos o texto para la navegación */}
            <Icon name="timer" size={30} color="#000" />
            <Icon name="person" size={30} color="#000" />
            <Icon name="home" size={30} color="#000" />
            <Icon name="notifications" size={30} color="#000" />
        </View>
    );
};

const styles = StyleSheet.create({
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
});

export default MenuBar;

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image ,StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { GenericNavigationProp } from './navigationTypes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';


type Props = {  
    navigation: GenericNavigationProp
};

interface Notification {
    NotificationID: number;
    UserID: number;
    Title: string;
    Message: string;
    CreatedAt: Date;
    IsRead: boolean;
}

const NotificationsScreen: React.FC<Props> = ({ navigation }) => {

    const [notifications, setNotifications] = useState<Notification[]>([]);

    const getNotifications = async () => {
        try {
            const response = await fetch('http://192.168.1.44:3000/api/data/notifications/');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const notifications = await response.json();
            setNotifications(notifications);
        } catch (error) {
            console.log('Hubo un problema con la operación fetch:', error);
            
        }
    }

    useFocusEffect(
        useCallback(() => {
            getNotifications();
        },[])
    )

    const markNotificationAsRead = async (id: number) => {
        //
    }

    const handleSwipeableOpen = (id: number, direction: string) => {
        if (direction === 'right') {
            deleteNotification(id);
        }
    }

    useEffect(() => {
        getNotifications();
    }, []);

    const deleteNotification = async (id: number) => {
        try {
            console.log(id);
            const response = await fetch(`http://192.168.1.44:3000/api/data/notifications/${id}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setNotifications(notifications.filter((notification) => notification.NotificationID !== id));
            const responseText = await response.text();
            console.log(`Respuesta del servidor: ${responseText}`);
        } catch (error) {
            console.log('Hubo un problema con la operación fetch:', error);
        }
    }
    

    const renderRightAction = (id: number) => {
        return (
            <View style={styles.rightAction}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
            </View>
        );
    };

    return (
        <GestureHandlerRootView style={styles.flexContainer}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {notifications.map((notification) => (
                    <Swipeable 
                        key={notification.NotificationID}
                        renderRightActions={() => renderRightAction(notification.NotificationID)}
                        onSwipeableOpen={(direction) => handleSwipeableOpen(notification.NotificationID, direction)}
                    >
                        <View style={styles.notificationItem}>
                            <Text style={styles.title}>{notification.Title}</Text>
                            <Text>{notification.Message}</Text>
                            <Text>{new Date(notification.CreatedAt).toLocaleDateString()}</Text>
                        </View>
                    </Swipeable>   
                ))}
            </ScrollView>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 20, // Add padding at the bottom for better scroll experience
    },
    notificationItem: {
        backgroundColor: 'white',
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#cccccc',
        // Other styles for notification item
    },
    title: {
        fontWeight: 'bold',
        // Styles for the title
    },
    rightAction: {
        // Styles for the right swipe action container
        backgroundColor: 'red', // Example color
        justifyContent: 'center',
        flex: 1,
        alignItems: 'flex-end',
    },
    deleteButton: {
        // Styles for the delete button
        padding: 20,
    },
    deleteButtonText: {
        color: 'white',
        // Styles for the delete button text
    },
    // Additional styles...
});



export default NotificationsScreen;
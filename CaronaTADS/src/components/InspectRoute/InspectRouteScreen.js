import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { styles } from './styles';

export function InspectRouteScreen({ route, navigation }) {
    const { intention, users } = route.params;


    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.bigText}>{intention}</Text>
                <View style={styles.flexColumn}>
                    <Pressable style={styles.button} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>Voltar</Text>
                    </Pressable>
                </View>
                {users.map((user, index) => (
                    <View key={index} style={styles.userContainer}>
                        <Text style={styles.userName}>{user?.user?.name}</Text>
                        <Text style={styles.userContact}>{user?.user?.bio}</Text>
                        <Text style={styles.userContact}>Contato: {user?.user?.contact}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};


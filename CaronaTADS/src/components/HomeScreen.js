import React from "react";
import { StyleSheet, View, Text } from "react-native";

const HomeScreen = ({ route, navigation }) => {

    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default HomeScreen;

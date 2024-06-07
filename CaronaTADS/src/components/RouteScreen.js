import React from "react";
import { StyleSheet, View, Text } from "react-native";

const RouteScreen = ({ route, navigation }) => {

    return (
        <View style={styles.container}>
            <Text>Route Screen</Text>
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

export default RouteScreen;

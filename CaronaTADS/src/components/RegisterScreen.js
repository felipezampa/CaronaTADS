import React from "react";
import { StyleSheet, View, Text } from "react-native";

const RegisterScreen = ({ route, navigation }) => {

    return (
        <View style={styles.container}>
            <Text>Register Screen</Text>
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

export default RegisterScreen;

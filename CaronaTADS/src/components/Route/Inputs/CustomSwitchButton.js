import { StyleSheet, Pressable, View, Text } from 'react-native';
import { useState } from 'react';
import { Accent, Black, White } from '../../../../assets/colors';

const CustomSwitchButton = ({ label, onClickHandler, disabled, containerStyle }) => {
    const [clicked, setClicked] = useState(false);

    function clickButton() {
        setClicked(!clicked);
        onClickHandler(clicked);
    }

    return (
        <Pressable disabled={disabled} onPressOut={clickButton} style={[styles.container, containerStyle]}>
            <View style={[styles.button, { backgroundColor: clicked ? Accent : White }, containerStyle]}>
                <Text style={[styles.text, { color: clicked ? White : Black }]}>{label}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        width: "auto",
        minWidth: 30,
    },
    text: {
        padding: 10
    },
    container: {
        width: "auto"
    }
})

export default CustomSwitchButton;

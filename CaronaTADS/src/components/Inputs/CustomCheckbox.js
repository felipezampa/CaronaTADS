import { StyleSheet, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Accent, White, Black } from '../../../assets/colors';

const CustomCheckbox = ({ label, onPress }) => {
    return (
        <View style={styles.container}>
            <BouncyCheckbox
                size={25}
                bouncinessIn={0}
                bouncinessOut={0}
                fillColor={Accent}
                unfillColor={White}
                text={label}
                innerIconStyle={styles.boxStyle}
                onPress={onPress}
                textComponent={<Text style={styles.textStyle}>{label}</Text>}
                
            />
        </View>
    );
}

const styles = StyleSheet.create({
    boxStyle: {
        borderWidth: 2,
        borderRadius: 10
    },
    container: {
        margin: 5,
    },
    textStyle: {
        fontSize: 15,
        color: Black,
        textDecorationLine: "none",
        marginLeft: 5
    }
});

export default CustomCheckbox;
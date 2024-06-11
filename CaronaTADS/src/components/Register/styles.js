import { StyleSheet } from 'react-native';
import { Accent, Black, InputBackground, Main, Secondary, White } from '../../../assets/colors';


export const styles = StyleSheet.create({
    container: {
        paddingTop: 70,
        paddingBottom: 70,
        backgroundColor: Accent
    },
    headerText: {
        textAlign: 'center',
        fontSize: 50,
        fontWeight: '700',
        marginBottom: 30,
        color: White
    },
    bodyContainer: {
        padding: 30,
        marginBottom: 70,
        backgroundColor: Main,
        borderTopStartRadius: 25,
        borderTopEndRadius: 25
    },
    smallText: {
        color: Black,
        fontSize: 13,
        fontWeight: "400",
        paddingLeft: 15
    },
    requiredSmallText: {
        color: Black,
        fontSize: 18,
        fontWeight: "600",
        paddingLeft: 15
    },
    flexColumn: {
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: White,
        fontSize: 18,
        fontWeight: "500"
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 40,
        marginTop: 40,
        backgroundColor: Accent,
        borderRadius: 15
    },
    returnButton: {
        paddingVertical: 10,
        paddingHorizontal: 40,
        marginTop: 40,
        backgroundColor: Secondary,
        borderRadius: 15
    },
    input: {
        borderRadius: 8,
        backgroundColor: InputBackground,
        padding: 10,
        marginBottom: 15,
    },
    formGroup: {
        backgroundColor: White
    }
});

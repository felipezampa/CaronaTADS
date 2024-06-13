import { StyleSheet } from 'react-native';
import { Accent, Black, InputBackground, Main, Red, White } from '../../../assets/colors';


export const styles = StyleSheet.create({
    scrollContainer: {
        backgroundColor: Main,
        height: '100%'
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 60,
        backgroundColor: Main
    },
    bigText: {
        textAlign: 'center',
        fontSize: 50,
        fontWeight: '700',
        marginBottom: 45,
        color: Accent
    },
    smallText: {
        color: Black,
        fontSize: 18,
        fontWeight: "400",
        paddingLeft: 15
    },
    flexColumn: {
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: White,
        fontSize: 18,
        fontWeight: "500"
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 40,
        marginTop: 75,
        backgroundColor: Red,
        borderRadius: 15
    },
    infoText: {
        borderRadius: 8,
        backgroundColor: InputBackground,
        padding: 10,
        marginBottom: 20,
        fontSize: 20,
        fontWeight: "600"
    },
});

import { StyleSheet } from 'react-native';
import { Accent, AccentLight, Black, Main, White } from '../../../assets/colors';


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
        fontSize: 45,
        fontWeight: '700',
        marginBottom: 10,
        color: Accent
    },
    userText: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '500',
        color: Black,
        marginBottom: 10,
    },
    text: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '500',
        marginVertical: 10,
        color: Black
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 40,
        marginTop: 20,
        backgroundColor: Accent,
        borderRadius: 15
    },
    buttonText: {
        color: White,
        fontSize: 18,
        fontWeight: "500"
    },
    flexColumn: {
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
    },
    picker: {
        margin: 'auto',
        backgroundColor: AccentLight,
        paddingVertical: 10,
        width: 250,
        borderRadius: 8,
        alignItems: "center"
    }
});
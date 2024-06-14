import { StyleSheet } from 'react-native';
import { Accent, Main, Secondary, White } from '../../../assets/colors';


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
        fontSize: 35,
        fontWeight: '700',
        marginBottom: 10,
        color: Accent
    },
    userContainer: {
        backgroundColor: White,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },

    userName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    userContact: {
        fontSize: 14,
        color: Secondary,
        marginVertical: 5
    },

    flexColumn: {
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40
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
});
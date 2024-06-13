import { StyleSheet } from 'react-native';
import { Accent, Black, InputBackground, Main, Secondary, White } from '../../../assets/colors';


export const styles = StyleSheet.create({
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
        marginBottom: 15,
        color: Accent
    },
    helperText: {
        color: Black,
        fontWeight: '600'
    },
    section: {
        marginTop: 20,
        position: "relative"
    },
    text: {
        color: White,
        fontSize: 18,
        fontWeight: "500"
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 40,
        marginTop: 20,
        backgroundColor: Accent,
        borderRadius: 15
    },
    flexColumn: {
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderRadius: 8,
        backgroundColor: White,
        padding: 10,
        marginVertical: 5
    }
});
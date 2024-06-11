import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 75
    },
    bigText: {
        textAlign: 'center',
        fontSize: 50,
        fontWeight: '700',
        marginBottom: 45
    },
    smallText: {
        color: '#1D1A1A',
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
        color: '#fff',
        fontSize: 18,
        fontWeight: "500"
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 40,
        marginTop: 75,
        backgroundColor: '#dd0000',
        borderRadius: 15
    },
    infoText: {
        borderRadius: 8,
        backgroundColor: "#D9D9D9",
        padding: 10,
        marginBottom: 20,
        fontSize: 20,
        fontWeight: "600"
    },
});

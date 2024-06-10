import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'center',
      paddingHorizontal: 30,
      paddingVertical: 100
    },
    bigText: {
      textAlign: 'center',
      fontSize: 50,
      fontWeight: '700',
      marginBottom: 50
    },
    smallText: {
      fontWeight: '500',
      marginTop: 75
    },
    flexRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: 'center',
    },
    flexColumn: {
      display: "flex",
      flexDirection: "column",
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: '#fff',
      fontSize: 18,
      fontWeight: "500"
    },
    button: {
      paddingVertical: 10,
      paddingHorizontal: 40,
      marginTop: 20,
      backgroundColor: '#1D1A1A',
      borderRadius: 15
    },
    registerButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginVertical: 20,
      backgroundColor: '#1D1A1A',
      borderRadius: 15
    },
    input: {
      borderRadius: 8,
      backgroundColor: "#D9D9D9",
      color: "808080",
      padding: 10,
      marginVertical: 5
    }
  });
  
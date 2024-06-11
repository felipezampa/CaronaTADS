import { StyleSheet } from 'react-native';
import { Accent, Black, InputBackground, Main, Secondary, White } from '../../../assets/colors';


export const styles = StyleSheet.create({
  container: {
    paddingTop: 150,
    paddingBottom: 150,
    backgroundColor: Accent,
    height: "100%"
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
    borderRadius: 25
  },
  bigText: {
    textAlign: 'center',
    fontSize: 50,
    fontWeight: '700',
    marginBottom: 50,
    color: White
  },
  smallText: {
    color: Black,
    fontSize: 13,
    fontWeight: "400",
    paddingLeft: 15
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
    paddingTop: 50
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
  registerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 20,
    backgroundColor: Secondary,
    borderRadius: 15
  },
  input: {
    borderRadius: 8,
    backgroundColor: InputBackground,
    padding: 10,
    marginVertical: 5
  }
});

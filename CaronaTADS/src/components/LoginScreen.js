import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View, Alert } from "react-native";
import callLogin from '../services/AuthService';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    console.log(email + ' - ' + password); // MOSTRA OS DADOS
    const response = await callLogin(email, password);
    console.log(response) // NÃO MOSTRA NADA
    // try {
    //   // if (response.token) {
    //   //   await AsyncStorage.setItem('userToken', data.token);
    //   //   navigation.navigate('Home');
    //   // } else {
    //   //   Alert.alert("Erro de Login", "Credenciais incorretas ou problema no login");
    //   // }
    // } catch (error) {
    //   console.error('Houve um erro na requisição de login:', error);
    //   Alert.alert("Erro de Login", error.message || "Não foi possível conectar ao servidor");
    // }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.bigText}>CaronaTADS</Text>
      <TextInput style={styles.input} onChangeText={setEmail} placeholder={"Email"} value={email} />
      <TextInput style={styles.input} onChangeText={setPassword} placeholder={"Senha"} value={password} secureTextEntry={true} />
      <View style={styles.flexRow}>
        <Pressable style={styles.button} onPress={login}>
          <Text style={styles.text}>Entrar</Text>
        </Pressable>
      </View>
      <View style={styles.flexColumn}>
        <Text style={styles.smallText}>Se não tiver conta você pode se cadastrar abaixo</Text>
        <Pressable style={styles.registerButton} onPress={() => navigation.navigate("Autocadastro")}>
          <Text style={styles.text}>Cadastrar-se</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 50
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

export default LoginScreen;

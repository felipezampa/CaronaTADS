import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import AuthService from "../../services/AuthService";
import { styles } from "./styles";


export function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!email || !password) {
      console.log("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    const response = await AuthService.callLogin(email, password);
    try {
      if (response.token) {
        await AsyncStorage.setItem('caronaUserToken', response.token);
        navigation.navigate('MainTabs');
      } else {
        Alert.alert("Erro de Login", "Credenciais incorretas ou problema no login");
      }
    } catch (error) {
      console.error('Houve um erro na requisição de login:', error);
      // Alert.alert("Erro de Login", error.message || "Não foi possível conectar ao servidor");
    }
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
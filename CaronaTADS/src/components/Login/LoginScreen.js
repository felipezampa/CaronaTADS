import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { showMessage } from 'react-native-flash-message';
import { AuthService } from "../../services/AuthService";
import { styles } from "./styles";


export function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * @description Verifica se existe um token do usuário e caso exista então redireciona para a página principal
   */
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      // Recupera o token
      const token = await AsyncStorage.getItem('caronaUserToken');

      if (token) {
        // Chama o endpoint que retorna os dados do usuário logado
        const userData = await AuthService.getUserLogged();
        // Se houver dados então redireciona para a página inicial
        if (userData) {
          navigation.navigate('MainTabs');
        } else { }
      } else { }
    };

    checkUserLoggedIn();
  }, []);

  /**
   * @description Lida com o processo de login do usuário. Verifica se os campos de email e senha estão preenchidos,
   * chama o serviço de login, armazena o token do usuário e navega para a tela principal em caso de sucesso.
   * Mostra mensagens de erro apropriadas em caso de falha.
   */
  const handleLogin = async () => {
    // Verifica se o email e a senha estão preenchidos
    if (!email || !password) {
      showMessage({
        message: "Erro",
        description: "Por favor, preencha todos os campos.",
        type: "danger",
      });
      return;
    }
    // Chama o serviço de login com o email e a senha fornecidos
    const response = await AuthService.callLogin(email, password);
    try {
      if (response.token) {
        // Armazena o token no AsyncStorage
        await AsyncStorage.setItem('caronaUserToken', response.token);
        showMessage({
          message: "Sucesso no login",
          description: `Bem vindo ao sistema`,
          type: "success",
        });
        // Navega para as telas quando está autenticado
        navigation.navigate('MainTabs');
      } else {
        showMessage({
          message: "Erro de Login",
          description: "Credenciais incorretas ou problema no login",
          type: "danger",
        });
      }
    } catch (error) {
      showMessage({
        message: "Erro",
        description: "Erro no cadastro: " + error.message,
        type: "danger",
      });
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>CaronaTADS</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.InfoGroup}>
          <Text style={styles.smallText}>Email</Text>
          <TextInput style={styles.input} onChangeText={setEmail} placeholder={"Email"} value={email} />
        </View>
        <View style={styles.InfoGroup}>
          <Text style={styles.smallText}>Senha</Text>
          <TextInput style={styles.input} onChangeText={setPassword} placeholder={"Senha"} value={password} secureTextEntry={true} />
        </View>
        <View style={styles.flexRow}>
          <Pressable style={styles.button} onPress={handleLogin}>
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
    </View>
  );
};
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { AuthService } from "../../services/AuthService";
import { styles } from "./styles";
import { showMessage } from "react-native-flash-message";

export function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);

  /**
   * @description Recupera os dados do usuário para mostrar na tela
   */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Obtem os dado e coloca no objeto user
        const userData = await AuthService.getUserLogged();
        setUser(userData);
      } catch (error) {
        showMessage({
          message: "Erro",
          description: "Não foi possível obter os dados do usuário.",
          type: "danger",
        });
      }
    };

    fetchUser();
  }, []);

  /**
   * @description Faz logout para desligar do sistema
   */
  const handleLogout = async () => {
    try {
      // Chama o metodo de logout
      const success = await AuthService.callLogout();
      if (success) {
        // Remove o token do storage local
        await AsyncStorage.removeItem('caronaUserToken');
        showMessage({
          message: "Sucesso no logout",
          description: "Saindo do sistema",
          type: "success",
        });
        // Redireciona para o login
        navigation.navigate("Login");
      } else {
        showMessage({
          message: "Erro",
          description: "Não foi possível realizar o logout.",
          type: "danger",
        });
      }
    } catch (error) {
      showMessage({
        message: "Erro",
        description: `Não foi possível realizar o logout: ${error}`,
        type: "danger",
      });
    }
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.bigText}>Perfil</Text>
        {user ? (
          <>
            <View>
              <Text style={styles.smallText}>Nome</Text>
              <Text style={styles.infoText}>{user?.name}</Text>
            </View>
            <View>
              <Text style={styles.smallText}>Email</Text>
              <Text style={styles.infoText}>{user?.email}</Text>
            </View>
            <View>
              <Text style={styles.smallText}>Contato</Text>
              <Text style={styles.infoText}>{user?.contact}</Text>
            </View>
            <View>
              <Text style={styles.smallText}>Biografia</Text>
              <Text style={styles.infoText}>{user?.bio}</Text>
            </View>
          </>
        ) : (
          <Text style={styles.smallText}>Carregando...</Text>
        )}
        <View style={styles.flexColumn}>
          <Pressable style={styles.button} onPress={handleLogout}>
            <Text style={styles.text}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
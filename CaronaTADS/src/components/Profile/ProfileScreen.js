import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { AuthService } from "../../services/AuthService";
import { styles } from "./styles";

export function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AuthService.getUserLogged();
        setUser(userData);
      } catch (error) {
        console.log(error);
        Alert.alert("Erro", "Não foi possível obter os dados do usuário.");
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const success = await AuthService.callLogout();
      if (success) {
        await AsyncStorage.removeItem('caronaUserToken');
        navigation.navigate("Login");
      } else {
        Alert.alert("Erro", "Não foi possível realizar o logout.");
      }
    } catch (error) {
      console.log("Erro ao realizar logout:", error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar realizar o logout.");
    }
  };
  return (
    <ScrollView>
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
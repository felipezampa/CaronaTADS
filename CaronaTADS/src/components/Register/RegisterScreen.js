import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { AuthService } from "../../services/AuthService";
import { styles } from "./styles";



export function RegisterScreen({ navigation }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmal, setPasswordConfirmal] = useState("");
    const [contact, setContact] = useState('');
    const [bio, setBio] = useState('');

    /**
     * @description Valida os dados de autocadastro, então cria um objeto 
     * contendo esses dados para então realizar um POST criando o usuário
     */
    const handleRegister = async () => {
        // Verifica se os dados foram preenchidos corretamente
        if (!name || !email || !password || !passwordConfirmal || !contact) {
            showMessage({
                message: "Erro",
                description: "Por favor, preencha todos os campos.",
                type: "danger",
            });
            return;
        }
        // Verifica se as senhas correspondem
        if (password !== passwordConfirmal) {
            showMessage({
                message: "Erro",
                description: "As senhas não coincidem.",
                type: "danger",
            });
            return;
        }
        // Cria um objeto com os dados inseridos pelo usuário
        let userData = new FormData();
        userData.append("name", name);
        userData.append("email", email);
        userData.append("password", password);
        userData.append("contact", contact);
        userData.append("bio", bio);
        // Tenta criar um usuário no sistema, caso dê certo redireciona ao login
        try {
            await AuthService.callCreateUser(userData);
            showMessage({
                message: "Sucesso",
                description: "Cadastro realizado com sucesso!",
                type: "success",
            });
            navigation.navigate("Login");
        } catch (error) {
            showMessage({
                message: "Erro",
                description: "Erro no cadastro: " + error.message,
                type: "danger",
            });
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.headerText}>Cadastro</Text>
            </View>
            <View style={styles.bodyContainer}>
                <ScrollView>
                    <View style={styles.InfoGroup}>
                        <Text style={styles.smallText}>Nome *</Text>
                        <TextInput style={styles.input} onChangeText={setName} placeholder={"Seu nome"} value={name} />
                    </View>
                    <View style={styles.InfoGroup}>
                        <Text style={styles.smallText}>Email *</Text>
                        <TextInput style={styles.input} onChangeText={setEmail} placeholder={"Email para acessar o sistema"} value={email} />
                    </View>
                    <View style={styles.InfoGroup}>
                        <Text style={styles.smallText}>Senha *</Text>
                        <TextInput style={styles.input} onChangeText={setPassword} placeholder={"Senha para acessar o sistema"} value={password} secureTextEntry />
                    </View>
                    <View style={styles.InfoGroup}>
                        <Text style={styles.smallText}>Confirme a Senha *</Text>
                        <TextInput style={styles.input} onChangeText={setPasswordConfirmal} placeholder={"Confirme a senha"} value={passwordConfirmal} secureTextEntry />
                    </View>
                    <View style={styles.InfoGroup}>
                        <Text style={styles.smallText}>Contato *</Text>
                        <TextInput style={styles.input} onChangeText={setContact} placeholder={"Uma forma de contato: Telefone, Email, etc..."} value={contact} />
                    </View>
                    <View style={styles.InfoGroup}>
                        <Text style={styles.smallText}>Biografia</Text>
                        <TextInput style={styles.input} onChangeText={setBio} placeholder={"Conte um pouco sobre você"} value={bio} />
                    </View>
                    <View />
                    <View style={styles.flexColumn}>
                        <Pressable style={styles.button} onPress={handleRegister}>
                            <Text style={styles.text}>Cadastrar-se</Text>
                        </Pressable>
                    </View>
                    <View style={styles.flexColumn}>
                        <Pressable style={styles.returnButton} onPress={() => navigation.goBack()} >
                            <Text style={styles.text}>Voltar ao Login</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>

        </ScrollView>
    );
}

import React from "react";
import { StyleSheet, View, Text } from "react-native";

const RegisterScreen = ({ route, navigation }) => {

    return (
        <View style={styles.container}>
            <Text>Register Screen</Text>
        </View>
        //     <Screen title="Cadastro" centralized>
        //     <View style={styles.imageSection}>
        //       <Image source={sourceImage()} style={styles.image} />
        //       <CustomButton alignment='center' label="Selecionar foto" onClickHandler={selectImage} />
        //     </View>
        //     <CustomTextInput placeholder="Nome" text={name} setText={(value) => setName(value)} />
        //     <CustomTextInput placeholder="Email" text={email} setText={(value) => setEmail(value)} />
        //     <CustomTextInput 
        //       placeholder="Senha" 
        //       text={password} 
        //       setText={(value) => setPassword(value)}
        //       secureTextEntry
        //     />
        //     <CustomTextInput 
        //       placeholder="Confirme a senha" 
        //       text={passwordConfirmal} 
        //       setText={(value) => setPasswordConfirmal(value)}
        //       secureTextEntry
        //     />

        //     <CustomTextInput placeholder="Contato" text={contact} setText={setContact} />
        //     <CustomTextInput placeholder="Biografia" text={bio} setText={setBio} bigText/>
        //     <View>
        //       <CustomButton
        //         label="Cadastrar"
        //         onClickHandler={handleRegister}
        //         alignment="end"
        //         disabled={email === "" || password === "" || name === "" || contact === ""}
        //       />
        //     </View>
        //   </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default RegisterScreen;

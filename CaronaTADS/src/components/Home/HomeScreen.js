import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Accent, Black, White } from '../../../assets/colors';
import { RouteService } from "../../services/RouteService";
import ListPicker from "../Inputs/ListPicker";
import { styles } from "./styles";

const IntentionSection = ({ intention, users, navigation, route }) => {
    if (users.length == 0) return null;

    const intentionStyles = StyleSheet.create({
        scrollContainer: {
            marginVertical: 10,
            borderRadius: 15,
            backgroundColor: White,
        },
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // paddingHorizontal: 30,
            paddingVertical: 15,
        },
        header: {
            textAlign: 'center',
            fontSize: 15,
            fontWeight: '700',
            marginBottom: 10,
            color: Accent
        },
        studentCount: {
            textAlign: 'center',
            fontSize: 15,
            fontWeight: '500',
            color: Black
        },
        text: {
            textAlign: 'center',
            fontSize: 15,
            fontWeight: '500',
            marginVertical: 20,
            color: Black
        },
    });
    return (
        <ScrollView style={intentionStyles.scrollContainer}>
            <View style={intentionStyles.container} onTouchEnd={() => navigation.navigate("Perfil")}>
                <Text style={intentionStyles.header}>{intention}</Text>
                <Text style={intentionStyles.studentCount}>Quantidade de alunos: {users.length}</Text>
            </View>
        </ScrollView>
    );

}

export function HomeScreen({ navigation }) {
    const [user, setUser] = useState(null);
    const [routes, setRoutes] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const isFocused = useIsFocused();

    // Carrega as rotas de um usuário quando a tela é focada ou o selectedRoute é alterado
    useEffect(() => {
        if (!isFocused) {
            setSelectedRoute(null);
            setRoutes([]);
            setUsers([]);
            return; // Retorna para evitar a execução do restante do useEffect
        }

        // Função assíncrona para buscar e formatar as rotas do usuário
        async function fetchUserRoutes() {
            try {
                let allRoutes = await RouteService.getRoutes(); // Busca todas as rotas
                let formattedRoutes = allRoutes.map((route) => ({
                    ...route,
                    label: route?.name, // Define o label da rota
                    key: route?.id, // Define a chave da rota
                }));
                setRoutes(formattedRoutes); // Define as rotas formatadas no estado
            } catch (error) {
                console.error('Erro ao carregar rotas:', error); // Trata erros de carregamento de rotas
            }
        }

        // Função assíncrona para buscar os usuários de uma rota específica
        async function fetchRouteUsers(routeId) {
            try {
                let users = await RouteService.getUsersByRoute(routeId); // Busca os usuários da rota
                setUsers(users); // Define os usuários no estado
            } catch (error) {
                console.error('Erro ao carregar usuários por rota:', error); // Trata erros de carregamento de usuários por rota
            }
        }

        // Função assíncrona para buscar e definir o usuário atual
        async function fetchCurrentUser() {
            try {
                let currentUser = await RouteService.getCurrentUser(); // Busca o usuário atual
                console.log(currentUser); // Exibe o usuário atual no console
                setUser(currentUser); // Define o usuário atual no estado
            } catch (error) {
                console.error('Erro ao carregar usuário atual:', error); // Trata erros de carregamento do usuário atual
            }
        }

        // Funções assíncronas para carregar dados
        fetchUserRoutes();
        if (selectedRoute) {
            fetchRouteUsers(selectedRoute.id);
        }
        fetchCurrentUser();
    }, [isFocused, selectedRoute]);

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.bigText}>CaronaTADS</Text>
                    <Text style={styles.userText}>{`Olá, ${user?.name}`}</Text>
                </View>
                {routes.length > 0 ?
                    <View style={styles.flexColumn}>
                        <Text style={styles.text}>Selecione uma rota para visualizar as opções</Text>
                        <View style={styles.picker}>
                            <ListPicker value={selectedRoute?.name} list={routes} returnValue={setSelectedRoute} placeholder={"Selecione uma rota"} />
                        </View>
                    </View>
                    :
                    <View style={styles.flexColumn}>
                        <Text style={styles.text}>Você ainda não cadastrou nenhuma rota!</Text>
                        <Pressable style={styles.button} onPress={() => navigation.navigate("Rotas")}>
                            <Text style={styles.buttonText}> Cadastrar rota</Text>
                        </Pressable>
                    </View>
                }
                {users.length > 0 &&
                    <View>
                        <Text style={[styles.text, { marginTop: 25 }]}>Clique em uma opção abaixo para ver os alunos</Text>
                        <IntentionSection
                            intention="Oferecem carona"
                            navigation={navigation}
                            route={selectedRoute}
                            users={users.filter((user) => user.intentions.includes("offer_ride"))}
                        />
                        <IntentionSection
                            intention="Precisam de carona"
                            navigation={navigation}
                            route={selectedRoute}
                            users={users.filter((user) => user.intentions.includes("receive_ride"))}
                        />
                        <IntentionSection
                            intention="Dividir aplicativo"
                            navigation={navigation}
                            route={selectedRoute}
                            users={users.filter((user) => user.intentions.includes("split_app"))}
                        />
                        <IntentionSection
                            intention="Companhia para ônibus"
                            navigation={navigation}
                            route={selectedRoute}
                            users={users.filter((user) => user.intentions.includes("bus_pal"))}
                        />
                    </View>}
                {selectedRoute && users.length == 0 &&
                    <Text style={styles.text}>Nenhum usuário cadastrado nesta rota</Text>
                }
            </View>
        </ScrollView>
    );
}

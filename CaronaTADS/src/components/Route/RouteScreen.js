import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { showMessage } from "react-native-flash-message";
import { Black } from "../../../assets/colors";
import { RouteService } from "../../services/RouteService";
import CustomCheckbox from "./Inputs/CustomCheckbox";
import EndpointLayout from "./Inputs/EndpointLayout";
import WeekDaySelector from "./Inputs/WeekDaySelector";
import { styles } from "./styles";

// Opções de intenções para a rota
const intentions = [
    { "id": "offer_ride", "label": "Ofereço Carona", "value": "offer_ride" },
    { "id": "receive_ride", "label": "Busco Carona", "value": "receive_ride" },
    { "id": "split_app", "label": "Dividir aplicativo", "value": "split_app" },
    { "id": "bus_pal", "label": "Companhia para ônibus", "value": "bus_pal" }
];


export function RouteScreen({ navigation }) {
    const [places, setPlaces] = useState({});
    const [origin, setOrigin] = useState("");
    const [originIsCampus, setOriginIsCampus] = useState(true);
    const [destiny, setDestiny] = useState("");
    const [destinyIsCampus, setDestinyIsCampus] = useState(false);

    const [arriveHour, setArriveHour] = useState("");
    const [arriveMinute, setArriveMinute] = useState("");

    const [weekDays, setWeekDays] = useState([]);
    const [userIntentions, setUserIntentions] = useState([]);

    /**
     * @description Efeito de foco para carregar os lugares disponíveis ao carregar a tela
     * 
     */
    useFocusEffect(
        useCallback(() => {
            async function fetchData() {
                let allEndpoints = [];
                try {
                    // Chama o serviço para obter os lugares disponíveis
                    allEndpoints = await RouteService.getPlaces();
                } catch (error) {
                    showMessage({ message: "Não foi possível carregar os lugares", type: "danger" });
                }

                // Classifica os lugares por tipo (campus ou bairro)
                let classified = {}
                allEndpoints.forEach((endpoint) => {
                    if (!classified[endpoint.type == "campus"]) {
                        classified[endpoint.type == "campus"] = [];
                    }

                    // Adiciona o label e a chave para o ListPicker
                    classified[endpoint.type == "campus"].push({
                        ...endpoint,
                        label: endpoint.name,
                        key: endpoint.id
                    });
                })
                // Define os lugares classificados no estado
                setPlaces(classified);
            };

            fetchData(); // Chama a função para carregar os dados ao montar o componente
        }, [])
    );

    /**
     * @description Função utilitária para filtrar números em uma string
     */
    function filterNum(raw_time) {
        return raw_time.replace(/[^0-9]/g, '')
    }

    /**
     * @description Função para definir a hora de chegada (horas)
     */
    function setArriveHourNumber(value) {
        let time = filterNum(value);
        setArriveHour(time.slice(-2));
    }

    /**
     * @description Função para definir a hora de chegada (minutos)
     */
    function setArriveMinuteNumber(value) {
        let time = filterNum(value);
        setArriveMinute(time.slice(-2));
    }

    /**
     * @description Função para salvar as intenções selecionadas pelo usuário
     */
    function saveIntentions(intention) {
        let intentionValue = intention.value;
        let newIntentions = userIntentions;
        // Verifica se a intenção já está na lista, se sim, remove, senão, adiciona
        if (newIntentions.includes(intentionValue)) {
            newIntentions = newIntentions.filter((item) => item !== intentionValue);
        }
        else {
            newIntentions.push(intentionValue);
        }
        // Atualiza as intenções no estado
        setUserIntentions(newIntentions);
    }

    /**
     * @description Função para validar os dados antes de salvar a rota
     */
    function validateData(origin, destiny, arriveHour, arriveMinute, weekDays, userIntentions) {
        if (origin === null || origin == "") {
            throw new Error("Origem não pode ser nula");
        }

        if (destiny === null || destiny == "") {
            throw new Error("Destino não pode ser nulo");
        }

        if (arriveHour === null || arriveHour == "" || Number(arriveHour) < 0 || Number(arriveHour) > 23) {
            throw new Error("Verifique o horário de chegada");
        }

        if (arriveMinute === null || arriveMinute == "" || Number(arriveMinute) < 0 || Number(arriveMinute) > 59) {
            throw new Error("Verifique o minuto de chegada");
        }

        if (userIntentions == []) {
            throw new Error("Intenções não podem ser nulas");
        }

        if (weekDays == []) {
            throw new Error("Dias da semana não podem ser nulos");
        }
    }

    /**
     * @description Função assíncrona para registrar a rota
     */
    async function registerRoute() {
        let arriveTime = arriveHour + ":" + arriveMinute;
        try {
            // Valida os dados antes de salvar a rota
            validateData(origin, destiny, arriveHour, arriveMinute, weekDays, userIntentions);
            // Chama o serviço para salvar a rota
            await RouteService.saveRoute(origin, destiny, arriveTime, weekDays, userIntentions);
            showMessage({ message: "Sucesso!", description: "Rota salva com sucesso!", type: "success" });
            navigation.navigate("Home");
        } catch (error) {
            showMessage({ message: `${error}`, type: "danger" });
            return;
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.bigText}>Cadastrar Rota</Text>
                <View style={styles.section}>
                    <Text style={styles.helperText}>Abaixo cadastre os dados mostrando de onde sai e para onde vai</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.helperText}>Local de Saída</Text>
                    <EndpointLayout placesOptions={places} setPlace={setOrigin} placeIsCampus={originIsCampus}
                        switchPlaceType={() => { setOriginIsCampus(!originIsCampus) }} />
                </View>
                <View style={styles.section}>
                    <Text style={styles.helperText}>Local de Chegada</Text>
                    <EndpointLayout placesOptions={places} setPlace={setDestiny} placeIsCampus={destinyIsCampus}
                        switchPlaceType={() => { setDestinyIsCampus(!destinyIsCampus) }} />
                </View>
                <View style={styles.section}>
                    <Text style={styles.helperText}>Horário de chegada (Estimado)</Text>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ width: 50 }}>
                            <TextInput style={styles.input} onChangeText={setArriveHourNumber} value={arriveHour} placeholder={"hh"} placeholderTextColor={Black} />
                        </View>
                        <View style={{ width: 50, marginLeft: 10 }}>
                            <TextInput style={styles.input} onChangeText={setArriveMinuteNumber} value={arriveMinute} placeholder={"mm"} placeholderTextColor={Black} />
                        </View>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.helperText}>Dias da semana para a rota</Text>
                    <WeekDaySelector weekDays={weekDays} returnWeekDays={setWeekDays} />
                </View>
                <View style={styles.section}>
                    <Text style={styles.helperText}>Selecione sua intenção para essa rota. Você pode escolher várias opções</Text>
                    <View>
                        {intentions.map((item, index) => {
                            return (
                                <CustomCheckbox
                                    key={index}
                                    label={item.label}
                                    onPress={() => saveIntentions(item)}
                                />
                            );
                        })}
                    </View>
                </View>
                <View style={styles.flexColumn}>
                    <Pressable style={styles.button} onPress={registerRoute}>
                        <Text style={styles.text}>Cadastrar</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
}

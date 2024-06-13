import axios from 'axios';
import env from '../../env';
import { AuthService } from './AuthService';

export const RouteService = {

    /**
     * @description Pega os lugares disponíveis(campos ou bairro) através de um GET.
     * @returns {Promise<Array>} Lista de lugares.
     */
    async getPlaces() {
        console.log("Pegando rotas...");
        // Obtém configuração de autenticação
        let config = await AuthService.getConfig();
        try {
            // Faz um GET Retorna os lugares obtidos
            let routes = await axios
                .get(`${env.back_end}/places`, config)
                .then((response) => { return response.data })
                .catch((error) => { throw error });
            return routes;
        } catch (error) {
            throw Error(error.message);
        };
    },

    /**
     * @description Salva uma nova rota.
     * @param {Object} origin - Objeto representando o local de origem da rota.
     * @param {Object} destiny - Objeto representando o local de destino da rota.
     * @param {string} arriveTime - Hora estimada de chegada no formato 'hh:mm'.
     * @param {Array<string>} weekDays - Dias da semana em que a rota está disponível.
     * @param {Array<string>} userIntentions - Intenções associadas à rota (oferecer carona, etc.).
     */
    async saveRoute(origin, destiny, arriveTime, weekDays, userIntentions) {
        console.log("Salvando rota...")

        // Adiciona a data atual ao arriveTime
        const currentDate = new Date();
        const [hours, minutes] = arriveTime.split(':');
        currentDate.setHours(hours);
        currentDate.setMinutes(minutes);
        const formattedArriveTime = currentDate.toISOString(); // Formata para ISO 8601

        // Monta os dados da rota
        let data = {
            "name": `${origin.name} -> ${destiny.name}`,
            "intentions": userIntentions,
            "from_place": origin,
            "to_place": destiny,
            "arrive_time": formattedArriveTime,
            "week_days": weekDays,
        };

        // Obtém configuração de autenticação
        let config = await AuthService.getConfig();

        try {
            // Faz uma requisição POST para salvar a rota
            axios.post(`${env.back_end}/routes`, data, config)
                .catch((error) => { throw Error("Não foi possível criar a rota."); });
        } catch (error) {
            throw Error(error.message);
        }
    }
};
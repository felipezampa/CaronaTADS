import axios from 'axios';
import env from '../../env';
import { AuthService } from './AuthService';

export const RouteService = {

    /**
     * @description Pega os lugares disponíveis(campos ou bairro) através de um GET.
     * @returns {Promise<Array>} Lista de lugares.
     */
    async getPlaces() {
        console.log("=============  Pegando rotas  =============");
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
        console.log("=============  Salvando rota  =============");

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
    },

    /**
     * @description Busca os usuários associados a uma rota específica através de um GET.
     * @param {number} route_id - ID da rota para a qual os usuários serão buscados.
     * @returns {Promise<Array>} Lista de usuários associados à rota.
     */
    async getUsersByRoute(route_id) {
        console.log("=============  Buscando usuários para a rota  =============");
        let config = await AuthService.getConfig(); // Obtém configuração de autenticação

        try {
            // Faz uma requisição GET para buscar usuários por rota
            let users = await axios
                .get(`${env.back_end}/users/by_route/${route_id}`, config)
                .then((response) => { return response.data })
                .catch((error) => { throw Error(error.message); });

            return users;
        } catch (error) {
            throw Error(error.message);
        }
    },

    /**
     * @description Obtém todas as rotas disponíveis através de um GET.
     * @returns {Promise<Array>} Lista de rotas.
     */
    async getRoutes() {
        console.log("=============  Pegando rotas  =============");
        let config = await AuthService.getConfig(); // Obtém configuração de autenticação

        try {
            // Faz uma requisição GET para buscar todas as rotas
            let routes = await axios
                .get(`${env.back_end}/routes`, config)
                .then((response) => { return response.data })
                .catch((error) => { throw Error(error.message); });

            return routes;
        } catch (error) {
            throw Error(error.message);
        };
    },

    /**
     * @description Obtém os dados do usuário logado através de um GET.
     * @returns {Promise<Object>} Dados do usuário logado.
     */
    async getCurrentUser() {
        console.log("=============  Pegando dados do usuário  =============");
        let config = await AuthService.getConfig(); // Obtém configuração de autenticação

        try {
            // Faz uma requisição GET para buscar os dados do usuário logado
            let userData = await axios
                .get(`${env.back_end}/logged`, config)
                .then((response) => { return response.data })
                .catch((error) => { throw Error(error.message); });

            return userData;
        } catch (error) {
            throw Error(error.message);
        };
    }

};
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../../env';

export const AuthService = {

  /**
   * @description Faz um POST para realizar um login
   * @param {*} username Email do usuário
   * @param {*} password Senha do usuário 
   * @returns Um objeto contendo o token do usuário
   */
  async callLogin(username, password) {
    console.log("=============  Realizando login  =============");
    let result = axios.post(`${env.back_end}/login`, { username, password })
      .then(async (response) => { return response.data; })
      .catch((error) => {
        if (error.response.status && error.response.status === 401) {
          throw new Error('Email ou senha inválidos');
        } else if (error.response.status && error.response.status === 500) {
          throw new Error('Erro interno no servidor. Tente novamente mais tarde.');
        }
      });

    return result;
  },

  /**
   * @description Faz um POST para realizar o logout do usuário
   * @returns Booleano indicando sucesso ou falha no logout
   */
  async callLogout() {
    console.log("=============  Realizando Logout  =============");
    let config = await this.getConfig();
    let result = axios.post(`${env.back_end}/logout`, {}, config)
      .then(async () => { return true })
      .catch(() => { return false })

    return result;
  },

  /**
   * @description Faz um POST para criar um novo usuário
   * @param {*} userData Dados do novo usuário
   * @returns Um objeto contendo os dados do usuário criado
   */
  async callCreateUser(userData) {
    console.log("=============  Criando usuário  =============");
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    let result = axios.post(`${env.back_end}/users`, userData, config)
      .then(async (response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(`Erro ao criar usuário no banco local: ${error}`);
      });

    return result;
  },

  /**
   * @description Faz um GET para recuperar os dados do usuário logado
   * @returns Um objeto contendo os dados do usuário
   */
  async getUserLogged() {
    console.log("=============  Recuperando dados do usuário  =============");
    let config = await this.getConfig();
    let result = axios.get(`${env.back_end}/logged`, config)
      .then(async (response) => {
        return response.data;
      });

    return result;
  },

  /**
   * @description Recupera o token do usuário armazenado no AsyncStorage e configura o header de autorização
   * @returns Um objeto de configuração contendo os headers de autorização
   */
  async getConfig() {
    try {
      let token = await AsyncStorage.getItem('caronaUserToken');
      return {
        headers: {
          'Authorization': `Token ${token}`
        }
      };
    } catch (e) {
      throw new Error("Erro ao pegar token do AsyncStorage");
    }
  }
};
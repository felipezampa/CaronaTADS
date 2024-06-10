import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../../env';

const AuthService = {
  async callLogin(username, password) {
    console.log("Realizando login...");
    let result = axios.post(`${env.back_end}/login`, { username, password })
      .then(async (response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status && error.response.status === 401) {
          throw new Error('Email ou senha inválidos');
        } else if (error.response.status && error.response.status === 500) {
          throw new Error('Erro interno no servidor. Tente novamente mais tarde.');
        }
      });

    return result;
  },

  async getUserLogged() {
    console.log("Recuperando dados do usuário...");
    let config = await getConfig();
    let result = axios.get(`${env.back_end}/logged`, config)
      .then(async (response) => {
        return response.data;
      });

    return result;
  },

  async callLogout() {
    console.log("Realizando Logout...");
    let config = await getConfig();
    console.log(config);
    let result = axios.post(`${env.back_end}/logout`, {}, config)
      .then(async () => {
        return true;
      })
      .catch((error) => {
        console.log('Erro ao realizar logout:', error);
        return false;
      });

    return result;
  }
};

async function prepareHeaders() {
  try {
    let token = await AsyncStorage.getItem('caronaUserToken');
    return {
      'Authorization': `Token ${token}`
    }
  } catch (e) {
    console.log("Erro ao pegar token do AsyncStorage: " + e);
    throw Error("Erro ao pegar token do AsyncStorage");
  }
}

async function getConfig() {
  let config = {
    headers: await prepareHeaders()
  };

  return config;
}

export default AuthService;

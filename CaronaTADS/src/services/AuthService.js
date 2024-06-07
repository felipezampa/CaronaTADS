import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../../env';


// class AuthService {
 
// }
// export default AuthService;

function callLogin(username, password){
  console.log("Realizando login...");
  let result = axios.post(`${env.back_end}/login`, { username, password })
  .then(async (response) => {
      return response.data;
  })
  .catch((error) => {
      if (error.response && error.response.status === 401) {
          throw new Error('Email ou senha inválidos');
      }else if(error.response.status === 500){
          throw new Error('Erro interno no servidor. Tente novamente mais tarde.');
      }
  });

  return result;
}

// async function callLogin(email, password) {
//   console.log('oi');
//   try {
//     // Lógica para fazer a requisição de login
//     const response = await fetch(`${env.back_end}/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password })
//     });

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     throw new Error('Erro ao fazer login: ' + error.message);
//   }
// }

export default callLogin;

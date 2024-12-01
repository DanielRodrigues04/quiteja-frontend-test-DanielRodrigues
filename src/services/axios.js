import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_URL, // URL base da API
  headers: {
    'app-id': process.env.VUE_APP_ID, // Certifique-se de passar o app-id correto
  },
});

// Função para pegar a lista de usuários sem paginação
const getUsers = () => {
  return api.get('user'); // Corrigindo a URL para '/users', sem necessidade de parâmetros
};

// Função para pegar os detalhes de um usuário
const getUserDetails = (userId) => {
  return api.get(`user/${userId}`);  // Fazendo a requisição GET com o id do usuário
};

// Função para atualizar os dados de um usuário
const updateUser = (userId, userData) => {
  return api.put(`user/${userId}`, userData);  // Fazendo a requisição PUT com o id do usuário
};

// Função para excluir um usuário
const deleteUser = (userId) => {
  return api.delete(`user/${userId}`);  // Supondo que a URL para deletar um usuário seja /user/{id}
};



export default {
  getUsers,
  getUserDetails,
  updateUser,
  deleteUser,  // Adicionando o método delete
  api
};
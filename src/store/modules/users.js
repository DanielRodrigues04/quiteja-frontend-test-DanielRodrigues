import api from '@/services/axios'; // Importa o serviço Axios para fazer a requisição à API

// Estado inicial do módulo de usuários
const state = {
  users: [], // Lista de usuários
  loading: false, // Indicador de carregamento
};

// Mutations: São responsáveis por modificar o estado
const mutations = {
  setUsers(state, users) {
    state.users = users; // Atualiza a lista de usuários
  },
  setLoading(state, isLoading) {
    state.loading = isLoading; // Atualiza o estado de carregamento
  },
  removeUser(state, userId) {
    // Remove um usuário da lista, dado o ID
    state.users = state.users.filter(user => user.id !== userId);
  },
};

// Actions: São responsáveis por executar lógica assíncrona (como chamadas API)
const actions = {
  // Ação para buscar os usuários da API
  async fetchUsers({ commit }, { limit = 10, page = 0 }) {
    commit('setLoading', true); // Inicia o estado de carregamento
    try {
      const response = await api.getUsers(limit, page); // Faz a requisição à API
      commit('setUsers', response.data.data); // Atualiza a lista de usuários no estado
    } catch (error) {
      console.error('Erro ao carregar os dados:', error);
    } finally {
      commit('setLoading', false); // Finaliza o estado de carregamento
    }
  },

  // Ação para excluir um usuário
  async deleteUser({ commit }, userId) {
    try {
      // Você pode chamar a API para excluir o usuário, se necessário
      // Exemplo de requisição para excluir (não implementada na API dummy)
      // await api.deleteUser(userId);

      // Após a exclusão, removemos o usuário da lista no estado
      commit('removeUser', userId);
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  },
};

// Getters: São usados para acessar o estado de maneira mais "elegante"
const getters = {
  getUsers: (state) => state.users, // Retorna a lista de usuários
  isLoading: (state) => state.loading, // Retorna o estado de carregamento
};

export default {
  namespaced: true, // Permite que o módulo seja usado de maneira isolada
  state,
  mutations,
  actions,
  getters,
};

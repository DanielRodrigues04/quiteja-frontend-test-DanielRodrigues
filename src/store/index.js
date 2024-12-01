import Vue from 'vue';
import Vuex from 'vuex';
import users from './modules/users'; // Importando o módulo de usuários

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Se necessário, adicione estados globais aqui
  },
  getters: {
    // Defina getters globais aqui, se necessário
  },
  mutations: {
    // Defina mutations globais aqui, se necessário
  },
  actions: {
    // Defina ações globais aqui, se necessário
  },
  modules: {
    users, // Adicionando o módulo 'users' para gerenciar os usuários
  },
});

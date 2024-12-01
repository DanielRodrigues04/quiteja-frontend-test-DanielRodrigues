<template>
  <v-app>
    <!-- Barra de navegação fixa -->
    <Navbar />
    
    <!-- Renderiza o conteúdo das páginas -->
    <router-view />
  </v-app>
</template>

<script>
// Importando o componente Navbar
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* Degradê com tons de verde mais escuro */
  background: linear-gradient(180deg, #587a5a, #0eaa0e);  /* Gradiente de verde escuro */
  min-height: 100vh;  /* Garante que o fundo ocupe toda a altura da página */
}

/* Navegação */
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #ffffff; /* Texto branco para contraste com o fundo escuro */

    &.router-link-exact-active {
      color: #42b983; /* Cor para link ativo */
    }
  }
}
</style>
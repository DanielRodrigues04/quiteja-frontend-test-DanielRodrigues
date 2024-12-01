<template>
  <!-- Barra de navegação -->
  <v-app-bar app dark elevate-on-scroll dense>
    <!-- Logo (Imagem) da aplicação alinhada à esquerda -->
    <v-toolbar-title class="title">
      <img alt="Logo" src="@/assets/logo.png" class="logo" />
      
      <!-- Usar v-spacer para garantir que os botões fiquem no final -->
      <v-spacer></v-spacer>
      
      <!-- Botões de navegação -->
      <v-btn
        text
        to="/user"
        exact-active-class="v-btn--active"
        class="nav-btn"
      >
        Usuários
      </v-btn>
       

    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavbarComponent',
};
</script>

<style scoped lang="scss">
/* Variáveis de cor para personalização fácil */
$primary-color: #388e3c; /* Verde médio para o fundo da navbar */
$secondary-color: #2c6e2f; /* Verde mais escuro */
$accent-color: #4caf50; /* Verde claro para hover nos botões */
$text-color: #ffffff; /* Cor do texto */
$hover-bg: rgba(72, 183, 103, 0.1); /* Fundo translúcido para o hover */

/* Estilos gerais para a barra de navegação */
.v-toolbar {
  background-color: $primary-color; /* Cor do fundo */
  color: $text-color;
  box-shadow: none;
  min-height: 50px; /* Altura menor para a navbar */
  padding-left: 16px; /* Deixa a navbar um pouco mais afastada da borda */
  display: flex;
  justify-content: space-between; /* Garante que os itens na toolbar fiquem com espaçamento entre eles */
  align-items: center; /* Alinha os itens verticalmente */
}

/* Estilos do logo */
.logo {
  height: 50px;  /* Logo menor para deixar mais compacto */
  width: auto;   /* Mantém a proporção da imagem */
  margin-right: 12px;  /* Menos espaço à direita do logo */
}

/* Alinhamento do título à esquerda (com logo) */
.title {
  display: flex;
  align-items: center;  /* Alinha o conteúdo (logo) verticalmente */
  font-weight: bold;
  font-size: 22px; /* Tamanho do título um pouco menor */
  letter-spacing: 1px;
}

/* Estilos para os botões de navegação */
.nav-btn {
  color: $text-color;
  font-size: 16px; /* Menor para um layout mais compacto */
  transition: all 0.3s ease;
  padding: 8px 12px; /* Menos padding para botões mais compactos */
  margin-right: 10px;
  &:hover {
    color: $accent-color;
    background-color: $hover-bg;
  }

  &.v-btn--text {
    border-radius: 4px;
    text-transform: none;
  }

  /* Estilo para o botão ativo */
  &.v-btn--active {
    background-color: $accent-color;
    color: #ffffff;
  }
}

/* Responsividade: ajustes para dispositivos pequenos */
@media (max-width: 600px) {
  .v-toolbar-title {
    font-size: 20px; /* Tamanho do título ainda menor em dispositivos móveis */
  }

  .nav-btn {
    font-size: 14px; /* Ajusta o tamanho dos botões */
  }

  .logo {
    height: 25px;  /* Logo ainda menor em dispositivos móveis */
  }
}
</style>

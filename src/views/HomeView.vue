<template>
  <div class="home">
    <!-- Incluindo o Navbar -->
    <Navbar />
    <DatatableComponent />
    

    <!-- Aqui está o seu DatatableComponent sendo utilizado -->
   
  </div>
</template>

<script>
// Importando os componentes
import DatatableComponent from '@/components/datatableComponent.vue';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'HomeView',
  components: {
    Navbar,
    DatatableComponent
  }
};
</script>
import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';  // Página inicial (opcional)
import DatatableComponent from '@/components/datatableComponent.vue';  // Componente de usuários



Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,  // Exibe a página inicial primeiro --> quando não tiver um /algo ele da uma tratativa de erro 404
  },
  
  {
    path: '/user',
    name: 'usuarios',
    component: DatatableComponent,  // Componente de usuários
  },
  
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

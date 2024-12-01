<template>
  <v-app>
    <v-container fluid>
      <!-- Usando Vuetify grid system para centralizar a DataTable -->
      <v-row
        align="center"
        justify="center"
        class="d-flex"
        style="height: 100vh;"
      >
        <v-col cols="12" md="10" lg="8">
          <!-- DataTable do Vuetify -->
          <v-data-table
            :headers="headers"
            :items="users"
            item-key="id"
            :loading="loading"
            class="elevation-1"
          >
            <!-- Cabeçalho da tabela -->
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Usuários</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>

            <!-- Exibindo os dados da tabela -->
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.firstName }} {{ item.lastName }}</td>

                <!-- Nova coluna para "Detalhes" com o botão azul -->
                <td>
                  <v-btn small @click="viewDetails(item.id)" color="blue" text-color="white">Detalhes</v-btn>
                </td>

                <td>
                  <!-- Botão Editar -->
                  <v-btn small @click="editUser(item.id)" color="green">Editar</v-btn>

                  <!-- Botão Excluir -->
                  <v-btn small @click="confirmDelete(item)" color="red" text-color="white">Excluir</v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <!-- Modal para editar usuário -->
      <v-dialog v-model="editDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Editar Usuário</span>
          </v-card-title>

          <v-card-text>
            <!-- Preencher todos os campos na modal -->
            <v-text-field
              v-model="editedUser.firstName"
              label="Primeiro Nome"
              autofocus
            ></v-text-field>

            <v-text-field
              v-model="editedUser.lastName"
              label="Sobrenome"
            ></v-text-field>

            <v-text-field
              v-model="editedUser.phone"
              label="Telefone"
            ></v-text-field>

            <v-text-field
              v-model="editedUser.gender"
              label="Gênero"
            ></v-text-field>

            <v-text-field
              v-model="editedUser.dateOfBirth"
              label="Data de Nascimento"
            ></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-btn color="green" text @click="saveEdit">Salvar</v-btn>
            <v-btn color="red" text @click="cancelEdit">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Modal para confirmação de exclusão -->
      <v-dialog v-model="deleteDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Confirmar Exclusão</span>
          </v-card-title>

          <v-card-text>
            Tem certeza que deseja excluir o usuário <strong>{{ userToDelete?.firstName }} {{ userToDelete?.lastName }}</strong>?
          </v-card-text>

          <v-card-actions>
            <v-btn color="green" text @click="deleteUser">Confirmar</v-btn>
            <v-btn color="red" text @click="cancelDelete">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Modal para exibir detalhes completos do usuário -->
      <v-dialog v-model="detailsDialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Detalhes do Usuário</span>
          </v-card-title>
          <v-card-text> 
            <div><strong>Nome:</strong> {{ userDetails.firstName }} {{ userDetails.lastName }}</div>
            <!-- <div><strong>Email:</strong> {{ userDetails.email }}</div> -->
            <div><strong>Gênero:</strong> {{ userDetails.gender }}</div>
            <div><strong>Data de Nascimento:</strong> {{ userDetails.dateOfBirth }}</div>
            <div><strong>Telefone:</strong> {{ userDetails.phone }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="green" text @click="closeDetails">Fechar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script>
// Importando o serviço de axios
import api from '@/services/axios';  // Aqui, usamos o objeto exportado

export default {
  name: 'DatatableComponent',
  data() {
    return {
      users: [],
      headers: [
        { text: 'Nome', align: 'start', value: 'name' },
        { text: 'Detalhes', value: 'details', align: 'center' },
        { text: 'Ações', value: 'actions', align: 'center' },
      ],
      loading: true,
      editDialog: false, // Controle da modal de edição
      deleteDialog: false, // Controle da modal de exclusão
      detailsDialog: false, // Controle da modal de detalhes
      editedUser: { 
        firstName: '', 
        lastName: '', 
        phone: '', 
        gender: '',
        dateOfBirth: ''
      }, // Dados temporários para edição
      currentUser: null, // Usuário que está sendo editado
      userToDelete: null, // Usuário que será excluído
      userDetails: {}, // Detalhes do usuário para exibição na modal
    };
  },
  created() {
    this.fetchUsers(); // Carregar usuários assim que o componente for criado
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await api.getUsers();  
        if (response.data && Array.isArray(response.data)) {
          this.users = response.data;
        } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
          this.users = response.data.data;
        } else {
          console.error('Estrutura de dados inesperada na resposta da API');
        }
      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
      } finally {
        this.loading = false;
      }
    },

    // Função chamada ao clicar no botão Editar
    async editUser(userId) {
      try {
        const response = await api.getUserDetails(userId);  // Buscar o usuário pelo ID
        const user = response.data;

       
        this.currentUser = user;
        this.editedUser.firstName = user.firstName;
        this.editedUser.lastName = user.lastName;
        this.editedUser.email = user.email;
        this.editedUser.phone = user.phone;
        

        this.editedUser.gender = user.gender;
        this.editedUser.dateOfBirth = user.dateOfBirth;

        this.editDialog = true;  // Abre a modal de edição
      } catch (error) {
        console.error('Erro ao carregar os detalhes do usuário:', error);
      }
    },


    // Função para salvar as alterações do usuário
    async saveEdit() {
      try {
        // Envia as edições para a API
        const response = await api.updateUser(this.currentUser.id, this.editedUser);

        // Após salvar, recarrega os detalhes do usuário atualizado
        await this.reloadUserDetails(this.currentUser.id);

        // Atualiza o array de usuários para refletir a alteração na tabela
        const index = this.users.findIndex(user => user.id === this.currentUser.id);
        if (index !== -1) {
          // Usamos $set para garantir que o Vue detecte a alteração
          this.$set(this.users, index, { ...response.data });
        }

        // Fechar a modal de edição
        this.editDialog = false;
      } catch (error) {
        console.error('Erro ao salvar as edições do usuário:', error);
      }
    },



    // Função para recarregar os detalhes do usuário após edição
    async reloadUserDetails(userId) {
      try {
        const response = await api.getUserDetails(userId);
        const updatedUser = response.data;
        // Atualiza a lista de usuários para refletir a alteração
        const index = this.users.findIndex(user => user.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
      } catch (error) {
        console.error('Erro ao recarregar os detalhes do usuário:', error);
      }
    },

    // Função para cancelar a edição e fechar a modal
    cancelEdit() {
      this.editDialog = false;
      this.currentUser = null;
    },

    // Função chamada ao clicar no botão Excluir
    confirmDelete(user) {
      this.userToDelete = user; 
      this.deleteDialog = true;  
    },

    // Função para realizar a exclusão do usuário
    async deleteUser() {
      try {
        // Enviar requisição para a API para deletar o usuário
        await api.deleteUser(this.userToDelete.id);

        // Remover o usuário da lista local
        this.users = this.users.filter(user => user.id !== this.userToDelete.id);

        // Fechar o modal de confirmação de exclusão
        this.deleteDialog = false;
        this.userToDelete = null; // Resetando o usuário que está sendo excluído
      } catch (error) {
        console.error('Erro ao excluir o usuário:', error);
      }
    },

    // Função para cancelar a exclusão e fechar a modal
    cancelDelete() {
      this.deleteDialog = false;
      this.userToDelete = null;
    },

    // Função para mostrar detalhes do usuário na modal
    async viewDetails(userId) {
      try {
        const response = await api.getUserDetails(userId);  
        this.userDetails = response.data;
        this.detailsDialog = true;
      } catch (error) {
        console.error('Erro ao carregar detalhes do usuário:', error);
      }
    },

    // Função para fechar a modal de detalhes
    closeDetails() {
      this.detailsDialog = false;
      this.userDetails = {}; 
    },
  },
};
</script>



<style scoped lang="scss">
.v-container {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  height: 100%;
}

.v-row {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-data-table {
  max-height: 80vh;
  overflow-y: auto;
}

@media (max-width: 600px) {
  .v-data-table {
    max-height: 60vh;
  }
}
</style>

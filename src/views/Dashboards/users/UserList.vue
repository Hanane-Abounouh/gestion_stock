<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <AsideComponent />

    <!-- Main Content -->
    <div class="flex-1 p-6 ml-80 mt-20">
      <h2 class="text-2xl font-bold mb-6">Liste des Utilisateurs</h2>
      
      <!-- Button to trigger user creation form -->
      <button 
        class="mb-6 p-2 text-white rounded bg-gradient-to-r from-[#c65a1b] to-[#8d362d]" 
        @click="showCreateForm = true"
      >
        <i class="fas fa-plus mr-2"></i> Ajouter un Utilisateur
      </button>

      <!-- User Table -->
      <div class="overflow-x-auto bg-white shadow-md rounded-lg">
        <table class="min-w-full table-auto">
          <thead class="bg-gray-200">
            <tr>
              <th class="py-2 px-4 text-left">Nom</th>
              <th class="py-2 px-4 text-left">Email</th>
              <th class="py-2 px-4 text-left">Rôle</th>
              <th class="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="border-b hover:bg-gray-100">
              <td class="py-2 px-4">{{ user.name }}</td>
              <td class="py-2 px-4">{{ user.email }}</td>
              <td class="py-2 px-4">{{ user.role_id }}</td>
              <td class="py-2 px-4 flex space-x-2">
                <button 
                  class="p-2 text-green-500 hover:bg-blue-700 rounded" 
                  @click="editUser(user)"
                >
                  <i class="fas fa-edit"></i> 
                </button>
                <button 
                  class="p-2 text-red-500  hover:bg-red-700 rounded" 
                  @click="deleteUser(user.id)"
                >
                  <i class="fas fa-trash"></i> 
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Create User Form -->
      <CreateUserForm 
        v-if="showCreateForm" 
        @close="showCreateForm = false" 
        @user-added="fetchUsers"
      />

      <!-- Update User Form -->
      <UpdateUserForm 
        v-if="selectedUser" 
        :user="selectedUser" 
        @close="selectedUser = null" 
        @updated="fetchUsers"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AsideComponent from '../../../components/Aside.vue';
import CreateUserForm from './CreateUser.vue';
import UpdateUserForm from './EditUser.vue';

export default {
  components: { CreateUserForm, UpdateUserForm, AsideComponent },
  data() {
    return {
      users: [],
      showCreateForm: false,
      selectedUser: null,
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get('http://localhost:8000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.users = response.data.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },

    editUser(user) {
      this.selectedUser = user;
    },

    async deleteUser(id) {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }
        await axios.delete(`http://localhost:8000/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
/* Custom styling */
</style>

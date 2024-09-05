<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Aside Section -->
    <AsideComponent />

    <!-- Main Content Section -->
    <div class="flex-1 p-6 ml-80 mt-20"> <!-- Adjusted margin-left to account for fixed sidebar -->
      <h2 class="text-2xl font-bold mb-6">Liste des Clients</h2>
      
      <!-- Button to trigger client creation form -->
      <button 
        class="mb-6 p-2 text-white rounded bg-gradient-to-r from-[#c65a1b] to-[#8d362d]" 
        @click="showCreateForm = true"
      >
        <i class="fas fa-plus mr-2"></i> Ajouter un Client
      </button>

      <!-- Client Table -->
      <div class="overflow-x-auto bg-white shadow-md rounded-lg">
        <table class="min-w-full table-auto">
          <thead class="bg-gray-200">
            <tr>
              <th class="py-2 px-4 text-left">Nom</th>
              <th class="py-2 px-4 text-left">Email</th>
              <th class="py-2 px-4 text-left">Téléphone</th>
              <th class="py-2 px-4 text-left">Adresse</th>
              <th class="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="client in clients" :key="client.id" class="border-b hover:bg-gray-100">
              <td class="py-2 px-4">{{ client.nom }}</td>
              <td class="py-2 px-4">{{ client.email }}</td>
              <td class="py-2 px-4">{{ client.telephone }}</td>
              <td class="py-2 px-4">{{ client.adresse }}</td>
              <td class="py-2 px-4 flex space-x-2">
                <button 
                  class="p-2 text-white bg-blue-500 hover:bg-blue-700 rounded" 
                  @click="editClient(client)"
                >
                  <i class="fas fa-edit"></i> 
                </button>
                <button 
                  class="p-2 text-white bg-red-500 hover:bg-red-700 rounded" 
                  @click="deleteClient(client.id)"
                >
                  <i class="fas fa-trash"></i> 
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Create Client Form -->
      <CreateClientForm 
        v-if="showCreateForm" 
        @close="showCreateForm = false" 
        @created="fetchClients"
      />

      <!-- Update Client Form -->
      <UpdateClientForm 
        v-if="selectedClient" 
        :client="selectedClient" 
        @close="selectedClient = null" 
        @updated="fetchClients"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AsideComponent from '../../../components/Aside.vue'; // Sidebar component
import CreateClientForm from './ClientCreate.vue'; // Client creation form
import UpdateClientForm from './ClientEdit.vue'; // Client update form

export default {
  components: { CreateClientForm, UpdateClientForm, AsideComponent },
  data() {
    return {
      clients: [], // Holds the list of clients
      showCreateForm: false, // To toggle create client form
      selectedClient: null, // Holds the selected client for editing
    };
  },
  methods: {
    // Fetch the list of clients
    async fetchClients() {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get('http://localhost:8000/api/clients', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response && response.data) {
          this.clients = response.data.data; // Assuming the data comes in this format
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    },

    // Select a client for editing
    editClient(client) {
      this.selectedClient = client;
    },

    // Delete a client by ID
    async deleteClient(id) {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }
        await axios.delete(`http://localhost:8000/api/clients/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Refresh the client list
        this.fetchClients();
      } catch (error) {
        console.error('Error deleting client:', error);
      }
    },
  },
  created() {
    this.fetchClients(); // Fetch clients when the component is created
  },
};
</script>

<style scoped>
/* Custom styling */
</style>

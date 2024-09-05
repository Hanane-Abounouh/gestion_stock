<!-- src/views/Dashboards/commandes/CommandeList.vue -->
<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Aside Section -->
    <AsideComponent />

    <!-- Main Content Section -->
    <div class="flex-1 p-6 ml-80 mt-20"> <!-- Adjusted margin-left to account for fixed sidebar -->
      <h2 class="text-2xl font-bold mb-6">Liste des Commandes</h2>

      <!-- Button to trigger command creation form -->
      <button 
        class="mb-6 p-2 text-white rounded bg-gradient-to-r from-[#c65a1b] to-[#8d362d]" 
        @click="showCreateForm = true"
      >
        <i class="fas fa-plus mr-2"></i> Ajouter une Commande
      </button>

      <!-- Commande Table -->
      <div class="overflow-x-auto bg-white shadow-md rounded-lg">
        <table class="min-w-full table-auto">
          <thead class="bg-gray-200">
            <tr>
              <th class="py-2 px-4 text-left">Client</th>
              <th class="py-2 px-4 text-left">Produit</th>
              <th class="py-2 px-4 text-left">Quantité</th>
              <th class="py-2 px-4 text-left">Prix Total</th>
              <th class="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="commande in commandes" :key="commande.id" class="border-b hover:bg-gray-100">
              <td class="py-2 px-4">{{ commande.client.nom }}</td>
              <td class="py-2 px-4">{{ commande.produit.nom }}</td>
              <td class="py-2 px-4">{{ commande.quantite }}</td>
              <td class="py-2 px-4">{{ commande.prix_total }}</td>
              <td class="py-2 px-4 flex space-x-2">
                <button 
                  class="p-2 text-white bg-blue-500 hover:bg-blue-700 rounded" 
                  @click="editCommande(commande)"
                >
                  <i class="fas fa-edit"></i> 
                </button>
                <button 
                  class="p-2 text-white bg-red-500 hover:bg-red-700 rounded" 
                  @click="deleteCommande(commande.id)"
                >
                  <i class="fas fa-trash"></i> 
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Create Commande Form -->
      <CreateCommandeForm 
        v-if="showCreateForm" 
        @close="showCreateForm = false" 
        @created="fetchCommandes"
      />

      <!-- Update Commande Form -->
      <UpdateCommandeForm 
        v-if="selectedCommande" 
        :commande="selectedCommande" 
        @close="selectedCommande = null" 
        @updated="fetchCommandes"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AsideComponent from '../../../components/Aside.vue'; // Sidebar component
import CreateCommandeForm from './CreateCommande.vue'; // Commande creation form
import UpdateCommandeForm from './EditCommande.vue'; // Commande update form

export default {
  components: { CreateCommandeForm, UpdateCommandeForm, AsideComponent },
  data() {
    return {
      commandes: [], // Holds the list of commandes
      showCreateForm: false, // To toggle create commande form
      selectedCommande: null, // Holds the selected commande for editing
    };
  },
  methods: {
    // Fetch the list of commandes
    async fetchCommandes() {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get('http://localhost:8000/api/commandes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response && response.data) {
          this.commandes = response.data.data; // Assuming the data comes in this format
        }
      } catch (error) {
        console.error('Error fetching commandes:', error);
      }
    },

    // Select a commande for editing
    editCommande(commande) {
      this.selectedCommande = commande;
    },

    // Delete a commande by ID
    async deleteCommande(id) {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }
        await axios.delete(`http://localhost:8000/api/commandes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Refresh the commande list
        this.fetchCommandes();
      } catch (error) {
        console.error('Error deleting commande:', error);
      }
    },
  },
  created() {
    this.fetchCommandes(); // Fetch commandes when the component is created
  },
};
</script>

<style scoped>
/* Custom styling */
</style>

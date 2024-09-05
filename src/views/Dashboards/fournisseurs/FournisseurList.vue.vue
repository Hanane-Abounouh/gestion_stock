<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <AsideComponent />

    <!-- Main Content Section -->
    <div class="flex-1 p-6 ml-80 mt-20">
      <h2 class="text-2xl font-bold mb-6 text-gray-900">Liste des Fournisseurs</h2>

      <!-- Button to trigger fournisseur creation form -->
      <button 
        class="mb-6 p-2 text-white rounded bg-gradient-to-r from-[#c65a1b] to-[#8d362d]" 
        @click="showCreateForm = true"
      >
        <i class="fas fa-plus mr-2"></i> Ajouter un Fournisseur
      </button>

      <!-- Fournisseurs Table -->
      <div class="overflow-x-auto bg-white shadow-md rounded-lg">
        <table class="min-w-full table-auto">
          <thead class="bg-gray-200">
            <tr>
              <th class="py-2 px-4 text-left">Nom</th>
              <th class="py-2 px-4 text-left">Informations de Contact</th>
              <th class="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="fournisseur in fournisseurs" :key="fournisseur.id" class="border-b hover:bg-gray-100">
              <td class="py-2 px-4">{{ fournisseur.nom }}</td>
              <td class="py-2 px-4">{{ fournisseur.informations_contact }}</td>
              <td class="py-2 px-4 flex space-x-2">
                <button 
                  class="p-2 text-green-600  rounded" 
                  @click="editFournisseur(fournisseur)"
                >
                  <i class="fas fa-edit"></i> 
                </button>
                <button 
                  class="p-2 text-red-500  rounded" 
                  @click="deleteFournisseur(fournisseur.id)"
                >
                  <i class="fas fa-trash"></i> 
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Create Fournisseur Form -->
      <FournisseurCreate v-if="showCreateForm" @close="showCreateForm = false" @created="fetchFournisseurs" />

      <!-- Update Fournisseur Form -->
      <FournisseurEdit v-if="selectedFournisseur" :fournisseur="selectedFournisseur" @close="selectedFournisseur = null" @updated="fetchFournisseurs" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AsideComponent from '../../../components/Aside.vue';
import FournisseurCreate from './FournisseurCreate.vue';
import FournisseurEdit from './FournisseurEdit.vue';

export default {
  components: { FournisseurCreate, FournisseurEdit, AsideComponent },
  data() {
    return {
      fournisseurs: [],
      showCreateForm: false,
      selectedFournisseur: null,
    };
  },
  methods: {
    async fetchFournisseurs() {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:8000/api/fournisseurs', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.fournisseurs = response.data.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des fournisseurs', error);
        if (error.response && error.response.status === 401) {
          alert('Vous devez vous connecter pour accéder à cette ressource.');
        }
      }
    },
    editFournisseur(fournisseur) {
      this.selectedFournisseur = fournisseur;
    },
    async deleteFournisseur(id) {
      try {
        const token = localStorage.getItem('authToken');
        await axios.delete(`http://localhost:8000/api/fournisseurs/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.fetchFournisseurs();
      } catch (error) {
        console.error('Erreur lors de la suppression du fournisseur', error);
      }
    }
  },
  created() {
    this.fetchFournisseurs();
  }
};
</script>

<style scoped>
/* Ajoutez vos styles personnalisés ici si nécessaire */
</style>

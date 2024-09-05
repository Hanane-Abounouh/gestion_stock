<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <AsideComponent />

    <!-- Main Content Section -->
    <div class="flex-1 p-6 ml-80 mt-20">
      <h2 class="text-2xl font-bold mb-6">Liste des Produits</h2>

      <!-- Button to trigger product creation form -->
      <button 
        class="mb-6 p-2 text-white rounded bg-gradient-to-r from-[#c65a1b] to-[#8d362d]" 
        @click="showCreateForm = true"
      >
        <i class="fas fa-plus mr-2"></i> Ajouter un Produit
      </button>

      <!-- Products Table -->
      <div class="overflow-x-auto bg-white shadow-md rounded-lg">
        <table class="min-w-full table-auto">
          <thead class="bg-gray-200">
            <tr>
              <th class="py-2 px-4 text-left">Nom</th>
              <th class="py-2 px-4 text-left">Prix</th>
              <th class="py-2 px-4 text-left">Quantité</th>
              <!-- <th class="py-2 px-4 text-left">Catégorie</th>
              <th class="py-2 px-4 text-left">Fournisseur</th> -->
              <th class="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="produit in produits" :key="produit.id" class="border-b hover:bg-gray-100">
              <td class="py-2 px-4">{{ produit.nom }}</td>
              <td class="py-2 px-4">{{ produit.prix }}</td>
              <td class="py-2 px-4">{{ produit.quantite }}</td>
              <!-- <td class="py-2 px-4">{{ produit.categorie ? produit.categorie.nom : 'Inconnu' }}</td> 
              <td class="py-2 px-4">{{ produit.fournisseur ? produit.fournisseur.nom : 'Inconnu' }}</td>  -->
              <td class="py-2 px-4 flex space-x-2">
                <button 
                  class="p-2 text-white bg-blue-500 hover:bg-blue-700 rounded" 
                  @click="editProduit(produit)"
                >
                  <i class="fas fa-edit"></i> 
                </button>
                <button 
                  class="p-2 text-white bg-red-500 hover:bg-red-700 rounded" 
                  @click="deleteProduit(produit.id)"
                >
                  <i class="fas fa-trash"></i> 
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Create Product Form -->
      <ProduitCreate v-if="showCreateForm" @close="showCreateForm = false" @created="fetchProduits" />

      <!-- Update Product Form -->
      <ProduitEdit v-if="selectedProduit" :produit="selectedProduit" @close="selectedProduit = null" @updated="fetchProduits" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AsideComponent from '../../../components/Aside.vue';
import ProduitCreate from './ProduitCreate.vue';
import ProduitEdit from './ProduitEdit.vue';

export default {
  components: { ProduitCreate, ProduitEdit, AsideComponent },
  data() {
    return {
      produits: [],
      showCreateForm: false,
      selectedProduit: null,
    };
  },
  methods: {
    async fetchProduits() {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.get('http://localhost:8000/api/produits', {
      headers: { Authorization: `Bearer ${token}` },
    });
    this.produits = response.data.data; // Assurez-vous que vous utilisez `response.data.data` selon la structure des données retournées par l'API
  } catch (error) {
    console.error('Erreur lors de la récupération des produits', error);
  }
},

    editProduit(produit) {
      this.selectedProduit = produit;
    },
    async deleteProduit(id) {
      try {
        const token = localStorage.getItem('authToken');
        await axios.delete(`http://localhost:8000/api/produits/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.fetchProduits();
      } catch (error) {
        console.error('Erreur lors de la suppression du produit', error);
      }
    },
  },
  created() {
    this.fetchProduits();
  },
};
</script>

<style scoped>
/* Style personnalisé */
</style>

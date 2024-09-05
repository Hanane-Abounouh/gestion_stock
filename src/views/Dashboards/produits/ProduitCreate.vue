<template>
  <div class="bg-white p-6 rounded-lg mt-10 shadow-md">
    <h2 class="text-xl font-semibold mb-4">Créer un Produit</h2>
    <form @submit.prevent="createProduit">
      <div class="mb-4">
        <label for="nom" class="block text-gray-700">Nom</label>
        <input 
          v-model="produit.nom"
          id="nom"
          type="text"
          class="w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
      </div>
      <div class="mb-4">
        <label for="prix" class="block text-gray-700">Prix</label>
        <input 
          v-model="produit.prix"
          id="prix"
          type="number"
          class="w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
      </div>
      <div class="mb-4">
        <label for="quantite" class="block text-gray-700">Quantité</label>
        <input 
          v-model="produit.quantite"
          id="quantite"
          type="number"
          class="w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
      </div>
      <div class="mb-4">
        <label for="categorie" class="block text-gray-700">Catégorie</label>
        <select 
          v-model="produit.categorie_id"
          id="categorie"
          class="w-full p-2 border border-gray-300 rounded mt-1"
          required
        >
          <option v-for="categorie in categories" :key="categorie.id" :value="categorie.id">
            {{ categorie.name }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label for="fournisseur" class="block text-gray-700">Fournisseur</label>
        <select 
          v-model="produit.fournisseur_id"
          id="fournisseur"
          class="w-full p-2 border border-gray-300 rounded mt-1"
          required
        >
          <option v-for="fournisseur in fournisseurs" :key="fournisseur.id" :value="fournisseur.id">
            {{ fournisseur.nom }}
          </option>
        </select>
      </div>
      <button type="submit" class="bg-gradient-to-r from-[#c65a1b] to-[#8d362d] text-white p-2 rounded">
        Créer
      </button>
      <button @click="$emit('close')" class="bg-gray-500 hover:bg-gray-700 text-white p-2 rounded ml-2">
        Annuler
      </button>
    </form>
    <p v-if="error" class="text-red-500">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      produit: {
        nom: '',
        prix: '',
        quantite: '',
        categorie_id: '',
        fournisseur_id: ''
      },
      categories: [],
      fournisseurs: [],
      error: null,
    };
  },
  created() {
    this.fetchCategories();
    this.fetchFournisseurs();
  },
  methods: {
    async fetchCategories() {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:8000/api/categories', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Réponse des catégories:', response.data); // Inspecter la réponse
        this.categories = response.data.data || response.data; // Ajuster en fonction du format
      } catch (error) {
        this.error = 'Erreur lors de la récupération des catégories.';
        console.error('Erreur lors de la récupération des catégories', error);
      }
    },
    async fetchFournisseurs() {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:8000/api/fournisseurs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.fournisseurs = response.data.data || response.data; // Ajuster en fonction du format
      } catch (error) {
        this.error = 'Erreur lors de la récupération des fournisseurs.';
        console.error('Erreur lors de la récupération des fournisseurs', error);
      }
    },
    async createProduit() {
      try {
        const token = localStorage.getItem('authToken');
        await axios.post('http://localhost:8000/api/produits', this.produit, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.$emit('created');
        this.$emit('close');
      } catch (error) {
        this.error = 'Erreur lors de la création du produit.';
        console.error('Erreur lors de la création du produit', error);
      }
    },
  },
};
</script>

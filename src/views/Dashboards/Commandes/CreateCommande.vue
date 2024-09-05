<template>
  <div class="bg-white p-6 rounded-lg mt-10 shadow-md">
    <h2 class="text-xl font-semibold mb-4">Créer une Commande</h2>
    <form @submit.prevent="createCommande">
      <div class="mb-4">
        <label for="client_id" class="block text-gray-700">Client</label>
        <select 
          v-model="commande.client_id"
          id="client_id"
          class="w-full p-2 border border-gray-300 rounded mt-1"
          required
        >
          <option v-for="client in clients" :key="client.id" :value="client.id">
            {{ client.nom }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label for="produit_id" class="block text-gray-700">Produit</label>
        <select 
          v-model="commande.produit_id"
          id="produit_id"
          class="w-full p-2 border border-gray-300 rounded mt-1"
          required
        >
          <option v-for="produit in produits" :key="produit.id" :value="produit.id">
            {{ produit.nom }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label for="quantite" class="block text-gray-700">Quantité</label>
        <input 
          v-model="commande.quantite"
          id="quantite"
          type="number"
          class="w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
      </div>
      <div class="mb-4">
        <label for="prix_total" class="block text-gray-700">Prix Total</label>
        <input 
          v-model="commande.prix_total"
          id="prix_total"
          type="number"
          class="w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
      </div>
      <button type="submit" class="bg-gradient-to-r from-[#c65a1b] to-[#8d362d] text-white p-2 rounded">
        Créer
      </button>
      <button @click="$emit('close')" class="bg-gray-500 hover:bg-gray-700 text-white p-2 rounded ml-2">
        Annuler
      </button>
    </form>
    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      commande: {
        client_id: '',
        produit_id: '',
        quantite: '',
        prix_total: ''
      },
      clients: [],
      produits: [],
      error: null,
    };
  },
  created() {
    this.fetchClients();
    this.fetchProduits();
  },
  methods: {
    async fetchClients() {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:8000/api/clients', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Réponse des clients:', response.data); // Inspecter la réponse
        this.clients = response.data.data || response.data; // Ajuster en fonction du format
      } catch (error) {
        this.error = 'Erreur lors de la récupération des clients.';
        console.error('Erreur lors de la récupération des clients', error);
      }
    },
    async fetchProduits() {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:8000/api/produits', {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.produits = response.data.data || response.data; // Ajuster en fonction du format
      } catch (error) {
        this.error = 'Erreur lors de la récupération des produits.';
        console.error('Erreur lors de la récupération des produits', error);
      }
    },
    async createCommande() {
      try {
        const token = localStorage.getItem('authToken');
        await axios.post('http://localhost:8000/api/commandes', this.commande, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.$emit('created');
        this.$emit('close');
      } catch (error) {
        this.error = 'Erreur lors de la création de la commande.';
        console.error('Erreur lors de la création de la commande', error);
      }
    },
  },
};
</script>

<style scoped>
/* Custom styling */
</style>

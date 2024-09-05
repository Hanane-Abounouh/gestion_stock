<template>
  <div class="bg-white p-6 rounded-lg mt-10 shadow-md">
    <h2 class="text-xl font-semibold mb-4">Modifier une Commande</h2>
    <form @submit.prevent="updateCommande">
      <div class="mb-4">
        <label for="client_id" class="block text-gray-700">Client</label>
        <select 
          v-model="localCommande.client_id"
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
          v-model="localCommande.produit_id"
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
          v-model="localCommande.quantite"
          id="quantite"
          type="number"
          class="w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
      </div>
      <div class="mb-4">
        <label for="prix_total" class="block text-gray-700">Prix Total</label>
        <input 
          v-model="localCommande.prix_total"
          id="prix_total"
          type="number"
          class="w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
      </div>
      <button type="submit" class="bg-gradient-to-r from-[#c65a1b] to-[#8d362d] text-white p-2 rounded">
        Mettre à Jour
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
  props: {
    commandeId: {
      type: Number,
      required: true,
    },
    commande: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localCommande: { ...this.commande }, // Crée une copie locale des données de la commande
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
  async updateCommande() {
  try {
    const token = localStorage.getItem('authToken');
    
    // Log commandeId to check if it's correctly set
    console.log('commandeId:', this.commandeId);

    // Use localCommande to send the updated data
    await axios.put(`http://localhost:8000/api/commandes/${this.commandeId}`, this.localCommande, {
      headers: { Authorization: `Bearer ${token}` },
    });
    this.$emit('updated');
    this.$emit('close');
  } catch (error) {
    this.error = 'Erreur lors de la mise à jour de la commande.';
    console.error('Erreur lors de la mise à jour de la commande', error);
  }
},


  },
};
</script>

<style scoped>
/* Custom styling */
</style>

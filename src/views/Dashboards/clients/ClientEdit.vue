<template>
  <div class="p-6 bg-white rounded-lg shadow-md max-w-md mt-10">
    <h2 class="text-2xl font-bold mb-4 text-gray-800">Modifier le Client</h2>
    <form @submit.prevent="updateClient">
      <!-- Nom -->
      <div class="mb-4">
        <label for="nom" class="block text-gray-700 font-medium mb-2">Nom:</label>
        <input
          type="text"
          v-model="localClient.nom"
          id="nom"
          required
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#c65a1b] focus:border-transparent"
          placeholder="Entrez le nom"
        />
      </div>

      <!-- Email -->
      <div class="mb-4">
        <label for="email" class="block text-gray-700 font-medium mb-2">Email:</label>
        <input
          type="email"
          v-model="localClient.email"
          id="email"
          required
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#c65a1b] focus:border-transparent"
          placeholder="Entrez l'email"
        />
      </div>

      <!-- Téléphone -->
      <div class="mb-4">
        <label for="telephone" class="block text-gray-700 font-medium mb-2">Téléphone:</label>
        <input
          type="text"
          v-model="localClient.telephone"
          id="telephone"
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#c65a1b] focus:border-transparent"
          placeholder="Entrez le téléphone"
        />
      </div>

      <!-- Adresse -->
      <div class="mb-6">
        <label for="adresse" class="block text-gray-700 font-medium mb-2">Adresse:</label>
        <input
          type="text"
          v-model="localClient.adresse"
          id="adresse"
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#c65a1b] focus:border-transparent"
          placeholder="Entrez l'adresse"
        />
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-between">
        <!-- Update Button -->
        <button
          type="submit"
          class="px-4 py-2 bg-gradient-to-r from-[#c65a1b] to-[#8d362d] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"
        >
          Mettre à jour
        </button>
        <!-- Cancel Button -->
        <button
          type="button"
          @click="$emit('close')"
          class="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"
        >
          Annuler
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    client: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localClient: { ...this.client } // Crée une copie locale de la prop
    };
  },
  methods: {
    async updateClient() {
      try {
        console.log('Mise à jour du client avec les données:', this.localClient);

        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.put(`http://localhost:8000/api/clients/${this.localClient.id}`, this.localClient, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('Réponse du serveur:', response.data);

        // Émet l'événement 'updated' pour informer le parent de la mise à jour
        this.$emit('updated');

        // Ferme le formulaire après la mise à jour
        this.$emit('close');

      } catch (error) {
        if (error.response) {
          // La requête a été faite et le serveur a répondu avec un statut d'erreur
          console.error('Erreur de réponse:', error.response.data);
          alert(`Erreur: ${error.response.data.message || 'Une erreur est survenue.'}`);
        } else if (error.request) {
          // La requête a été faite mais aucune réponse n'a été reçue
          console.error('Erreur de requête:', error.request);
          alert('Erreur: Pas de réponse du serveur.');
        } else {
          // Quelque chose s'est produit en configurant la requête
          console.error('Erreur:', error.message);
          alert(`Erreur: ${error.message}`);
        }
      }
    }
  }
};
</script>

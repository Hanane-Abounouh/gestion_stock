<template>
  <div class="p-6 bg-white rounded-lg shadow-md mt-10 max-w-md ">
    <h2 class="text-2xl font-bold mb-4 text-gray-800">Ajouter un Client</h2>
    <form @submit.prevent="createClient">
      <!-- Nom -->
      <div class="mb-4">
        <label for="nom" class="block text-gray-700 font-medium mb-2">Nom:</label>
        <input
          v-model="client.nom"
          type="text"
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
          v-model="client.email"
          type="email"
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
          v-model="client.telephone"
          type="text"
          id="telephone"
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#c65a1b] focus:border-transparent"
          placeholder="Entrez le téléphone"
        />
      </div>

      <!-- Adresse -->
      <div class="mb-6">
        <label for="adresse" class="block text-gray-700 font-medium mb-2">Adresse:</label>
        <input
          v-model="client.adresse"
          type="text"
          id="adresse"
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#c65a1b] focus:border-transparent"
          placeholder="Entrez l'adresse"
        />
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-between">
        <!-- Submit Button -->
        <button
          type="submit"
          class="px-4 py-2 bg-gradient-to-r from-[#c65a1b] to-[#8d362d] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"
        >
          Ajouter
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
  data() {
    return {
      client: {
        nom: '',
        email: '',
        telephone: '',
        adresse: ''
      }
    };
  },
  methods: {
    async createClient() {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }

        await axios.post('http://localhost:8000/api/clients', this.client, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Notify parent component of successful creation
        this.$emit('created');
        this.$emit('close');

        // Reset form fields
        this.client = {
          nom: '',
          email: '',
          telephone: '',
          adresse: ''
        };

      } catch (error) {
        console.error('Error creating client:', error);
        alert('Error creating client. Please try again.');
      }
    }
  }
};
</script>

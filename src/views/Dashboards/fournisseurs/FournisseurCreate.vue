<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-md w-1/3">
      <h2 class="text-xl font-semibold mb-4">Ajouter un Fournisseur</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="nom" class="block text-gray-700">Nom</label>
          <input 
            v-model="fournisseur.nom"
            id="nom"
            type="text"
            class="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div class="mb-4">
          <label for="informations_contact" class="block text-gray-700">Informations de Contact</label>
          <input 
            v-model="fournisseur.informations_contact"
            id="informations_contact"
            type="text"
            class="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">
          Ajouter
        </button>
        <button @click="$emit('close')" class="bg-gray-500 hover:bg-gray-700 text-white p-2 rounded ml-2">
          Annuler
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      fournisseur: {
        nom: '',
        informations_contact: ''
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        const token = localStorage.getItem('authToken'); // Assurez-vous que 'authToken' est le nom correct
        await axios.post('http://localhost:8000/api/fournisseurs', this.fournisseur, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.$emit('created');
        this.$emit('close');
      } catch (error) {
        console.error('Erreur lors de l\'ajout du fournisseur', error);
      }
    }
  }
};
</script>

<style scoped>
/* Style personnalisé */
</style>

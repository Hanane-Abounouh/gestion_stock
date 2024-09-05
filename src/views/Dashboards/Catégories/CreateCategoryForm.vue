<template>
  <div class="p-6 bg-white rounded-lg shadow-md max-w-md ">
    <h2 class="text-2xl font-bold mb-4 text-gray-800">Ajouter une Catégorie</h2>
    <form @submit.prevent="createCategory">
      <div class="mb-4">
        <label for="name" class="block text-gray-700 font-medium mb-2">Nom:</label>
        <input 
          v-model="name" 
          type="text" 
          id="name" 
          required 
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#c65a1b] focus:border-transparent"
        />
      </div>
      
      <div class="mb-6">
        <label for="description" class="block text-gray-700 font-medium mb-2">Description:</label>
        <textarea 
          v-model="description" 
          id="description" 
          rows="4"
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#c65a1b] focus:border-transparent"
        ></textarea>
      </div>
      
      <div class="flex justify-between">
        <button 
          type="submit" 
          class="px-4 py-2 bg-gradient-to-r from-[#c65a1b] to-[#8d362d] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"
        >
          Ajouter
        </button>
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
      name: '',
      description: ''
    };
  },
  methods: {
    async createCategory() {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }

        await axios.post('http://localhost:8000/api/categories', {
          name: this.name,
          description: this.description
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Émission d'événements pour informer le parent
        this.$emit('created');
        this.$emit('close');

        // Réinitialisation des champs du formulaire
        this.name = '';
        this.description = '';

      } catch (error) {
        console.error('Erreur lors de la création de la catégorie:', error);
        alert('Erreur lors de la création de la catégorie. Veuillez réessayer.');
      }
    }
  }
};
</script>

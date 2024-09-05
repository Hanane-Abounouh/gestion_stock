<template>
  <div class="p-6 bg-white rounded-lg shadow-md max-w-md mt-16">
    <h2 class="text-2xl font-bold mb-4 text-gray-800">Modifier la Catégorie</h2>
    <form @submit.prevent="updateCategory">
      <div class="mb-4">
        <label for="name" class="block text-gray-700 font-medium mb-2">Nom:</label>
        <input 
          type="text" 
          v-model="localCategory.name" 
          id="name" 
          required 
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#c65a1b] focus:border-transparent"
        />
      </div>
      
      <div class="mb-6">
        <label for="description" class="block text-gray-700 font-medium mb-2">Description:</label>
        <textarea 
          v-model="localCategory.description" 
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
          Mettre à jour
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
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localCategory: { ...this.category } // Crée une copie locale de la prop
    };
  },
  methods: {
    async updateCategory() {
      try {
        console.log('Mise à jour de la catégorie avec les données:', this.localCategory);

        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.put(`http://localhost:8000/api/categories/${this.localCategory.id}`, this.localCategory, {
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

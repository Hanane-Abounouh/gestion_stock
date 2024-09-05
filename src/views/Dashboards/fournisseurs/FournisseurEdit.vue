<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-4">Modifier Fournisseur</h2>

      <form @submit.prevent="updateFournisseur">
        <!-- Nom -->
        <div class="mb-4">
          <label for="nom" class="block text-gray-700">Nom</label>
          <input
            v-model="localFournisseur.nom"
            type="text"
            id="nom"
            class="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <!-- Informations de Contact -->
        <div class="mb-4">
          <label for="informations_contact" class="block text-gray-700">Informations de Contact</label>
          <input
            v-model="localFournisseur.informations_contact"
            type="text"
            id="informations_contact"
            class="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <!-- Buttons -->
        <div class="flex justify-end space-x-4">
          <button type="button" @click="$emit('close')" class="p-2 text-white bg-gray-500 hover:bg-gray-700 rounded">
            Annuler
          </button>
          <button type="submit" class="p-2 text-white bg-blue-500 hover:bg-blue-700 rounded">
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    fournisseur: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localFournisseur: { ...this.fournisseur } // Crée une copie locale des données
    };
  },
  methods: {
    async updateFournisseur() {
      try {
        const token = localStorage.getItem('authToken'); // Assurez-vous que 'authToken' est le nom correct
        await axios.put(`http://localhost:8000/api/fournisseurs/${this.localFournisseur.id}`, this.localFournisseur, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.$emit('updated');
        this.$emit('close');
      } catch (error) {
        console.error('Erreur lors de la mise à jour du fournisseur', error);
      }
    }
  }
};
</script>

<style scoped>
/* Ajoutez vos styles ici */
</style>

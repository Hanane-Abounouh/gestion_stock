<template>
  <div class="p-6 bg-white rounded-lg shadow-md max-w-md mt-10">
    <h2 class="text-2xl font-bold mb-4 text-gray-800">Modifier l'Utilisateur</h2>
    <form @submit.prevent="updateUser">
      <!-- Nom -->
      <div class="mb-4">
        <label for="name" class="block text-gray-700 font-medium mb-2">Nom:</label>
        <input
          type="text"
          v-model="localUser.name"
          id="name"
          required
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#c65a1b] focus:border-transparent"
          placeholder="Entrez le nom"
        />
        <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name[0] }}</span>
      </div>

      <!-- Email -->
      <div class="mb-4">
        <label for="email" class="block text-gray-700 font-medium mb-2">Email:</label>
        <input
          type="email"
          v-model="localUser.email"
          id="email"
          required
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#c65a1b] focus:border-transparent"
          placeholder="Entrez l'email"
        />
        <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email[0] }}</span>
      </div>

      <!-- Mot de passe -->
      <div class="mb-4">
        <label for="password" class="block text-gray-700 font-medium mb-2">Mot de passe:</label>
        <input
          type="password"
          v-model="localUser.password"
          id="password"
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#c65a1b] focus:border-transparent"
          placeholder="Entrez le mot de passe"
        />
        <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password[0] }}</span>
      </div>

      <!-- Confirmation du mot de passe -->
      <div class="mb-4">
        <label for="password_confirmation" class="block text-gray-700 font-medium mb-2">Confirmez le mot de passe:</label>
        <input
          type="password"
          v-model="localUser.password_confirmation"
          id="password_confirmation"
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#c65a1b] focus:border-transparent"
          placeholder="Confirmez le mot de passe"
        />
        <span v-if="errors.password_confirmation" class="text-red-500 text-sm">{{ errors.password_confirmation[0] }}</span>
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
          @click="$router.push({ name: 'UserList' })"
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
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localUser: { ...this.user, password_confirmation: '' }, // Ajoutez password_confirmation
      errors: {}
    };
  },
  methods: {
    async updateUser() {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.put(`http://localhost:8000/api/users/${this.localUser.id}`, this.localUser, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Utilisateur mis à jour avec succès:', response.data);
    this.$router.push({ name: 'Users' }); // Utilisez 'Users' au lieu de 'UserList'
  } catch (error) {
    if (error.response && error.response.data.errors) {
      this.errors = error.response.data.errors;
    } else {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    }
  }
}

  }
};
</script>

<style scoped>
/* Ajoutez des styles supplémentaires si nécessaire */
</style>

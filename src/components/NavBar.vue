<template>
  <div class="bg-white text-black shadow w-full py-4 px-6 flex items-center justify-between">
    <div class="flex items-center">
      <h1 class="text-[#c65a1b] text-3xl font-bold gradient-text">Ge<span class="to-[#8d362d]">stock</span></h1>
      <div class="md:hidden flex items-center">
        <button id="menuBtn">
          <i class="fas fa-bars text-gray-500 text-lg"></i>
        </button>
      </div>
    </div>

    <!-- Ícone de Notificación y Perfil -->
    <div class="space-x-12 flex items-center gap-8">
      <button>
        <i class="fas fa-bell text-gray-500 text-lg"></i>
      </button>

      <!-- Si l'utilisateur est authentifié, afficher le bouton de déconnexion -->
      <div v-if="isAuthenticated" class="flex items-center gap-4">
        <button @click="logout">
          <i class="fas fa-sign-out-alt text-gray-500 text-lg"></i>
        </button>
      </div>
      <!-- Sinon, afficher les liens de connexion et d'inscription -->
      <div v-else class="flex gap-4 items-center">
        <router-link to="/login" class="text-gray-500 text-lg hover:text-black">Login</router-link>
        <router-link to="/register" class="text-gray-500 text-lg hover:text-black">Register</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  computed: {
    isAuthenticated() {
      // Assurez-vous que `this.$store.state.user` est correctement défini
      return !!this.$store.state.user;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login');
        })
        .catch(error => {
          console.error("Erreur lors de la déconnexion :", error);
        });
    }
  }
};
</script>

<style scoped>

</style>

<template>
  <div 
    class="p-2 bg-white w-full md:w-60 flex flex-col md:flex hidden fixed top-0 left-0 z-40 h-full" 
    id="sideNav"
  >
    <nav>
      <div class="flex items-center ml-4">
        <h1 class="text-[#c65a1b] text-3xl font-bold gradient-text">Ge<span class="to-[#8d362d]">stock</span></h1>
        <div class="md:hidden flex items-center">
          <button id="menuBtn">
            <i class="fas fa-bars text-gray-500 text-lg"></i>
          </button>
        </div>
      </div>
      <router-link
        class="block text-gray-500 py-2.5 px-4 my-4 mt-10 rounded transition duration-200 hover:bg-gradient-to-r hover:from-[#c65a1b] hover:to-[#c65a1b] hover:text-white"
        to="/">
        <i class="fas fa-home mr-2"></i>Home
      </router-link>
      <router-link
        class="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-[#c65a1b] hover:to-[#c65a1b] hover:text-white"
        to="/Produits">
        <i class="fas fa-box mr-2"></i>Produits
      </router-link>
      <router-link
        class="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-[#c65a1b] hover:to-[#c65a1b] hover:text-white"
        to="/categories">
        <i class="fas fa-th-list mr-2"></i>Catégories
      </router-link>
      <router-link
        class="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-[#c65a1b] hover:to-[#c65a1b] hover:text-white"
        to="/Fournisseurs">
        <i class="fas fa-store mr-2"></i>Fournisseurs
      </router-link>
      <router-link
        class="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-[#c65a1b] hover:to-[#c65a1b] hover:text-white"
        to="/Clients">
        <i class="fas fa-users mr-2"></i>Clients
      </router-link>
      <router-link
        class="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-[#c65a1b] hover:to-[#c65a1b] hover:text-white"
        to="/Commandes">
        <i class="fas fa-receipt mr-2"></i>Commandes
      </router-link>
      <!-- Lien vers la liste des utilisateurs -->
      <router-link
        class="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-[#c65a1b] hover:to-[#c65a1b] hover:text-white"
        to="/users">
        <i class="fas fa-users-cog mr-2"></i>Utilisateurs
      </router-link>
    </nav>

    <div class="bg-gradient-to-r from-[#c65a1b] to-[#7b2e26] h-px mt-96"></div>
    <p class="mb-1 px-5 py-3 text-left text-xs text-[#8d362d]">Copyright Gestock@2024</p>
  </div>
</template>

<script>
export default {
  name: 'AsideComponent',
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('authToken'); // Assurez-vous que cette clé correspond à votre clé de token
    }
  }
};
</script>

<style scoped>
/* Styles personnalisés pour AsideComponent */

/* Classe pour fixer la barre latérale */
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%; /* Assure que l'aside prend toute la hauteur de la page */
  z-index: 100; /* S'assure que l'aside reste au-dessus du contenu principal */
}
</style>

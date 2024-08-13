<template>
  <div class="p-2 bg-white w-full md:w-60 flex  flex-col md:flex hidden" id="sideNav">
    <nav>
      <router-link
        class="block text-gray-500 py-2.5 px-4 my-4 mt-10 rounded transition duration-200 hover:bg-gradient-to-r hover:from-[#c65a1b] hover:to-[#c65a1b] hover:text-white"
        to="/">
        <i class="fas fa-home mr-2"></i>Home
      </router-link>
      <router-link
        class="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-[#c65a1b] hover:to-[#c65a1b] hover:text-white"
        to="/Produits">
        <i class="fas fa-file-alt mr-2"></i>Produits 
      </router-link>
      <router-link
        class="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-[#c65a1b] hover:to-[#c65a1b] hover:text-white"
        to="/Catégories">
        <i class="fas fa-users mr-2"></i>Catégories 
      </router-link>
      <router-link
        class="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-[#c65a1b] hover:to-[#c65a1b] hover:text-white"
        to="/Fournisseurs">
        <i class="fas fa-store mr-2"></i>Fournisseurs 
      </router-link>
      <router-link
        class="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-[#c65a1b] hover:to-[#c65a1b] hover:text-white"
        to="/Clients">
        <i class="fas fa-exchange-alt mr-2"></i>Clients 
      </router-link>
       <router-link
        class="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-[#c65a1b] hover:to-[#c65a1b] hover:text-white"
        to="/Commandes ">
        <i class="fas fa-exchange-alt mr-2"></i>Commandes  
      </router-link>
    </nav>

    <div class="bg-gradient-to-r from-[#c65a1b] to-[#7b2e26] h-px mt-10"></div>
    <p class="mb-1 px-5 py-3 text-left text-xs text-[#8d362d]">Copyright Gestock@2024</p>
  </div>
</template>

<script>
export default {
  name: 'AsideComponent'
};
</script>

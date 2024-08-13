<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
 
    <div class="flex flex-1">
      <AsideComponent />
      <main class="flex-1 p-6">
        <h1 class="text-3xl font-bold">Dashboard</h1>
        <p class="mt-4">Welcome to your dashboard!</p>
        <!-- Contenu principal du tableau de bord -->
      </main>
    </div>
  </div>
</template>

<script>

import AsideComponent from '../../components/Aside.vue';


export default {
  name: 'DashboardPage',
  components: {

    AsideComponent
  }
}
</script>

<style scoped>
/* Styles personnalisés */
</style>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Aside Section -->
    <AsideComponent />

    <!-- Main Content Section -->
    <div class="flex-1 p-6 ml-80 mt-20"> <!-- Adjusted margin-left to account for fixed sidebar -->
      <h2 class="text-xl font-bold mb-4">Liste des Catégories</h2>
      <button class="mb-4 p-2 text-white rounded bg-gradient-to-r from-[#c65a1b] to-[#8d362d]" @click="showCreateForm = true">
        Ajouter une Catégorie
      </button>
      
      <ul class="mb-6">
        <li v-for="category in categories" :key="category.id" class="mb-4 p-4 bg-white rounded shadow">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="font-semibold">Nom: {{ category.name }}</h3>
              <p class="text-gray-600">Description: {{ category.description }}</p>
            </div>
            <div>
              <button class="p-2 text-white rounded mr-2 bg-gradient-to-r from-[#c65a1b] to-[#8d362d]" @click="editCategory(category)">
                Modifier
              </button>
              <button class="p-2 text-white rounded bg-gradient-to-r from-[#c65a1b] to-[#8d362d]" @click="deleteCategory(category.id)">
                Supprimer
              </button>
            </div>
          </div>
        </li>
      </ul>

      <CreateCategoryForm 
        v-if="showCreateForm" 
        @close="showCreateForm = false" 
        @created="fetchCategories"
      />
      <UpdateCategoryForm 
        v-if="selectedCategory" 
        :category="selectedCategory" 
        @close="selectedCategory = null" 
        @updated="fetchCategories"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AsideComponent from '../../../components/Aside.vue';
import CreateCategoryForm from './CreateCategoryForm.vue';
import UpdateCategoryForm from './UpdateCategoryForm.vue';

export default {
  components: { CreateCategoryForm, UpdateCategoryForm, AsideComponent },
  data() {
    return {
      categories: [], // Holds the list of categories
      showCreateForm: false,
      selectedCategory: null
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get('http://localhost:8000/api/categories', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response && response.data) {
          this.categories = response.data;
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    editCategory(category) {
      this.selectedCategory = category;
    },
    async deleteCategory(id) {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }
        await axios.delete(`http://localhost:8000/api/categories/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Refresh the category list
        this.fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  },
  created() {
    this.fetchCategories();
  }
};
</script>

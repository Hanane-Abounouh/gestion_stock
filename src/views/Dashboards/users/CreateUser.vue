<template>
  <div class="max-w-lg mt-10 p-4 bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-bold mb-4">Create User</h2>
    <form @submit.prevent="createUser">
      <div class="mb-4">
        <label for="name" class="block text-gray-700 font-medium mb-1">Name</label>
        <input v-model="form.name" type="text" id="name" class="w-full px-3 py-2 border border-gray-300 rounded-md" required />
        <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name[0] }}</span>
      </div>
      <div class="mb-4">
        <label for="email" class="block text-gray-700 font-medium mb-1">Email</label>
        <input v-model="form.email" type="email" id="email" class="w-full px-3 py-2 border border-gray-300 rounded-md" required />
        <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email[0] }}</span>
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-700 font-medium mb-1">Password</label>
        <input v-model="form.password" type="password" id="password" class="w-full px-3 py-2 border border-gray-300 rounded-md" required />
        <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password[0] }}</span>
      </div>
      <div class="mb-4">
        <label for="password_confirmation" class="block text-gray-700 font-medium mb-1">Confirm Password</label>
        <input v-model="form.password_confirmation" type="password" id="password_confirmation" class="w-full px-3 py-2 border border-gray-300 rounded-md" required />
        <span v-if="errors.password_confirmation" class="text-red-500 text-sm">{{ errors.password_confirmation[0] }}</span>
      </div>
      <div class="flex space-x-4">
        <button type="submit" class="bg-gradient-to-r from-[#c65a1b] to-[#8d362d] text-white px-4 py-2 rounded-md ">Add User</button>
        <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600" @click="$emit('close')">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      errors: {},
    };
  },
  methods: {
    async createUser() {
      try {
        const response = await axios.post('http://localhost:8000/api/register', this.form);
        // Handle success
        console.log('User created successfully:', response.data);
        this.$emit('user-added', response.data.user); // Emit event to parent component
        this.resetForm();
      } catch (error) {
        // Handle error
        if (error.response && error.response.data.errors) {
          this.errors = error.response.data.errors;
        } else {
          console.error('Error creating user:', error);
        }
      }
    },
    resetForm() {
      this.form = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      };
      this.errors = {};
    },
  },
};
</script>

<style scoped>
/* Add any additional styling if necessary */
</style>

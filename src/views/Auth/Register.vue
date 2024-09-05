<template>
  <div class="min-h-screen bg-gray-100 py-6 px-10 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="absolute inset-0 bg-gradient-to-r from-[#c65a1b] to-[#8d362d] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div class="max-w-md mx-auto">
          <div>
            <h1 class="text-2xl font-semibold">Register</h1>
          </div>
          <div class="divide-y divide-gray-200">
            <div class="py-8 px-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <form @submit.prevent="register" class="flex flex-col gap-6">
                <div class="relative">
                  <input
                    type="text"
                    id="name"
                    v-model="name"
                    required
                    class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Name"
                  />
                  <label
                    for="name"
                    class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Name
                  </label>
                </div>
                <div class="relative">
                  <input
                    type="email"
                    id="email"
                    v-model="email"
                    required
                    class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Email address"
                  />
                  <label
                    for="email"
                    class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                </div>
                <div class="relative">
                  <input
                    type="password"
                    id="password"
                    v-model="password"
                    required
                    class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Password"
                  />
                  <label
                    for="password"
                    class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
               
                <div class="relative">
                  <button type="submit" class="bg-[#c65a1b] text-white rounded-md px-2 py-1">Register</button>
                </div>
              </form>
              <div v-if="errorMessage" class="text-red-500 text-center mt-4">{{ errorMessage }}</div>
              <div v-if="successMessage" class="text-green-500 text-center mt-4">{{ successMessage }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterView',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      role: '',
      errorMessage: '',
      successMessage: '',
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('http://localhost:8000/api/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          role: this.role,
        });

        if (response && response.data) {
          this.successMessage = response.data.message;
          this.errorMessage = '';
          this.$router.push('/login');
        } else {
          this.errorMessage = 'Invalid response from the server';
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = 'An error occurred during registration';
        }
        console.error('Registration failed:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Add any additional scoped styles if needed */
</style>

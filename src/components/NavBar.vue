<template>
  <div class="bg-white text-black shadow w-full py-4 px-6  flex items-center justify-between fixed top-0 left-0 z-100">
    <div class="flex items-center">
      <h1 class="text-[#c65a1b] text-3xl font-bold gradient-text">Ge<span class="to-[#8d362d]">stock</span></h1>
     
    </div>

    <!-- Notification Icon and Profile -->
    <div class="space-x-12 flex items-center gap-8">
      <button>
        <i class="fas fa-bell text-gray-500 text-lg"></i>
      </button>

      <!-- Links for unauthenticated users -->
      <div v-if="!isAuthenticated" class="flex items-center gap-4">
        <router-link to="/login" class="text-gray-500 text-lg hover:text-black">Login</router-link>
        <router-link to="/register" class="text-gray-500 text-lg hover:text-black">Register</router-link>
      </div>

      <!-- Welcome message and logout button for authenticated users -->
      <div v-else class="flex items-center gap-4">
        <span class="text-gray-700">Bienvenue, {{ userName }}</span>
        <button @click="logout">
          <i class="fas fa-sign-out-alt text-gray-500 text-lg"></i> Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      isAuthenticated: !!localStorage.getItem('authToken'),
      userName: localStorage.getItem('userName') || '' // Get the username from localStorage
    };
  },
  watch: {
    '$route'() {
      // Update the state when the route changes
      this.isAuthenticated = !!localStorage.getItem('authToken');
      this.userName = localStorage.getItem('userName') || '';
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userName'); // Remove the username as well
      this.isAuthenticated = false;
      this.userName = '';
      this.$router.push('/'); // Redirect to home page after logout
    }
  }
};
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(to right, #c65a1b, #8d362d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.container {
  display: flex;
  justify-content: center;
}

nav ul {
  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

nav ul li {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 20px;
}

nav ul li a {
  text-decoration: none;
  color: #ffffff;
  font-weight: bold;
}

/* Position the navbar at the top and make it fixed */
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50; /* Make sure it's above other content */
}

/* Ensure the content below the navbar doesn't overlap */
body {
  padding-top: 60px; /* Adjust this value according to the height of your navbar */
}
</style>

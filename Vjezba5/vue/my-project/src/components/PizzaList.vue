<template>
  <div
    class="min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
  >
    <h1 class="text-center text-4xl font-extrabold mb-8 text-gray-800">
      Nase pizze u ponudi
    </h1>
    <div
      v-for="pizza in pizze"
      :key="pizza._id"
      class="pizza-card bg-white w-80 p-6 rounded-lg shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl hover:opacity-90 mb-8 mx-auto"
    >
      <div class="flex justify-center items-center mb-4">
        <img
          v-bind:src="pizza.slika"
          :alt="pizza.naziv"
          class="pizza-image h-48 w-48 object-cover rounded-full border-4 border-white shadow-md"
        />
      </div>

      <h2 class="text-2xl font-semibold text-center text-gray-800 mb-2">
        {{ pizza.naziv }}
      </h2>

      <p class="text-xl font-bold text-yellow-400 text-center mb-2">
        {{ pizza.cijena }} $
      </p>

      <p class="text-gray-700 text-center">{{ pizza.opis }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PizzaList",
  data() {
    return {
      pizze: [],
      loading: true,
      error: null,
    };
  },
  methods: {
    async fetchPizzas() {
      try {
        const response = await axios.get("http://localhost:3000/pizze");
        this.pizze = response.data;
      } catch (error) {
        console.error("Error fetching pizzas:", error);
        this.error = "Greška pri učitavanju podataka.";
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.fetchPizzas();
  },
};
</script>

<style scoped>
/* let chatGPT cook */
.min-h-screen {
  min-height: 100vh;
  background: linear-gradient(to right, #f472b6, #9333ea, #4f46e5);
}

.pizza-card {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  text-align: center;
  margin-bottom: 2rem;
}

.pizza-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.2);
}

.pizza-image {
  object-fit: cover;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  border: 4px solid white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

h1 {
  font-family: "Arial", sans-serif;
  color: white;
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

p.text-yellow-400 {
  font-weight: bold;
  color: #fbbf24;
}

p.text-gray-700 {
  color: #616161;
}

.text-center {
  text-align: center;
}

.text-xl {
  font-size: 1.25rem;
}

.font-semibold {
  font-weight: 600;
}
</style>

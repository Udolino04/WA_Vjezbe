<template>
  <div class="bg-gray-100 min-h-screen">
    <header
      class="bg-red-500 text-white text-center p-4 text-2xl font-bold shadow-md"
    >
      Dobrodosli u Pizzeri Udo!
    </header>

    <main class="container mx-auto py-6 px-4">
      <PizzaList />
    </main>
  </div>
</template>

<script>
import PizzaList from "./components/PizzaList.vue";

export default {
  name: "App",
  components: {
    PizzaList,
  },
};
</script>

<style></style>

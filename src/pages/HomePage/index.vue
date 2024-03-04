<script setup lang="ts">
import { ref } from 'vue'
import NavBar from '../../components/Navbar.vue'
import CategoriesModal from '../../components/Categories.vue'

const isCategoriesVisivel = ref(false)

function toggleCategoriesModal() {
  isCategoriesVisivel.value = !isCategoriesVisivel.value
}
</script>

<template>
  <NavBar />

  <main>
    <button @click="toggleCategoriesModal"
      class="bg-blue-400 hover:opacity-50 ease-in-out duration-200 px-8 py-4 rounded text-white">
      Gerenciar categorias
    </button>

    <section v-if="isCategoriesVisivel">
      <CategoriesModal :onClose="toggleCategoriesModal" />
    </section>
  </main>
</template>
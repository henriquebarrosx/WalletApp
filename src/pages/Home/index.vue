<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import NavBar from '@/components/Navbar.vue'
import { CategoryList } from '@/entities/CategoryList'
import CategoriesModal from '@/components/Categories.vue'
import type { CategoriesServiceGateway } from '@/services/categories/index.gateway'

const categoriesService = inject('CategoriesService') as CategoriesServiceGateway

const categoryList = ref<CategoryList>(new CategoryList())
const isCategoriesVisivel = ref(false)
const frequencyField = ref("0")

const isFrequencyTimesFieldVisible = computed(() => frequencyField.value === "custom")

async function fetchCategories() {
  try {
    categoryList.value.startLoader()
    const data = await categoriesService.getAll()
    categoryList.value.replace(data)
    categoryList.value.stopLoader()
  }

  catch (error) {
    console.error("something wrong when fetching categories", { cause: error })
  }
}

function toggleCategoriesModal() {
  isCategoriesVisivel.value = !isCategoriesVisivel.value
}
</script>

<template>
  <NavBar />

  <main class="p-8">
    <form class="flex flex-col gap-4 max-w-[400px]">
      <h1 class="text-2xl font-semibold text-slate-700">
        Cadastrar transação
      </h1>

      <fieldset class="flex flex-col w-full gap-2">
        <label for="amount" class="text-slate-500 font-medium">
          Valor
        </label>

        <div class="flex w-full">
          <span class="px-4 py-2 bg-slate-500 text-white rounded-l">R$</span>
          <input id="amount" class="input-field rounded-r" type="number" placeholder="0.00" min="0" />
        </div>
      </fieldset>

      <fieldset class="flex flex-col w-full gap-2">
        <label for="description" class="text-slate-500 font-medium">
          Descrição
        </label>

        <input id="description" class="input-field rounded" type="text" placeholder="Ex.: Uber" />
      </fieldset>

      <fieldset class="flex flex-col w-full gap-2">
        <label for="description" class="text-slate-500 font-medium">
          Tipo
        </label>

        <select class="input-field rounded bg-white h-11">
          <option>Despesa</option>
          <option>Entrada</option>
        </select>
      </fieldset>

      <fieldset class="flex flex-col w-full gap-2">
        <label for="description" class="text-slate-500 font-medium">
          Categoria
        </label>

        <select @focus="fetchCategories" class="input-field rounded bg-white h-11">
          <option v-if="categoryList.isLoading" disabled>Carregando...</option>

          <option v-for="category of categoryList.items" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>

        <div class="flex justify-end">
          <button type="button" @click="toggleCategoriesModal"
            class="text-blue-500 hover:underline duration-200 ease-in-out">
            Gerenciar
          </button>
        </div>
      </fieldset>

      <fieldset class="flex flex-col w-full gap-2 mt-[-28px]">
        <label for="description" class="text-slate-500 font-medium">
          Repetir
        </label>

        <select v-model="frequencyField" id="frequency" class="input-field rounded bg-white h-11">
          <option value="0">Sempre</option>
          <option value="1">1 mês</option>
          <option value="2">2 meses</option>
          <option value="3">3 meses</option>
          <option value="custom">Personalizar</option>
        </select>
      </fieldset>

      <fieldset v-if="isFrequencyTimesFieldVisible" class="flex flex-col w-full gap-2">
        <label for="description" class="text-slate-500 font-medium">
          Recorrência personalizada
        </label>

        <div class="flex w-full">
          <input id="frequencyTimes" class="input-field rounded-l" type="number" placeholder="0" min="0" />
          <span class="px-4 py-2 bg-slate-500 text-white rounded-r">meses</span>
        </div>
      </fieldset>

      <button class="rounded p-4 mt-4 bg-[#3155d2] hover:opacity-50 duration-200 ease-in-out text-white">
        CADASTRAR
      </button>
    </form>

    <section v-if="isCategoriesVisivel">
      <CategoriesModal :onClose="toggleCategoriesModal" />
    </section>
  </main>
</template>

<style scoped>
.input-field {
  @apply border px-4 py-2 w-full;
}
</style>
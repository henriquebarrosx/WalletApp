<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
import { Observer } from '../entities/Observer';
import { CategoryList } from '../entities/CategoryList'
import type { CategoriesServiceGateway } from '../services/categories/index.gateway';

const { onClose } = defineProps({
  onClose: {
    type: Function,
    required: true,
  }
})

const categoriesService = inject('CategoriesService') as CategoriesServiceGateway
const categoryList = ref<CategoryList>(new CategoryList())

async function fetchCategories() {
  categoryList.value.startLoader()
  const data = await categoriesService.getAll()
  categoryList.value.replace(data)
  categoryList.value.stopLoader()
}

onMounted(() => {
  fetchCategories()
  categoryList.value.registry(
    new Observer('DELETE_CATEGORY', async (id: number) => {
      categoryList.value.startLoader()
      await categoriesService.delete(id)
      categoryList.value.stopLoader()
    })
  )

  categoryList.value.registry(
    new Observer('UPDATE_CATEGORY', async ({ id, name }: { id: number, name: string }) => {
      categoryList.value.startLoader()
      await categoriesService.update(id, name)
      categoryList.value.stopLoader()
    })
  )
})
</script>

<template>
  <div class="fixed right-0 top-0 bottom-0">
    <div class="flex flex-col gap-8 shadow-lg py-12 px-8 h-screen w-[500px] z-10 bg-white overflow-y-auto">
      <div class="flex flex-col gap-4 w-full">
        <div class="flex justify-between mb-6">
          <h1 class="text-xl font-bold">
            Categorias
          </h1>

          <button @click="() => onClose()" type="submit" title="Fechar"
            class="flex items-center justify-center w-6 h-6 rounded-full hover:opacity-50 ease-in-out duration-200">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>

      <div v-if="categoryList.isLoading" class="w-full flex justify-center">
        <span class="text-gray-400">
          Carregando...
        </span>
      </div>

      <div v-else-if="categoryList.isEmpty" class="w-full flex justify-center">
        <span class="text-gray-400">
          Nenhum item cadastrado
        </span>
      </div>

      <ul v-else class="flex flex-col">
        <li v-for="category in categoryList.items" :key="category.id" class="border-b py-3">
          <div class="flex items-center justify-between gap-4">
            <span>{{ category.name }}</span>

            <div class="flex items-center gap-2">
              <button title="Editar"
                class="h-10 w-10 bg-blue-300 text-white rounded-full hover:opacity-50 ease-in-out duration-200 flex items-center justify-center">
                <span class="material-symbols-outlined">edit</span>
              </button>

              <button title="Excluir" @click="() => categoryList.delete(category)"
                class="h-10 w-10 bg-red-400 text-white rounded-full hover:opacity-50 ease-in-out duration-200 flex items-center justify-center">
                <span class="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
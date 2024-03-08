<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import NavBar from '@/components/Navbar.vue'
import { CategoryList } from '@/entities/CategoryList'
import CategoriesModal from '@/components/Categories.vue'
import type { CategoriesServiceGateway } from '@/services/categories/index.gateway'

const categoriesService = inject('CategoriesService') as CategoriesServiceGateway

const CENTURY_IN_MONTHS = 1200
const amountField = ref("")
const frequencyDayField = ref(1)
const frequencyTimesField = ref(2)
const isCategoriesVisivel = ref(false)
const categoryList = ref<CategoryList>(new CategoryList())

const formattedFrequencyDay = computed(() => {
  if (frequencyDayField.value <= 0) return '1'
  return frequencyDayField.value < 10 ? `0${frequencyDayField.value}` : frequencyDayField.value
})

const formatedFrequencyTimesText = computed(() => {
  if (parseInt(String(frequencyTimesField.value)) === 0) return 'tempo indeterminado'
  return `${frequencyTimesField.value < 10 ? `0${frequencyTimesField.value}` : frequencyTimesField.value} meses`
})

const frequencyTimesValidation = computed(() => {
  const isBeteweenInvalidInterval = frequencyTimesField.value < 0 || frequencyTimesField.value > CENTURY_IN_MONTHS
  return isBeteweenInvalidInterval ? 'Frequência permitida: [min: 0 | max: 1200].' : ''
})

const frequencyDayValidation = computed(() => {
  const isBeteweenInvalidPeriod = frequencyDayField.value < 1 || frequencyDayField.value > 28
  return isBeteweenInvalidPeriod ? 'A ocorrência só poderá ocorrer entre os dias 01 e 28 de cada mês.' : ''
})

function formatAmountToCurrency(): void {
  if (!amountField.value) return
  const stringToFloat = parseFloat(amountField.value.replace(",", "."))
  const floatWithTwoDecimalPlaces = stringToFloat.toFixed(2)
  const formatThousands = floatWithTwoDecimalPlaces.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  amountField.value = formatThousands
}

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

  <main class="md:px-12 px-8 py-8 flex max-w-[1000px] mx-auto">
    <form class="flex flex-col gap-4">
      <h1 class="text-2xl font-semibold text-slate-700">
        Cadastrar transação
      </h1>

      <div class="sm:grid sm:grid-cols-2 gap-4 flex flex-col">
        <fieldset class="flex flex-col w-full gap-2">
          <label for="amount" class="text-slate-500 font-medium">
            Valor
          </label>

          <div class="flex w-full">
            <span class="px-4 py-2 bg-slate-500 text-white rounded-l">R$</span>
            <input v-model="amountField" @change="formatAmountToCurrency" id="amount"
              class="border px-4 py-2 w-full rounded-r" type="text" placeholder="0.00" />
          </div>
        </fieldset>

        <fieldset class="flex flex-col w-full gap-2">
          <label for="description" class="text-slate-500 font-medium">
            Descrição
          </label>

          <input id="description" class="border px-4 py-2 w-full rounded" type="text" placeholder="Ex.: Uber" />
        </fieldset>

        <fieldset class="flex flex-col w-full gap-2">
          <label for="description" class="text-slate-500 font-medium">
            Tipo
          </label>

          <select class="border px-4 py-2 w-full rounded bg-white h-11">
            <option>Despesa</option>
            <option>Entrada</option>
          </select>
        </fieldset>

        <fieldset class="flex flex-col w-full gap-2">
          <div class="flex items-center justify-between">
            <label for="description" class="text-slate-500 font-medium">
              Categoria
            </label>

            <button v-if="true" type="button" @click="toggleCategoriesModal" title="Gerenciar categorias"
              class="text-blue-500 hover:underline duration-200 ease-in-out">
              Gerenciar
            </button>
          </div>

          <select @focus="fetchCategories" class="border px-4 py-2 w-full rounded bg-white h-11">
            <option v-if="categoryList.isLoading" disabled>Carregando...</option>

            <option v-for="category of categoryList.items" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </fieldset>

        <fieldset class="flex flex-col w-full gap-2 sm:col-span-2">
          <label for="description" class="text-slate-500 font-medium">
            Recorrência
          </label>

          <div class="flex gap-4">
            <div class="flex w-full">
              <input v-model="frequencyDayField" id="frequencyDay" placeholder="0"
                class="border px-4 py-2 w-full rounded-l" />
              <span class="px-4 py-2 bg-slate-500 text-white rounded-r">dia</span>
            </div>

            <div class="flex w-full">
              <input v-model="frequencyTimesField" id="frequencyTimes" placeholder="0"
                class="border px-4 py-2 w-full rounded-l" />
              <span class="px-4 py-2 bg-slate-500 text-white rounded-r">vezes</span>
            </div>
          </div>

          <span v-if="!!frequencyDayValidation" class="text-red-400">
            {{ frequencyDayValidation }}
          </span>

          <span v-if="!!frequencyTimesValidation" class="text-red-400">
            {{ frequencyTimesValidation }}
          </span>

          <small class="text-slate-400 mt-2">
            A repetição ocorrerá todo dia <strong class="underline">{{ formattedFrequencyDay }}</strong> por
            <strong class="underline">{{ formatedFrequencyTimesText }}</strong>. Uma notificação será enviada via
            WhatsApp
            até 5 dias antes alertando o vencimento! Defina como 0, caso o prazo seja indeterminado.
          </small>
        </fieldset>
      </div>

      <div class="flex sm:flex-row flex-col-reverse w-full sm:gap-4">
        <button type="submit" title="Cancelar"
          class="w-full rounded p-4 mt-4 border border-[#3155d2] hover:opacity-50 duration-200 ease-in-out text-[#3155d2]">
          CANCELAR
        </button>

        <button type="submit" title="Cadastrar transação"
          class="w-full rounded p-4 mt-4 bg-[#3155d2] hover:opacity-50 duration-200 ease-in-out text-white">
          CADASTRAR
        </button>
      </div>
    </form>

    <section v-if="isCategoriesVisivel">
      <CategoriesModal :onClose="toggleCategoriesModal" />
    </section>
  </main>
</template>

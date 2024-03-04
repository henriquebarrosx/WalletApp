<template>
  <header>
    <nav class="bg-[#3155d2] h-20 px-4 flex items-center justify-between">
      <a href="/" class="text-white text-3xl font-lemon">
        Wallet
      </a>

      <div class="flex items-center">
        <router-link to="/signin"
          class="text-white text-base font-medium hover:opacity-80 duration-200 ease-in-out h-11 w-32 flex items-center justify-center rounded">
          Entrar
        </router-link>

        <router-link to="/signup"
          class="bg-white text-[#3155d2] hover:opacity-80 duration-200 ease-in-out text-base font-medium px-4 py-2 flex items-center justify-center rounded">
          Cadastre-se
        </router-link>
      </div>
    </nav>
  </header>
</template>
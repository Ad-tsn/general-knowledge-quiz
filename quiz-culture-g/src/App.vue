<template>
  <div class="h-screen overflow-hidden bg-violet-custom font-sans">
    <header class="bg-violet-700 shadow-md py-4 px-6 flex justify-between items-center">
      <RouterLink to="/" class="text-2xl font-bold text-gold-custom transition" style="font-family: 'BebasNeue-Regular'">🧠 Quiz Culture G</RouterLink>
      <nav class="space-x-4 font-semibold">
        <RouterLink to="/historique" class="font-bold text-gold-custom transition">Historique</RouterLink>
        <RouterLink to="/register" class="font-bold text-gold-custom transition">S'inscrire</RouterLink>
        <RouterLink to="/login" class="font-bold text-gold-custom transition">Se connecter</RouterLink>
      </nav>
    </header>

    <main class="h-full p-4">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
</script>

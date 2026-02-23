<template>
  <main class="min-h-screen flex flex-col items-center justify-start pt-24 bg-violet-custom text-center">
    <h1 class="text-7xl font-bold text-glow-gold text-gold-custom mb-2 " style="font-family: 'BebasNeue-Regular'">Quiz Culture Générale</h1>
    <p class="text-xl font-bold text-gold-custom mb-12">Testez vos connaissances avec nos quiz</p>
      <div class="flex gap-4 mb-6">
      <div
          v-for="level in levels"
          :key="level"
          class=" rounded-2xl border-3 border-gold-custom"
      >
        <button
          :class="[
              'px-6 py-3 rounded-xl max-w border-2 border-violet-custom font-semibold transition',
              selectedLevel === level
              ? ' bg-gold-custom text-violet-custom'
              : 'border-violet-custom bg-white text-violet-custom'
          ]"
          @click="selectLevel(level)"
        >
          {{ level }}
        </button>
      </div>
      </div>
      <button
        :disabled="!selectedLevel"
        @click="startQuiz"
        class="px-8 py-3 w-[345px] bg-gold-custom border-2 border-violet-500 text-violet-custom font-semibold rounded-2xl hover:brightness-110 disabled:opacity-50"
      >
        Jouer
      </button>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const levels = ['facile', 'normal', 'difficile']
const selectedLevel = ref('')

function selectLevel(level) {
  selectedLevel.value = level
}

function startQuiz() {
  if (!selectedLevel.value) return

  router.push({ name: 'quiz', query: { level: selectedLevel.value } })
}
</script>


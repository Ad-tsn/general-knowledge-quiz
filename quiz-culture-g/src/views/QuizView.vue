<template>
    <main class="min-h-screen flex flex-col items-center justify-start pt-18 bg-violet-custom px-4 text-center text-white">
        <h2 class="text-6xl font-bold text-gold-custom text-glow-gold mb-8" style="font-family: 'BebasNeue-Regular'">
        Quiz - Niveau : {{ level }}
        </h2>

        <div v-if="loading">Chargement...</div>
        <div v-else-if="error" class="text-red-500">{{ error }}</div>

        <div v-else-if="currentQuestion" class="w-full max-w-2xl">
            <p class="text-xl font-semibold mb-2">
                {{ currentQuestion.question }}
            </p>

            <div class="text-lg font-semibold text-gold-custom mb-6">
                Temps restant : {{ timer }}s
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div
                v-for="(answer, index) in shuffledAnswers"
                :key="index"
                @click="selectAnswer(answer)"
                :class="[
                    'px-6 py-4 rounded-xl border-2 text-center transition cursor-pointer',
                    answerChecked //condition cliquer
                        ? answer === currentQuestion.answer //si juste devient vert
                            ? 'bg-green-500 text-white border-gold-custom'
                            : selectedAnswer !== currentQuestion.answer //si non devient rouge celle qui sont fausse
                                ? 'bg-red-500 text-white border-gold-custom' 
                                : 'bg-white text-violet-custom border-gold-custom' //si oui reste neutre
                        : 'bg-white text-violet-custom border-gold-custom hover:bg-violet-600 hover:border-yellow-400 hover:!text-yellow-400' //sans selection reste basic + le hover
                ]"
                >
                {{ answer }}
                </div>
            </div>

            <button
                @click="nextQuestion"
                
                class="px-6 py-3 bg-gold-custom text-violet-custom font-semibold rounded-xl border-2  border-violet-500 transition hover:brightness-110"
            >
                {{ currentIndex < questions.length - 1 ? 'Question suivante' : 'Fin du quiz' }}
            </button>
        </div>
        <div class="w-full flex justify-end px-6 pb-4">
            <p class="text-gold-custom font-bold text-xl">
                Score : {{ score }} / {{ questions.length }}
            </p>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const level = route.query.level
const category = 'culture_generale'

const questions = ref([])
const currentQuestion = ref(null)
const shuffledAnswers = ref([])
const currentIndex = ref(0)
const loading = ref(true)
const error = ref('')

const timer = ref(20)
let intervalId = null
const selectedAnswer = ref(null)
const answerChecked = ref(false)
const score = ref(0)  


function loadQuestion() {
  currentQuestion.value = questions.value[currentIndex.value]

  const allAnswers = [
    currentQuestion.value.answer,
    ...currentQuestion.value.badAnswers
  ]
  shuffledAnswers.value = allAnswers.sort(() => Math.random() - 0.5)
  
  selectedAnswer.value = null
  answerChecked.value = false

  timer.value = 20
  clearInterval(intervalId)
  intervalId = setInterval(() => {
    timer.value--
    if (timer.value === 0) {
      clearInterval(intervalId)
      answerChecked.value = true
      nextQuestion()
    }
  }, 1000)
}

function selectAnswer(answer) {
  if (answerChecked.value) return

  selectedAnswer.value = answer
  answerChecked.value = true
  clearInterval(intervalId)

  if (answer === currentQuestion.value.answer) {
    score.value++
  }
}

function nextQuestion() {
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++
    loadQuestion()
  }else {
    router.push({ 
      name: 'resultat', 
      query: { score: score.value, total: questions.value.length, niveau: level } 
    })
  }
}

onMounted(async () => {
  try {
    const res = await fetch(`https://quizzapi.jomoreschi.fr/api/v1/quiz?limit=5&category=${category}&difficulty=${level}`)
    const data = await res.json()
    if (!res.ok) throw new Error('Erreur API')

    questions.value = data.quizzes
    loadQuestion()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

onUnmounted(() => {
  clearInterval(intervalId)
})

</script>

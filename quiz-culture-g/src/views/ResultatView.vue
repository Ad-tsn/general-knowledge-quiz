<template>
    <main class="min-h-screen flex flex-col items-center text-center justify-start pt-40 bg-violet-custom text-white px-4">
        <h1 class="text-5xl font-bold text-gold-custom text-glow-gold mb-6" style="font-family: 'BebasNeue-Regular'">
        🎉 Félicitations !
        </h1>
        <p class="text-2xl font-semibold ml-10 mb-4">
        {{ resultMessage }}
        </p>
        <button
        @click="rejouer"
        class="mt-6 bg-gold-custom text-violet-custom px-6 py-3 rounded-xl font-bold border-2 border-violet-600 hover:brightness-110 transition"
        >
        Rejouer
        </button>
    </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '@/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { onMounted} from 'vue'
import { useRouter } from 'vue-router'


const router = useRouter()
const route = useRoute()
const score = Number(route.query.score) || 0
const total = Number(route.query.total) || 0
const niveau = route.query.niveau || 'non défini'

const authInstance = getAuth()



const resultMessage = computed (() => {
    if (score === 1){
        return `Vous avez obtenu 1 bonne réponse sur ${total}.`
    }else {
        return `Vous avez obtenu ${score} bonnes réponses sur ${total}.`
    }
})

async function enregistrerResultat(score, total, niveau) {
  const user = authInstance.currentUser
  if (!user) return

  try {
    await addDoc(collection(db, 'parties'), {
      userId: user.uid,
      score: score,
      total: total,
      niveau: niveau,
      date: serverTimestamp()
    })
  } catch (err) {
    console.error('Erreur Firebase :', err)
  }
}

onMounted(() => {
  enregistrerResultat(score, total, niveau)
})

function rejouer() {
  router.push('/')
}

</script>

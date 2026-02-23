<template>
    <main class="bg-violet-custom px-6 py-12">
        <h2 class="text-6xl font-bold text-center text-glow-gold text-gold-custom mb-10" style="font-family: 'BebasNeue-Regular'">Historique de vos parties</h2>
        <div class="max-w-4xl mx-auto space-y-4">
            <div class="grid grid-cols-3 font-semibold text-lg text-center mb-2 text-gold-custom">
                <div class="flex justify-start ml-5 font-bold" >Date</div>
                <div class="font-bold">Difficulté</div>
                <div class="flex justify-end mr-4 font-bold">Résultat</div>
            </div>
        
            <div v-if="loading">
                <div v-if="!user">
                    <RouterLink
                    to="/login"
                    class="bg-gold-custom border-2 border-violet-500 text-violet-custom font-bold px-6 py-3 flex justify-center rounded-xl hover:brightness-110 transition"
                    >
                    Se connecter pour voir l'historique
                    </RouterLink>
                </div>
                <div v-else class="text-center flex justify-center text-gold-custom font-semibold text-lg mt-20">
                    Chargement...
                </div>
            </div>
            <div v-else-if="parties.length === 0" class="text-center flex justify-center text-gold-custom font-semibold text-lg mt-20">Aucune partie enregistrée.</div>
            <div
                v-for="(partie, index) in parties.slice(0, 5)"
                :key="index"
                class="grid grid-cols-3 bg-white text-violet-custom rounded-xl px-4 py-3 shadow border-2 border-gold-custom"
            >
                <div class="text-left font-bold">{{ formatDate(partie.date) }}</div>
                <div class="text-center capitalize font-bold">{{ partie.niveau }}</div>
                <div class="text-right font-bold">{{ partie.score }} / {{ partie.total }}</div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '@/firebase'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const user = ref(null)
const parties = ref([])
const loading = ref(true)

async function fetchParties() {
  const auth = getAuth()


  user.value = auth.currentUser
   if (!user.value) {
    loading.value = false 
    return
  }

  try {
    const q = query(
      collection(db, 'parties'),
      where('userId', '==', user.value.uid),
      orderBy('date', 'desc')
    )
    const querySnapshot = await getDocs(q)
    parties.value = querySnapshot.docs.map(doc => doc.data())
    console.log("Utilisateur connecté :", user.uid)
    console.log("Données reçues :", parties.value)

  } catch (err) {
    console.error('Erreur récupération historique :', err)
  } finally {
    loading.value = false
  }
}

function formatDate(timestamp) {
  if (!timestamp?.toDate) return 'Date inconnue'
  const d = timestamp.toDate()
  return d.toLocaleDateString('fr-FR')
}

onMounted(() => {
  fetchParties()
})
</script>

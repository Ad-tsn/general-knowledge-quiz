<template>
    <main class="h-screen flex items-center justify-center bg-violet-custom">
        <div class="bg-white p-10 rounded-xl shadow-md w-full max-w-md border-4 -translate-y-12 border-gold-custom">
            <h2 class="text-2xl font-bold mb-6 text-center text-violet-custom">Connexion</h2>
            
            <form @submit.prevent="handleLogin">
                <div class="mb-4">
                    <label for="email" class="block mb-1 font-medium text-violet-custom">Email</label>
                    <input v-model="email" type="email" id="email" class="w-full border border-gold-custom p-2 rounded" />
                </div>

                <div class="mb-6">
                    <label for="password" class="block mb-1 font-medium text-violet-custom">Mot de passe</label>
                    <input v-model="password" type="password" id="password" class="w-full border border-gold-custom p-2 rounded" />
                </div>

                <button type="submit" class="w-full bg-gold-custom text-white py-2 rounded hover:bg-yellow-400">
                Se connecter
                </button>
                <p v-if="errorMessage" class="text-red-500 mt-4 text-center">{{ errorMessage }}</p>

                <p class="mt-4 text-sm text-center text-violet-custom">
                Pas encore inscrit ?
                <router-link to="/register" class="text-violet-custom underline">Créer un compte</router-link>
                </p>
            </form>
        </div>
    </main>
</template>


<script setup>

import { ref } from 'vue'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useRouter } from 'vue-router'


const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

async function handleLogin() {
  errorMessage.value = ''
  try {
    const userdataco = await signInWithEmailAndPassword(auth, email.value, password.value)
    console.log('Connexion réussie :', userdataco.user)
    router.push('/')
    
  } catch (error) {
    console.error('Erreur lors de la connexion :', error)
    if (error.code === 'auth/user-not-found') {
      errorMessage.value = "Utilisateur non trouvé."
    } else if (error.code === 'auth/wrong-password') {
      errorMessage.value = "Mot de passe incorrect."
    } else {
      errorMessage.value = "Erreur lors de la connexion."
    }
  }
}

</script>
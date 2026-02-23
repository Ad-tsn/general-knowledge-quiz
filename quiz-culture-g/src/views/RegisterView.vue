<template>
  <main class="min-h-screen flex items-center justify-center bg-violet-custom">
    <form @submit.prevent="handleRegister" class="bg-white -translate-y-12 p-8 rounded-xl shadow-md w-full max-w-md text-black space-y-4 border-4
    border-gold-custom">
      <h1 class="text-2xl font-bold text-center text-violet-custom">Inscription</h1>

      <div>
        <label for="email" class="block mb-1 font-semibold text-violet-custom">Email</label>
        <input v-model="email" type="email" id="email" class="w-full border border-gold-custom rounded px-3 py-2" />
        <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
      </div>

      <div>
        <label for="password" class="block mb-1 font-semibold text-violet-custom">Mot de passe</label>
        <input v-model="password" type="password" id="password" class="w-full border border-gold-custom rounded px-3 py-2" />
        <p v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</p>
      </div>

      <button type="submit" class="w-full bg-gold-custom !text-white py-2 rounded hover:bg-yellow-400">
        S'inscrire
      </button>
    </form>
  </main>
</template>

<script setup>
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const emailError = ref('')
const passwordError = ref('')

async function handleRegister() {
  emailError.value = ''
  passwordError.value = ''

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailPattern.test(email.value)) {
    emailError.value = "Email invalide"
  }

  if (password.value.length < 6) {
    passwordError.value = "Mot de passe trop court (min. 6 caractères)"
  }

  if (!emailError.value && !passwordError.value) {
    try {
      const userdatare = await createUserWithEmailAndPassword(auth, email.value, password.value)
      console.log("Inscription réussie :", userdatare.user)
      router.push('/login')
    } catch (err) {
      console.error("Erreur Firebase :", err)
      if (err.code === 'auth/email-already-in-use') {
        emailError.value = "Cet email est déjà utilisé."
      } else {
        emailError.value = "Une erreur est survenue."
      }
    }
  }
}

</script>



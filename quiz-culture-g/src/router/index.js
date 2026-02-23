import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import QuizView from '../views/QuizView.vue'
import Resultat from '../views/ResultatView.vue'
import Historique from '../views/HistoriqueView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    { 
      path: '/register',
      name: 'register', 
      component: RegisterView,
    },
    { 
      path: '/login',
      name: 'login', 
      component: LoginView,
    },
    { 
      path: '/quiz',
      name: 'quiz', 
      component: QuizView,
    },
    { 
      path: '/resultat',
      name: 'resultat', 
      component: Resultat,
    },
    { 
      path: '/historique',
      name: 'historique', 
      component: Historique,
    },
  ],
})

export default router

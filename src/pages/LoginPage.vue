<template>
  <q-page class="flex flex-center bg-black font-sans relative-position overflow-hidden">
    
    <!-- Background Effects -->
    <div class="absolute-full overflow-hidden">
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="grid-overlay absolute-full"></div>
    </div>

    <div class="q-pa-md relative-position z-10 w-full" style="max-width: 450px;">
      
      <!-- Logo Section -->
      <div class="text-center q-mb-xl">
        <div class="inline-flex items-center justify-center q-mb-md">
            <q-icon name="auto_stories" size="3rem" class="text-primary q-mr-sm" />
            <span class="text-h4 text-weight-bold text-white tracking-tighter">Digi<span class="text-primary">Gura</span></span>
        </div>
        <p class="text-grey-5">Welcome back to your digital classroom.</p>
      </div>

      <!-- Login Card -->
      <q-card class="glass-card q-pa-lg">
        <q-card-section>
          <h2 class="text-h5 text-weight-bold text-white q-mb-lg text-center">Sign In</h2>
          
          <q-form @submit="handleLogin" class="q-gutter-y-md">
            
            <q-input
              v-model="email"
              label="Email Address"
              dark
              outlined
              dense
              color="primary"
              class="input-dark"
            >
              <template v-slot:prepend>
                <q-icon name="email" color="grey-6" />
              </template>
            </q-input>

            <q-input
              v-model="password"
              label="Password"
              type="password"
              dark
              outlined
              dense
              color="primary"
              class="input-dark"
            >
              <template v-slot:prepend>
                <q-icon name="lock" color="grey-6" />
              </template>
            </q-input>

            <div class="row justify-between items-center text-caption text-grey-5 uppercase tracking-wide">
                <q-checkbox v-model="rememberMe" dark size="sm" color="primary" label="Remember me" />
                <a href="#" class="text-primary hover:text-white transition-colors" style="text-decoration: none;">Forgot password?</a>
            </div>

            <q-btn
              type="submit"
              unelevated
              rounded
              color="primary"
              text-color="black"
              label="Sign In"
              class="full-width text-weight-bold q-py-sm hover-glow"
              size="lg"
              :loading="loading"
              no-caps
            />

          </q-form>

          <div class="q-mt-lg text-center">
            <p class="text-grey-5">Don't have an account? <router-link to="/register" class="text-primary text-weight-bold hover:text-white transition-colors" style="text-decoration: none;">Register Now</router-link></p>
          </div>

        </q-card-section>
      </q-card>

    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from 'boot/supabase'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'stores/auth'

const router = useRouter()
const $q = useQuasar()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)

const handleLogin = async () => {
    loading.value = true
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value,
        })
        if (error) throw error
        
        authStore.setUser(data.user, data.session)
        
        $q.notify({
            color: 'positive',
            message: 'Login successful!',
            icon: 'check'
        })
        router.push('/dashboard')
    } catch (error) {
        $q.notify({
            color: 'negative',
            message: error.message || 'Error logging in',
            icon: 'error'
        })
    } finally {
        loading.value = false
    }
}
</script>

<style lang="scss" scoped>
.font-sans { font-family: 'Inter', sans-serif; }
.tracking-tighter { letter-spacing: -2px; }

// Background blobs
.blob {
    position: absolute;
    filter: blur(80px);
    opacity: 0.4;
    border-radius: 50%;
    z-index: 0;
}
.blob-1 { width: 400px; height: 400px; background: $primary; top: -100px; left: -100px; animation: float 10s infinite alternate; }
.blob-2 { width: 300px; height: 300px; background: $secondary; bottom: -50px; right: -50px; animation: float 12s infinite alternate-reverse; }

@keyframes float {
    0% { transform: translate(0, 0); }
    100% { transform: translate(30px, 40px); }
}

.grid-overlay {
    background-image: 
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 30px 30px;
}

.glass-card {
    background: rgba(20, 20, 20, 0.7);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
}

.hover-glow {
    transition: box-shadow 0.3s ease;
    &:hover { box-shadow: 0 0 20px rgba($primary, 0.4); }
}

:deep(.input-dark .q-field__control) {
    background: rgba(255,255,255,0.05);
    border-radius: 12px;
}
</style>

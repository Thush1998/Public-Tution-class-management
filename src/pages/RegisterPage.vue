<template>
  <q-page class="flex flex-center bg-black font-sans relative-position overflow-hidden">
    
    <!-- Background Effects -->
    <div class="absolute-full overflow-hidden">
        <div class="blob blob-1"></div>
        <div class="blob blob-3"></div>
        <div class="grid-overlay absolute-full"></div>
    </div>

    <div class="q-pa-md relative-position z-10 w-full" style="max-width: 450px;">
      
      <!-- Logo Section -->
      <div class="text-center q-mb-xl">
        <div class="inline-flex items-center justify-center q-mb-md">
            <q-icon name="auto_stories" size="3rem" class="text-primary q-mr-sm" />
            <span class="text-h4 text-weight-bold text-white tracking-tighter">Digi<span class="text-primary">Gura</span></span>
        </div>
        <p class="text-grey-5">Create your account to get started.</p>
      </div>

      <!-- Register Card -->
      <q-card class="glass-card q-pa-lg">
        <q-card-section>
          <h2 class="text-h5 text-weight-bold text-white q-mb-lg text-center">Register</h2>
          
          <q-form @submit="handleRegister" class="q-gutter-y-md">
            
            <q-input
              v-model="name"
              label="Full Name"
              dark
              outlined
              dense
              color="primary"
              class="input-dark"
            >
              <template v-slot:prepend>
                <q-icon name="person" color="grey-6" />
              </template>
            </q-input>

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
              :rules="[ val => val && val.length >= 6 || 'Password must be at least 6 characters' ]"
            >
              <template v-slot:prepend>
                <q-icon name="lock" color="grey-6" />
              </template>
            </q-input>

             <q-input
              v-model="confirmPassword"
              label="Confirm Password"
              type="password"
              dark
              outlined
              dense
              color="primary"
              class="input-dark"
              :rules="[ val => val === password || 'Passwords do not match' ]"
            >
              <template v-slot:prepend>
                <q-icon name="lock_clock" color="grey-6" />
              </template>
            </q-input>

            <q-btn
              type="submit"
              unelevated
              rounded
              color="primary"
              text-color="black"
              label="Create Account"
              class="full-width text-weight-bold q-py-sm hover-glow q-mt-md"
              size="lg"
              :loading="loading"
              no-caps
            />

          </q-form>

          <div class="q-mt-lg text-center">
            <p class="text-grey-5">Already have an account? <router-link to="/login" class="text-primary text-weight-bold hover:text-white transition-colors" style="text-decoration: none;">Sign In</router-link></p>
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

const router = useRouter()
const $q = useQuasar()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)

const handleRegister = async () => {
    loading.value = true
    try {
        const { error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
            options: {
                data: {
                    full_name: name.value,
                }
            }
        })
        if (error) throw error
        
        $q.notify({
            color: 'positive',
            message: 'Registration successful! Please check your email.',
            icon: 'check'
        })
        router.push('/login')
    } catch (error) {
        $q.notify({
            color: 'negative',
            message: error.message || 'Error registering',
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
.blob-1 { width: 500px; height: 500px; background: $secondary; top: -20%; left: -20%; animation: float 10s infinite alternate; }
.blob-3 { width: 400px; height: 400px; background: $accent; bottom: -10%; right: -10%; animation: float 15s infinite alternate-reverse; }

@keyframes float {
    0% { transform: translate(0, 0); }
    100% { transform: translate(-30px, 20px); }
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

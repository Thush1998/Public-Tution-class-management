<template>
  <q-page class="bg-black text-white relative-position overflow-hidden font-sans">
    
    <!-- Background Effects -->
    <div class="absolute-full overflow-hidden">
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="grid-overlay absolute-full"></div>
    </div>

    <div class="q-pa-xl relative-position z-top">
      <div class="container" style="max-width: 900px; margin: 0 auto;">
        
        <!-- Profile Header -->
        <div class="text-center q-mb-xl">
          <q-avatar size="120px" color="primary" text-color="black" class="q-mb-md" style="font-size: 48px; font-weight: 600;">
            {{ authStore.userName[0].toUpperCase() }}
          </q-avatar>
          <h1 class="text-h3 text-weight-bold q-mb-sm">{{ authStore.userName }}</h1>
          <p class="text-grey-5">{{ authStore.userEmail }}</p>
        </div>

        <!-- Profile Information Card -->
        <q-card class="glass-card q-pa-lg q-mb-lg">
          <div class="text-h5 text-weight-bold q-mb-md">Account Information</div>
          
          <div class="q-gutter-y-md">
            <q-input
              v-model="displayName"
              label="Full Name"
              dark
              outlined
              dense
              color="primary"
              class="input-dark"
              readonly
            >
              <template v-slot:prepend>
                <q-icon name="person" color="primary" />
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
              readonly
            >
              <template v-slot:prepend>
                <q-icon name="email" color="primary" />
              </template>
            </q-input>

            <q-input
              v-model="memberSince"
              label="Member Since"
              dark
              outlined
              dense
              color="primary"
              class="input-dark"
              readonly
            >
              <template v-slot:prepend>
                <q-icon name="calendar_today" color="primary" />
              </template>
            </q-input>
          </div>
        </q-card>

        <!-- Quick Actions -->
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-card class="glass-card q-pa-md action-card cursor-pointer hover-lift">
              <div class="row items-center q-gutter-md">
                <q-icon name="lock" size="2rem" color="primary" />
                <div class="col">
                  <div class="text-weight-bold">Change Password</div>
                  <div class="text-grey-5 text-caption">Update your password</div>
                </div>
              </div>
            </q-card>
          </div>
          <div class="col-12 col-md-6">
            <q-card class="glass-card q-pa-md action-card cursor-pointer hover-lift">
              <div class="row items-center q-gutter-md">
                <q-icon name="settings" size="2rem" color="primary" />
                <div class="col">
                  <div class="text-weight-bold">Settings</div>
                  <div class="text-grey-5 text-caption">Manage preferences</div>
                </div>
              </div>
            </q-card>
          </div>
        </div>

        <!-- Admin Actions -->
        <div v-if="authStore.isAdmin" class="q-mt-xl">
          <div class="text-h5 text-weight-bold q-mb-md">Administrative Tools</div>
          <q-card class="glass-card q-pa-md action-card cursor-pointer hover-lift border-primary" @click="$router.push('/users')">
            <div class="row items-center q-gutter-md">
              <q-icon name="group" size="2.5rem" color="primary" />
              <div class="col">
                <div class="text-h6 text-weight-bold">User Management</div>
                <div class="text-grey-5">Manage platform users, roles and permissions</div>
              </div>
              <q-icon name="arrow_forward" color="primary" size="sm" />
            </div>
          </q-card>
        </div>

      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from 'stores/auth'

const authStore = useAuthStore()

const displayName = computed(() => authStore.userName)
const email = computed(() => authStore.userEmail)
const memberSince = computed(() => {
  if (authStore.user?.created_at) {
    return new Date(authStore.user.created_at).toLocaleDateString()
  }
  return 'N/A'
})
</script>

<style lang="scss" scoped>
.font-sans { font-family: 'Inter', sans-serif; }

.blob {
    position: absolute;
    filter: blur(80px);
    opacity: 0.3;
    border-radius: 50%;
    z-index: 0;
}
.blob-1 { width: 500px; height: 500px; background: $primary; top: -10%; left: -10%; animation: float 10s infinite alternate; }
.blob-2 { width: 400px; height: 400px; background: $secondary; bottom: -5%; right: -5%; animation: float 12s infinite alternate-reverse; }

@keyframes float {
    0% { transform: translate(0, 0); }
    100% { transform: translate(30px, 30px); }
}

.grid-overlay {
    background-image: 
        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 40px 40px;
}

.glass-card {
    background: rgba(20, 20, 20, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    backdrop-filter: blur(20px);
}

.action-card {
    transition: transform 0.3s ease, border-color 0.3s ease;
    &:hover {
        transform: translateY(-3px);
        border-color: rgba($primary, 0.3);
    }
}

.hover-lift {
    transition: transform 0.3s ease;
}

:deep(.input-dark .q-field__control) {
    background: rgba(255,255,255,0.05);
    border-radius: 12px;
}
</style>

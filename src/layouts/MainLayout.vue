<template>
  <q-layout view="lHh Lpr lff" class="bg-black text-white font-sans">
    
    <!-- Floating "Island" Header -->
    <q-header 
      class="fixed-top transition-all" 
      :class="{ 
        'island-header': isScrolled, 
        'bg-transparent': !isScrolled,
        'header-hidden': isHidden,
        'q-mt-md': $q.screen.gt.sm
      }"
      :style="$q.screen.gt.sm ? 'left: 0; right: 0; margin-left: auto; margin-right: auto; max-width: 1200px; width: 95%; z-index: 2000;' : 'z-index: 2000;'"
    >
      <q-toolbar class="q-px-lg" style="height: 70px;">
        <!-- Logo -->
        <q-toolbar-title 
          class="text-weight-bold text-h5 flex items-center cursor-pointer logo-text" 
          @click="$router.push('/')"
        >
          <q-icon name="auto_stories" class="q-mr-sm text-primary" size="sm" />
          <span class="tracking-tighter">Digi<span class="text-primary">Gura</span></span>
        </q-toolbar-title>

        <q-space />

        <!-- Desktop Navigation -->
        <div class="gt-sm row items-center q-gutter-x-lg">
          <a href="#" class="nav-link">Home</a>
          <a href="#features" class="nav-link">Features</a>
          <a href="#pricing" class="nav-link">Pricing</a>
          <a href="#about" class="nav-link">About</a>
        </div>

        <q-space />

        <!-- Action Buttons / Profile Menu -->
        <div class="gt-sm row items-center q-gutter-x-md">
          <template v-if="!authStore.isAuthenticated">
            <q-btn flat dense no-caps label="Sign In" class="text-grey-4 hover:text-white transition-colors" to="/login" />
            <q-btn 
              unelevated 
              rounded 
              color="primary" 
              text-color="black" 
              label="Get Started" 
              no-caps 
              class="text-weight-bold q-px-lg hover-glow"
              to="/register"
            />
          </template>
          <template v-else>
            <q-btn-dropdown flat rounded class="text-white profile-dropdown" no-caps>
              <template v-slot:label>
                <div class="row items-center no-wrap q-px-sm">
                  <q-avatar size="32px" color="primary" text-color="black" class="q-mr-sm" style="font-weight: 600;">
                    {{ authStore.userName[0].toUpperCase() }}
                  </q-avatar>
                  <div class="column items-start" style="max-width: 150px;">
                    <span class="text-weight-medium text-white" style="font-size: 14px; line-height: 1.2; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 100%;">{{ authStore.userName }}</span>
                  </div>
                </div>
              </template>
              <q-list style="min-width: 200px; background-color: #1d1d1d;" class="profile-menu text-white">
                <q-item clickable v-close-popup to="/dashboard" class="q-py-sm menu-item">
                  <q-item-section avatar>
                    <q-icon name="dashboard" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-medium text-white">Dashboard</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item v-if="authStore.isAdmin" clickable v-close-popup to="/users" class="q-py-sm menu-item">
                  <q-item-section avatar>
                    <q-icon name="group" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-medium text-white">Manage Users</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator dark v-if="authStore.isAdmin" />
                <q-item clickable v-close-popup to="/profile" class="q-py-sm menu-item">
                  <q-item-section avatar>
                    <q-icon name="account_circle" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-medium text-white">Profile</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator dark />
                <q-item clickable v-close-popup @click="handleLogout" class="q-py-sm menu-item">
                  <q-item-section avatar>
                    <q-icon name="logout" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-medium text-white">Sign Out</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </template>
        </div>

        <!-- Mobile Menu Button - Opens Drawer -->
        <q-btn flat round icon="menu" class="lt-md" @click="toggleLeftDrawer" />
      </q-toolbar>
    </q-header>

    <!-- Mobile Navigation Drawer -->
    <q-drawer
      v-model="leftDrawerOpen"
      side="right"
      overlay
      elevated
      behavior="mobile"
      :width="280"
      style="z-index: 9999 !important;"
      class="sidebar-drawer"
    >
      <div class="column full-height q-pa-md text-white" style="background-color: #1d1d1d;">
        <q-list separator class="no-border">
            
            <!-- Drawer Header -->
            <q-item class="q-mb-md">
                <q-item-section>
                    <div class="text-h6 text-weight-bold flex items-center justify-between full-width">
                        <!-- Logo in Lime Green -->
                        <span style="color: #ccff00;">DigiGura</span>
                        
                        <!-- Close Button -->
                        <q-btn 
                            flat 
                            round 
                            dense 
                            icon="close" 
                            color="white" 
                            @click="toggleLeftDrawer"
                        />
                    </div>
                </q-item-section>
            </q-item>

            <!-- Navigation Items -->
            <q-item clickable v-ripple @click="toggleLeftDrawer">
                <q-item-section avatar>
                    <q-icon name="home" color="white" />
                </q-item-section>
                <q-item-section class="text-white text-h6">Home</q-item-section>
            </q-item>

            <q-item clickable v-ripple @click="toggleLeftDrawer">
                <q-item-section avatar>
                    <q-icon name="list" color="white" />
                </q-item-section>
                <q-item-section class="text-white text-h6">Features</q-item-section>
            </q-item>

            <q-item clickable v-ripple @click="toggleLeftDrawer">
                <q-item-section avatar>
                    <q-icon name="payments" color="white" />
                </q-item-section>
                <q-item-section class="text-white text-h6">Pricing</q-item-section>
            </q-item>

        </q-list>
        
        <!-- Footer in Drawer -->
        <div v-if="!authStore.isAuthenticated" class="q-mt-auto q-pa-sm q-gutter-y-sm">
             <q-btn outline rounded color="white" label="Sign In" no-caps class="full-width" to="/login" />
             <q-btn unelevated rounded color="primary" text-color="black" label="Get Started" no-caps class="full-width text-weight-bold" to="/register" />
        </div>
        <div v-else class="q-mt-auto q-pa-sm q-gutter-y-sm">
             <q-btn unelevated rounded color="primary" text-color="black" label="Dashboard" icon="dashboard" no-caps class="full-width text-weight-bold" to="/dashboard" />
             <q-btn v-if="authStore.isAdmin" unelevated rounded color="secondary" text-color="black" label="Manage Users" icon="group" no-caps class="full-width text-weight-bold" to="/users" />
             <q-btn outline rounded color="primary" label="Profile" icon="account_circle" no-caps class="full-width" to="/profile" />
             <q-btn outline rounded color="red" label="Logout" icon="logout" no-caps class="full-width" @click="handleLogout" />
        </div>
      </div>
    </q-drawer>
    
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Massive Modern Footer -->
    <q-footer class="bg-black text-white q-pt-xl q-pb-lg border-t border-grey-9">
      <div class="container q-px-md" style="max-width: 1200px; margin: 0 auto;">
        
        <div class="row q-col-gutter-xl text-grey-5 q-pt-lg">
            <!-- Brand Column -->
            <div class="col-12 col-md-4">
                <div class="text-h6 text-white text-weight-bold q-mb-md flex items-center">
                    <q-icon name="auto_stories" class="q-mr-sm text-primary" />
                    DigiGura
                </div>
                <p class="leading-loose">
                    Empowering personalized learning through intelligent data analysis and seamless management tools.
                </p>
                <div class="q-mt-lg flex q-gutter-md">
                   <q-btn round flat size="sm" icon="facebook" class="social-btn" />
                   <q-btn round flat size="sm" icon="check" class="social-btn" /> <!-- Using Check as placeholder for Twitter/X if ionicons not loaded -->
                   <q-btn round flat size="sm" icon="public" class="social-btn" />
                </div>
            </div>

            <!-- Links -->
            <div class="col-6 col-md-2">
                <div class="text-subtitle2 text-white text-weight-bold q-mb-lg">Platform</div>
                <div class="flex column q-gutter-y-sm">
                    <a href="#" class="footer-link">Overview</a>
                    <a href="#" class="footer-link">Features</a>
                    <a href="#" class="footer-link">Pricing</a>
                    <a href="#" class="footer-link">Releases</a>
                </div>
            </div>
             <div class="col-6 col-md-2">
                <div class="text-subtitle2 text-white text-weight-bold q-mb-lg">Company</div>
                <div class="flex column q-gutter-y-sm">
                    <a href="#" class="footer-link">About</a>
                    <a href="#" class="footer-link">Careers</a>
                    <a href="#" class="footer-link">Contact</a>
                    <a href="#" class="footer-link">Legal</a>
                </div>
            </div>

            <!-- Newsletter -->
            <div class="col-12 col-md-4">
                <div class="text-subtitle2 text-white text-weight-bold q-mb-md">Stay Updated</div>
                <p class="text-grey-6 text-caption q-mb-md">Get the latest updates and news.</p>
                <div class="subscribe-box">
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        class="subscribe-input"
                    />
                    <q-btn 
                        flat
                        round
                        dense
                        icon="send" 
                        class="subscribe-btn"
                        size="md"
                    />
                </div>
            </div>
        </div>

        <div class="q-mt-xl row justify-between items-center text-caption text-grey-8">
            <div>&copy; 2026 DigiGura. All rights reserved.</div>
            <div class="flex q-gutter-x-md">
                <a href="#" class="footer-link">Privacy Policy</a>
                <a href="#" class="footer-link">Terms of Service</a>
            </div>
        </div>

      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from 'stores/auth'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const authStore = useAuthStore()
const router = useRouter()
const $q = useQuasar()

const isScrolled = ref(false)
const isHidden = ref(false)
const leftDrawerOpen = ref(false)
let lastScrollY = 0

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const handleScroll = () => {
  const currentScrollY = window.scrollY
  const delta = currentScrollY - lastScrollY
  
  // Determine if scrolled past threshold for glass effect
  isScrolled.value = currentScrollY > 20

  // Scroll Down -> Hide
  if (currentScrollY > 100 && delta > 0) {
    isHidden.value = true
  } 
  // Scroll Up -> Show (only if moved up meaningfully or at top)
  else if (delta < -15 || currentScrollY < 50) {
    isHidden.value = false
  }

  // Update last scroll only if substantial movement or purely for direction tracking?
  // Updating every frame is fine for simple logic
  lastScrollY = currentScrollY
}

const handleLogout = async () => {
  await authStore.signOut()
  $q.notify({
    color: 'info',
    message: 'Logged out successfully',
    icon: 'logout'
  })
  router.push('/')
}


onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  authStore.initialize()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.font-sans {
    font-family: 'Inter', sans-serif; // Ensure basic font feels modern
}

.island-header {
  background: rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
  z-index: 99999; // Ensure it stays on top of everything

  @media (max-width: 1024px) {
      border-radius: 0;
      border-left: none;
      border-right: none;
      border-top: none; 
      // Ensure full width is enforced visually if needed
  }
}



.header-hidden {
    transform: translateY(-150%);
}

.logo-text {
    letter-spacing: -0.5px;
}

.nav-link {
    color: #888;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.3s ease;
    
    &:hover {
        color: white;
        text-shadow: 0 0 10px rgba(255,255,255,0.5);
    }
}

.hover-glow {
    transition: box-shadow 0.3s ease;
    &:hover {
        box-shadow: 0 0 20px rgba(204, 255, 0, 0.4);
    }
}

.footer-link {
    color: #666;
    text-decoration: none;
    transition: color 0.2s;
    &:hover {
        color: white;
    }
}

.social-btn {
    background: rgba(255,255,255,0.05);
    color: #888;
    transition: all 0.3s;
    &:hover {
        background: white;
        color: black;
    }
}

// Modern Subscribe Box
.subscribe-box {
    display: flex;
    align-items: center;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 4px;
    transition: all 0.3s ease;

    &:focus-within {
        border-color: $primary;
        background: rgba(255,255,255,0.08);
        box-shadow: 0 0 0 3px rgba($primary, 0.1);
    }
}

.subscribe-input {
    flex: 1;
    background: transparent;
    border: none;
    padding: 12px 16px;
    color: white;
    font-size: 14px;
    outline: none;

    &::placeholder {
        color: #666;
    }
}

.subscribe-btn {
    color: $primary !important;
    transition: all 0.3s ease;
    margin-right: 4px;

    &:hover {
        transform: translateX(3px) scale(1.1);
        color: white !important;
        background: rgba($primary, 0.15) !important;
    }
}

.text-gradient {
    background: linear-gradient(to right, #fff, #666);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.mobile-nav-link {
    color: #ccc;
    text-decoration: none;
    transition: color 0.3s;
    
    &:hover, &:active {
        color: $primary;
    }
}

.profile-menu .menu-item {
    transition: background-color 0.2s;
    
    &:hover {
        background-color: rgba($primary, 0.25) !important;
    }
}
</style>



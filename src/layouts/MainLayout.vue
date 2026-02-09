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
      :style="$q.screen.gt.sm ? 'left: 0; right: 0; margin-left: auto; margin-right: auto; max-width: 1200px; width: 95%; z-index: 9999;' : 'z-index: 9999;'"
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

        <!-- Action Buttons -->
        <div class="gt-sm row items-center q-gutter-x-md">
          <q-btn flat dense no-caps label="Sign In" class="text-grey-4 hover:text-white transition-colors" />
          <q-btn 
            unelevated 
            rounded 
            color="primary" 
            text-color="black" 
            label="Get Started" 
            no-caps 
            class="text-weight-bold q-px-lg hover-glow"
          />
        </div>

        <!-- Mobile Menu Button -->
        <q-btn flat round icon="menu" class="lt-md" @click="toggleLeftDrawer" />
      </q-toolbar>
    </q-header>

    <!-- Mobile Navigation Drawer -->
    <q-drawer
      v-model="leftDrawerOpen"
      side="right"
      overlay
      behavior="mobile"
      :width="280"
      class="mobile-drawer-final"
      style="z-index: 12000 !important;"
    >
      <div class="column full-height q-pa-lg relative-position text-white">
        <div class="row justify-between items-center q-mb-xl">
           <div class="text-h6 text-weight-bold flex items-center">
              <q-icon name="auto_stories" class="q-mr-sm text-primary" />
              DigiGura
           </div>
           <q-btn flat round icon="close" @click="toggleLeftDrawer" color="white" />
        </div>

        <div class="column q-gutter-y-lg text-h6">
          <a href="#" class="mobile-nav-link" @click="toggleLeftDrawer">Home</a>
          <a href="#features" class="mobile-nav-link" @click="toggleLeftDrawer">Features</a>
          <a href="#pricing" class="mobile-nav-link" @click="toggleLeftDrawer">Pricing</a>
          <a href="#about" class="mobile-nav-link" @click="toggleLeftDrawer">About</a>
        </div>

        <div class="q-mt-auto column q-gutter-y-md">
           <q-btn outline rounded color="white" label="Sign In" no-caps class="full-width" />
           <q-btn unelevated rounded color="primary" text-color="black" label="Get Started" no-caps class="full-width text-weight-bold" />
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
                <div class="text-subtitle2 text-white text-weight-bold q-mb-md">Subscribe</div>
                <div class="relative-position">
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        class="footer-input full-width"
                    />
                    <q-btn 
                        round 
                        dense 
                        unelevated 
                        color="primary" 
                        text-color="black" 
                        icon="arrow_forward" 
                        class="absolute-right q-ma-xs"
                        size="sm"
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

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
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
  z-index: 9999; // Ensure it stays on top of everything

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

.footer-input {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 12px 16px;
    border-radius: 8px;
    color: white;
    outline: none;
    transition: all 0.3s;

    &:focus {
        border-color: $primary;
        background: rgba(255,255,255,0.1);
    }

    &::placeholder {
        color: #444;
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
</style>

<style lang="scss">
/* Final explicit fix for sidebar */
.mobile-drawer-final {
    background-color: #000000 !important; /* Force black */
    background-color: rgba(0, 0, 0, 0.95) !important; /* Slight transparency */
    backdrop-filter: blur(10px);
    z-index: 12000 !important; /* Ensure it is on top */
}

/* Ensure the container (which might hold the backdrop) is also high index */
.q-drawer-container {
    z-index: 12000 !important; 
}

/* Ensure the backdrop is just below the drawer */
.q-drawer__backdrop {
    z-index: 11999 !important;
    background-color: rgba(0,0,0,0.5) !important;
}
</style>

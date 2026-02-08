<template>
  <q-layout view="lHh Lpr lff" class="bg-black text-white">
    <!-- Header -->
    <q-header :class="['fixed-top', { 'glass-header': isScrolled, 'bg-transparent': !isScrolled }]" style="transition: all 0.3s ease;">
      <q-toolbar class="q-py-md container" style="max-width: 1200px; margin: 0 auto;">
        <!-- Logo -->
        <q-toolbar-title class="text-weight-bold text-h5 flex items-center cursor-pointer" @click="$router.push('/')">
          <q-icon name="school" class="q-mr-sm text-light-green-13" size="md" />
          Public Tuition
        </q-toolbar-title>

        <!-- Use QSpace for spacing -->
        <q-space />

        <!-- Desktop Navigation -->
        <div class="gt-sm q-gutter-md flex items-center">
          <q-btn flat no-caps label="Home" to="/" class="text-grey-4 hover-text-white" />
          <q-btn flat no-caps label="Features" href="#features" class="text-grey-4 hover-text-white" />
          <q-btn flat no-caps label="About" class="text-grey-4 hover-text-white" />
          <q-btn flat no-caps label="Contact" class="text-grey-4 hover-text-white" />
          
          <div class="q-pl-md">
             <q-btn outline rounded no-caps label="Login" class="q-mr-sm" />
             <q-btn unelevated rounded color="white" text-color="black" no-caps label="Get Started" class="text-weight-bold" />
          </div>
        </div>

        <!-- Mobile Menu -->
        <q-btn flat round icon="menu" class="lt-md" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Footer -->
    <q-footer class="bg-black text-white q-pt-xl q-pb-lg" style="border-top: 1px solid rgba(255,255,255,0.1);">
      <div class="container q-px-md" style="max-width: 1200px; margin: 0 auto;">
        <div class="row q-col-gutter-xl">
          
          <!-- Column 1: Branding -->
          <div class="col-12 col-md-4">
             <div class="text-h5 text-weight-bold q-mb-md flex items-center">
                <q-icon name="school" class="q-mr-sm text-light-green-13" />
                Public Tuition
             </div>
             <p class="text-grey-5 leading-relaxed">
               The ultimate AI-powered management system for modern tuition classes. Streamline visuals, payments, and attendance in one place.
             </p>
             <div class="q-mt-lg flex q-gutter-sm">
               <q-btn round flat size="sm" icon="facebook" class="bg-grey-9 text-grey-4" />
               <q-btn round flat size="sm" icon="ion-logo-twitter" class="bg-grey-9 text-grey-4" /> <!-- Note: ion-logo-twitter might need ionicons set, falling back to standard if not -->
               <q-btn round flat size="sm" icon="public" class="bg-grey-9 text-grey-4" />
             </div>
          </div>

          <!-- Column 2: Quick Links -->
          <div class="col-6 col-md-2">
            <div class="text-subtitle1 text-weight-bold q-mb-md text-grey-3">Product</div>
            <div class="flex column q-gutter-sm">
               <a href="#" class="no-decoration text-grey-5 hover-text-white">Features</a>
               <a href="#" class="no-decoration text-grey-5 hover-text-white">Pricing</a>
               <a href="#" class="no-decoration text-grey-5 hover-text-white">API</a>
               <a href="#" class="no-decoration text-grey-5 hover-text-white">Integration</a>
            </div>
          </div>

          <!-- Column 3: Company -->
          <div class="col-6 col-md-2">
            <div class="text-subtitle1 text-weight-bold q-mb-md text-grey-3">Company</div>
             <div class="flex column q-gutter-sm">
               <a href="#" class="no-decoration text-grey-5 hover-text-white">About Us</a>
               <a href="#" class="no-decoration text-grey-5 hover-text-white">Careers</a>
               <a href="#" class="no-decoration text-grey-5 hover-text-white">Blog</a>
               <a href="#" class="no-decoration text-grey-5 hover-text-white">Contact</a>
            </div>
          </div>

          <!-- Column 4: Newsletter -->
          <div class="col-12 col-md-4">
            <div class="text-subtitle1 text-weight-bold q-mb-md text-grey-3">Stay Updated</div>
            <p class="text-grey-5 q-mb-md">Subscribe to our newsletter for the latest updates and features.</p>
            <div class="row">
               <q-input 
                 dense 
                 outlined 
                 dark 
                 placeholder="Enter your email" 
                 class="col bg-grey-10 rounded-borders-left"
                 style="border-top-right-radius: 0; border-bottom-right-radius: 0;"
               />
               <q-btn 
                 unelevated 
                 color="light-green-13" 
                 text-color="black" 
                 label="Subscribe" 
                 class="col-auto rounded-borders-right" 
                 no-caps
                 style="border-top-left-radius: 0; border-bottom-left-radius: 0;"
               />
            </div>
          </div>

        </div>

        <div class="q-mt-xl q-pt-lg border-t border-grey-9 text-center text-grey-6 text-caption">
           <div>&copy; 2026 Public Tuition Class Management System. All rights reserved.</div>
           <div class="q-mt-xs">Powered by <span class="text-white text-weight-bold">Lst global enterprises (PVT) LTD</span></div>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.glass-header {
  background: rgba(0, 0, 0, 0.8) !important;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.hover-text-white {
  transition: color 0.3s;
  &:hover {
    color: white !important;
  }
}

.no-decoration {
  text-decoration: none;
}

.rounded-borders-left {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.rounded-borders-right {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>

<template>
  <q-page class="bg-black text-white relative-position overflow-hidden font-sans">
    
    <!-- Background Effects -->
    <div class="absolute-full overflow-hidden">
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="grid-overlay absolute-full"></div>
    </div>

    <div class="q-pa-xl relative-position z-top">
      <div class="container" style="max-width: 1200px; margin: 0 auto;">
        
        <!-- Welcome Header -->
        <div class="q-mb-xl">
          <h1 class="text-h2 text-weight-bold q-mb-sm">
            Welcome back, <span class="text-primary">{{ authStore.userName }}</span>
          </h1>
          <p class="text-grey-5 text-h6">Here's what's happening with your classes today.</p>
        </div>

        <!-- Quick Stats -->
        <div class="row q-col-gutter-lg q-mb-xl">
          <div v-for="(stat, index) in stats" :key="index" class="col-12 col-md-4">
            <q-card class="glass-card q-pa-lg text-center stat-card">
              <q-icon :name="stat.icon" size="3rem" :color="stat.color" class="q-mb-md" />
              <div class="text-h3 text-weight-bold text-white">{{ stat.value }}</div>
              <div class="text-grey-5 text-uppercase tracking-wide">{{ stat.label }}</div>
            </q-card>
          </div>
        </div>

        <!-- Action Cards -->
        <div class="row q-col-gutter-lg">
          <div v-for="(action, index) in actions" :key="index" class="col-12 col-md-6">
            <q-card class="glass-card action-card cursor-pointer q-pa-lg hover-lift" @click="handleActionClick(action)">
              <q-card-section class="row items-center q-gutter-md">
                <q-icon :name="action.icon" size="3rem" :color="action.color" />
                <div class="col">
                  <div class="text-h5 text-weight-bold text-white">{{ action.title }}</div>
                  <div class="text-grey-5">{{ action.description }}</div>
                </div>
                <q-icon name="arrow_forward" color="grey-6" size="sm" />
              </q-card-section>
            </q-card>
          </div>
        </div>

      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from 'stores/auth'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { supabase } from 'boot/supabase'

const authStore = useAuthStore()
const router = useRouter()
const $q = useQuasar()

const stats = ref([
  { icon: 'groups', color: 'primary', value: '0', label: 'Total Students' },
  { icon: 'event_available', color: 'positive', value: '0%', label: 'Attendance Rate' },
  { icon: 'class', color: 'accent', value: '0', label: 'Total Classes' },
])

const fetchStats = async () => {
  try {
    const { count: studentCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true })
    const { count: classCount } = await supabase.from('classes').select('*', { count: 'exact', head: true })
    
    const today = new Date().toISOString().split('T')[0]
    const { data: attendance } = await supabase
      .from('attendance')
      .select('status')
      .eq('date', today)
    
    const present = attendance?.filter(a => a.status === 'present').length || 0
    const attendanceRate = studentCount > 0 ? Math.round((present / studentCount) * 100) : 0
    
    stats.value[0].value = (studentCount || 0).toString()
    stats.value[1].value = `${attendanceRate}%`
    stats.value[2].value = (classCount || 0).toString()
  } catch (error) {
    console.error('Dashboard stats error:', error)
  }
}

onMounted(() => {
  fetchStats()
})

const handleActionClick = (action) => {
  if (action.to) {
    router.push(action.to)
  } else {
    $q.notify({
      color: 'info',
      message: `${action.title} functionality is coming soon!`,
      icon: 'info'
    })
  }
}

const allActions = [
  { icon: 'qr_code_scanner', color: 'primary', title: 'Mark Attendance', description: 'Scan QR codes or mark manually', to: '/attendance' },
  { icon: 'receipt_long', color: 'secondary', title: 'View Payments', description: 'Track student payments and receipts', to: '/payments' },
  { icon: 'auto_fix_high', color: 'blue', title: 'Generate Papers', description: 'Create AI-powered exam papers', to: '/generate-papers' },
  { icon: 'analytics', color: 'purple', title: 'View Analytics', description: 'Detailed performance insights', to: '/analytics' },
  { 
    icon: 'group', 
    color: 'orange', 
    title: 'User Management', 
    description: 'Manage platform users and roles',
    adminOnly: true,
    to: '/users'
  },
]

const actions = computed(() => {
  return allActions.filter(action => !action.adminOnly || authStore.isAdmin)
})
</script>



<style lang="scss" scoped>
.font-sans { font-family: 'Inter', sans-serif; }
.tracking-wide { letter-spacing: 0.05em; }

.blob {
    position: absolute;
    filter: blur(80px);
    opacity: 0.3;
    border-radius: 50%;
    z-index: 0;
}
.blob-1 { width: 500px; height: 500px; background: $primary; top: -10%; right: -10%; animation: float 10s infinite alternate; }
.blob-2 { width: 400px; height: 400px; background: $secondary; bottom: -5%; left: -5%; animation: float 12s infinite alternate-reverse; }

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

.stat-card {
    transition: transform 0.3s ease, border-color 0.3s ease;
    &:hover {
        transform: translateY(-5px);
        border-color: rgba($primary, 0.3);
    }
}

.action-card {
    transition: transform 0.3s ease, border-color 0.3s ease;
    &:hover {
        transform: translateY(-3px);
        border-color: rgba(255, 255, 255, 0.2);
    }
}

.hover-lift {
    transition: transform 0.3s ease;
}
</style>

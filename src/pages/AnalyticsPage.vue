<template>
  <q-page class="q-pa-lg bg-black text-white font-sans">
    <div class="max-width-container">
      <div class="flex items-center justify-between q-mb-xl">
        <div>
          <h1 class="text-h4 text-weight-bold text-white q-mb-xs">Analytics Dashboard</h1>
          <p class="text-grey-5">Insights, attendance trends, and revenue tracking.</p>
        </div>
        <q-btn 
          flat 
          round 
          icon="refresh" 
          color="primary" 
          @click="fetchAllData"
          :loading="loading"
        >
          <q-tooltip>Refresh Data</q-tooltip>
        </q-btn>
      </div>

      <!-- Stats Grid -->
      <div class="row q-col-gutter-lg q-mb-xl">
        <div class="col-12 col-md-3" v-for="stat in stats" :key="stat.title">
          <q-card class="glass-card q-pa-lg">
            <div class="row items-center no-wrap">
              <q-icon :name="stat.icon" :color="stat.color" size="2rem" class="q-mr-md" />
              <div>
                <div class="text-grey-5 text-caption text-uppercase letter-spacing-1">{{ stat.title }}</div>
                <div class="text-h4 text-weight-bold">{{ stat.value }}</div>
              </div>
            </div>
            <div class="q-mt-md">
              <q-linear-progress :value="stat.progress" :color="stat.color" rounded class="q-mt-sm" />
            </div>
          </q-card>
        </div>
      </div>

      <div class="row q-col-gutter-lg">
        <!-- Attendance Trend Chart -->
        <div class="col-12 col-md-8">
          <q-card class="glass-card q-pa-lg">
            <div class="text-h6 q-mb-md text-weight-bold">Attendance Trends (Last 7 Days)</div>
            <apexchart
              type="area"
              height="350"
              :options="chartOptions"
              :series="attendanceSeries"
              v-if="!loading"
            />
            <div v-else class="flex flex-center" style="height: 350px;">
              <q-spinner-dots color="primary" size="3em" />
            </div>
          </q-card>
        </div>

        <!-- Grade Distribution Pie -->
        <div class="col-12 col-md-4">
          <q-card class="glass-card q-pa-lg">
            <div class="text-h6 q-mb-md text-weight-bold">Status Distribution (Today)</div>
            <apexchart
              type="donut"
              height="350"
              :options="pieOptions"
              :series="pieSeries"
              v-if="!loading"
            />
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from 'boot/supabase'
import VueApexCharts from 'vue3-apexcharts'

const apexchart = VueApexCharts
const loading = ref(false)

const stats = ref([
  { title: 'Total Students', value: '0', icon: 'people', color: 'primary', progress: 0.7 },
  { title: 'Avg. Attendance', value: '0%', icon: 'check_circle', color: 'positive', progress: 0.8 },
  { title: 'Total Classes', value: '0', icon: 'book', color: 'accent', progress: 0.5 },
  { title: 'Monthly Revenue', value: 'Rs.0', icon: 'payments', color: 'warning', progress: 0.4 }
])

const attendanceSeries = ref([])
const pieSeries = ref([])

const chartOptions = {
  chart: {
    height: 350,
    type: 'area',
    toolbar: { show: false },
    background: 'transparent'
  },
  colors: ['#00E396'],
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 3 },
  theme: { mode: 'dark' },
  xaxis: {
    categories: [],
    labels: { style: { colors: '#888' } }
  },
  yaxis: {
    labels: { style: { colors: '#888' } }
  },
  grid: {
    borderColor: 'rgba(255, 255, 255, 0.05)'
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0.1,
      stops: [0, 90, 100]
    }
  }
}

const pieOptions = {
  chart: { type: 'donut' },
  labels: ['Present', 'Absent', 'Late'],
  colors: ['#00E396', '#FF4560', '#FEB019'],
  theme: { mode: 'dark' },
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
        labels: {
          show: true,
          total: {
            show: true,
            label: 'Total',
            color: '#fff'
          }
        }
      }
    }
  },
  stroke: { show: false },
  legend: { position: 'bottom' }
}

const fetchAllData = async () => {
  loading.value = true
  try {
    // 1. Fetch Students
    const { count: studentCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true })
    stats.value[0].value = studentCount || 0

    // 2. Fetch Classes
    const { count: classCount } = await supabase.from('classes').select('*', { count: 'exact', head: true })
    stats.value[2].value = classCount || 0

    // 3. Fetch Weekly Attendance Trend
    const last7Days = []
    const dates = []
    for(let i=6; i>=0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      dates.push(dateStr)
      last7Days.push({ date: dateStr, count: 0 })
    }

    const { data: attendanceData } = await supabase
      .from('attendance')
      .select('date, status')
      .gte('date', dates[0])
      .lte('date', dates[6])

    dates.forEach((date, index) => {
      const dayData = attendanceData?.filter(a => a.date === date && a.status === 'present')
      last7Days[index].count = dayData?.length || 0
    })

    attendanceSeries.value = [{
      name: 'Present Students',
      data: last7Days.map(d => d.count)
    }]
    chartOptions.xaxis.categories = dates.map(d => d.split('-').slice(1).join('/'))

    // 4. Pie Data (Today)
    const today = new Date().toISOString().split('T')[0]
    const todayData = attendanceData?.filter(a => a.date === today)
    const present = todayData?.filter(a => a.status === 'present').length || 0
    const absent = todayData?.filter(a => a.status === 'absent').length || 0
    const late = todayData?.filter(a => a.status === 'late').length || 0
    pieSeries.value = [present, absent, late]

    // 5. Avg Attendance
    if (studentCount > 0) {
      const avg = Math.round((present / studentCount) * 100)
      stats.value[1].value = `${avg}%`
      stats.value[1].progress = avg / 100
    }

  } catch (error) {
    console.error('Analytics Fetch Error:', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchAllData)
</script>

<style lang="scss" scoped>
.max-width-container {
  max-width: 1200px;
  margin: 0 auto;
}

.glass-card {
  background: rgba(20, 20, 20, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.letter-spacing-1 {
  letter-spacing: 1px;
}
</style>

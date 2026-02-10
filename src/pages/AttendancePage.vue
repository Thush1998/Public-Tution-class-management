<template>
  <q-page class="q-pa-lg bg-black text-white font-sans">
    <div class="max-width-container">
      <div class="flex items-center justify-between q-mb-xl">
        <div>
          <h1 class="text-h4 text-weight-bold text-white q-mb-xs">Attendance Tracker</h1>
          <p class="text-grey-5">Scan student QR codes or mark attendance manually.</p>
        </div>
        <div class="row q-gutter-sm">
          <q-select
            v-model="selectedClass"
            :options="classes"
            :option-label="opt => opt ? `${opt.name} (${opt.grade || 'No Grade'})` : ''"
            label="Select Class"
            dark
            outlined
            dense
            color="primary"
            class="min-width-200"
            @update:model-value="fetchStudentsByClass"
          />
        </div>
      </div>

      <div class="row q-col-gutter-lg">
        <!-- Scanner Section -->
        <div class="col-12 col-md-4">
          <q-card class="glass-card q-pa-md scanner-container">
            <div class="text-h6 q-mb-md text-weight-bold">QR Scanner</div>
            <div id="reader" class="full-width overflow-hidden rounded-borders"></div>
            <div v-if="scanning" class="q-mt-md text-center">
              <q-spinner-dots color="primary" size="2em" />
              <p class="text-grey-5">Scanning for QR codes...</p>
            </div>
            <div class="row q-mt-md justify-center">
              <q-btn 
                :color="scanning ? 'negative' : 'primary'"
                :label="scanning ? 'Stop Scanning' : 'Start Scanning'"
                :icon="scanning ? 'stop' : 'camera_alt'"
                :text-color="scanning ? 'white' : 'black'"
                rounded
                unelevated
                @click="toggleScanner"
              />
            </div>
          </q-card>
        </div>

        <!-- Attendance List Section -->
        <div class="col-12 col-md-8">
          <q-card class="glass-card">
            <q-table
              :rows="studentRows"
              :columns="columns"
              row-key="id"
              dark
              flat
              class="bg-transparent"
              :loading="loading"
            >
              <template v-slot:body-cell-status="props">
                <q-td :props="props">
                  <q-chip 
                    :color="getStatusColor(props.value)"
                    text-color="white"
                    size="sm"
                    outline
                  >
                    {{ props.value }}
                  </q-chip>
                </q-td>
              </template>

              <template v-slot:body-cell-actions="props">
                <q-td :props="props" class="text-center">
                  <q-btn-group rounded outline>
                    <q-btn 
                      size="sm" 
                      color="positive" 
                      icon="check" 
                      label="Present" 
                      :flat="props.row.status !== 'present'"
                      @click="markAttendance(props.row.id, 'present')"
                    />
                    <q-btn 
                      size="sm" 
                      color="negative" 
                      icon="close" 
                      label="Absent" 
                      :flat="props.row.status !== 'absent'"
                      @click="markAttendance(props.row.id, 'absent')"
                    />
                  </q-btn-group>
                </q-td>
              </template>
            </q-table>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { supabase } from 'boot/supabase'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const scanning = ref(false)
const scanner = ref(null)
const selectedClass = ref(null)
const classes = ref([])
const studentRows = ref([])
const loading = ref(false)

const columns = [
  { name: 'full_name', label: 'Student', field: 'full_name', align: 'left' },
  { name: 'status', label: 'Today Status', field: 'status', align: 'center' },
  { name: 'actions', label: 'Action', align: 'center' }
]

const fetchClasses = async () => {
  const { data, error } = await supabase.from('classes').select('*')
  if (error) {
    console.error('Error fetching classes:', error)
  } else {
    classes.value = data
    if (data.length > 0) selectedClass.value = data[0]
  }
}

const fetchStudentsByClass = async () => {
  if (!selectedClass.value) return
  loading.value = true
  
  // 1. Fetch Students in Class
  const { data: students, error: sError } = await supabase
    .from('student_classes')
    .select('student_id, profiles(full_name)')
    .eq('class_id', selectedClass.value.id)

  if (sError) {
    $q.notify({ color: 'negative', message: 'Failed to fetch students' })
    loading.value = false
    return
  }

  // 2. Fetch Today's Attendance
  const today = new Date().toISOString().split('T')[0]
  const { data: attendance, error: aError } = await supabase
    .from('attendance')
    .select('*')
    .eq('class_id', selectedClass.value.id)
    .eq('date', today)

  if (aError) {
    console.error('Attendance fetch error:', aError)
  }

  // 3. Merge
  studentRows.value = students.map(s => {
    const record = attendance?.find(a => a.student_id === s.student_id)
    return {
      id: s.student_id,
      full_name: s.profiles?.full_name || 'Unknown',
      status: record?.status || 'absent',
      attendance_id: record?.id
    }
  })
  
  loading.value = false
}

const markAttendance = async (studentId, status = 'present') => {
  const today = new Date().toISOString().split('T')[0]
  try {
    const { error } = await supabase.from('attendance').upsert({
      class_id: selectedClass.value.id,
      student_id: studentId,
      date: today,
      status: status
    }, { onConflict: 'class_id, student_id, date' })

    if (error) throw error
    $q.notify({ color: 'positive', message: `Marked as ${status}` })
    await fetchStudentsByClass()
  } catch (err) {
    $q.notify({ color: 'negative', message: 'Update failed: ' + err.message })
  }
}

const onScanSuccess = async (decodedText) => {
  if (!selectedClass.value) {
    $q.notify({ color: 'warning', message: 'Please select a class first' })
    return
  }
  await markAttendance(decodedText, 'present')
}

const toggleScanner = () => {
  if (scanning.value) {
    scanner.value.clear()
    scanning.value = false
  } else {
    scanning.value = true
    scanner.value = new Html5QrcodeScanner(
      "reader", 
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    )
    scanner.value.render(onScanSuccess)
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case 'present': return 'positive'
    case 'absent': return 'negative'
    case 'late': return 'warning'
    default: return 'grey'
  }
}

onMounted(() => {
  fetchClasses().then(fetchStudentsByClass)
})

onUnmounted(() => {
  if (scanner.value) {
    scanner.value.clear()
  }
})
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

.scanner-container {
  min-height: 400px;
}

.min-width-200 {
  min-width: 200px;
}

:deep(.q-table__card) {
  background: transparent;
  box-shadow: none;
}

:deep(.q-table th) {
  font-weight: 700;
  color: #888;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 1px;
}
</style>

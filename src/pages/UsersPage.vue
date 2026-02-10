<template>
  <q-page class="q-pa-lg bg-black text-white font-sans">
    <div class="max-width-container">
      <div class="flex items-center justify-between q-mb-xl">
        <div>
          <h1 class="text-h4 text-weight-bold text-white q-mb-xs">User Management</h1>
          <p class="text-grey-5">Manage platform users, roles, and permissions.</p>
        </div>
        <q-btn 
          color="accent" 
          label="Test RPC" 
          rounded 
          unelevated 
          class="q-mr-sm"
          @click="testRpc"
        />
        <q-btn 
          color="primary" 
          text-color="black" 
          icon="person_add" 
          label="Add User" 
          rounded 
          unelevated 
          class="text-weight-bold px-lg hover-glow"
          @click="showAddUserDialog = true"
        />
      </div>

      <!-- Users Table -->
      <q-card class="glass-card">
        <q-table
          :rows="users"
          :columns="columns"
          row-key="id"
          :loading="loading"
          flat
          dark
          class="bg-transparent"
          :pagination="pagination"
        >
          <template v-slot:body-cell-avatar_url="props">
            <q-td :props="props">
              <q-avatar size="32px" color="primary" text-color="black">
                <img v-if="props.value" :src="props.value">
                <span v-else>{{ props.row.full_name?.charAt(0) || 'U' }}</span>
              </q-avatar>
            </q-td>
          </template>

          <template v-slot:body-cell-roles="props">
            <q-td :props="props">
              <div class="row q-gutter-xs">
                <q-chip 
                  v-for="role in props.value" 
                  :key="role" 
                  dense 
                  outline 
                  color="primary" 
                  text-color="white"
                  size="sm"
                >
                  {{ role }}
                </q-chip>
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-classes="props">
            <q-td :props="props">
              <div class="row q-gutter-xs">
                <q-chip 
                  v-for="cls in props.value" 
                  :key="cls.id" 
                  dense 
                  color="accent" 
                  text-color="black"
                  size="sm"
                >
                  {{ cls.name }} <span v-if="cls.grade" class="q-ml-xs text-weight-bold">({{ cls.grade }})</span>
                </q-chip>
                <span v-if="!props.value || props.value.length === 0" class="text-grey-6 text-italic">No classes</span>
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props" class="text-right">
              <q-btn flat round dense color="accent" icon="qr_code" @click="showQr(props.row)">
                <q-tooltip>Student QR Code</q-tooltip>
              </q-btn>
              <q-btn flat round dense color="primary" icon="edit" @click="editUser(props.row)">
                <q-tooltip>Edit Roles</q-tooltip>
              </q-btn>
              <q-btn flat round dense color="negative" icon="delete" @click="confirmDelete(props.row)">
                <q-tooltip>Delete Data</q-tooltip>
              </q-btn>
            </q-td>
          </template>

          <template v-slot:no-data>
            <div class="full-width row flex-center q-pa-xl text-grey-6">
              <q-icon name="group_off" size="3rem" class="q-mr-md" />
              <span>No users found.</span>
            </div>
          </template>
        </q-table>
      </q-card>
    </div>

    <!-- Edit Roles Dialog -->
    <q-dialog v-model="editRolesDialog">
      <q-card class="glass-card q-pa-md" style="min-width: 350px;">
        <q-card-section>
          <div class="text-h6 text-white text-weight-bold">Update Roles</div>
          <div class="text-subtitle2 text-grey-5">{{ selectedUser?.full_name || selectedUser?.email }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select
            v-model="targetRoles"
            :options="roleOptions"
            label="Roles"
            multiple
            chips
            dark
            outlined
            color="primary"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup class="text-grey-5" />
          <q-btn unelevated rounded color="primary" text-color="black" label="Save Changes" @click="saveUserRoles" :loading="saving" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Confirm Delete Dialog -->
    <q-dialog v-model="deleteConfirmDialog">
      <q-card class="glass-card q-pa-md">
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="negative" text-color="white" />
          <span class="q-ml-sm text-white">Permanently delete <strong>{{ selectedUser?.full_name || selectedUser?.email }}</strong>? This will remove their account and all data. This action cannot be undone.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey-5" v-close-popup />
          <q-btn unelevated rounded color="negative" label="Delete Permanently" @click="deleteUserData" :loading="deleting" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Add User Dialog -->
    <q-dialog v-model="showAddUserDialog">
      <q-card class="glass-card q-pa-md" style="min-width: 400px;">
        <q-card-section>
          <div class="text-h6 text-white text-weight-bold">Add New User</div>
          <div class="text-subtitle2 text-grey-5">Create a student or staff account.</div>
        </q-card-section>

        <q-card-section class="q-gutter-y-md">
          <q-input v-model="newUser.full_name" label="Full Name" dark outlined color="primary" dense />
          <q-input v-model="newUser.email" label="Email Address" type="email" dark outlined color="primary" dense />
          <q-input v-model="newUser.password" label="Password" type="password" dark outlined color="primary" dense />
          <q-select
            v-model="newUser.role"
            :options="roleOptions"
            label="Initial Role"
            dark
            outlined
            color="primary"
            dense
          />

          <q-select
            v-if="newUser.role === 'student' || newUser.role === 'teacher'"
            v-model="newUser.grade"
            :options="grades"
            label="Select Grade"
            dark
            outlined
            color="primary"
            dense
          />

          <q-select
            v-if="(newUser.role === 'student' || newUser.role === 'teacher') && newUser.grade"
            v-model="newUser.class_ids"
            :options="filteredClasses"
            option-value="id"
            option-label="name"
            emit-value
            map-options
            multiple
            chips
            label="Select Subject(s)"
            dark
            outlined
            color="primary"
            dense
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No subjects found for this grade.
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey-5" v-close-popup />
          <q-btn unelevated rounded color="primary" text-color="black" label="Create User" @click="addUser" :loading="adding" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- QR Code Display Dialog -->
    <q-dialog v-model="qrDialog">
      <q-card class="glass-card q-pa-lg text-center" style="min-width: 320px;">
        <q-card-section>
          <div class="text-h6 text-white text-weight-bold">Student QR ID</div>
          <div class="text-subtitle2 text-grey-5">{{ selectedUser?.full_name }}</div>
        </q-card-section>

        <q-card-section class="flex flex-center q-pa-md bg-white rounded-borders q-mx-md">
          <div id="qr-to-print">
            <qrcode-vue
              :value="selectedUser?.id"
              :size="200"
              level="H"
              render-as="canvas"
              ref="qrCanvas"
            />
          </div>
        </q-card-section>

        <q-card-actions align="center" class="q-mt-md q-gutter-sm">
          <q-btn unelevated rounded color="primary" text-color="black" icon="download" label="Save Image" @click="downloadQr" />
          <q-btn outline rounded color="white" icon="print" label="Print" @click="printQr" />
          <q-btn flat label="Close" color="grey-5" v-close-popup class="full-width q-mt-sm" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from 'boot/supabase'
import { useQuasar } from 'quasar'
import QrcodeVue from 'qrcode.vue'

const $q = useQuasar()
const users = ref([])
const loading = ref(false)
const saving = ref(false)
const deleting = ref(false)
const adding = ref(false)

const editRolesDialog = ref(false)
const deleteConfirmDialog = ref(false)
const showAddUserDialog = ref(false)
const qrDialog = ref(false)
const selectedUser = ref(null)
const targetRoles = ref([])

const newUser = ref({
  full_name: '',
  email: '',
  password: '',
  role: 'student',
  grade: '',
  class_ids: []
})

const grades = [
  'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
  'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11',
  'A/L Grade 12', 'A/L Grade 13'
]

const availableClasses = ref([])
const filteredClasses = computed(() => {
  if (!newUser.value.grade) return []
  return availableClasses.value.filter(c => c.grade === newUser.value.grade)
})

const qrCanvas = ref(null)

const fetchAvailableClasses = async () => {
  const { data, error } = await supabase.from('classes').select('*')
  if (error) {
    console.error('Error fetching classes:', error)
  } else {
    availableClasses.value = data
  }
}

const showQr = (user) => {
  selectedUser.value = user
  qrDialog.value = true
}

const downloadQr = () => {
  const canvas = document.querySelector('#qr-to-print canvas')
  if (canvas) {
    const link = document.createElement('a')
    link.download = `QR_${selectedUser.value.full_name.replace(/\s+/g, '_')}.png`
    link.href = canvas.toDataURL()
    link.click()
  }
}

const printQr = () => {
  const canvas = document.querySelector('#qr-to-print canvas')
  if (canvas) {
    const dataUrl = canvas.toDataURL()
    const windowContent = `
      <!DOCTYPE html>
      <html>
      <head><title>Print QR Code</title></head>
      <body style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; font-family:sans-serif;">
        <h2 style="margin-bottom:20px;">${selectedUser.value.full_name}</h2>
        <img src="${dataUrl}" style="width:300px; height:300px;"/>
        <p style="margin-top:20px; color:#666;">Scan for Attendance - DigiGura</p>
        <script>window.onload = () => { window.print(); window.close(); }<${'/script'}>
      </body>
      </html>
    `
    const printWindow = window.open('', '', 'width=600,height=600')
    printWindow.document.open()
    printWindow.document.write(windowContent)
    printWindow.document.close()
  }
}

const roleOptions = ['admin', 'teacher', 'student', 'staff']

const pagination = {
  rowsPerPage: 10
}

const columns = [
  { name: 'avatar_url', label: '', field: 'avatar_url', align: 'left' },
  { name: 'full_name', label: 'Name', field: 'full_name', align: 'left', sortable: true },
  { name: 'email', label: 'Email', field: 'email', align: 'left', sortable: true },
  { name: 'roles', label: 'Roles', field: 'roles', align: 'left' },
  { name: 'classes', label: 'Classes/Grades', field: 'classes', align: 'left' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'right' }
]

const testRpc = async () => {
  try {
    const { data, error } = await supabase.rpc('test_rpc')
    if (error) throw error
    $q.notify({ 
      color: 'info', 
      message: 'Debug Info: ' + JSON.stringify(data),
      timeout: 10000,
      multiLine: true
    })
    console.log('Test RPC Data:', data)
  } catch (err) {
    $q.notify({ color: 'negative', message: 'Test RPC Fail: ' + err.message })
    console.error('Test RPC Error:', err)
  }
}

const fetchUsers = async () => {
  loading.value = true
  try {
    const { data, error } = await supabase.rpc('get_users_with_roles')
    if (error) throw error
    users.value = data
  } catch (error) {
    $q.notify({
      color: 'negative',
      message: 'Failed to fetch users: ' + error.message,
      icon: 'error'
    })
  } finally {
    loading.value = false
  }
}

const addUser = async () => {
  if (!newUser.value.email || !newUser.value.password || !newUser.value.full_name) {
    $q.notify({ color: 'warning', message: 'Please fill all fields' })
    return
  }
  
  adding.value = true
  try {
    const { error } = await supabase.rpc('admin_create_user', {
      email: newUser.value.email,
      password: newUser.value.password,
      full_name: newUser.value.full_name,
      user_role: newUser.value.role,
      class_ids: newUser.value.class_ids
    })
    if (error) throw error

    $q.notify({
      color: 'positive',
      message: `User ${newUser.value.full_name} created successfully`,
      icon: 'person_add'
    })
    
    showAddUserDialog.value = false
    // Reset form
    newUser.value = { full_name: '', email: '', password: '', role: 'student', grade: '', class_ids: [] }
    await fetchUsers()
  } catch (error) {
    console.error('Full Creation Error:', error)
    $q.notify({ color: 'negative', message: 'Creation failed: ' + (error.details || error.message) })
  } finally {
    adding.value = false
  }
}

const editUser = (user) => {
  selectedUser.value = user
  targetRoles.value = [...user.roles]
  editRolesDialog.value = true
}

const saveUserRoles = async () => {
  saving.value = true
  try {
    const { error } = await supabase.rpc('update_user_role', {
      target_user_id: selectedUser.value.id,
      new_roles: targetRoles.value
    })
    if (error) throw error

    $q.notify({
      color: 'positive',
      message: 'Roles updated for ' + (selectedUser.value.full_name || selectedUser.value.email),
      icon: 'check'
    })
    editRolesDialog.value = false
    await fetchUsers()
  } catch (error) {
    $q.notify({
      color: 'negative',
      message: 'Update failed: ' + error.message,
      icon: 'error'
    })
  } finally {
    saving.value = false
  }
}

const confirmDelete = (user) => {
  selectedUser.value = user
  deleteConfirmDialog.value = true
}

const deleteUserData = async () => {
  deleting.value = true
  try {
    const { error } = await supabase.rpc('admin_delete_user', {
      target_user_id: selectedUser.value.id
    })
    if (error) throw error

    $q.notify({
      color: 'positive',
      message: 'User account and data permanently deleted',
      icon: 'delete_forever'
    })
    deleteConfirmDialog.value = false
    await fetchUsers()
  } catch (error) {
    $q.notify({
      color: 'negative',
      message: 'Deletion failed: ' + error.message,
      icon: 'error'
    })
  } finally {
    deleting.value = false
  }
}

onMounted(() => {
  fetchAvailableClasses()
  fetchUsers()
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

.hover-glow {
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 0 20px rgba($primary, 0.4);
    transform: translateY(-2px);
  }
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

:deep(.q-table td) {
  font-size: 0.9rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

:deep(.q-table tr:hover) {
  background: rgba(255, 255, 255, 0.02);
}
</style>

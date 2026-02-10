import { defineStore } from 'pinia'
import { supabase } from 'boot/supabase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    session: null,
    profile: null,
    roles: [],
  }),

  getters: {
    isAuthenticated: (state) => !!state.session,
    userEmail: (state) => state.user?.email || '',
    userName: (state) => state.profile?.full_name || state.user?.user_metadata?.full_name || state.user?.email?.split('@')[0] || 'User',
    hasRole: (state) => (role) => state.roles.includes(role),
    isAdmin: (state) => state.roles.includes('admin'),
    isTeacher: (state) => state.roles.includes('teacher'),
    isStudent: (state) => state.roles.includes('student'),
  },

  actions: {
    async initialize() {
      // Get current session
      const { data: { session } } = await supabase.auth.getSession()
      this.session = session
      this.user = session?.user || null
      
      if (this.user) {
        await this.fetchUserData()
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        this.session = session
        this.user = session?.user || null
        
        if (this.user) {
          await this.fetchUserData()
        } else {
          this.profile = null
          this.roles = []
        }
      })
    },

    async fetchUserData() {
      if (!this.user) return

      const [profileRes, rolesRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', this.user.id).single(),
        supabase.from('user_roles').select('role').eq('user_id', this.user.id)
      ])

      if (profileRes.data) this.profile = profileRes.data
      if (rolesRes.data) this.roles = rolesRes.data.map(r => r.role)
    },

    setUser(user, session) {
      this.user = user
      this.session = session
      if (user) this.fetchUserData()
    },

    async signOut() {
      await supabase.auth.signOut()
      this.user = null
      this.session = null
      this.profile = null
      this.roles = []
    },
  },
})

<template>
  <q-page class="bg-black text-white relative-position overflow-hidden font-sans">
    
    <!-- Hero Section with Aurora Background -->
    <section class="hero-section relative-position flex flex-center text-center q-px-md overflow-hidden">
      <!-- Aurora Effect -->
      <div class="aurora-container absolute-full">
        <div class="aurora-blob blob-1"></div>
        <div class="aurora-blob blob-2"></div>
        <div class="aurora-blob blob-3"></div>
      </div>
      
      <!-- Grid Overlay -->
      <div class="grid-overlay absolute-full"></div>

      <div class="hero-content relative-position z-top q-py-xl" style="max-width: 900px;">
        <div class="fade-in-up" style="animation-delay: 0.1s">
            <div class="inline-block q-py-xs q-px-md rounded-full bg-white/10 backdrop-blur border border-white/20 q-mb-lg">
                <span class="text-primary text-weight-bold">New v2.0</span> 
                <span class="text-grey-4 q-ml-sm">AI-Powered Analytics Available Now</span>
            </div>
        </div>
        
        <h1 class="text-h1 text-weight-bolder q-mb-lg hero-title fade-in-up leading-tight" style="animation-delay: 0.3s">
          Manage your tuition <br>
          <span class="text-gradient-primary">like a pro.</span>
        </h1>
        
        <p class="text-h5 text-grey-5 q-mb-xl fade-in-up leading-normal" style="animation-delay: 0.5s; max-width: 650px; margin-left: auto; margin-right: auto;">
            The all-in-one platform to streamline attendance, payments, and student performance with <span class="text-white text-weight-bold">AI-driven insights</span>.
        </p>
        
        <div class="row justify-center q-gutter-md fade-in-up" style="animation-delay: 0.7s">
          <q-btn
            unelevated
            rounded
            color="primary"
            text-color="black"
            label="Start Free Trial"
            size="lg"
            class="q-px-xl q-py-md text-weight-bold hover-lift shadow-glow"
            no-caps
          />
          <q-btn
            outline
            rounded
            color="white"
            label="View Demo"
            icon="play_circle"
            size="lg"
            class="q-px-xl q-py-md text-weight-bold hover-lift bg-black/30 backdrop-blur"
            no-caps
          />
        </div>
      </div>
    </section>

    <!-- Logo Marquee -->
    <section class="q-py-lg border-y border-white/10 bg-black/50 backdrop-blur relative-position z-top">
        <div class="text-center text-grey-6 text-caption q-mb-md uppercase tracking-widest">Trusted by over 500+ institutes</div>
        <div class="marquee-container overflow-hidden">
            <div class="marquee-content flex items-center q-gutter-x-xl">
                <span v-for="n in 10" :key="n" class="text-h6 text-grey-7 text-weight-bold opacity-50 hover:opacity-100 transition-opacity cursor-default">
                    INSTITUTE {{ n }}
                </span>
                <!-- Duplicate for seamless loop -->
                <span v-for="n in 10" :key="'dup-'+n" class="text-h6 text-grey-7 text-weight-bold opacity-50 hover:opacity-100 transition-opacity cursor-default">
                    INSTITUTE {{ n }}
                </span>
            </div>
        </div>
    </section>

    <!-- Spotlight Bento Grid -->
    <section id="features" class="q-py-xl q-px-md relative-position z-top" @mousemove="handleMouseMove">
      <div class="container" style="max-width: 1200px; margin: 0 auto;">
        <div class="text-center q-mb-xl">
          <h2 class="text-h3 text-weight-bold q-mb-md">Everything you need</h2>
          <p class="text-xl text-grey-5">Powerful features wrapped in a beautiful interface.</p>
        </div>

        <div class="bento-grid">
            <!-- Row 1 -->
            <!-- Analytics Card (Large) -->
            <div class="bento-card large spotlight-card group">
                <div class="absolute-full spotlight-bg"></div>
                <div class="relative-position z-10 q-pa-xl h-full flex column justify-between">
                    <div>
                        <div class="icon-box bg-primary/20 text-primary q-mb-md">
                            <q-icon name="insights" size="2rem" />
                        </div>
                        <h3 class="text-h5 text-weight-bold q-mb-sm">Advanced Analytics</h3>
                        <p class="text-grey-5">Track student progress, attendance trends, and financial reports with our AI-powered dashboard.</p>
                    </div>
                    <div class="mockup-chart q-mt-lg">
                        <div class="bar" style="height: 40%"></div>
                        <div class="bar" style="height: 70%"></div>
                        <div class="bar" style="height: 50%"></div>
                        <div class="bar" style="height: 85%"></div>
                        <div class="bar active" style="height: 60%"></div>
                    </div>
                </div>
            </div>

            <!-- Mobile App (Medium) -->
            <div class="bento-card medium spotlight-card group overflow-hidden">
                 <div class="absolute-full spotlight-bg"></div>
                 <div class="absolute-right w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent"></div>
                 <div class="relative-position z-10 q-pa-lg">
                    <q-icon name="smartphone" size="2rem" class="text-white q-mb-md" />
                    <h3 class="text-h6 text-weight-bold q-mb-sm">Mobile First</h3>
                    <p class="text-grey-5 text-sm">Manage everything from your phone. iOS and Android apps.</p>
                 </div>
                 <q-icon name="phone_iphone" size="8rem" class="absolute-bottom-right text-grey-9 -rotate-12 translate-y-4 translate-x-4 opacity-50" />
            </div>

            <!-- Row 2 -->
            <!-- Smart Attendance (Medium) -->
             <div class="bento-card medium spotlight-card group">
                 <div class="absolute-full spotlight-bg"></div>
                 <div class="relative-position z-10 q-pa-lg">
                    <div class="icon-box bg-purple-500/20 text-purple-400 q-mb-md">
                        <q-icon name="qr_code_scanner" size="1.8rem" color="secondary" />
                    </div>
                    <h3 class="text-h6 text-weight-bold q-mb-sm">QR Attendance</h3>
                    <p class="text-grey-5 text-sm">Lightning fast check-ins with automated SMS notifications to parents.</p>
                 </div>
            </div>

            <!-- Paper Generator (Medium) -->
             <div class="bento-card medium spotlight-card group">
                 <div class="absolute-full spotlight-bg"></div>
                 <div class="relative-position z-10 q-pa-lg">
                    <div class="icon-box bg-blue-500/20 text-blue-400 q-mb-md">
                         <q-icon name="auto_fix_high" size="1.8rem" color="blue" />
                    </div>
                    <h3 class="text-h6 text-weight-bold q-mb-sm">AI Paper Gen</h3>
                    <p class="text-grey-5 text-sm">Generate exam papers and MCQs instantly using our advanced AI models.</p>
                 </div>
            </div>

            <!-- Payments (Medium) -->
            <div class="bento-card medium spotlight-card group">
                 <div class="absolute-full spotlight-bg"></div>
                 <div class="relative-position z-10 q-pa-lg">
                    <div class="icon-box bg-yellow-500/20 text-yellow-400 q-mb-md">
                        <q-icon name="payments" size="1.8rem" color="warning" />
                    </div>
                    <h3 class="text-h6 text-weight-bold q-mb-sm">Payments</h3>
                    <p class="text-grey-5 text-sm">Seamless online payments and automated receipt generation.</p>
                 </div>
            </div>

            <!-- Row 3 -->
            <!-- Security (Large span) -->
             <div class="bento-card large spotlight-card group">
                <div class="absolute-full spotlight-bg"></div>
                <div class="content q-pa-xl row items-center relative-position z-10">
                    <div class="col-8">
                        <q-icon name="shield" size="2.5rem" color="green-13" class="q-mb-md" />
                        <div class="text-h5 text-weight-bold q-mb-sm">Enterprise Security</div>
                        <p class="text-grey-5">Your data is encrypted with 256-bit AES encryption. We perform daily backups to ensure your institute's data is never lost.</p>
                    </div>
                     <div class="col-4 text-center">
                        <q-icon name="lock" size="6rem" color="grey-9" />
                    </div>
                </div>
            </div>

            <!-- Support (Medium) -->
            <div class="bento-card medium spotlight-card group">
                 <div class="absolute-full spotlight-bg"></div>
                 <div class="relative-position z-10 q-pa-lg">
                    <div class="icon-box bg-red-500/20 text-red-400 q-mb-md">
                        <q-icon name="support_agent" size="1.8rem" color="red" />
                    </div>
                    <h3 class="text-h6 text-weight-bold q-mb-sm">24/7 Support</h3>
                    <p class="text-grey-5 text-sm">Our dedicated support team is always here to help you succeed.</p>
                 </div>
            </div>

        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="q-py-xl relative-position z-top">
        <div class="container" style="max-width: 1000px; margin: 0 auto;">
            <div class="text-center q-mb-xl">
                 <h2 class="text-h3 text-weight-bold q-mb-md">Simplicity in Motion</h2>
                 <p class="text-xl text-grey-5">Get up and running in minutes, not days.</p>
            </div>

            <div class="row q-col-gutter-lg relative-position">
                <!-- Connecting Line (Desktop) -->
                <div class="absolute-top gt-sm" style="top: 40%; left: 10%; right: 10%; height: 2px; background: linear-gradient(90deg, transparent, #333, transparent); z-index: 0;"></div>

                <!-- Step 1 -->
                <div class="col-12 col-md-4 text-center relative-position z-10">
                    <div class="step-card bg-black border border-white/10 q-pa-lg rounded-xl">
                        <div class="step-icon bg-grey-9 text-white q-mb-md shadow-lg">1</div>
                        <h4 class="text-h6 text-weight-bold q-mb-sm">Register</h4>
                        <p class="text-grey-5 text-sm">Create your institute profile and configure your class settings.</p>
                    </div>
                </div>

                <!-- Step 2 -->
                <div class="col-12 col-md-4 text-center relative-position z-10">
                     <div class="step-card bg-black border border-white/10 q-pa-lg rounded-xl">
                        <div class="step-icon bg-primary text-black q-mb-md shadow-glow-primary">2</div>
                        <h4 class="text-h6 text-weight-bold q-mb-sm">Onboard</h4>
                        <p class="text-grey-5 text-sm">Add students via bulk upload or share your unique registration link.</p>
                    </div>
                </div>

                <!-- Step 3 -->
                <div class="col-12 col-md-4 text-center relative-position z-10">
                     <div class="step-card bg-black border border-white/10 q-pa-lg rounded-xl">
                        <div class="step-icon bg-grey-9 text-white q-mb-md shadow-lg">3</div>
                        <h4 class="text-h6 text-weight-bold q-mb-sm">Automate</h4>
                        <p class="text-grey-5 text-sm">Sit back as attendance and payments are tracked automatically.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="q-py-xl bg-grey-9 text-center border-y border-white/5">
        <div class="container row justify-center q-gutter-x-xl" style="max-width: 1000px; margin: 0 auto;">
            <div v-for="(stat, index) in stats" :key="index" class="col-auto q-mb-md">
                <h3 class="text-h2 text-weight-bolder text-primary q-mb-none">{{ stat.value }}</h3>
                <div class="text-grey-5 text-uppercase tracking-widest text-caption">{{ stat.label }}</div>
            </div>
        </div>
    </section>

    <!-- Call to Action -->
    <section class="cta-section q-py-xl text-center relative-position overflow-hidden">
        <div class="absolute-center glow-orb"></div>
        <div class="container relative-position z-top" style="max-width: 800px; margin: 0 auto;">
            <h2 class="text-h2 text-weight-bolder q-mb-md hero-title">Ready to transform your institute?</h2>
            <p class="text-h6 text-grey-5 q-mb-xl">Join hundreds of other tuition masters who have modernized their classes.</p>
             <q-btn
            unelevated
            rounded
            color="white"
            text-color="black"
            label="Get Started Now"
            size="lg"
            class="q-px-lg q-py-md text-weight-bold hover-scale shadow-glow-white"
            no-caps
          />
        </div>
    </section>

  </q-page>
</template>

<script setup>
// Removed unused imports


const stats = [
    { label: 'Active Students', value: '15k+' },
    { label: 'Institutes', value: '500+' },
    { label: 'Daily Attendance', value: '50k' },
]

const handleMouseMove = (e) => {
    const cards = document.querySelectorAll('.spotlight-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
}
</script>

<style lang="scss" scoped>
// Utilities
.font-sans { font-family: 'Inter', sans-serif; }
.tracking-widest { letter-spacing: 0.15em; }
.leading-tight { line-height: 1.1; }
.hero-title {
    font-size: clamp(2rem, 6vw, 5rem); // Responsive font size
    line-height: 1.1;
}
.text-gradient-primary {
    background: linear-gradient(135deg, $primary 0%, #00ff99 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.border-white\/10 { border-color: rgba(255,255,255,0.1); }
.bg-white\/10 { background: rgba(255,255,255,0.1); }
.backdrop-blur { backdrop-filter: blur(8px); }
.hover-lift { transition: transform 0.3s ease; &:hover { transform: translateY(-4px); } }

// Hero Section
.hero-section {
    min-height: 100vh;
    padding-top: 80px;
}

.aurora-container {
    filter: blur(80px);
    opacity: 0.6;
    z-index: 0;
}

.aurora-blob {
    position: absolute;
    border-radius: 50%;
    animation: aurora-float 10s infinite alternate;
}

.blob-1 { width: 500px; height: 500px; background: $secondary; top: -10%; left: -10%; animation-delay: 0s; }
.blob-2 { width: 400px; height: 400px; background: $primary; top: 20%; right: -5%; animation-delay: 2s; }
.blob-3 { width: 600px; height: 300px; background: $accent; bottom: -10%; left: 30%; animation-delay: 4s; }

@keyframes aurora-float {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(40px, -40px) scale(1.1); }
}

.grid-overlay {
    background-image: 
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    mask-image: radial-gradient(circle at center, black 40%, transparent 80%);
}

// Marquee
.marquee-container {
    white-space: nowrap;
}
.marquee-content {
    display: inline-block;
    animation: scroll 30s linear infinite;
}
@keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}

// Spotlight Bento Grid
.bento-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-auto-rows: minmax(280px, auto);
    gap: 24px;

    @media (max-width: 1024px) { 
        display: flex; 
        flex-direction: column; 
        gap: 16px; // Smaller gap on mobile
    }
}

.bento-card {
    background: rgba(20, 20, 20, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(20px);
    
    &.large {
        grid-column: span 8;
        grid-row: span 1; // Changed to 1 to ensure grid alignment
    }
    
    &.medium {
        grid-column: span 4;
        grid-row: span 1;
    }
    
    &.wide {
         grid-column: span 12;
         grid-row: span 1;
    }
}

.spotlight-card::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    border-radius: 24px;
    padding: 1px;
    background: radial-gradient(
        600px circle at var(--mouse-x) var(--mouse-y),
        rgba(255, 255, 255, 0.4),
        transparent 40%
    );
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    z-index: 2;
    opacity: 0;
    transition: opacity 0.3s;
}

.spotlight-card:hover::before { opacity: 1; }

.spotlight-bg {
    background: radial-gradient(
        800px circle at var(--mouse-x) var(--mouse-y), 
        rgba(255,255,255,0.06), 
        transparent 40%
    );
    opacity: 0;
    transition: opacity 0.3s;
}
.spotlight-card:hover .spotlight-bg { opacity: 1; }

.icon-box {
    width: 60px; height: 60px;
    border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
}

// Chart Animation
.mockup-chart {
    display: flex; align-items: flex-end; justify-content: space-between; gap: 8px; height: 100px;
    .bar {
        flex: 1; background: rgba(255,255,255,0.1); border-radius: 4px;
        transition: height 0.5s ease;
        &.active { background: $primary; box-shadow: 0 0 20px rgba($primary, 0.5); }
    }
}
.bento-card:hover .bar { height: 90% !important; transition-delay: 0.1s; }

// CTA Glow
.glow-orb {
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba($primary, 0.2) 0%, transparent 70%);
    border-radius: 50%;
    filter: blur(60px);
    animation: pulse 4s infinite alternate;
}
@keyframes pulse { 0% { opacity: 0.5; transform: scale(0.8); } 100% { opacity: 0.8; transform: scale(1.1); } }

// Fade In
.fade-in-up {
    opacity: 0;
    animation: fadeInUp 0.8s ease-out forwards;
}
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

// Steps Section
.step-icon {
    width: 60px; height: 60px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0 auto 1rem;
    border: 4px solid #000; // Gap effect
}

.shadow-glow-primary {
    box-shadow: 0 0 20px rgba($primary, 0.6);
}

.step-card {
    transition: transform 0.3s;
    &:hover {
        transform: translateY(-5px);
        border-color: rgba($primary, 0.3);
    }
}
</style>

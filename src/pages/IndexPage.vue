<template>
  <q-page class="bg-black text-white relative-position overflow-hidden" @mousemove="handleMouseMove">
    <!-- Animated Background -->
    <div class="animated-bg absolute-full"></div>
    <div class="grid-overlay absolute-full"></div>

    <!-- Hero Section -->
    <section class="hero-section relative-position flex flex-center text-center q-pa-md" style="min-height: 95vh;">
      <div class="hero-bg absolute-full"></div>
      <div class="hero-content relative-position z-top q-py-xl" data-aos="fade-up">
        <div class="q-mb-lg fade-in-up" style="animation-delay: 0.2s">
          <q-badge outline color="light-green-13" label="v2.0 • AI Powered System" class="q-pa-sm text-subtitle2 rounded-borders tracking-widest" />
        </div>
        <h1 class="text-h1 text-weight-bolder q-mb-md hero-title fade-in-up" style="animation-delay: 0.4s">
          The Future of <br>
          <span class="text-gradient">Education Management</span>
        </h1>
        <p class="text-h5 text-grey-5 q-mb-xl hero-subtitle fade-in-up" style="animation-delay: 0.6s; max-width: 700px; margin-left: auto; margin-right: auto;">
            Streamline operations with our <span class="text-white text-weight-bold typing-effect">AI-Driven Ecosystem</span>
        </p>
        <div class="row justify-center q-gutter-md fade-in-up" style="animation-delay: 0.8s">
          <q-btn
            unelevated
            rounded
            color="white"
            text-color="black"
            label="Get Started"
            size="lg"
            class="q-px-xl q-py-md text-weight-bold shadow-transition hover-scale glow-effect"
            no-caps
          />
          <q-btn
            outline
            rounded
            color="white"
            label="Watch Demo"
            icon="play_circle"
            size="lg"
            class="q-px-xl q-py-md text-weight-bold shadow-transition hover-scale"
            no-caps
          />
        </div>

        <!-- Float Elements (Decorative) -->
        <div class="floating-element float-1 absolute" style="top: 20%; left: 10%">
             <q-icon name="auto_awesome" size="xl" color="grey-8" />
        </div>
        <div class="floating-element float-2 absolute" style="bottom: 15%; right: 10%">
             <q-icon name="code" size="xl" color="grey-8" />
        </div>
      </div>
    </section>

    <!-- Advanced Features (Bento Grid) -->
    <section class="features-section q-py-xl q-px-md relative-position">
      <div class="container" style="max-width: 1200px; margin: 0 auto;">
        <div class="text-center q-mb-xl" data-aos="fade-up">
          <h2 class="text-h3 text-weight-bold q-mb-sm">Engineered for Giants</h2>
          <p class="text-subtitle1 text-grey-5">Everything you need, nothing you don't.</p>
        </div>

        <div class="bento-grid">
            <!-- Large Card: Analytics -->
            <div class="bento-card large glass-effect" data-tilt>
                <div class="content q-pa-lg">
                    <q-icon name="insights" size="3rem" color="light-green-13" class="q-mb-md" />
                    <div class="text-h5 text-weight-bold q-mb-sm">Real-time Analytics</div>
                    <p class="text-grey-5">Review performance metrics, financial health, and student attendance in real-time with our AI-powered dashboard.</p>
                    <div class="chart-mockup q-mt-md bg-grey-9 rounded-borders" style="height: 100px; width: 100%; opacity: 0.5;">
                        <span></span>
                    </div>
                </div>
            </div>

            <!-- Medium Card: Students -->
            <div class="bento-card medium glass-effect" data-tilt style="background-image: url('/students.jpg'); background-size: cover; background-position: center;">
                <div class="absolute-full bg-black" style="opacity: 0.6"></div>
                <div class="content q-pa-lg relative-position z-top">
                    <q-icon name="groups" size="2.5rem" color="light-blue-13" class="q-mb-md" />
                    <div class="text-h6 text-weight-bold q-mb-sm">Student Portal</div>
                    <p class="text-grey-4">Seamless profiles for thousands of students.</p>
                </div>
            </div>

            <!-- Medium Card: Payments -->
            <div class="bento-card medium glass-effect" data-tilt>
                <div class="content q-pa-lg">
                     <q-icon name="payments" size="2.5rem" color="amber-13" class="q-mb-md" />
                    <div class="text-h6 text-weight-bold q-mb-sm">Smart Payments</div>
                    <p class="text-grey-5">Automated billing and receipt generation.</p>
                </div>
            </div>

             <!-- Wide Card: Security -->
             <div class="bento-card wide glass-effect" data-tilt>
                <div class="content q-pa-lg row items-center">
                    <div class="col-8">
                        <q-icon name="security" size="2.5rem" color="red-13" class="q-mb-md" />
                        <div class="text-h6 text-weight-bold q-mb-sm">Enterprise-Grade Security</div>
                        <p class="text-grey-5">Your data is encrypted and secure with industry-standard protocols.</p>
                    </div>
                     <div class="col-4 text-center">
                        <q-icon name="lock" size="4rem" color="grey-8" />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="cta-section q-py-xl text-center relative-position">
         <div class="blur-blob absolute-center"></div>
        <div class="container relative-position z-top" style="max-width: 800px; margin: 0 auto;">
            <h2 class="text-h3 text-weight-bolder q-mb-md">Ready to Upgrade?</h2>
            <q-btn
            unelevated
            rounded
            color="white"
            text-color="black"
            label="Start Your Free Trial"
            size="lg"
            class="q-px-xl q-py-md text-weight-bold shadow-transition hover-scale glow-effect"
            no-caps
          />
        </div>
    </section>

  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'

const handleMouseMove = (e) => {
    // Parallax effect for grid overlay
    const x = e.clientX / window.innerWidth
    const y = e.clientY / window.innerHeight
    document.documentElement.style.setProperty('--mouse-x', x)
    document.documentElement.style.setProperty('--mouse-y', y)
}

onMounted(() => {
    // Simple vanilla JS tilt effect
    const cards = document.querySelectorAll('[data-tilt]')
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            
            const centerX = rect.width / 2
            const centerY = rect.height / 2
            
            const rotateX = ((y - centerY) / centerY) * -5 // Max 5deg tilt
            const rotateY = ((x - centerX) / centerX) * 5

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
        })

        card.addEventListener('mouseleave', () => {
             card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
        })
    })
})
</script>

<style lang="scss" scoped>
// Variables
$feature-gap: 24px;

// Background Animation
.animated-bg {
    background: radial-gradient(circle at 50% 50%, #111 0%, #000000 100%);
    z-index: 0;
}

.grid-overlay {
    background-image:
        linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    z-index: 0;
    mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
    opacity: 0.6;
    transition: transform 0.1s ease-out;
    transform: translate(calc(var(--mouse-x) * -20px), calc(var(--mouse-y) * -20px));
}

.hero-bg {
  background-image: url('/hero_bg.png');
  background-size: cover;
  background-position: center;
  opacity: 0.2; /* Subtle image blending */
}

// Typography
.hero-title {
    line-height: 1.1;
    letter-spacing: -2px;
}

.text-gradient {
    background: linear-gradient(135deg, #ffffff 0%, #888888 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.tracking-widest {
    letter-spacing: 2px;
}

// Bento Grid Layout
.bento-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: auto auto; // Two rows
    gap: $feature-gap;
    
    @media (max-width: 1023px) {
        display: flex;
        flex-direction: column;
    }
}

.bento-card {
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: transform 0.1s ease-out; // Snappy tilt
    overflow: hidden;
    position: relative;

    &.large {
        grid-column: span 8;
        grid-row: span 2;
    }
    
    &.medium {
        grid-column: span 4;
        grid-row: span 1;
    }
    
    &.wide {
         grid-column: span 12;
         grid-row: span 1;
         margin-top: $feature-gap; // Ensure spacing if not in grid
    }

    &:hover {
        border-color: rgba(255, 255, 255, 0.15);
        box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        
        &::after {
            opacity: 1;
        }
    }

    // Shine effect
    &::after {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1), transparent 40%);
        opacity: 0;
        transition: opacity 0.3s;
        pointer-events: none;
    }
}

// Interactive Elements
.hover-scale {
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    &:hover {
        transform: scale(1.05);
    }
}

.glow-effect:hover {
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
}

// Animations using Keyframes
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in-up {
    opacity: 0;
    animation: fadeInUp 0.8s ease-out forwards;
}

// Floating Elements
.floating-element {
    animation: float 6s ease-in-out infinite;
}

.float-2 {
    animation-delay: 3s;
}

@keyframes float {
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
    100% { transform: translateY(0px) rotate(0deg); }
}

.blur-blob {
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.1);
    filter: blur(80px);
    border-radius: 50%;
    z-index: 0;
}

// Typing Effect
.typing-effect {
    border-right: 3px solid white;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    animation: typing 3s steps(30, end) infinite alternate, blink-caret .75s step-end infinite;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: white; }
}

// Chart Mockup
.chart-mockup {
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    padding: 0 10px;
    overflow: hidden;
    
    &::before, &::after, & span {
        content: '';
        width: 15%;
        background: linear-gradient(to top, #4caf50, #81c784);
        border-radius: 4px 4px 0 0;
        animation: grow-bar 2s ease-out forwards;
    }
    
    &::before { height: 40%; animation-delay: 0.1s; }
    &::after { height: 70%; animation-delay: 0.3s; }
    & span { 
        display: block; 
        height: 60%; 
        animation-delay: 0.5s; 
    }
}

@keyframes grow-bar {
    from { transform: scaleY(0); transform-origin: bottom; }
    to { transform: scaleY(1); transform-origin: bottom; }
}
</style>

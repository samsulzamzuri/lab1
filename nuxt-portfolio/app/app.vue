<template>
  <div>
    <!-- Navigation -->
    <nav class="navbar" :class="{ scrolled: isScrolled }" ref="navbar">
      <div class="nav-container">
        <div class="nav-logo">
          <a href="#home">John<span>.dev</span></a>
        </div>
        <ul class="nav-menu" :class="{ active: mobileMenuActive }" ref="navMenu">
          <li class="nav-item">
            <a href="#home" class="nav-link" @click="handleNavClick">Home</a>
          </li>
          <li class="nav-item">
            <a href="#about" class="nav-link" @click="handleNavClick">About</a>
          </li>
          <li class="nav-item">
            <a href="#services" class="nav-link" @click="handleNavClick">Services</a>
          </li>
          <li class="nav-item">
            <a href="#portfolio" class="nav-link" @click="handleNavClick">Portfolio</a>
          </li>
          <li class="nav-item">
            <a href="#contact" class="nav-link" @click="handleNavClick">Contact</a>
          </li>
        </ul>
        <div class="nav-toggle" :class="{ active: mobileMenuActive }" @click="toggleMobileMenu" ref="mobileMenu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero">
      <div class="hero-container">
        <div class="hero-content">
          <h1 class="hero-title fade-in" :class="{ visible: heroVisible }">
            Hi, I'm <span class="highlight">Samsul Zamzuri</span>
          </h1>
          <h2 class="hero-subtitle fade-in" :class="{ visible: heroVisible }">Freelance Web Developer</h2>
          <p class="hero-description fade-in" :class="{ visible: heroVisible }">
            I create modern, responsive websites and web applications that help businesses grow online. 
            Let's turn your ideas into reality.
          </p>
          <div class="hero-buttons fade-in" :class="{ visible: heroVisible }">
            <a href="#portfolio" class="btn btn-primary">View My Work</a>
            <a href="#contact" class="btn btn-secondary">Get In Touch</a>
          </div>
        </div>
        <div class="hero-image slide-in-right" :class="{ visible: heroVisible }">
          <div class="hero-avatar">
            <img src="/images/profile.jpg" alt="Samsul Zamzuri" @error="handleImageError">
          </div>
        </div>
      </div>
      <div class="scroll-indicator">
        <i class="fas fa-chevron-down"></i>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title fade-in" :class="{ visible: aboutVisible }">About Me</h2>
          <p class="section-subtitle">Get to know me and my skills</p>
        </div>
        <div class="about-content">
          <div class="about-text slide-in-left" :class="{ visible: aboutVisible }">
            <h3>Passionate Web Developer with 5+ Years Experience</h3>
            <p>
              I'm a dedicated freelance web developer specializing in creating stunning, 
              functional websites that drive results. With expertise in modern technologies 
              and a keen eye for design, I help businesses establish a strong online presence.
            </p>
            <div class="skills-grid">
              <div class="skill-item" v-for="(skill, index) in skills" :key="index" :style="{ animationDelay: `${index * 0.2}s` }">
                <i :class="skill.icon"></i>
                <span>{{ skill.name }}</span>
              </div>
            </div>
          </div>
          <div class="about-stats slide-in-right" :class="{ visible: aboutVisible }">
            <div class="stat-item" v-for="stat in stats" :key="stat.label">
              <h4>{{ stat.animated ? animatedValue(stat.value) : stat.value }}+</h4>
              <p>{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="services">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title fade-in" :class="{ visible: servicesVisible }">My Services</h2>
          <p class="section-subtitle">What I can do for you</p>
        </div>
        <div class="services-grid">
          <div class="service-card fade-in" 
               v-for="(service, index) in services" 
               :key="index"
               :class="{ visible: servicesVisible }"
               :style="{ animationDelay: `${index * 0.2}s` }">
            <div class="service-icon">
              <i :class="service.icon"></i>
            </div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
            <ul>
              <li v-for="feature in service.features" :key="feature">{{ feature }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Portfolio Section -->
    <section id="portfolio" class="portfolio">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title fade-in" :class="{ visible: portfolioVisible }">My Portfolio</h2>
          <p class="section-subtitle">Recent projects I've worked on</p>
        </div>
        <div class="portfolio-grid">
          <div class="portfolio-item fade-in" 
               v-for="(project, index) in portfolio" 
               :key="index"
               :class="{ visible: portfolioVisible }"
               :style="{ animationDelay: `${index * 0.2}s` }">
            <div class="portfolio-image">
              <img :src="project.image" :alt="project.title" @error="handlePortfolioImageError($event, project)">
              <div class="portfolio-overlay">
                <div class="portfolio-links">
                  <a href="#" class="portfolio-link"><i class="fas fa-eye"></i></a>
                  <a href="#" class="portfolio-link"><i class="fas fa-external-link-alt"></i></a>
                </div>
              </div>
            </div>
            <div class="portfolio-content">
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <div class="portfolio-tags">
                <span class="tag" v-for="tag in project.tags" :key="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title fade-in" :class="{ visible: contactVisible }">Get In Touch</h2>
          <p class="section-subtitle">Ready to start your project? Let's talk!</p>
        </div>
        <div class="contact-content">
          <div class="contact-info slide-in-left" :class="{ visible: contactVisible }">
            <h3>Let's Work Together</h3>
            <p>
              I'm always excited to work on new projects and help businesses 
              achieve their goals through great web development.
            </p>
            <div class="contact-items">
              <div class="contact-item" v-for="contact in contactInfo" :key="contact.text">
                <i :class="contact.icon"></i>
                <span>{{ contact.text }}</span>
              </div>
            </div>
            <div class="social-links">
              <a href="#" class="social-link" v-for="social in socialLinks" :key="social"><i :class="social"></i></a>
            </div>
          </div>
          <form class="contact-form slide-in-right" :class="{ visible: contactVisible }" @submit="handleFormSubmit">
            <div class="form-group">
              <input type="text" v-model="form.name" placeholder="Your Name" required>
            </div>
            <div class="form-group">
              <input type="email" v-model="form.email" placeholder="Your Email" required>
            </div>
            <div class="form-group">
              <input type="text" v-model="form.subject" placeholder="Subject" required>
            </div>
            <div class="form-group">
              <textarea v-model="form.message" placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-full" :disabled="isSubmitting">
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <p>&copy; 2024 John Developer. All rights reserved.</p>
          <div class="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>

    <!-- Scroll to Top Button -->
    <button v-show="showScrollTop" @click="scrollToTop" class="scroll-to-top" 
            :style="scrollToTopStyles">
      <i class="fas fa-chevron-up"></i>
    </button>

    <!-- Notification -->
    <div v-if="notification.show" :class="['notification', `notification-${notification.type}`, { show: notification.show }]">
      <div class="notification-content">
        <span class="notification-message">{{ notification.message }}</span>
        <button class="notification-close" @click="closeNotification">&times;</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed, nextTick } from 'vue'

// Reactive data
const mobileMenuActive = ref(false)
const isScrolled = ref(false)
const isSubmitting = ref(false)
const showScrollTop = ref(false)

// Visibility states for animations
const heroVisible = ref(false)
const aboutVisible = ref(false)
const servicesVisible = ref(false)
const portfolioVisible = ref(false)
const contactVisible = ref(false)

// Counter animation
const counters = reactive({
  projects: 0,
  clients: 0,
  experience: 0
})

// Form data
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// Notification system
const notification = reactive({
  show: false,
  message: '',
  type: 'info'
})

// Static data
const skills = [
  { icon: 'fab fa-html5', name: 'HTML5' },
  { icon: 'fab fa-css3-alt', name: 'CSS3' },
  { icon: 'fab fa-js-square', name: 'JavaScript' },
  { icon: 'fab fa-react', name: 'React' },
  { icon: 'fab fa-node-js', name: 'Node.js' },
  { icon: 'fab fa-wordpress', name: 'WordPress' }
]

const stats = [
  { value: 50, label: 'Projects Completed', animated: true },
  { value: 30, label: 'Happy Clients', animated: true },
  { value: 5, label: 'Years Experience', animated: true }
]

const services = [
  {
    icon: 'fas fa-code',
    title: 'Web Development',
    description: 'Custom websites built with modern technologies, optimized for performance and user experience.',
    features: ['Responsive Design', 'Modern Frameworks', 'SEO Optimization']
  },
  {
    icon: 'fas fa-mobile-alt',
    title: 'Mobile-First Design',
    description: 'Websites that look and work perfectly on all devices, from smartphones to desktops.',
    features: ['Mobile Optimization', 'Cross-browser Testing', 'Fast Loading']
  },
  {
    icon: 'fas fa-shopping-cart',
    title: 'E-commerce Solutions',
    description: 'Complete online stores with secure payment processing and inventory management.',
    features: ['Payment Integration', 'Product Management', 'Security Features']
  },
  {
    icon: 'fas fa-tools',
    title: 'Website Maintenance',
    description: 'Ongoing support, updates, and optimization to keep your website running smoothly.',
    features: ['Regular Updates', 'Security Monitoring', 'Performance Optimization']
  }
]

const portfolio = [
  {
    title: 'E-commerce Platform',
    description: 'Modern online store with React and Node.js',
    image: 'https://picsum.photos/400/300?random=2',
    tags: ['React', 'Node.js', 'MongoDB']
  },
  {
    title: 'Corporate Website',
    description: 'Professional business website with CMS',
    image: 'https://picsum.photos/400/300?random=3',
    tags: ['WordPress', 'PHP', 'MySQL']
  },
  {
    title: 'Portfolio Website',
    description: 'Creative portfolio for digital artist',
    image: 'https://picsum.photos/400/300?random=4',
    tags: ['HTML5', 'CSS3', 'JavaScript']
  }
]

const contactInfo = [
  { icon: 'fas fa-envelope', text: 'john@developer.com' },
  { icon: 'fas fa-phone', text: '+1 (555) 123-4567' },
  { icon: 'fas fa-map-marker-alt', text: 'New York, NY' }
]

const socialLinks = ['fab fa-linkedin', 'fab fa-github', 'fab fa-twitter']

// Computed properties
const scrollToTopStyles = computed(() => ({
  position: 'fixed',
  bottom: '30px',
  right: '30px',
  width: '50px',
  height: '50px',
  background: '#4F46E5',
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  cursor: 'pointer',
  fontSize: '1.2rem',
  boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
  transform: showScrollTop.value ? 'translateY(0)' : 'translateY(100px)',
  transition: 'all 0.3s ease',
  zIndex: '1000'
}))

// Methods
const toggleMobileMenu = () => {
  mobileMenuActive.value = !mobileMenuActive.value
}

const handleNavClick = (event) => {
  event.preventDefault()
  const targetId = event.target.getAttribute('href')
  const targetSection = document.querySelector(targetId)
  
  if (targetSection) {
    const offsetTop = targetSection.offsetTop - 70
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    })
  }
  
  // Close mobile menu
  mobileMenuActive.value = false
}

const handleScroll = () => {
  const scrollY = window.scrollY
  
  // Navbar scroll effect
  isScrolled.value = scrollY > 100
  
  // Show/hide scroll to top button
  showScrollTop.value = scrollY > 300
  
  // Animation triggers
  checkElementVisibility()
}

const checkElementVisibility = () => {
  const elements = [
    { selector: '.hero', state: heroVisible },
    { selector: '.about', state: aboutVisible },
    { selector: '.services', state: servicesVisible },
    { selector: '.portfolio', state: portfolioVisible },
    { selector: '.contact', state: contactVisible }
  ]
  
  elements.forEach(({ selector, state }) => {
    const element = document.querySelector(selector)
    if (element) {
      const rect = element.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight - 150
      state.value = isVisible
    }
  })
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const handleImageError = (event) => {
  event.target.style.display = 'none'
  event.target.parentNode.innerHTML = '<div class="avatar-placeholder">JD</div>'
}

const handlePortfolioImageError = (event, project) => {
  event.target.style.display = 'none'
  event.target.parentNode.innerHTML = `
    <div class="portfolio-placeholder">
      <h3>${project.title}</h3>
    </div>
    <div class="portfolio-overlay">
      <div class="portfolio-links">
        <a href="#" class="portfolio-link"><i class="fas fa-eye"></i></a>
        <a href="#" class="portfolio-link"><i class="fas fa-external-link-alt"></i></a>
      </div>
    </div>
  `
}

const animatedValue = (target) => {
  // Simple animation placeholder - you can implement counter animation here
  return target
}

const handleFormSubmit = (event) => {
  event.preventDefault()
  
  // Basic validation
  if (!form.name || !form.email || !form.subject || !form.message) {
    showNotification('Please fill in all fields.', 'error')
    return
  }
  
  if (!isValidEmail(form.email)) {
    showNotification('Please enter a valid email address.', 'error')
    return
  }
  
  // Simulate form submission
  isSubmitting.value = true
  
  setTimeout(() => {
    showNotification("Thank you for your message! I'll get back to you soon.", 'success')
    resetForm()
    isSubmitting.value = false
  }, 2000)
}

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''
}

const showNotification = (message, type = 'info') => {
  notification.message = message
  notification.type = type
  notification.show = true
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    notification.show = false
  }, 5000)
}

const closeNotification = () => {
  notification.show = false
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  // Trigger initial animations
  setTimeout(() => {
    heroVisible.value = true
  }, 500)
  
  // Initial scroll check
  nextTick(() => {
    checkElementVisibility()
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style>
/* Notification styles */
.notification {
  position: fixed;
  top: 90px;
  right: 20px;
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  max-width: 400px;
  border-left: 4px solid #4F46E5;
}

.notification-success {
  border-left-color: #10B981;
}

.notification-error {
  border-left-color: #EF4444;
}

.notification-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.notification-message {
  color: #333;
  font-weight: 500;
}

.notification-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-close:hover {
  color: #333;
}

.notification.show {
  transform: translateX(0);
}
</style>

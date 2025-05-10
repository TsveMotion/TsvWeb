<template>
  <main>
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <!-- Futuristic Glowing SVG/Div Effect Instead of Logo -->
          <div class="hero-glow-effect">
            <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="75" cy="75" r="60" fill="#00ffe7" fill-opacity="0.15"/>
              <circle cx="75" cy="75" r="45" fill="#7c3aed" fill-opacity="0.14"/>
              <circle cx="75" cy="75" r="30" fill="#00ffe7" fill-opacity="0.13"/>
              <circle cx="75" cy="75" r="15" fill="#fff" fill-opacity="0.08"/>
            </svg>
            <div class="center-glow"></div>
          </div>
          
          <h1 class="hero-title">
            The <span class="gradient-text">Decentralized</span> Web<br> 
            Development Agency
          </h1>
          
          <p class="hero-subtitle">
            Creating cutting-edge digital experiences with modern web technology
          </p>
          
          <div class="tech-icons">
            <div class="tech-icon" v-for="(tech, index) in technologies" :key="index">
              <img :src="getTechIconPath(tech.icon)" :alt="tech.name" />
              <span>{{ tech.name }}</span>
            </div>
          </div>
          
          <div class="cta-buttons">
            <a href="#contact" class="cyber-btn primary" @click.prevent="scrollToContact">
              <span class="btn-text">Book a Meeting</span>
              <span class="btn-glitch"></span>
            </a>
            <a href="#services" class="cyber-btn secondary">
              <span class="btn-text">Our Services</span>
              <span class="btn-glitch"></span>
            </a>
          </div>
        </div>
      </div>
      
      <div class="hero-background">
        <div class="scanner-line"></div>
      </div>
    </section>
    
    <!-- Services Section -->
    <section id="services" class="services-section">
      <div class="container">
        <h2 class="section-title">OUR <span class="gradient-text">SERVICES</span></h2>
        
        <div class="services-grid">
          <div class="service-card" v-for="(service, index) in services" :key="index">
            <div class="service-icon" :class="service.iconClass">
              <i :class="service.icon"></i>
            </div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Pricing Section -->
    <section id="pricing" class="pricing-section">
      <div class="container">
        <h2 class="section-title">OUR <span class="gradient-text">PRICING</span></h2>
        <p class="section-subtitle">Competitive rates for premium web development services in Birmingham, UK</p>
        
        <div class="pricing-grid">
          <div class="pricing-card">
            <div class="pricing-header">
              <h3>WordPress Websites</h3>
              <div class="price">£499<span class="period">starting at</span></div>
            </div>
            <div class="pricing-features">
              <ul>
                <li><i class="fa-solid fa-check"></i> Custom WordPress Theme</li>
                <li><i class="fa-solid fa-check"></i> Mobile Responsive Design</li>
                <li><i class="fa-solid fa-check"></i> 5 Core Pages</li>
                <li><i class="fa-solid fa-check"></i> Contact Form</li>
                <li><i class="fa-solid fa-check"></i> SEO Optimization</li>
                <li><i class="fa-solid fa-check"></i> 1 Month Support</li>
              </ul>
            </div>
            <div class="pricing-action">
              <a href="#contact" class="btn-pricing" @click.prevent="scrollToContact">Get Started</a>
            </div>
          </div>
          
          <div class="pricing-card featured">
            <div class="pricing-badge">Most Popular</div>
            <div class="pricing-header">
              <h3>Custom Web App</h3>
              <div class="price">£1,499<span class="period">starting at</span></div>
            </div>
            <div class="pricing-features">
              <ul>
                <li><i class="fa-solid fa-check"></i> Bespoke Front-end Design</li>
                <li><i class="fa-solid fa-check"></i> Interactive UI Components</li>
                <li><i class="fa-solid fa-check"></i> Backend API Integration</li>
                <li><i class="fa-solid fa-check"></i> User Authentication</li>
                <li><i class="fa-solid fa-check"></i> Content Management System</li>
                <li><i class="fa-solid fa-check"></i> 3 Months Support</li>
              </ul>
            </div>
            <div class="pricing-action">
              <a href="#contact" class="btn-pricing featured" @click.prevent="scrollToContact">Get Started</a>
            </div>
          </div>
          
          <div class="pricing-card">
            <div class="pricing-header">
              <h3>E-Commerce Solution</h3>
              <div class="price">£2,499<span class="period">starting at</span></div>
            </div>
            <div class="pricing-features">
              <ul>
                <li><i class="fa-solid fa-check"></i> Full E-Commerce Platform</li>
                <li><i class="fa-solid fa-check"></i> Product Management</li>
                <li><i class="fa-solid fa-check"></i> Payment Gateway Integration</li>
                <li><i class="fa-solid fa-check"></i> Order Tracking System</li>
                <li><i class="fa-solid fa-check"></i> Customer Accounts</li>
                <li><i class="fa-solid fa-check"></i> 6 Months Support</li>
              </ul>
            </div>
            <div class="pricing-action">
              <a href="#contact" class="btn-pricing" @click.prevent="scrollToContact">Get Started</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- About Section -->
    <section id="about" class="about-section">
      <div class="container">
        <h2 class="section-title">ABOUT <span class="gradient-text">US</span></h2>
        
        <div class="about-content">
          <div class="about-image">
            <img src="../assets/TsvWeb1.png" alt="TSVWeb" class="about-logo" />
          </div>
          <div class="about-text">
            <p>TSVWeb is a leading web development agency based in Birmingham, UK, specializing in creating cutting-edge digital experiences. We combine futuristic design aesthetics with powerful functionality to deliver websites that stand out.</p>
            <p>Our team of expert developers and designers are passionate about pushing the boundaries of web technology, delivering exceptional results for businesses of all sizes.</p>
            <p>Whether you need a simple WordPress website or a complex custom web application, we have the skills and experience to bring your vision to life.</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Contact Section -->
    <section id="contact" class="contact-section">
      <div class="container">
        <h2 class="section-title">Get In <span class="gradient-text">Touch</span></h2>
        
        <div class="contact-container">
          <div class="contact-info">
            <h3>Ready to build your next web project?</h3>
            <p>Book a consultation or send us your requirements, and we'll help turn your vision into reality.</p>
            
            <div class="contact-methods">
              <div class="contact-method">
                <i class="contact-icon email"></i>
                <span>contact@tsvweb.com</span>
              </div>
              <div class="contact-method">
                <i class="contact-icon location"></i>
                <span>Birmingham, UK</span>
              </div>
            </div>
          </div>
          
          <div class="contact-form-wrapper">
            <form class="contact-form" @submit.prevent="submitForm">
              <div class="form-group">
                <label for="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name" 
                  required 
                  placeholder="Your name"
                />
              </div>
              
              <div class="form-group">
                <label for="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email" 
                  required 
                  placeholder="your@email.com"
                />
              </div>
              
              <div class="form-group">
                <label for="message">Message</label>
                <textarea 
                  id="message" 
                  v-model="form.message" 
                  required 
                  placeholder="Tell us about your project..."
                  rows="4"
                ></textarea>
              </div>
              
              <div class="form-group">
                <label for="meeting">Preferred Meeting Time</label>
                <input 
                  type="datetime-local" 
                  id="meeting" 
                  v-model="form.meetingTime"
                />
              </div>
              
              <button type="submit" class="submit-btn" :disabled="isSubmitting">
                <span v-if="isSubmitting">Sending...</span>
                <span v-else>Send Message</span>
              </button>
              
              <div v-if="formSuccess" class="form-success">
                Message sent successfully! We'll be in touch soon.
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Footer -->
    <footer class="site-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">
            <img src="../assets/TsvWeb1.png" alt="TSVWeb Logo" />
          </div>
          <div class="footer-copyright">
            &copy; {{ currentYear }} TSVWeb. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useContactStore } from '../store/contactStore'

const contactStore = useContactStore()

// Form state
const form = ref({
  name: '',
  email: '',
  message: '',
  meetingTime: ''
})

const isSubmitting = ref(false)
const formSuccess = ref(false)

// Get current year for footer
const currentYear = computed(() => new Date().getFullYear())

// Technologies we work with
const technologies = [
  { name: 'Vue.js', icon: 'vue.svg' },
  { name: 'React', icon: 'react.svg' },
  { name: 'Node.js', icon: 'node.svg' },
  { name: 'TypeScript', icon: 'typescript.svg' },
  { name: 'AWS', icon: 'aws.svg' }
]

// Services we offer
const services = [
  { 
    title: 'Custom Web Applications', 
    description: 'Bespoke web applications with advanced functionality built with modern frameworks.',
    icon: 'fa-code',
    iconClass: 'web-dev'
  },
  { 
    title: 'WordPress Websites', 
    description: 'Custom WordPress themes and plugins for businesses requiring easy content management.',
    icon: 'fa-wordpress',
    iconClass: 'wordpress-dev'
  },
  { 
    title: 'E-Commerce Solutions', 
    description: 'Fully-featured online stores with secure payment gateways and inventory management.',
    icon: 'fa-shopping-cart',
    iconClass: 'ecommerce-dev'
  },
  { 
    title: 'API Development', 
    description: 'Secure and scalable RESTful or GraphQL APIs for your applications.',
    icon: 'fa-server',
    iconClass: 'api-dev'
  },
  { 
    title: 'UI/UX Design', 
    description: 'Futuristic, intuitive interfaces that engage users and improve conversion.',
    icon: 'fa-paint-brush',
    iconClass: 'ui-design'
  },
  { 
    title: 'Performance Optimization', 
    description: 'Speed up your existing websites and applications for better user experience.',
    icon: 'fa-tachometer-alt',
    iconClass: 'performance'
  }
]

// Method to get icon path
function getTechIconPath(icon) {
  // Using the icons we created in the public/icons directory
  return `/icons/${icon}`;
}

// Scroll to contact section
function scrollToContact(e) {
  e.preventDefault();
  document.getElementById('contact').scrollIntoView({ 
    behavior: 'smooth' 
  });
}

// Submit form
async function submitForm() {
  isSubmitting.value = true;
  
  try {
    // Add submission to store
    await contactStore.addSubmission({
      name: form.name,
      email: form.email,
      message: form.message,
      time: form.meetingTime ? new Date(form.meetingTime).toLocaleString() : 'No preference'
    });
    
    // Reset form
    form.value = {
      name: '',
      email: '',
      message: '',
      meetingTime: ''
    };
    
    formSuccess.value = true;
    setTimeout(() => {
      formSuccess.value = false;
    }, 5000);
  } catch (error) {
    console.error('Error submitting form:', error);
    // Could add form error handling here
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
/* Hero Section Styles */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 120px 0 80px;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.scanner-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--primary),
    transparent
  );
  box-shadow: 0 0 15px var(--primary);
  animation: scan 4s linear infinite;
  z-index: 1;
}

@keyframes scan {
  0% {
    top: 0%;
  }
  100% {
    top: 100%;
  }
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

.hero-logo-container {
  position: relative;
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.hero-logo {
  width: 160px;
  height: auto;
  border-radius: 16px;
  z-index: 3;
}

.hero-logo-secondary {
  position: absolute;
  width: 100px;
  height: auto;
  opacity: 0.7;
  transform: translateX(100px) translateY(-15px) rotate(10deg);
  z-index: 2;
}

.neon-pulse {
  box-shadow: 
    0 0 20px rgba(0, 255, 231, 0.7),
    0 0 40px rgba(124, 58, 237, 0.4);
  animation: pulse 3s infinite alternate;
}

@keyframes pulse {
  0% {
    box-shadow: 
      0 0 20px rgba(0, 255, 231, 0.7),
      0 0 40px rgba(124, 58, 237, 0.4);
  }
  100% {
    box-shadow: 
      0 0 40px rgba(0, 255, 231, 0.9),
      0 0 60px rgba(124, 58, 237, 0.6);
  }
}

.floating {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateX(100px) translateY(-15px) rotate(10deg);
  }
  50% {
    transform: translateX(115px) translateY(-30px) rotate(15deg);
  }
  100% {
    transform: translateX(100px) translateY(-15px) rotate(10deg);
  }
}

.hero-title {
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
}

.gradient-text {
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-weight: 900;
}

.hero-subtitle {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2.5rem;
  max-width: 700px;
}

.tech-icons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.tech-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.tech-icon img {
  width: 40px;
  height: 40px;
  filter: grayscale(20%) brightness(1.2);
  transition: all 0.3s ease;
}

.tech-icon:hover img {
  filter: grayscale(0%) brightness(1.5);
  transform: translateY(-5px);
}

.tech-icon span {
  font-size: 0.8rem;
  font-weight: 500;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.cyber-btn {
  position: relative;
  display: inline-block;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  overflow: hidden;
  transition: all 0.3s ease;
}

.cyber-btn.primary {
  background: linear-gradient(90deg, var(--primary), var(--primary-dark));
  color: var(--text-dark);
  box-shadow: 0 0 15px rgba(0, 255, 231, 0.4);
}

.cyber-btn.secondary {
  background: linear-gradient(90deg, var(--secondary), var(--secondary-dark));
  color: white;
  box-shadow: 0 0 15px rgba(124, 58, 237, 0.4);
}

.cyber-btn:hover {
  transform: translateY(-3px);
}

.cyber-btn.primary:hover {
  box-shadow: 0 0 25px rgba(0, 255, 231, 0.6);
}

.cyber-btn.secondary:hover {
  box-shadow: 0 0 25px rgba(124, 58, 237, 0.6);
}

.btn-glitch {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(-100%);
  transition: transform 0.3s;
}

.cyber-btn:hover .btn-glitch {
  animation: glitch 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
}

@keyframes glitch {
  0% {
    transform: translateX(-100%);
  }
  10%, 90% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Services Section */
.services-section {
  padding: 100px 0;
  background: rgba(10, 15, 30, 0.6);
  position: relative;
}

.services-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, transparent, rgba(0, 255, 231, 0.05), transparent);
  z-index: 0;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 1;
}

.service-card {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s ease;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
}

.service-card:hover::before {
  transform: scaleX(1);
}

.service-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  position: relative;
  color: var(--text-light);
  font-size: 1.5rem;
}

.service-icon::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  padding: 3px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.service-card h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  font-weight: 700;
  color: var(--primary);
}

.service-card p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

/* Contact Section */
.contact-section {
  padding: 100px 0;
  position: relative;
}

.contact-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  background: var(--card-bg);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.contact-info {
  padding: 3rem;
  background: linear-gradient(145deg, rgba(10, 15, 30, 0.9), rgba(15, 25, 50, 0.9));
}

.contact-info h3 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: var(--primary);
}

.contact-info p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.contact-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 255, 231, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
}

.contact-form-wrapper {
  padding: 3rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--primary);
}

.form-group input,
.form-group textarea {
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(10, 15, 30, 0.6);
  color: var(--text-light);
  font-family: 'Fira Mono', monospace;
  resize: vertical;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(0, 255, 231, 0.2);
}

.submit-btn {
  padding: 1rem;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  color: var(--text-dark);
  font-weight: 700;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.submit-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 255, 231, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.form-success {
  background: rgba(0, 255, 231, 0.1);
  border: 1px solid var(--primary);
  padding: 0.8rem;
  border-radius: 8px;
  color: var(--primary);
  text-align: center;
}

/* Footer Styles */
.site-footer {
  background: rgba(10, 15, 30, 0.9);
  padding: 2rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.footer-logo img {
  height: 30px;
  width: auto;
  opacity: 0.7;
}

.footer-copyright {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
}

/* Responsive Styles */
@media (max-width: 992px) {
  .hero-title {
    font-size: 3rem;
  }
  
  .contact-container {
    grid-template-columns: 1fr;
  }
  
  .contact-info,
  .contact-form-wrapper {
    padding: 2rem;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    width: 100%;
  }
  
  .cyber-btn {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .tech-icons {
    gap: 1rem;
  }
  
  .tech-icon img {
    width: 30px;
    height: 30px;
  }
  
  .service-card {
    padding: 1.5rem;
  }
}
</style>

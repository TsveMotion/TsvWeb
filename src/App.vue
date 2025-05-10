<template>
  <div class="app-container">
    <header class="site-header">
      <div class="container">
        <div class="logo-wrapper">
          <img src="./assets/TsvWeb1.png" class="logo primary-logo" alt="tsvweb" />
        </div>
        <nav class="main-nav">
          <ul>
            <li><a href="#" @click.prevent="scrollToTop">HOME</a></li>
            <li><a href="#services" @click.prevent="scrollToSection('services')">SERVICES</a></li>
            <li><a href="#pricing" @click.prevent="scrollToSection('pricing')">PRICING</a></li>
            <li><a href="#about" @click.prevent="scrollToSection('about')">ABOUT</a></li>
            <li><a href="#contact" @click.prevent="scrollToSection('contact')">CONTACT</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <router-view />
    
    <footer class="site-footer">
      <div class="container">
        <p>© {{ new Date().getFullYear() }} TSVWeb Development Agency. Birmingham, UK.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Fira+Mono:wght@400;500;700&display=swap');

:root {
  --primary: #00ffe7;
  --primary-dark: #00d6c0;
  --secondary: #7c3aed;
  --secondary-dark: #6225d0;
  --accent: #ff0076;
  --bg-dark: #0a0f1e;
  --bg-darker: #07091a;
  --text-light: #e0e7ff;
  --text-dark: #0a0f1e;
  --card-bg: rgba(25, 32, 54, 0.8);
  --container-width: 1200px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Orbitron', sans-serif;
  background: radial-gradient(ellipse at bottom, #1B2735 0%, var(--bg-darker) 100%);
  color: var(--text-light);
  min-height: 100vh;
  overflow-x: hidden;
}

.app-container {
  min-height: 100vh;
  width: 100%;
  position: relative;
}

/* Starry background effect */
.app-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(125deg, rgba(0,255,231,0.1) 0%, transparent 40%),
    linear-gradient(235deg, rgba(124,58,237,0.1) 0%, transparent 40%),
    linear-gradient(305deg, rgba(255,0,118,0.1) 0%, transparent 40%);
  z-index: -2;
}

.app-container::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(1px 1px at 25% 15%, #ffffff, transparent),
    radial-gradient(1px 1px at 50% 25%, #ffffff, transparent),
    radial-gradient(1px 1px at 75% 40%, #ffffff, transparent),
    radial-gradient(1.5px 1.5px at 30% 65%, #ffffff, transparent),
    radial-gradient(1.5px 1.5px at 60% 80%, #ffffff, transparent);
  background-size: 550px 550px;
  background-position: 0 0;
  animation: stars 8s linear infinite;
  z-index: -1;
}

@keyframes stars {
  0% { opacity: 0.3; background-position: 0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px; }
  50% { opacity: 0.4; background-position: -100px -25px, -25px -50px, -50px -75px, -75px -100px, -100px -125px; }
  100% { opacity: 0.3; background-position: -200px -50px, -50px -100px, -100px -150px, -150px -200px, -200px -250px; }
}

.container {
  width: 100%;
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Header styles */
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: rgba(10, 15, 30, 0.8);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(0, 255, 231, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
}

.site-header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.logo-wrapper {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
  width: auto;
  filter: drop-shadow(0 0 8px rgba(0, 255, 231, 0.6));
}

.main-nav ul {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.main-nav a {
  color: var(--text-light);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  letter-spacing: 0.05em;
  position: relative;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.main-nav a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.main-nav a:hover {
  color: var(--primary);
}

.main-nav a:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

/* Responsive header */
@media (max-width: 768px) {
  .site-header .container {
    height: 60px;
  }
  
  .logo {
    height: 32px;
  }
  
  .main-nav ul {
    gap: 1rem;
  }
  
  .main-nav a {
    font-size: 0.9rem;
  }
}
</style>

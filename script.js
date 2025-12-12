// ============================================
// THEME TOGGLE
// ============================================
const themeToggle = document.getElementById('themeToggle');
const appContainer = document.getElementById('app');
const moonIcon = document.getElementById('moonIcon');
const sunIcon = document.getElementById('sunIcon');

// Cargar tema guardado
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  appContainer.classList.add('dark-mode');
  moonIcon.style.display = 'none';
  sunIcon.style.display = 'block';
}

// Toggle theme
themeToggle.addEventListener('click', () => {
  appContainer.classList.toggle('dark-mode');
  const isDark = appContainer.classList.contains('dark-mode');
  
  moonIcon.style.display = isDark ? 'none' : 'block';
  sunIcon.style.display = isDark ? 'block' : 'none';
  
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  
  // Actualizar aria-label
  themeToggle.setAttribute('aria-label', isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
});

// ============================================
// SKILLS DATA Y RENDER
// ============================================
const skills = [
  { name: 'HTML5', level: 97 },
  { name: 'CSS3/Sass', level: 90 },
  { name: 'JavaScript', level: 88 },
  { name: 'Angular', level: 80 },
  { name: 'Responsive Design', level: 92 },
  { name: 'Accessibility', level: 87 }
];

const skillsGrid = document.getElementById('skillsGrid');

skills.forEach((skill, index) => {
  const skillCard = document.createElement('div');
  skillCard.className = 'skill-card';
  skillCard.style.animationDelay = `${index * 0.1}s`;
  
  skillCard.innerHTML = `
    <div class="skill-header">
      <div class="skill-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      </div>
      <h3 class="skill-name">${skill.name}</h3>
    </div>
    
    <div class="skill-bar-container">
      <div class="skill-bar-bg">
        <div class="skill-progress" 
             style="--skill-level: ${skill.level}%"
             role="progressbar"
             aria-valuenow="${skill.level}"
             aria-valuemin="0"
             aria-valuemax="100"
             aria-label="${skill.name} nivel ${skill.level}%">
        </div>
      </div>
      <span class="skill-percentage">${skill.level}%</span>
    </div>
  `;
  
  skillsGrid.appendChild(skillCard);
});

// Animar barras de progreso después de un delay
setTimeout(() => {
  document.querySelectorAll('.skill-progress').forEach(bar => {
    bar.classList.add('animate');
  });
}, 100);

// ============================================
// PROJECTS DATA Y RENDER
// ============================================
const projects = [
  {
    title: 'Landing Veterinaria',
    description: 'Landing page enfocada en accessibilidad Web.',
    tech: ['HTML', 'JS', ,'FlexBox','Accesibility'],
    img: './assets/proyects/vet.png',
    url: 'https://ddev-veterinaria.netlify.app/'
  },
  {
    title: 'Country App',
    description: 'Aplicación para buscar Países y capitales',
    tech: ['Angular', 'API REST', ,'Tailwind','Daisy UI'],
    img: './assets/proyects/country-app.png',
    url: 'https://angularcountry.netlify.app/'
  },
];

const projectsGrid = document.getElementById('projectsGrid');

projects.forEach((project, index) => {
  const projectCard = document.createElement('article');
  projectCard.className = 'project-card';
  projectCard.style.animationDelay = `${index * 0.1}s`;
  
  const techTags = project.tech.map(tech => 
    `<span class="tech-tag">${tech}</span>`
  ).join('');
  
  projectCard.innerHTML = `
    <div class="project-image">
      <a href="${project.url}" target="_blank">
        <img src="${project.img}" alt="${project.title}">
      </a>
    </div>
    
    <h3 class="project-title">${project.title}</h3>
    <p class="project-description">${project.description}</p>
    
    <div class="project-tech">
      ${techTags}
    </div>

    <a href="${project.url}" target="_blank" class="project-button">Ver Proyecto ></a>
  `;
  
  projectsGrid.appendChild(projectCard);
});

// ============================================
// YEAR DINÁMICO EN FOOTER
// ============================================
document.getElementById('currentYear').textContent = new Date().getFullYear();

// ============================================
// SMOOTH SCROLL CON OFFSET PARA HEADER FIJO
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================
// INTERSECTION OBSERVER PARA ANIMACIONES
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observar secciones para animaciones
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// ============================================
// ACTIVE LINK EN NAVEGACIÓN
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - 100)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ============================================
// ACCESIBILIDAD: FOCUS VISIBLE
// ============================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-navigation');
});

console.log('🚀 Portafolio cargado correctamente!');
console.log('✨ Tema:', localStorage.getItem('theme') || 'light');
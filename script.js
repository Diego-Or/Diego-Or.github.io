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
  { name: 'HTML5', level: 95 },
  { name: 'CSS3/Sass', level: 90 },
  { name: 'JavaScript', level: 88 },
  { name: 'Angular', level: 85 },
  { name: 'Responsive Design', level: 92 },
  { name: 'Accessibility', level: 87 }
];

const skillsGrid = document.getElementById('skillsGrid');

skills.forEach((skill, index) => {
  const skillCard = document.createElement('div');
  skillCard.className = 'skill-card';
  skillCard.style.animationDelay = `${index * 0.1}s`;
  
  skillCard.innerHTML = `

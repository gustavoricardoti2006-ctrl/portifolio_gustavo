  // Typing effect
  const roles = ["Full Stack Developer", "PHP & JS Specialist", "Criador de Sistemas", "Entusiasta de UI/UX"];
  let roleIndex = 0, charIndex = 0, isDeleting = false;
  const typedElement = document.getElementById("typed-text");

  function typeEffect() {
    const currentRole = roles[roleIndex];
    typedElement.textContent = isDeleting ? currentRole.substring(0, charIndex - 1) : currentRole.substring(0, charIndex + 1);
    isDeleting ? charIndex-- : charIndex++;
    if (!isDeleting && charIndex === currentRole.length) { isDeleting = true; setTimeout(typeEffect, 1500); return; }
    if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(typeEffect, 300); return; }
    setTimeout(typeEffect, isDeleting ? 70 : 120);
  }
  typeEffect();

  // Scroll Reveal
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target); } });
  }, { threshold: 0.2 });
  sections.forEach(s => observer.observe(s));
  document.querySelector('#home')?.classList.add('revealed');

  // Particles Background
  const canvas = document.getElementById('particles-canvas');
  let ctx = canvas.getContext('2d'), width, height, particles = [];
  function resizeCanvas() { width = window.innerWidth; height = window.innerHeight; canvas.width = width; canvas.height = height; }
  class Particle { constructor(x, y, r, sx, sy, color) { this.x = x; this.y = y; this.r = r; this.sx = sx; this.sy = sy; this.color = color; } draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fillStyle = this.color; ctx.shadowBlur = 6; ctx.shadowColor = "#3b82f6"; ctx.fill(); ctx.shadowBlur = 0; } update() { this.x += this.sx; this.y += this.sy; if (this.x < 0 || this.x > width) this.sx *= -1; if (this.y < 0 || this.y > height) this.sy *= -1; this.draw(); } }
  function initParticles(count) { particles = []; for (let i = 0; i < count; i++) { let r = Math.random() * 2 + 1; let x = Math.random() * width; let y = Math.random() * height; let sx = (Math.random() - 0.5) * 0.5; let sy = (Math.random() - 0.5) * 0.4; let color = `rgba(80, 150, 255, ${Math.random() * 0.5 + 0.2})`; particles.push(new Particle(x, y, r, sx, sy, color)); } }
  function animate() { if (!ctx) return; ctx.clearRect(0, 0, width, height); particles.forEach(p => p.update()); requestAnimationFrame(animate); }
  window.addEventListener('resize', () => { resizeCanvas(); initParticles(160); });
  resizeCanvas(); initParticles(160); animate();

  // Efeito hover parallax leve
  document.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth) - 0.5;
    const mouseY = (e.clientY / window.innerHeight) - 0.5;
    document.querySelectorAll('.repo-card').forEach(card => {
      card.style.transform = `translateY(${mouseY * 4}px) translateX(${mouseX * 3}px)`;
    });
  });
  document.querySelector('#repositorios')?.addEventListener('mouseleave', () => {
    document.querySelectorAll('.repo-card').forEach(card => card.style.transform = '');
  });

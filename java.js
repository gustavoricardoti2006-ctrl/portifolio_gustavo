
  // ========== 1) Typing effect ==========
  const roles = ["Full Stack Developer", "PHP & JS Specialist", "Criador de Sistemas", "Entusiasta de UI/UX"];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedElement = document.getElementById("typed-text");

  function typeEffect() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typedElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, 300);
      return;
    }
    const speed = isDeleting ? 70 : 120;
    setTimeout(typeEffect, speed);
  }
  typeEffect();

  // ========== 2) SCROLL REVEAL (animações ao surgir) ==========
  const sections = document.querySelectorAll('section');
  const observerOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  sections.forEach(section => revealObserver.observe(section));

  // garantir que hero já aparece (se já visível)
  const heroSection = document.querySelector('#home');
  if (heroSection && heroSection.getBoundingClientRect().top < window.innerHeight) {
    heroSection.classList.add('revealed');
  } else {
    revealObserver.observe(heroSection);
  }

  // ========== 3) PARTICLES BACKGROUND (efeito futurista com canvas) ==========
  const canvas = document.getElementById('particles-canvas');
  let ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  let particles = [];

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles(150);
  });

  class Particle {
    constructor(x, y, radius, speedX, speedY, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.speedX = speedX;
      this.speedY = speedY;
      this.color = color;
      this.alpha = Math.random() * 0.5 + 0.2;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#3b82f6";
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;
      this.draw();
    }
  }

  function initParticles(count) {
    particles = [];
    for (let i = 0; i < count; i++) {
      let radius = Math.random() * 2 + 1.2;
      let x = Math.random() * width;
      let y = Math.random() * height;
      let speedX = (Math.random() - 0.5) * 0.6;
      let speedY = (Math.random() - 0.5) * 0.4;
      let color = `rgba(80, 150, 255, ${Math.random() * 0.5 + 0.2})`;
      particles.push(new Particle(x, y, radius, speedX, speedY, color));
    }
  }

  function animateParticles() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      p.update();
    }
    requestAnimationFrame(animateParticles);
  }

  resizeCanvas();
  initParticles(180);
  animateParticles();

  // parallax / movimento sutil com mouse (efeito de profundidade nos cards)
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, idx) => {
      const offsetX = (mouseX - 0.5) * 8;
      const offsetY = (mouseY - 0.5) * 5;
      card.style.transform = `translateY(${offsetY * 0.5}px) translateX(${offsetX * 0.3}px)`;
    });
    // restaura hover posteriormente? apenas efeito magnético
  });

  // suavizar reset ao sair
  document.querySelector('.skills-grid')?.addEventListener('mouseleave', () => {
    document.querySelectorAll('.skill-card').forEach(card => {
      card.style.transform = '';
    });
  });

  // extra: interação nos botões do header com scroll suave
  document.querySelectorAll('nav a, .btn-primary, .btn-outline').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#' && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElem = document.querySelector(targetId);
        if (targetElem) {
          targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

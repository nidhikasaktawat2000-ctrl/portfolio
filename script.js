document.addEventListener('DOMContentLoaded', () => {
  
  // --- Navigation Scroll Effect ---
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // --- Mobile Menu Toggle ---
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = menuToggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  // --- Typing Effect ---
  const typedTextSpan = document.getElementById('typed');
  const textArray = ["Data Analytics Student", "Machine Learning Enthusiast", "Problem Solver"];
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2000;
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 500);
    }
  }

  if (textArray.length) setTimeout(type, 1000);

  // --- Scroll Reveal Animations ---
  const reveals = document.querySelectorAll('.reveal');
  
  function checkReveal() {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;
    
    reveals.forEach(reveal => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('show');
      }
    });
  }
  
  window.addEventListener('scroll', checkReveal);
  checkReveal(); // Check on load

  // --- Number Counters ---
  const counters = document.querySelectorAll('.stat-n');
  const speed = 200;
  
  function checkCounters() {
    const windowHeight = window.innerHeight;
    
    counters.forEach(counter => {
      const elementTop = counter.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - 50 && !counter.classList.contains('counted')) {
        counter.classList.add('counted');
        const target = +counter.getAttribute('data-t');
        const inc = target / speed;
        
        let val = 0;
        const animate = () => {
          val += inc;
          if (val < target) {
            counter.innerText = Math.ceil(val);
            setTimeout(animate, 20);
          } else {
            counter.innerText = target;
          }
        };
        animate();
      }
    });
  }
  
  window.addEventListener('scroll', checkCounters);

  // --- Contact Form ---
  const form = document.getElementById('contact-form');
  const okMsg = document.getElementById('form-ok');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      btn.textContent = "Sending...";
      btn.style.opacity = "0.7";
      
      setTimeout(() => {
        form.reset();
        okMsg.style.display = "block";
        btn.textContent = "Send Message ✦";
        btn.style.opacity = "1";
        
        setTimeout(() => {
          okMsg.style.display = "none";
        }, 5000);
      }, 1500);
    });
  }

  // --- Particle Background ---
  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    const colors = ['rgba(224, 213, 248, 0.4)', 'rgba(249, 219, 228, 0.4)', 'rgba(189, 170, 230, 0.3)'];
    
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    
    window.addEventListener('resize', resize);
    resize();
    
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > width || this.x < 0) this.speedX *= -1;
        if (this.y > height || this.y < 0) this.speedY *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
    
    const count = Math.min(window.innerWidth / 25, 40);
    for (let i = 0; i < count; i++) particles.push(new Particle());
    
    function animate() {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(189, 170, 230, ${0.1 - dist/1200})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    }
    animate();
  }
});

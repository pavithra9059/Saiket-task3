<script>
// CUSTOM CURSOR
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mx = 0, my = 0, cx = 0, cy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursorDot.style.left = mx - 3 + 'px';
  cursorDot.style.top = my - 3 + 'px';
});

function animateCursor() {
  cx += (mx - cx) * 0.12;
  cy += (my - cy) * 0.12;
  cursor.style.left = cx - 10 + 'px';
  cursor.style.top = cy - 10 + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .service-card, .team-card, .showcase-item').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.transform = 'scale(2.5)'; cursor.style.background = 'rgba(0,245,255,0.2)'; });
  el.addEventListener('mouseleave', () => { cursor.style.transform = 'scale(1)'; cursor.style.background = 'transparent'; });
});

// STARFIELD CANVAS
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = Array.from({length: 200}, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.5 + 0.2,
  vx: (Math.random() - 0.5) * 0.2,
  vy: (Math.random() - 0.5) * 0.2,
  color: ['#00f5ff','#ff006e','#ffbe0b','#8338ec','#06d6a0'][Math.floor(Math.random()*5)],
  alpha: Math.random() * 0.7 + 0.2
}));

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = s.color;
    ctx.globalAlpha = s.alpha;
    ctx.fill();
    s.x += s.vx; s.y += s.vy;
    if (s.x < 0) s.x = canvas.width;
    if (s.x > canvas.width) s.x = 0;
    if (s.y < 0) s.y = canvas.height;
    if (s.y > canvas.height) s.y = 0;
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(drawStars);
}
drawStars();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// SCROLL REVEAL
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => observer.observe(el));

// COUNTER ANIMATION
function animateCount(el, target, suffix = '') {
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current) + suffix;
  }, 25);
}

const statsObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    animateCount(document.getElementById('stat1'), 250, '+');
    animateCount(document.getElementById('stat2'), 80, '+');
    animateCount(document.getElementById('stat3'), 500, '+');
    animateCount(document.getElementById('stat4'), 42, '');
    statsObserver.disconnect();
  }
}, { threshold: 0.3 });
statsObserver.observe(document.querySelector('.stats-bar'));

// FORM SUBMIT
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = '✓ Message Sent!';
  btn.style.background = 'linear-gradient(135deg, #06d6a0, #00f5ff)';
  setTimeout(() => { btn.textContent = 'Send Message ✦'; btn.style.background = ''; }, 3000);
}

// NAVBAR SCROLL EFFECT
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  nav.style.borderBottomColor = window.scrollY > 50 ? 'rgba(255,0,110,0.2)' : 'rgba(0,245,255,0.15)';
});
</script>

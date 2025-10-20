document.addEventListener("DOMContentLoaded", function () {
  // Your existing code here
  document.getElementById("openLetter").addEventListener("click", function() {
  document.getElementById("letterSection").classList.remove("hidden");
  document.querySelector('.scroll-letter').scrollTop = 0;
});
document.getElementById("openLetter").addEventListener("click", function() {
  document.getElementById("letterSection").classList.remove("hidden");
  document.querySelector('.scroll-letter').scrollTop = 0;
  launchFireworks();
});

function launchFireworks() {
  const canvas = document.getElementById('fireworksCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    const colors = ['#ff6f61', '#ffd700', '#ff4081', '#7c4dff', '#00e676'];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: x,
        y: y,
        angle: Math.random() * 2 * Math.PI,
        speed: Math.random() * 5 + 2,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.alpha -= 0.01;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(${hexToRgb(p.color)},${p.alpha})`;
      ctx.fill();
      if (p.alpha <= 0) particles.splice(i, 1);
    });
  }

  function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
  }

  let fireworkInterval = setInterval(createFirework, 500);
  let animationInterval = setInterval(drawParticles, 30);

  setTimeout(() => {
    clearInterval(fireworkInterval);
    clearInterval(animationInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 5000); // Fireworks last for 5 seconds
}
}); 

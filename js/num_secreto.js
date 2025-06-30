// =================================
// INICIALIZACIÓN DE PARTÍCULAS
// =================================

(function () {
    const container = document.getElementById('particles');
    if (!container) return;
    
    for (let i = 0; i < 18; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.left = Math.random() * 100 + 'vw';
        bubble.style.animationDuration = (6 + Math.random() * 8) + 's';
        bubble.style.opacity = 0.15 + Math.random() * 0.25;
        bubble.style.width = bubble.style.height = (18 + Math.random() * 32) + 'px';
        container.appendChild(bubble);
    }
})();

// =================================
// CONFIGURACIÓN DEL JUEGO
// =================================

const RECORD_KEY = "numero-secreto-record";
let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let intentos = 0;
let record = localStorage.getItem(RECORD_KEY) ? Number(localStorage.getItem(RECORD_KEY)) : null;

// =================================
// ELEMENTOS DEL DOM
// =================================

const form = document.getElementById('guess-form');
const input = document.getElementById('guess-input');
const hint = document.getElementById('hint');
const intentosSpan = document.getElementById('intentos');
const recordSpan = document.getElementById('record');
const restartBtn = document.getElementById('restart-btn');
const darkBtn = document.getElementById('darkModeBtn');

// =================================
// FUNCIONES DEL JUEGO
// =================================

function actualizarStats() {
    intentosSpan.textContent = intentos;
    recordSpan.textContent = record !== null ? record : '--';
}

function resetGame() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    intentos = 0;
    hint.textContent = '';
    input.value = '';
    input.disabled = false;
    form.querySelector('button[type="submit"]').disabled = false;
    restartBtn.style.display = 'none';
    actualizarStats();
    input.focus();
}

// =================================
// EVENTOS DEL JUEGO
// =================================

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const valor = Number(input.value);
    
    if (valor < 1 || valor > 100) {
        hint.textContent = "Elige un número entre 1 y 100.";
        return;
    }
    
    intentos++;
    
    if (valor === numeroSecreto) {
        hint.textContent = `¡Correcto! El número era ${numeroSecreto}.`;
        
        if (record === null || intentos < record) {
            record = intentos;
            localStorage.setItem(RECORD_KEY, record);
            hint.textContent += " ¡Nuevo récord!";
        }
        
        input.disabled = true;
        form.querySelector('button[type="submit"]').disabled = true;
        restartBtn.style.display = 'inline-block';
        actualizarStats();
        setTimeout(() => showGanasteModal(intentos, record), 400);
        
    } else if (valor < numeroSecreto) {
        hint.textContent = "Más alto 🔼";
    } else {
        hint.textContent = "Más bajo 🔽";
    }
    
    actualizarStats();
    input.value = '';
    input.focus();
});

restartBtn.addEventListener('click', resetGame);

// =================================
// MODO OSCURO
// =================================

if (darkBtn) {
    const savedTheme = localStorage.getItem('numsecreto-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        darkBtn.textContent = '☀️';
    }
    
    darkBtn.onclick = function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        darkBtn.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('numsecreto-theme', isDark ? 'dark' : 'light');
    };
}

// =================================
// MODAL DE VICTORIA
// =================================

const modal = document.getElementById('ganaste-modal');
const modalMsg = document.getElementById('ganaste-mensaje');
const closeModal = modal.querySelector('.close-modal');
const jugarOtraVez = document.getElementById('jugar-otra-vez');
const confettiCanvas = document.getElementById('confetti-canvas');

function showGanasteModal(intentos, record) {
    modalMsg.innerHTML = `¡Adivinaste el número en <b>${intentos}</b> intento${intentos === 1 ? '' : 's'}!<br>Récord actual: <b>${record}</b>`;
    modal.style.display = 'flex';
    lanzarConfeti();
    jugarOtraVez.focus();
}

function hideGanasteModal() {
    modal.style.display = 'none';
    stopConfetti();
}

// =================================
// EVENTOS DEL MODAL
// =================================

closeModal.onclick = hideGanasteModal;

closeModal.onkeydown = function(e) {
    if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        hideGanasteModal();
    }
};

window.addEventListener('keydown', function(e) {
    if (modal.style.display === 'flex' && e.key === "Escape") {
        hideGanasteModal();
    }
});

modal.onclick = function(e) {
    if (e.target === modal) {
        hideGanasteModal();
    }
};

jugarOtraVez.onclick = function() {
    hideGanasteModal();
    resetGame();
};

// =================================
// SISTEMA DE CONFETI
// =================================

let confettiActive = false;
let confettiParticles = [];
let confettiAnim;

function lanzarConfeti() {
    const ctx = confettiCanvas.getContext('2d');
    confettiCanvas.width = confettiCanvas.offsetWidth;
    confettiCanvas.height = confettiCanvas.offsetHeight;
    confettiParticles = [];
    confettiActive = true;
    
    for (let i = 0; i < 120; i++) {
        confettiParticles.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * -confettiCanvas.height,
            r: Math.random() * 7 + 4,
            d: Math.random() * 120,
            color: `hsl(${Math.random() * 360}, 90%, 60%)`,
            tilt: Math.random() * 10 - 5,
            tiltAngle: 0,
            tiltAngleInc: (Math.random() * 0.07) + 0.05
        });
    }
    
    function drawConfetti() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confettiParticles.forEach(particle => {
            ctx.beginPath();
            ctx.ellipse(particle.x, particle.y, particle.r, particle.r / 2, particle.tilt, 0, 2 * Math.PI);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });
    }
    
    function updateConfetti() {
        confettiParticles.forEach(particle => {
            particle.y += 2 + Math.cos(particle.d);
            particle.x += Math.sin(particle.d) * 1.5;
            particle.tiltAngle += particle.tiltAngleInc;
            particle.tilt = Math.sin(particle.tiltAngle) * 10;
            
            if (particle.y > confettiCanvas.height + 20) {
                particle.y = -10;
                particle.x = Math.random() * confettiCanvas.width;
            }
        });
    }
    
    function animate() {
        if (!confettiActive) return;
        updateConfetti();
        drawConfetti();
        confettiAnim = requestAnimationFrame(animate);
    }
    
    animate();
}

function stopConfetti() {
    confettiActive = false;
    if (confettiAnim) {
        cancelAnimationFrame(confettiAnim);
    }
    if (confettiCanvas) {
        const ctx = confettiCanvas.getContext('2d');
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
}

// =================================
// INICIALIZACIÓN
// =================================

actualizarStats();
input.focus();
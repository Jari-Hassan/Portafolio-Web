// Partículas de fondo
(function () {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 18; i++) {
        const b = document.createElement('div');
        b.className = 'bubble';
        b.style.left = Math.random() * 100 + 'vw';
        b.style.animationDuration = (6 + Math.random() * 8) + 's';
        b.style.opacity = 0.15 + Math.random() * 0.25;
        b.style.width = b.style.height = (18 + Math.random() * 32) + 'px';
        container.appendChild(b);
    }
})();

// Referencias DOM
const canvas = document.getElementById('gravity-canvas');
const ctx = canvas.getContext('2d');
const menu = document.getElementById('gravity-menu');
const hud = document.getElementById('gravity-hud');
const pauseScreen = document.getElementById('gravity-pause');
const endScreen = document.getElementById('gravity-end');
const endStats = document.getElementById('gravity-end-stats');
const gameoverScreen = document.getElementById('gravity-gameover');
const gameoverStats = document.getElementById('gravity-gameover-stats');
const playBtn = document.getElementById('gravity-play-btn');
const continueBtn = document.getElementById('gravity-continue-btn');
const restartBtn = document.getElementById('gravity-restart-btn');
const nextBtn = document.getElementById('gravity-next-btn');
const retryBtn = document.getElementById('gravity-retry-btn');
const retry2Btn = document.getElementById('gravity-retry2-btn');
const heartsSpan = document.getElementById('gravity-hearts');
const starsSpan = document.getElementById('gravity-stars');
const timerSpan = document.getElementById('gravity-timer');
const mobileControls = document.getElementById('gravity-mobile-controls');
const btnLeft = document.getElementById('btn-left');
const btnRight = document.getElementById('btn-right');
const btnGravity = document.getElementById('btn-gravity');

// Configuración de niveles
const LEVELS = [
    {
        platforms: [
            {x:0, y:480, w:384, h:32},
            {x:0, y:0, w:384, h:32},
            {x:60, y:400, w:80, h:16},
            {x:240, y:340, w:80, h:16},
            {x:60, y:260, w:80, h:16},
            {x:240, y:180, w:80, h:16},
            {x:60, y:100, w:80, h:16},
        ],
        spikes: [
            {x:0, y:496, w:384, h:16, up:true},
            {x:0, y:0, w:384, h:16, up:false},
            {x:140, y:416, w:32, h:16, up:true},
            {x:180, y:416, w:32, h:16, up:true},
        ],
        enemies: [
            {x:240, y:324, w:32, h:16, dir:1, range:40, speed:1.2},
        ],
        stars: [
            {x:100, y:370, collected:false},
            {x:280, y:310, collected:false},
            {x:100, y:230, collected:false},
            {x:280, y:150, collected:false},
            {x:100, y:70, collected:false},
        ],
        door: {x:320, y:40, w:36, h:48},
        player: {x:32, y:440},
        requiredStars: 5,
        time: 60,
        lives: 3
    },
    {
        platforms: [
            {x:0, y:480, w:384, h:32},
            {x:0, y:0, w:384, h:32},
            {x:60, y:400, w:80, h:16},
            {x:240, y:400, w:80, h:16},
            {x:60, y:300, w:80, h:16},
            {x:240, y:220, w:80, h:16},
            {x:60, y:140, w:80, h:16},
            {x:180, y:60, w:120, h:16},
        ],
        spikes: [
            {x:0, y:496, w:384, h:16, up:true},
            {x:0, y:0, w:384, h:16, up:false},
            {x:140, y:416, w:32, h:16, up:true},
            {x:180, y:416, w:32, h:16, up:true},
            {x:120, y:156, w:32, h:16, up:false},
            {x:220, y:236, w:32, h:16, up:true},
        ],
        enemies: [
            {x:60, y:284, w:32, h:16, dir:1, range:60, speed:1.4},
            {x:240, y:204, w:32, h:16, dir:-1, range:40, speed:1.2},
        ],
        stars: [
            {x:100, y:370, collected:false},
            {x:280, y:370, collected:false},
            {x:100, y:120, collected:false},
            {x:280, y:120, collected:false},
            {x:200, y:80, collected:false},
        ],
        door: {x:320, y:40, w:36, h:48},
        player: {x:32, y:440},
        requiredStars: 5,
        time: 65,
        lives: 3
    },
    {
        platforms: [
            {x:0, y:480, w:384, h:32},
            {x:0, y:0, w:384, h:32},
            {x:60, y:420, w:80, h:16},
            {x:240, y:360, w:80, h:16},
            {x:60, y:300, w:80, h:16},
            {x:240, y:240, w:80, h:16},
            {x:60, y:180, w:80, h:16},
            {x:240, y:120, w:80, h:16},
            {x:160, y:60, w:64, h:16},
        ],
        spikes: [
            {x:0, y:496, w:384, h:16, up:true},
            {x:0, y:0, w:384, h:16, up:false},
            {x:140, y:436, w:32, h:16, up:true},
            {x:180, y:376, w:32, h:16, up:true},
            {x:120, y:196, w:32, h:16, up:false},
            {x:220, y:136, w:32, h:16, up:true},
            {x:160, y:76, w:32, h:16, up:false},
        ],
        enemies: [
            {x:60, y:284, w:32, h:16, dir:1, range:80, speed:1.5},
            {x:240, y:104, w:32, h:16, dir:-1, range:60, speed:1.3},
        ],
        stars: [
            {x:100, y:390, collected:false},
            {x:280, y:330, collected:false},
            {x:100, y:210, collected:false},
            {x:280, y:150, collected:false},
            {x:220, y:100, collected:false},
            {x:320, y:60, collected:false},
        ],
        door: {x:20, y:40, w:36, h:48},
        player: {x:32, y:440},
        requiredStars: 6,
        time: 75,
        lives: 3
    },
    {
        platforms: [
            {x:0, y:480, w:384, h:32},
            {x:0, y:0, w:384, h:32},
            {x:60, y:420, w:80, h:16},
            {x:240, y:360, w:80, h:16},
            {x:60, y:300, w:80, h:16},
            {x:240, y:240, w:80, h:16},
            {x:60, y:180, w:80, h:16},
            {x:240, y:120, w:80, h:16},
            {x:160, y:60, w:64, h:16},
            {x:120, y:200, w:32, h:16},
            {x:220, y:140, w:32, h:16},
            {x:180, y:340, w:64, h:16},
            {x:180, y:80, w:64, h:16},
        ],
        spikes: [
            {x:0, y:496, w:384, h:16, up:true},
            {x:0, y:0, w:384, h:16, up:false},
            {x:140, y:436, w:32, h:16, up:true},
            {x:180, y:376, w:32, h:16, up:true},
            {x:120, y:196, w:32, h:16, up:false},
            {x:220, y:136, w:32, h:16, up:true},
        ],
        enemies: [
            {x:60, y:284, w:32, h:16, dir:1, range:60, speed:1.3},
            {x:240, y:104, w:32, h:16, dir:-1, range:60, speed:1.2},
        ],
        stars: [
            {x:100, y:390, collected:false},
            {x:280, y:330, collected:false},
            {x:100, y:210, collected:false},
            {x:280, y:150, collected:false},
            {x:180, y:100, collected:false},
            {x:320, y:120, collected:false},
            {x:60, y:120, collected:false}
        ],
        door: {x:340, y:40, w:36, h:48},
        player: {x:32, y:440},
        requiredStars: 6,
        time: 100,
        lives: 4
    }
];

// Variables del juego
let levelStartTime;
let levelIdx = 0;
let level, player, gravity, platforms, spikes, enemies, stars, door, timer, timeLeft, lives, collected, playing, paused, ended, gameover, startTime;
let keys = {};

// Inicialización de nivel
function resetLevel(idx) {
    level = JSON.parse(JSON.stringify(LEVELS[idx]));
    startTime = Date.now();
    levelStartTime = startTime;
    player = {
        x: level.player.x, y: level.player.y,
        w: 32, h: 32,
        vx: 0, vy: 0,
        speed: 2.3,
        jump: 6.2,
        grounded: false,
        onPlatform: false,
        dead: false,
        facing: 1
    };
    gravity = 0.38;
    platforms = level.platforms;
    spikes = level.spikes;
    enemies = level.enemies.map(e => Object.assign({}, e, {origX:e.x}));
    stars = level.stars.map(s => Object.assign({}, s));
    door = Object.assign({}, level.door, {open:false});
    timeLeft = level.time;
    lives = level.lives;
    collected = 0;
    playing = true;
    paused = false;
    ended = false;
    gameover = false;
    startTime = Date.now();
    updateHUD();
}

function updateHUD() {
    heartsSpan.innerHTML = "❤️".repeat(lives) + "♡".repeat(Math.max(0, 3-lives));
    starsSpan.innerHTML = `⭐ ${collected}/${level.requiredStars}`;
    timerSpan.innerHTML = `⏱️ ${timeLeft}s`;
}

// Renderizado
function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Plataformas
    ctx.fillStyle = "#a5b4fc";
    platforms.forEach(p => {
        ctx.fillRect(p.x, p.y, p.w, p.h);
    });

    // Spikes
    spikes.forEach(s => {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.fillStyle = "#ef4444";
        let spikesCount = Math.floor(s.w/16);
        for(let i=0;i<spikesCount;i++) {
            ctx.beginPath();
            if(s.up) {
                ctx.moveTo(i*16, s.h);
                ctx.lineTo(i*16+8, 0);
                ctx.lineTo(i*16+16, s.h);
            } else {
                ctx.moveTo(i*16, 0);
                ctx.lineTo(i*16+8, s.h);
                ctx.lineTo(i*16+16, 0);
            }
            ctx.closePath();
            ctx.fill();
        }
        ctx.restore();
    });

    // Enemigos
    enemies.forEach(e => {
        ctx.fillStyle = "#f59e42";
        ctx.fillRect(e.x, e.y, e.w, e.h);
        ctx.fillStyle = "#23233a";
        ctx.fillRect(e.x+6, e.y+4, 6, 6);
        ctx.fillRect(e.x+e.w-12, e.y+4, 6, 6);
    });

    // Estrellas
    stars.forEach(s => {
        if(!s.collected) {
            ctx.save();
            ctx.translate(s.x+12, s.y+12);
            ctx.rotate(Math.sin(Date.now()/300)/6);
            ctx.fillStyle = "#facc15";
            for(let i=0;i<5;i++) {
                ctx.rotate(Math.PI/2.5);
                ctx.beginPath();
                ctx.moveTo(0,0);
                ctx.lineTo(0,12);
                ctx.arc(0,12,4,Math.PI,0,true);
                ctx.closePath();
                ctx.fill();
            }
            ctx.restore();
        }
    });

    // Puerta
    ctx.save();
    ctx.globalAlpha = door.open ? 1 : 0.5;
    ctx.fillStyle = door.open ? "#22c55e" : "#6366f1";
    ctx.fillRect(door.x, door.y, door.w, door.h);
    ctx.fillStyle = "#fff";
    ctx.fillRect(door.x+door.w/2-6, door.y+door.h-18, 12, 12);
    ctx.restore();

    // Jugador
    ctx.save();
    ctx.translate(player.x+player.w/2, player.y+player.h/2);
    ctx.scale(1, gravity>0?1:-1);

    let ninjaGrad = ctx.createLinearGradient(-16, -16, 16, 16);
    ninjaGrad.addColorStop(0, "#23234a");
    ninjaGrad.addColorStop(1, "#4343b8");
    ctx.fillStyle = ninjaGrad;
    ctx.fillRect(-16, -16, 32, 32);

    ctx.fillStyle = "#ef4444";
    ctx.fillRect(-16, -10, 32, 8);

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-8, -2);
    ctx.lineTo(-2, -2);
    ctx.moveTo(2, -2);
    ctx.lineTo(8, -2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-4, 8);
    ctx.lineTo(4, 8);
    ctx.stroke();

    ctx.restore();
}

// Lógica del juego
function update() {
    if (!playing || paused || ended || gameover) return;

    // Movimiento lateral
    if (keys.ArrowLeft || keys.a) {
        player.vx = -player.speed;
        player.facing = -1;
    } else if (keys.ArrowRight || keys.d) {
        player.vx = player.speed;
        player.facing = 1;
    } else {
        player.vx = 0;
    }

    // Salto
    if (keys.ArrowUp || keys.w) {
        if (player.grounded && gravity > 0) {
            player.vy = -player.jump;
            player.grounded = false;
        }
    }
    if (keys.ArrowDown || keys.s) {
        if (player.grounded && gravity < 0) {
            player.vy = player.jump;
            player.grounded = false;
        }
    }

    // Gravedad
    player.vy += gravity;
    if (player.vy > 9) player.vy = 9;
    if (player.vy < -9) player.vy = -9;

    // Movimiento con substeps para evitar atravesar plataformas
    player.grounded = false;
    let steps = Math.ceil(Math.max(Math.abs(player.vx), Math.abs(player.vy), 8));
    for (let i = 0; i < steps; i++) {
        player.x += player.vx / steps;
        player.y += player.vy / steps;

        for (let p of platforms) {
            if (player.x + player.w > p.x && player.x < p.x + p.w) {
                if (player.y + player.h > p.y && player.y < p.y + p.h) {
                    if (gravity > 0 && player.vy >= 0 && player.y + player.h - player.vy / steps <= p.y) {
                        player.y = p.y - player.h;
                        player.vy = 0;
                        player.grounded = true;
                    }
                    else if (gravity < 0 && player.vy <= 0 && player.y - player.vy / steps >= p.y + p.h) {
                        player.y = p.y + p.h;
                        player.vy = 0;
                        player.grounded = true;
                    }
                }
            }
        }
    }

    // Limitar dentro del canvas
    if (player.x < 0) player.x = 0;
    if (player.x + player.w > canvas.width) player.x = canvas.width - player.w;
    if (player.y < 0) player.y = 0;
    if (player.y + player.h > canvas.height) player.y = canvas.height - player.h;

    // Colisiones
    for (let s of spikes) {
        if (rectsCollide(player, s)) {
            loseLife();
            return;
        }
    }

    for (let e of enemies) {
        if (rectsCollide(player, e)) {
            loseLife();
            return;
        }
    }

    // Movimiento de enemigos
    enemies.forEach(e => {
        e.x += e.dir * e.speed;
        if (e.x < e.origX - e.range || e.x > e.origX + e.range) {
            e.dir *= -1;
        }
    });

    // Recoger estrellas
    stars.forEach(s => {
        if (!s.collected && rectsCollide(player, {x:s.x, y:s.y, w:24, h:24})) {
            s.collected = true;
            collected++;
            updateHUD();
        }
    });

    // Abrir puerta
    if (collected >= level.requiredStars) {
        door.open = true;
    }

    // Completar nivel
    if (door.open && rectsCollide(player, door)) {
        endLevel();
        return;
    }
}

function loseLife() {
    lives--;
    updateHUD();
    if (lives <= 0) {
        playing = false;
        gameover = true;
        showGameOver();
    } else {
        player.x = level.player.x;
        player.y = level.player.y;
        player.vx = 0;
        player.vy = 0;
    }
}

function endLevel() {
    playing = false;
    ended = true;
    let elapsed = Math.round((Date.now() - levelStartTime)/1000);
    endStats.innerHTML = `
        Tiempo: <b>${elapsed}s</b><br>
        Estrellas: <b>${collected}/${level.requiredStars}</b>
    `;
    endScreen.style.display = 'flex';
}

function showGameOver() {
    let elapsed = Math.round((Date.now() - levelStartTime)/1000);
    gameoverStats.innerHTML = `
        Tiempo: <b>${elapsed}s</b><br>
        Estrellas: <b>${collected}/${level.requiredStars}</b>
    `;
    gameoverScreen.style.display = 'flex';
}

function rectsCollide(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x &&
           a.y < b.y + b.h && a.y + a.h > b.y;
}

// Manejo de input
window.addEventListener('keydown', e => {
    if (e.repeat) return;
    if (e.key === " ") e.preventDefault();
    keys[e.key] = true;
    
    if (e.key === " " && playing && !paused && !ended && !gameover) {
        gravity *= -1;
    }
    
    if ((e.key === "Escape" || e.key === "p") && playing && !paused && !ended && !gameover) {
        paused = true;
        pauseScreen.style.display = 'flex';
    }
    
    if ((e.key === "Escape" || e.key === "p") && paused) {
        paused = false;
        pauseScreen.style.display = 'none';
    }
});

window.addEventListener('keyup', e => {
    keys[e.key] = false;
});

// Loop principal
function loop() {
    if (playing && !paused && !ended && !gameover) {
        update();
        draw();
        if (Date.now() - startTime > 1000) {
            timeLeft--;
            startTime = Date.now();
            updateHUD();
            if (timeLeft <= 0) {
                loseLife();
            }
        }
    } else if (playing && paused) {
        draw();
    }
    requestAnimationFrame(loop);
}

// Event listeners de botones

function isMobile() {
    return window.innerWidth < 700 || /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

playBtn.onclick = () => {
    menu.style.display = 'none';
    hud.style.display = 'flex';
    canvas.style.display = 'block';
    if (isMobile()) {
        mobileControls.style.display = 'flex';
    } else {
        mobileControls.style.display = 'none';
    }
    resetLevel(levelIdx);
    requestAnimationFrame(loop);
};
// --- Controles táctiles para móvil ---
let leftPressed = false, rightPressed = false;

function setMobileKey(key, pressed) {
    keys[key] = pressed;
}

if (btnLeft && btnRight && btnGravity) {
    // Izquierda
    btnLeft.addEventListener('touchstart', e => { e.preventDefault(); leftPressed = true; setMobileKey('ArrowLeft', true); }, {passive:false});
    btnLeft.addEventListener('touchend', e => { e.preventDefault(); leftPressed = false; setMobileKey('ArrowLeft', false); }, {passive:false});
    // Derecha
    btnRight.addEventListener('touchstart', e => { e.preventDefault(); rightPressed = true; setMobileKey('ArrowRight', true); }, {passive:false});
    btnRight.addEventListener('touchend', e => { e.preventDefault(); rightPressed = false; setMobileKey('ArrowRight', false); }, {passive:false});
    // Invertir gravedad
    btnGravity.addEventListener('touchstart', e => {
        e.preventDefault();
        // Simula barra espaciadora
        if (playing && !paused && !ended && !gameover) {
            gravity *= -1;
        }
    }, {passive:false});
}

// También soporta click para desktop testing
if (btnLeft && btnRight && btnGravity) {
    btnLeft.addEventListener('mousedown', e => { setMobileKey('ArrowLeft', true); });
    btnLeft.addEventListener('mouseup', e => { setMobileKey('ArrowLeft', false); });
    btnRight.addEventListener('mousedown', e => { setMobileKey('ArrowRight', true); });
    btnRight.addEventListener('mouseup', e => { setMobileKey('ArrowRight', false); });
    btnGravity.addEventListener('mousedown', e => { if (playing && !paused && !ended && !gameover) gravity *= -1; });
}

// Oculta controles móviles si se cambia tamaño de pantalla
window.addEventListener('resize', () => {
    if (mobileControls) {
        if (isMobile() && hud.style.display === 'flex' && canvas.style.display === 'block') {
            mobileControls.style.display = 'flex';
        } else {
            mobileControls.style.display = 'none';
        }
    }
});

continueBtn.onclick = () => {
    paused = false;
    pauseScreen.style.display = 'none';
};

restartBtn.onclick = () => {
    pauseScreen.style.display = 'none';
    hud.style.display = 'flex';
    canvas.style.display = 'block';
    resetLevel(levelIdx);
};

nextBtn.onclick = () => {
    endScreen.style.display = 'none';
    levelIdx = (levelIdx+1)%LEVELS.length;
    resetLevel(levelIdx);
};

retryBtn.onclick = retry2Btn.onclick = () => {
    endScreen.style.display = 'none';
    gameoverScreen.style.display = 'none';
    hud.style.display = 'flex';
    canvas.style.display = 'block';
    resetLevel(levelIdx);
};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    const dark = localStorage.getItem('portfolio-theme');
    if (dark === 'dark') document.body.classList.add('dark-mode');
});

window.addEventListener('keydown', function(e) {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
    }
}, {passive: false});
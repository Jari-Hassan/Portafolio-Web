// Inicialización de partículas de fondo
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

// Configuración de localStorage
const TASKS_KEY = "task-manager-tasks";
const HISTORY_KEY = "task-manager-history";
let tasks = [];
let history = [];

// Funciones de persistencia
function loadTasks() {
    const saved = localStorage.getItem(TASKS_KEY);
    tasks = saved ? JSON.parse(saved) : [];
}

function saveTasks() {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

function loadHistory() {
    const saved = localStorage.getItem(HISTORY_KEY);
    history = saved ? JSON.parse(saved) : [];
}

function saveHistory() {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

// Renderizado del historial
function renderHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    
    if (history.length === 0) {
        historyList.innerHTML = '<li style="color:#888;">No hay tareas registradas.</li>';
    } else {
        history.slice().reverse().forEach(item => {
            const li = document.createElement('li');
            li.style.display = 'flex';
            li.style.justifyContent = 'space-between';
            li.style.alignItems = 'center';
            li.innerHTML = `
                <span>${item.text}</span>
                <span style="font-size:0.93em; color:#888; margin-left:16px;">
                    ${item.deletedAt ? new Date(item.deletedAt).toLocaleString() : ''}
                </span>
            `;
            historyList.appendChild(li);
        });
    }
}

// Elementos del DOM
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const clearAllBtn = document.getElementById('clear-all-btn');

// Renderizado de tareas
function renderTasks() {
    list.innerHTML = '';
    tasks.forEach((task, idx) => {
        const li = document.createElement('li');
        li.setAttribute('draggable', 'true');
        li.dataset.index = idx;
        li.innerHTML = `
            <span class="drag-handle" title="Arrastrar">&#8942;</span>
            <label>
                <input type="checkbox" class="task-check" ${task.done ? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
            </label>
            <button class="edit-btn" title="Editar tarea">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path d="M4 13.5V16h2.5l7.1-7.1-2.5-2.5L4 13.5z" stroke="#6366f1" stroke-width="1.5" fill="none"/>
                    <path d="M13.5 6.5l2 2" stroke="#6366f1" stroke-width="1.5"/>
                </svg>
            </button>
            <button class="delete-btn" title="Eliminar tarea">&times;</button>
        `;
        if (task.done) li.classList.add('done');
        list.appendChild(li);
    });
    saveTasks();
}

// Event Listeners para tareas
form.addEventListener('submit', function(e) {
    e.preventDefault();
    let text = input.value.trim();
    if (!text) return;
    text = text.charAt(0).toUpperCase() + text.slice(1);
    tasks.push({ text, done: false });
    history.push({ text, deletedAt: null });
    saveHistory();
    renderTasks();
    input.value = '';
    input.focus();
});

list.addEventListener('change', function(e) {
    if (e.target.classList.contains('task-check')) {
        const idx = e.target.closest('li').dataset.index;
        tasks[idx].done = e.target.checked;
        renderTasks();
    }
});

list.addEventListener('click', function(e) {
    const li = e.target.closest('li');
    const idx = li ? li.dataset.index : -1;
    
    if (e.target.classList.contains('delete-btn')) {
        // Marcar fecha de eliminación en historial
        for (let i = history.length - 1; i >= 0; i--) {
            if (history[i].text === tasks[idx].text && !history[i].deletedAt) {
                history[i].deletedAt = new Date().toISOString();
                break;
            }
        }
        saveHistory();
        tasks.splice(idx, 1);
        renderTasks();
    }
    
    if (e.target.closest('.edit-btn')) {
        const textSpan = li.querySelector('.task-text');
        const oldText = textSpan.textContent;
        const inputEdit = document.createElement('input');
        inputEdit.type = 'text';
        inputEdit.value = oldText;
        inputEdit.className = 'edit-input';
        textSpan.replaceWith(inputEdit);
        inputEdit.focus();
        inputEdit.select();

        function finishEdit(save) {
            if (save && inputEdit.value.trim()) {
                tasks[idx].text = inputEdit.value.trim();
            }
            renderTasks();
        }
        
        inputEdit.addEventListener('keydown', function(ev) {
            if (ev.key === 'Enter') finishEdit(true);
            if (ev.key === 'Escape') finishEdit(false);
        });
        inputEdit.addEventListener('blur', function() { finishEdit(true); });
    }
});

clearAllBtn.addEventListener('click', function() {
    if (tasks.length && confirm('¿Seguro que quieres borrar todas las tareas?')) {
        tasks.forEach(function(t) {
            for (let i = history.length - 1; i >= 0; i--) {
                if (history[i].text === t.text && !history[i].deletedAt) {
                    history[i].deletedAt = new Date().toISOString();
                    break;
                }
            }
        });
        saveHistory();
        tasks = [];
        renderTasks();
    }
});

// Drag & Drop functionality
let dragSrcIdx = null;

list.addEventListener('dragstart', function(e) {
    const li = e.target.closest('li');
    if (!li) return;
    dragSrcIdx = Number(li.dataset.index);
    li.classList.add('dragging');
});

list.addEventListener('dragend', function(e) {
    const li = e.target.closest('li');
    if (li) li.classList.remove('dragging');
});

list.addEventListener('dragover', function(e) {
    e.preventDefault();
    const li = e.target.closest('li');
    if (!li || li.classList.contains('dragging')) return;
    li.classList.add('drag-over');
});

list.addEventListener('dragleave', function(e) {
    const li = e.target.closest('li');
    if (li) li.classList.remove('drag-over');
});

list.addEventListener('drop', function(e) {
    e.preventDefault();
    const li = e.target.closest('li');
    if (!li || dragSrcIdx === null) return;
    const dropIdx = Number(li.dataset.index);
    if (dropIdx === dragSrcIdx) return;
    const [dragged] = tasks.splice(dragSrcIdx, 1);
    tasks.splice(dropIdx, 0, dragged);
    renderTasks();
    dragSrcIdx = null;
});

// Dark mode functionality
const darkBtn = document.getElementById('darkModeBtn');
const savedTheme = localStorage.getItem('task-theme');

if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    darkBtn.textContent = '☀️';
}

darkBtn.onclick = function() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    darkBtn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('task-theme', isDark ? 'dark' : 'light');
};

// Modal de historial
const historyBtn = document.getElementById('history-btn');
const historyModal = document.getElementById('history-modal');
const closeModal = document.querySelector('.close-modal');
const clearHistoryBtn = document.getElementById('clear-history-btn');

historyBtn.onclick = function() {
    renderHistory();
    historyModal.style.display = 'flex';
    closeModal.focus();
};

closeModal.onclick = function() {
    historyModal.style.display = 'none';
};

closeModal.onkeydown = function(e) {
    if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        historyModal.style.display = 'none';
    }
};

window.addEventListener('keydown', function(e) {
    if (historyModal.style.display === 'flex' && e.key === "Escape") {
        historyModal.style.display = 'none';
    }
});

historyModal.onclick = function(e) {
    if (e.target === historyModal) {
        historyModal.style.display = 'none';
    }
};

clearHistoryBtn.onclick = function() {
    if (confirm("¿Vaciar historial de tareas?")) {
        history = [];
        saveHistory();
        renderHistory();
    }
};

// Inicialización de la aplicación
loadTasks();
loadHistory();
renderTasks();
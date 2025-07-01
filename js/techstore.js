// Base de datos de productos premium con imágenes que funcionan
const products = [
    {
        id: 1,
        name: "MacBook Pro 14\" M3 Pro",
        description: "La laptop más potente de Apple con chip M3 Pro, 18GB RAM unificada, 1TB SSD. Perfecta para profesionales creativos y desarrolladores.",
        price: 2999.99,
        category: "laptops",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311054290",
        badge: "Premium",
        features: ["Chip M3 Pro", "18GB RAM", "1TB SSD", "Pantalla Liquid Retina XDR"]
    },
    {
        id: 2,
        name: "iPhone 15 Pro Max",
        description: "El smartphone más avanzado con cámara profesional de 48MP, chip A17 Pro y construcción en titanio de grado aeroespacial.",
        price: 1399.99,
        category: "phones",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692895395658",
        badge: "Nuevo",
        features: ["Chip A17 Pro", "Cámara 48MP", "Titanio", "USB-C"]
    },
    {
        id: 3,
        name: "AirPods Pro 2da Gen",
        description: "Audífonos inalámbricos profesionales con cancelación de ruido adaptativa de última generación y audio espacial personalizado.",
        price: 279.99,
        category: "accessories",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1660803972361",
        badge: "Trending",
        features: ["Cancelación adaptativa", "Audio espacial", "Chip H2", "Estuche MagSafe"]
    },
    {
        id: 4,
        name: "Dell XPS 13 Plus",
        description: "Ultrabook empresarial premium con diseño sin marcos, pantalla OLED 4K+ y procesador Intel Core de 13va generación para máximo rendimiento.",
        price: 1899.99,
        category: "laptops",
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&q=80",
        badge: "Exclusivo",
        features: ["Intel Core i7-1360P", "OLED 4K+", "32GB LPDDR5", "1TB NVMe"]
    },
    {
        id: 5,
        name: "Samsung Galaxy S24 Ultra",
        description: "Smartphone empresarial con S Pen integrado, cámara profesional de 200MP con zoom 100x y pantalla Dynamic AMOLED 2X de 6.8 pulgadas.",
        price: 1299.99,
        category: "phones",
        image: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=500&q=80",
        badge: "Flagship",
        features: ["S Pen integrado", "Cámara 200MP", "Zoom 100x", "AI Photography"]
    },
    {
        id: 6,
        name: "Logitech MX Master 3S",
        description: "Mouse inalámbrico profesional con sensor de 8000 DPI, conectividad multi-dispositivo y batería de larga duración para profesionales.",
        price: 149.99,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80",
        badge: "Pro",
        features: ["Sensor 8000 DPI", "Multi-dispositivo", "70 días batería", "Rueda MagSpeed"]
    },
    {
        id: 7,
        name: "HP EliteBook 840 G10",
        description: "Laptop empresarial de 14 pulgadas con procesador Intel vPro, seguridad avanzada HP Wolf y construcción de grado militar.",
        price: 2199.99,
        category: "laptops",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80",
        badge: "Business",
        features: ["Intel vPro", "HP Wolf Security", "Grado militar", "16GB DDR5"]
    },
    {
        id: 8,
        name: "Google Pixel 8 Pro",
        description: "Smartphone con inteligencia artificial avanzada, cámara computacional de clase profesional y 7 años de actualizaciones garantizadas.",
        price: 999.99,
        category: "phones",
        image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&q=80",
        badge: "AI Powered",
        features: ["Tensor G3", "Magic Eraser", "7 años updates", "Cámara 50MP"]
    },
    {
        id: 9,
        name: "Corsair K95 RGB Platinum",
        description: "Teclado mecánico gaming premium con switches Cherry MX Speed, iluminación RGB LightEdge y construcción en aluminio aeronáutico.",
        price: 199.99,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&q=80",
        badge: "Gaming",
        features: ["Cherry MX Speed", "RGB LightEdge", "Marco aluminio", "Teclas macro"]
    },
    {
        id: 10,
        name: "Sony WH-1000XM5",
        description: "Audífonos over-ear profesionales con la tecnología de cancelación de ruido más avanzada del mercado y calidad de audio Hi-Res.",
        price: 399.99,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&q=80",
        badge: "Bestseller",
        features: ["Cancelación V1", "Hi-Res Audio", "30h batería", "Multipoint"]
    }
];

// Variables globales
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let filteredProducts = [...products];
let currentProduct = null;
let modalQuantity = 1;
let particlesCreated = false;

// Elementos DOM
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const productModal = document.getElementById('productModal');
const searchInput = document.getElementById('searchInput');
const navLinks = document.querySelectorAll('.nav-link');
const toast = document.getElementById('toast');

// Inicialización con efectos premium
document.addEventListener('DOMContentLoaded', function() {
    initPremiumEffects();
    renderProducts();
    updateCartUI();
    initEventListeners();
    createParticles();
    addScrollAnimations();
    // Mejoras finales y optimizaciones premium
    // Agregar lazy loading para imágenes
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Agregar efectos de paralaje suave
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero::before');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }, 16));
    
    // Mejorar la búsqueda con debounce
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            filterBySearch(e.target.value);
            
            // Animación de búsqueda
            searchInput.style.borderColor = 'var(--primary)';
            setTimeout(() => {
                searchInput.style.borderColor = '';
            }, 300);
        }, 300));
    }
    
    // Atajos de teclado premium
    document.addEventListener('keydown', (e) => {
        // ESC para cerrar modales
        if (e.key === 'Escape') {
            closeCartModal();
            closeProductModal();
        }
        
        // Ctrl+K para enfocar búsqueda
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
    });
    
    // Agregar indicador de estado de conexión
    window.addEventListener('online', () => {
        showToastPremium('Conexión restaurada', 'success');
    });
    
    window.addEventListener('offline', () => {
        showToastPremium('Sin conexión a internet', 'error');
    });
});

// Efectos premium al cargar
function initPremiumEffects() {
    // Efecto de carga suave
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Animación del logo
    const logo = document.querySelector('.logo i');
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            logo.style.transform = 'rotate(360deg) scale(1.2)';
        });
        logo.addEventListener('mouseleave', () => {
            logo.style.transform = 'rotate(0deg) scale(1)';
        });
    }
}

// Crear partículas flotantes
function createParticles() {
    if (particlesCreated) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
    
    particlesCreated = true;
}

// Animaciones al hacer scroll
function addScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    });
    
    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });
}

// Event Listeners
function initEventListeners() {
    // Filtros de categoría
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.dataset.category;
            filterByCategory(category);
            
            // Actualizar estado activo
            navLinks.forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    // Búsqueda
    searchInput.addEventListener('input', (e) => {
        filterBySearch(e.target.value);
    });

    // Carrito
    cartBtn.addEventListener('click', openCartModal);
    document.getElementById('closeCartBtn').addEventListener('click', closeCartModal);
    document.getElementById('clearCartBtn').addEventListener('click', clearCart);
    document.getElementById('checkoutBtn').addEventListener('click', checkout);

    // Modal de producto
    document.getElementById('closeProductBtn').addEventListener('click', closeProductModal);
    document.getElementById('addToCartFromModal').addEventListener('click', addToCartFromModal);
    document.getElementById('increaseQty').addEventListener('click', () => changeModalQuantity(1));
    document.getElementById('decreaseQty').addEventListener('click', () => changeModalQuantity(-1));

    // Cerrar modales al hacer clic fuera
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) closeCartModal();
    });
    
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) closeProductModal();
    });
}

// Renderizar productos con animaciones premium
function renderProducts() {
    productsGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem;">
                <i class="fas fa-search" style="font-size: 4rem; opacity: 0.3; margin-bottom: 1rem; color: var(--text-muted);"></i>
                <p style="font-size: 1.2rem; color: var(--text-muted);">No se encontraron productos</p>
                <p style="color: var(--text-muted); margin-top: 0.5rem;">Intenta con otros términos de búsqueda</p>
            </div>
        `;
        return;
    }

    filteredProducts.forEach((product, index) => {
        const productCard = createProductCard(product, index);
        productsGrid.appendChild(productCard);
    });
    
    // Animación escalonada
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Crear tarjeta de producto premium
function createProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const badgeHtml = product.badge ? `<div class="product-badge">${product.badge}</div>` : '';
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            ${badgeHtml}
        </div>
        <div class="product-content">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            ${product.features ? `
                <div class="product-features" style="margin: 0.5rem 0;">
                    ${product.features.slice(0, 2).map(feature => 
                        `<span style="display: inline-block; background: var(--glass); padding: 0.25rem 0.5rem; margin: 0.125rem; border-radius: 12px; font-size: 0.75rem; color: var(--text-muted);">${feature}</span>`
                    ).join('')}
                </div>
            ` : ''}
            <div class="product-footer">
                <div class="product-price">$${formatPrice(product.price)}</div>
                <div class="product-actions">
                    <button class="btn btn-outline" onclick="openProductModal(${product.id})" title="Ver detalles">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="add-to-cart" onclick="addToCartWithAnimation(${product.id}, event)" title="Agregar al carrito">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Efectos de hover premium
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.zIndex = '10';
        
        // Efecto de brillo
        const img = this.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1.1)';
            img.style.filter = 'brightness(1.1)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.zIndex = '1';
        
        const img = this.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1)';
            img.style.filter = 'brightness(1)';
        }
    });
    
    return card;
}

// Formatear precio
function formatPrice(price) {
    return price.toLocaleString('es-MX', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Agregar al carrito con animación premium
function addToCartWithAnimation(productId, event) {
    event.stopPropagation();
    
    const button = event.currentTarget;
    const originalContent = button.innerHTML;
    
    // Animación del botón
    button.classList.add('success-animation');
    button.innerHTML = '<i class="fas fa-check"></i>';
    button.style.background = '#4CAF50';
    
    // Efecto de onda
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
    
    button.appendChild(ripple);
    
    // Agregar al carrito
    addToCart(productId);
    
    // Restaurar botón
    setTimeout(() => {
        button.innerHTML = originalContent;
        button.style.background = '';
        button.classList.remove('success-animation');
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 1500);
    
    // Animación del contador del carrito
    const cartCounter = document.getElementById('cartCount');
    if (cartCounter) {
        cartCounter.classList.add('success-animation');
        setTimeout(() => {
            cartCounter.classList.remove('success-animation');
        }, 600);
    }
}

// Filtros
function filterByCategory(category) {
    if (category === 'all') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product => product.category === category);
    }
    
    // Aplicar también el filtro de búsqueda si existe
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    renderProducts();
}

function filterBySearch(searchTerm) {
    // Obtener categoría activa
    const activeCategory = document.querySelector('.nav-link.active').dataset.category;
    
    // Aplicar filtro de categoría
    if (activeCategory === 'all') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product => product.category === activeCategory);
    }
    
    // Aplicar filtro de búsqueda
    if (searchTerm.trim()) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    renderProducts();
}

// Funciones del carrito con efectos premium
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    saveCart();
    updateCartUI();
    showToastPremium(`${product.name} agregado al carrito`, 'success');
    
    // Efecto de vibración suave (si está soportado)
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

function removeFromCart(productId) {
    const product = cart.find(item => item.id === productId);
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    renderCartItems();
    
    if (product) {
        showToastPremium(`${product.name} eliminado del carrito`, 'error');
    }
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        updateCartUI();
        renderCartItems();
    }
}

function clearCart() {
    if (cart.length === 0) {
        showToastPremium('El carrito ya está vacío', 'error');
        return;
    }
    
    // Confirmación con estilo
    const confirmClear = confirm('¿Estás seguro de que quieres vaciar el carrito?');
    if (confirmClear) {
        cart = [];
        saveCart();
        updateCartUI();
        renderCartItems();
        showToastPremium('Carrito vaciado', 'success');
        
        // Animación del modal
        const cartModal = document.getElementById('cartModal');
        if (cartModal) {
            cartModal.classList.add('shake-animation');
            setTimeout(() => {
                cartModal.classList.remove('shake-animation');
            }, 600);
        }
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Efecto visual de guardado
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            cartBtn.style.transform = 'scale(1)';
        }, 200);
    }
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCounter = document.getElementById('cartCount');
    const cartCounterHero = document.getElementById('cartCountHero');
    
    if (cartCounter) {
        cartCounter.textContent = totalItems;
        cartCounter.style.display = totalItems > 0 ? 'flex' : 'none';
        
        // Animación del contador
        if (totalItems > 0) {
            cartCounter.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                cartCounter.style.animation = '';
            }, 500);
        }
    }
    
    // Actualizar contador en hero
    if (cartCounterHero) {
        cartCounterHero.textContent = totalItems;
    }
    
    // Actualizar favicon con número de items
    updateFavicon(totalItems);
}

function updateFavicon(count) {
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon && count > 0) {
        // Crear canvas para badge en favicon
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        
        // Fondo circular profesional
        ctx.fillStyle = '#1e3a8a';
        ctx.beginPath();
        ctx.arc(16, 16, 15, 0, 2 * Math.PI);
        ctx.fill();
        
        // Dibujar ícono de carrito simplificado
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.rect(8, 12, 12, 8);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(11, 23, 1.5, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(17, 23, 1.5, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Agregar badge si hay items
        if (count > 0) {
            ctx.fillStyle = '#dc2626';
            ctx.beginPath();
            ctx.arc(24, 8, 6, 0, 2 * Math.PI);
            ctx.fill();
            
            ctx.fillStyle = 'white';
            ctx.font = 'bold 8px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(count > 9 ? '9+' : count.toString(), 24, 11);
        }
        
        favicon.href = canvas.toDataURL('image/png');
    }
}

// Modales
function openCartModal() {
    cartModal.classList.add('show');
    renderCartItems();
}

function closeCartModal() {
    cartModal.classList.remove('show');
}

function openProductModal(productId) {
    currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) return;
    
    modalQuantity = 1;
    
    document.getElementById('productModalTitle').textContent = currentProduct.name;
    document.getElementById('productModalImage').src = currentProduct.image;
    document.getElementById('productModalDescription').textContent = currentProduct.description;
    document.getElementById('productModalPrice').textContent = `$${currentProduct.price.toFixed(2)}`;
    document.getElementById('quantity').textContent = modalQuantity;
    
    productModal.classList.add('show');
}

function closeProductModal() {
    productModal.classList.remove('show');
    currentProduct = null;
    modalQuantity = 1;
}

function changeModalQuantity(change) {
    modalQuantity = Math.max(1, modalQuantity + change);
    document.getElementById('quantity').textContent = modalQuantity;
}

function addToCartFromModal() {
    if (currentProduct) {
        addToCart(currentProduct.id, modalQuantity);
        closeProductModal();
    }
}

// Renderizar items del carrito
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Tu carrito está vacío</p>';
        cartTotal.textContent = '$0.00';
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-actions">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                <button class="btn btn-danger" onclick="removeFromCart(${item.id})" style="margin-left: 0.5rem; padding: 0.5rem;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Toast notifications premium
function showToastPremium(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (!toast || !toastMessage) return;
    
    // Configurar el toast
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    
    // Icono según el tipo
    const icon = toast.querySelector('i');
    if (icon) {
        icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle';
    }
    
    // Mostrar con animación
    toast.classList.add('show');
    
    // Efecto de vibración
    if (navigator.vibrate && type === 'success') {
        navigator.vibrate([50, 100, 50]);
    }
    
    // Auto-ocultar
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
    
    // Permitir cerrar al hacer clic
    toast.onclick = () => {
        toast.classList.remove('show');
    };
}

// Checkout premium con animaciones
function checkout() {
    if (cart.length === 0) {
        showToastPremium('Tu carrito está vacío', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Simulación de procesamiento de pago
    const checkoutBtn = document.getElementById('checkoutBtn');
    const originalText = checkoutBtn.innerHTML;
    
    // Animación de loading
    checkoutBtn.innerHTML = '<i class="loading"></i> Procesando...';
    checkoutBtn.disabled = true;
    checkoutBtn.style.background = 'var(--text-muted)';
    
    setTimeout(() => {
        // Crear modal de éxito premium
        createSuccessModal(total, itemCount);
        
        // Limpiar carrito
        clearCart();
        closeCartModal();
        
        // Restaurar botón
        checkoutBtn.innerHTML = originalText;
        checkoutBtn.disabled = false;
        checkoutBtn.style.background = '';
        
        // Confetti effect
        createConfetti();
        
        showToastPremium('¡Compra realizada con éxito!', 'success');
    }, 2000);
}

// Crear modal de éxito premium
function createSuccessModal(total, itemCount) {
    const modal = document.createElement('div');
    modal.className = 'modal success-modal';
    modal.style.display = 'flex';
    
    modal.innerHTML = `
        <div class="modal-content" style="text-align: center; max-width: 500px;">
            <div class="modal-body" style="padding: 3rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem; animation: successBounce 0.8s ease;">
                    🎉
                </div>
                <h2 style="background: var(--primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 1rem;">
                    ¡Compra Exitosa!
                </h2>
                <p style="color: var(--text-muted); margin-bottom: 2rem; line-height: 1.6;">
                    Gracias por tu compra. Tu pedido está siendo procesado.
                </p>
                <div style="background: var(--glass); padding: 1.5rem; border-radius: var(--border-radius); margin-bottom: 2rem;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span>Artículos:</span>
                        <span>${itemCount}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 600;">
                        <span>Total:</span>
                        <span style="color: var(--primary);">$${formatPrice(total)}</span>
                    </div>
                </div>
                <button class="btn btn-primary" onclick="this.parentElement.parentElement.parentElement.remove()" style="width: 100%;">
                    Continuar Comprando
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto-remover después de 8 segundos
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 8000);
}

// Efecto de éxito discreto
function createConfetti() {
    const colors = ['#0369a1', '#1e3a8a', '#0284c7', '#059669'];
    
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            z-index: 10000;
            pointer-events: none;
            border-radius: 50%;
            opacity: 0.7;
        `;
        
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        
        document.body.appendChild(confetti);
        
        // Animación de caída más sutil
        const duration = Math.random() * 2000 + 1500;
        const rotation = Math.random() * 180;
        
        confetti.animate([
            { transform: `translateY(-10px) rotate(0deg)`, opacity: 0.7 },
            { transform: `translateY(${window.innerHeight + 10}px) rotate(${rotation}deg)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => confetti.remove();
    }
}

// Utilidades de rendimiento
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Agregar esquema JSON-LD para SEO
function addStructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Store",
        "name": "TechStore",
        "description": "Tu tienda de tecnología premium",
        "url": window.location.href,
        "image": "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
        "priceRange": "$79.99 - $2999.99",
        "acceptedPaymentMethod": ["CreditCard", "PayPal", "BankTransfer"],
        "currenciesAccepted": "USD",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Productos TechStore",
            "itemListElement": products.map(product => ({
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Product",
                    "name": product.name,
                    "description": product.description,
                    "image": product.image,
                    "category": product.category
                },
                "price": product.price,
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
            }))
        }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
}

// Llamar funciones de inicialización premium
addStructuredData();

// Exportar funciones globales para uso en HTML
window.TechStore = {
    addToCart,
    addToCartWithAnimation,
    removeFromCart,
    updateQuantity,
    clearCart,
    openCartModal,
    closeCartModal,
    openProductModal,
    closeProductModal,
    filterByCategory,
    filterBySearch,
    checkout,
    showToastPremium
};
// TechStore - JavaScript optimizado y limpio

// Datos de productos
const products = [
    {
        id: 1,
        name: "iPhone 15 Pro Max",
        price: 1199.99,
        category: "phones",
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop",
        description: "El iPhone más avanzado con chip A17 Pro, cámara de 48MP y pantalla Super Retina XDR.",
        features: ["Chip A17 Pro", "Cámara 48MP", "Pantalla 6.7''", "5G", "Face ID", "Resistente al agua"],
        specs: {
            "Pantalla": "6.7'' Super Retina XDR",
            "Procesador": "A17 Pro",
            "Almacenamiento": "256GB",
            "Cámara": "48MP Triple",
            "Batería": "Hasta 29h video",
            "Sistema": "iOS 17"
        }
    },
    {
        id: 2,
        name: "Samsung Galaxy S24 Ultra",
        price: 1099.99,
        category: "phones",
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=500&fit=crop",
        description: "Smartphone premium con S Pen integrado y cámara de 200MP.",
        features: ["Snapdragon 8 Gen 3", "Cámara 200MP", "S Pen incluido", "Pantalla 6.8''", "5G", "IP68"],
        specs: {
            "Pantalla": "6.8'' Dynamic AMOLED",
            "Procesador": "Snapdragon 8 Gen 3",
            "RAM": "12GB",
            "Almacenamiento": "512GB",
            "Cámara": "200MP Quad",
            "Batería": "5000mAh"
        }
    },
    {
        id: 3,
        name: "MacBook Pro 16'' M3",
        price: 2499.99,
        category: "laptops",
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop",
        description: "Laptop profesional con chip M3, perfecta para desarrollo y diseño.",
        features: ["Chip M3", "16GB RAM", "512GB SSD", "Pantalla Liquid Retina", "Batería 22h", "macOS Sonoma"],
        specs: {
            "Pantalla": "16.2'' Liquid Retina XDR",
            "Procesador": "Apple M3",
            "RAM": "16GB",
            "Almacenamiento": "512GB SSD",
            "Gráficos": "M3 integrado",
            "Puertos": "3x Thunderbolt 4"
        }
    },
    {
        id: 4,
        name: "Dell XPS 15",
        price: 1899.99,
        category: "laptops",
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=500&fit=crop",
        description: "Ultrabook premium con pantalla OLED 4K y procesador Intel i7.",
        features: ["Intel i7-13700H", "32GB RAM", "1TB SSD", "RTX 4060", "Pantalla OLED", "Windows 11 Pro"],
        specs: {
            "Pantalla": "15.6'' OLED 4K",
            "Procesador": "Intel i7-13700H",
            "RAM": "32GB DDR5",
            "Almacenamiento": "1TB SSD",
            "Gráficos": "RTX 4060 8GB",
            "Peso": "1.96kg"
        }
    },
    {
        id: 5,
        name: "iPad Pro 12.9'' M2",
        price: 1099.99,
        category: "tablets",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop",
        description: "Tablet profesional con chip M2 y compatibilidad con Apple Pencil.",
        features: ["Chip M2", "Pantalla 12.9''", "Apple Pencil 2", "Face ID", "5G opcional", "iPadOS 17"],
        specs: {
            "Pantalla": "12.9'' Liquid Retina XDR",
            "Procesador": "Apple M2",
            "Almacenamiento": "128GB",
            "Cámara": "12MP Ultra Wide",
            "Conectividad": "Wi-Fi 6E + 5G",
            "Espesor": "6.4mm"
        }
    },
    {
        id: 6,
        name: "AirPods Pro 2",
        price: 249.99,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&h=500&fit=crop",
        description: "Auriculares inalámbricos con cancelación activa de ruido.",
        features: ["Cancelación de ruido", "Audio espacial", "Chip H2", "6h batería", "Estuche MagSafe", "IPX4"],
        specs: {
            "Driver": "Dinámico personalizado",
            "Cancelación": "Activa adaptativa",
            "Batería": "6h + 24h estuche",
            "Conectividad": "Bluetooth 5.3",
            "Resistencia": "IPX4",
            "Carga": "Lightning + MagSafe"
        }
    }
];

// Estado global
let currentCategory = 'all';
let currentProduct = null;
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    displayProducts(products);
    updateCartUI();
    setupEventListeners();
}

// Mostrar productos por categoría
function showCategory(category) {
    currentCategory = category;
    
    // Actualizar botones de filtro
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`[onclick="showCategory('${category}')"]`);
    if (activeBtn) activeBtn.classList.add('active');
    
    // Actualizar títulos
    const titles = {
        'all': 'Catálogo Corporativo',
        'phones': 'Smartphones Empresariales',
        'laptops': 'Laptops Profesionales',
        'tablets': 'Tablets Corporativas',
        'accessories': 'Accesorios Premium'
    };
    
    const descriptions = {
        'all': 'Explora nuestra selección completa de equipos tecnológicos premium.',
        'phones': 'Smartphones de última generación para profesionales.',
        'laptops': 'Computadoras portátiles de alto rendimiento.',
        'tablets': 'Dispositivos táctiles versátiles para trabajo móvil.',
        'accessories': 'Accesorios premium para completar tu experiencia.'
    };
    
    document.getElementById('productsTitle').textContent = titles[category];
    document.getElementById('productsDescription').textContent = descriptions[category];
    
    // Filtrar y mostrar productos
    const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
    displayProducts(filteredProducts);
    
    // Manejar visibilidad de secciones
    const categoriesSection = document.querySelector('.categories-section');
    const backButton = document.querySelector('.back-to-categories');
    
    if (category !== 'all') {
        categoriesSection.style.display = 'none';
        backButton.style.display = 'block';
    } else {
        categoriesSection.style.display = 'block';
        backButton.style.display = 'none';
    }
    
    // Scroll suave a productos
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function showAllCategories() {
    document.querySelector('.categories-section').style.display = 'block';
    document.querySelector('.back-to-categories').style.display = 'none';
    showCategory('all');
}

// Mostrar productos
function displayProducts(productsToShow) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (productsToShow.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem;">
                <i class="fas fa-search" style="font-size: 4rem; opacity: 0.3; margin-bottom: 1rem;"></i>
                <p style="font-size: 1.2rem; color: var(--text-muted);">No se encontraron productos</p>
            </div>
        `;
        return;
    }
    
    productsToShow.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

// Crear tarjeta de producto
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="product-badge">Nuevo</div>
        </div>
        <div class="product-content">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" data-id="${product.id}" title="Agregar al carrito">
                    <i class="fas fa-cart-plus"></i>
                </button>
            </div>
        </div>
    `;
    
    // Hacer toda la tarjeta clickeable excepto el botón
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.add-to-cart')) {
            showProductDetail(product.id);
        }
    });
    
    // Manejar click del botón agregar al carrito
    const addBtn = card.querySelector('.add-to-cart');
    addBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(product.id);
    });
    
    return card;
}

// Mostrar detalles del producto
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    currentProduct = product;
    
    // Ocultar secciones principales
    document.querySelector('.hero').style.display = 'none';
    document.querySelector('.search-section').style.display = 'none';
    document.querySelector('.categories-section').style.display = 'none';
    document.querySelector('.products-section').style.display = 'none';
    document.querySelector('.footer').style.display = 'none';
    document.querySelector('.nav-menu').style.display = 'none';
    
    // Mostrar página de detalles
    const detailPage = document.getElementById('productDetailPage');
    detailPage.style.display = 'block';
    
    // Llenar información del producto
    document.getElementById('detailMainImage').src = product.image;
    document.getElementById('detailProductName').textContent = product.name;
    document.getElementById('detailProductPrice').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('detailProductDescription').textContent = product.description;
    document.getElementById('breadcrumbCategory').textContent = getCategoryName(product.category);
    document.getElementById('breadcrumbProduct').textContent = product.name;
    
    // Características como badges
    const featuresContainer = document.getElementById('detailProductFeatures');
    featuresContainer.innerHTML = product.features.map(feature => 
        `<span class="feature-badge">${feature}</span>`
    ).join('');
    
    // Especificaciones
    const specsContainer = document.getElementById('detailProductSpecs');
    const specsArray = Object.entries(product.specs);
    
    let specsText = '';
    specsArray.forEach(([label, value], index) => {
        if (index === 0) {
            specsText += `Este dispositivo cuenta con una ${label.toLowerCase()} de ${value}`;
        } else if (index === specsArray.length - 1) {
            specsText += ` y ${label.toLowerCase()} ${value}.`;
        } else {
            specsText += `, ${label.toLowerCase()} ${value}`;
        }
    });
    
    specsContainer.innerHTML = `
        <p class="specs-description">${specsText}</p>
        <div class="specs-grid">
            ${Object.entries(product.specs).map(([label, value]) => `
                <div class="spec-item">
                    <div class="spec-label">${label}:</div>
                    <div class="spec-value">${value}</div>
                </div>
            `).join('')}
        </div>
    `;
    
    // Configurar miniaturas
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        thumb.src = product.image;
        thumb.onclick = () => {
            document.getElementById('detailMainImage').src = product.image;
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        };
    });
    
    window.scrollTo(0, 0);
}

function closeProductDetail() {
    // Mostrar todas las secciones
    document.querySelector('.hero').style.display = 'block';
    document.querySelector('.search-section').style.display = 'block';
    document.querySelector('.categories-section').style.display = 'block';
    document.querySelector('.products-section').style.display = 'block';
    document.querySelector('.footer').style.display = 'block';
    document.querySelector('.nav-menu').style.display = 'flex';
    
    // Ocultar página de detalles
    document.getElementById('productDetailPage').style.display = 'none';
    
    currentProduct = null;
}

function getCategoryName(category) {
    const names = {
        'phones': 'Smartphones',
        'laptops': 'Laptops',
        'tablets': 'Tablets',
        'accessories': 'Accesorios'
    };
    return names[category] || 'Productos';
}

// Funciones del carrito
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    
    saveCart();
    updateCartUI();
    showToast(`${product.name} agregado al carrito`);
}

function removeFromCart(productId) {
    const product = cart.find(item => item.id === productId);
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    renderCartItems();
    
    if (product) {
        showToast(`${product.name} eliminado del carrito`);
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
        showToast('El carrito ya está vacío');
        return;
    }
    
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        cart = [];
        saveCart();
        updateCartUI();
        renderCartItems();
        showToast('Carrito vaciado');
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCounter = document.getElementById('cartCount');
    
    if (cartCounter) {
        cartCounter.textContent = totalItems;
        cartCounter.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Modal del carrito
function openCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.classList.add('show');
        renderCartItems();
    }
}

function closeCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function renderCartItems() {
    const container = document.getElementById('cartItems');
    const total = document.getElementById('cartTotal');
    
    if (!container || !total) return;
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty-state">
                <i class="fas fa-shopping-cart"></i>
                <h3>Tu carrito está vacío</h3>
                <p>Añade productos para verlos aquí.</p>
            </div>
        `;
        total.textContent = '$0.00';
        return;
    }
    
    container.innerHTML = '';
    let totalAmount = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-actions">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span class="cart-item-quantity">${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                <button class="cart-item-remove-btn" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        container.appendChild(cartItem);
        totalAmount += item.price * item.quantity;
    });
    
    total.textContent = `$${totalAmount.toFixed(2)}`;
}

function checkout() {
    if (cart.length === 0) {
        showToast('Tu carrito está vacío');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    setTimeout(() => {
        alert(`¡Compra realizada con éxito!\nTotal: $${total.toFixed(2)}\nGracias por tu compra.`);
        cart = [];
        saveCart();
        updateCartUI();
        renderCartItems();
        closeCartModal();
        showToast('¡Compra realizada con éxito!');
    }, 1000);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (!toast || !toastMessage) return;
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Event listeners
function setupEventListeners() {
    // Enlaces de navegación
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.dataset.category;
            if (category) {
                showCategory(category);
                
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
            }
        });
    });

    // Botón del carrito
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', openCartModal);
    }

    // Botones del modal
    const closeCartBtn = document.getElementById('closeCartBtn');
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCartModal);
    }

    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }

    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }

    // Controles de cantidad en detalles
    const decreaseBtn = document.getElementById('decreaseQtyDetail');
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', () => {
            const qty = document.getElementById('quantityDetail');
            if (qty) {
                const current = parseInt(qty.textContent);
                if (current > 1) qty.textContent = current - 1;
            }
        });
    }
    
    const increaseBtn = document.getElementById('increaseQtyDetail');
    if (increaseBtn) {
        increaseBtn.addEventListener('click', () => {
            const qty = document.getElementById('quantityDetail');
            if (qty) {
                const current = parseInt(qty.textContent);
                qty.textContent = current + 1;
            }
        });
    }
    
    const addToCartDetailBtn = document.getElementById('addToCartDetail');
    if (addToCartDetailBtn) {
        addToCartDetailBtn.addEventListener('click', () => {
            if (currentProduct) {
                const qty = document.getElementById('quantityDetail');
                const quantity = qty ? parseInt(qty.textContent) : 1;
                addToCart(currentProduct.id, quantity);
            }
        });
    }
    
    // Búsqueda
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filtered = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm)
            );
            displayProducts(filtered);
        });
    }

    // Cerrar modal al hacer click fuera
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) closeCartModal();
        });
    }
}

/* ================================
   DATA KERANJANG
================================ */

let cart = [];

// daftar harga produk (HARUS SAMA DENGAN YANG DI DISPLAY)
const priceList = {
    "Mangga": 12000,
    "Anggur": 12000,
    "Oreo": 10000,
    "Mix": 15000,
    "Elisabeth Special": 999999
};

/* ================================
   LOCAL STORAGE
================================ */

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
    const saved = localStorage.getItem("cart");
    if (saved) {
        cart = JSON.parse(saved);
        updateCartBadge();
        updateCartPopup();
    }
}

document.addEventListener("DOMContentLoaded", loadCart);

/* ================================
   CART BADGE
================================ */

function updateCartBadge() {
    const badge = document.getElementById("cartCount");
    if (!badge) return;

    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

    badge.style.display = totalQty > 0 ? "flex" : "none";
    badge.textContent = totalQty;
}

/* ================================
   TOAST NOTIFICATION
================================ */

function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

/* ================================
   ADD TO CART
================================ */

function addToCart(productName) {
    const existing = cart.find(item => item.name === productName);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({
            name: productName,
            price: priceList[productName],
            qty: 1
        });
    }

    saveCart();
    updateCartPopup();
    updateCartBadge();
    showToast(productName + " ditambahkan ke keranjang 🛒");
}

/* ================================
   POPUP KERANJANG
================================ */

function openCart() {
    document.getElementById("cartPopup").style.display = "flex";
    updateCartPopup();
}

function closeCart() {
    document.getElementById("cartPopup").style.display = "none";
}

function updateCartPopup() {
    const list = document.getElementById("cartList");
    if (!list) return;

    list.innerHTML = "";

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "cart-item";

        li.innerHTML = `
            <span>
                ${item.name} × ${item.qty}<br>
                <small>Rp ${(item.price * item.qty).toLocaleString()}</small>
            </span>
            <div>
                <button class="qty-btn" onclick="decreaseQty(${index})">−</button>
                <button class="qty-btn" onclick="increaseQty(${index})">+</button>
                <button class="remove-btn" onclick="removeFromCart(${index})">✖</button>
            </div>
        `;
        list.appendChild(li);
    });
}

/* ================================
   QTY CONTROL
================================ */

function increaseQty(index) {
    cart[index].qty++;
    saveCart();
    updateCartPopup();
    updateCartBadge();
}

function decreaseQty(index) {
    if (cart[index].qty > 1) {
        cart[index].qty--;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
    updateCartPopup();
    updateCartBadge();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartPopup();
    updateCartBadge();
}

/* ================================
   CHECKOUT
================================ */

function openCheckout() {
    const popup = document.getElementById("checkoutPopup");
    popup.classList.add("active");

    let produkText = "";
    let total = 0;

    cart.forEach(item => {
        produkText += `${item.name} × ${item.qty}\n`;
        total += item.price * item.qty;
    });

    document.getElementById("produkCheckout").value = produkText.trim();
    document.getElementById("totalHarga").textContent =
        "Rp " + total.toLocaleString();
}

function closeCheckout() {
    document.getElementById("checkoutPopup").classList.remove("active");
}

function openCart() {
    document.getElementById("cartPopup").classList.add("active");
    updateCartPopup();
}

function closeCart() {
    document.getElementById("cartPopup").classList.remove("active");
}

function openAbout() {
    document.getElementById("aboutPopup").classList.add("active");
}

function closeAbout() {
    document.getElementById("aboutPopup").classList.remove("active");
}

function openThanks() {
    document.getElementById("thanksPopup").classList.add("active");
}

function closeThanks() {
    document.getElementById("thanksPopup").classList.remove("active");
}


/* ================================
   WHATSAPP CHECKOUT
================================ */

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".checkout-form");
    if (!form) return;

    form.addEventListener("submit", e => {
        e.preventDefault();

        if (cart.length === 0) {
            alert("Keranjang masih kosong.");
            return;
        }

        const nama = document.getElementById("nama").value.trim();
        let wa = document.getElementById("wa").value.trim();
        const alamat = document.getElementById("alamat").value.trim();
        const catatan = document.getElementById("catatan").value.trim();

        if (!nama || !wa || !alamat) {
            alert("Nama, WA, dan alamat wajib diisi.");
            return;
        }

        wa = wa.replace(/\s+/g, "");
        if (wa.startsWith("08")) wa = "62" + wa.slice(1);
        if (!/^62\d{8,13}$/.test(wa)) {
            alert("Nomor WhatsApp tidak valid.");
            return;
        }

        let pesan = `Halo admin 👋\nSaya mau pesan Sandwich Sandalan 🍓\n\n`;
        pesan += `Nama: ${nama}\nAlamat:\n${alamat}\n\nPesanan:\n`;

        let total = 0;
        cart.forEach(item => {
            pesan += `- ${item.name} × ${item.qty}\n`;
            total += item.price * item.qty;
        });

        pesan += `\nTotal: Rp ${total.toLocaleString()}\n`;
        pesan += `Pengiriman: COD\n`;
        if (catatan) pesan += `Catatan:\n${catatan}\n`;
        pesan += `\nTerima kasih 🙏`;

        window.open(
            `https://wa.me/6289630240936?text=${encodeURIComponent(pesan)}`,
            "_blank"
        );

        setTimeout(() => {
            openThanks();
            cart = [];
            saveCart();
            updateCartBadge();
            updateCartPopup();
            closeCheckout();
        }, 500);
    });
});

/* ================================
   EFEK SAKURA
================================ */

function createSakura() {
    const sakura = document.createElement("div");
    sakura.className = "sakura";
    sakura.textContent = "🌸";
    sakura.style.left = Math.random() * 100 + "vw";
    sakura.style.fontSize = Math.random() * 10 + 14 + "px";
    sakura.style.animationDuration = (Math.random() * 8 + 10) + "s";

    document.getElementById("sakura-container").appendChild(sakura);
    setTimeout(() => sakura.remove(), 18000);
}

setInterval(createSakura, 800);

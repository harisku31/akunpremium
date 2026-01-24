// =======================
// DATA CART (TANPA DATABASE)
// =======================
let cart = [];

// =======================
// TOGGLE ORDER
// =======================
function toggleOrder(btn){
  const card = btn.closest(".product-card");
  const name = card.dataset.name;
  const price = parseInt(card.dataset.price, 10);

  if(card.classList.contains("active")){
    // BATAL
    cart = cart.filter(item => item.name !== name);
    card.classList.remove("active");
    btn.innerText = "Order";
  }else{
    // ORDER
    cart.push({ name, price });
    card.classList.add("active");
    btn.innerText = "Batal";
  }

  updateFloatingTotal();
}

// =======================
// UPDATE TOTAL FLOATING
// =======================
function updateFloatingTotal(){
  const ft = document.getElementById("floatingTotal");
  let total = 0;

  cart.forEach(item => {
    total += item.price;
  });

  if(total > 0){
    ft.style.display = "block";
    ft.innerText = "Total: Rp " + total.toLocaleString("id-ID");
  }else{
    ft.style.display = "none";
    ft.innerText = "Total: Rp 0";
  }
}

// =======================
// RENDER CART MODAL
// =======================
function renderCart(){
  const list = document.getElementById("cartList");
  const totalEl = document.getElementById("totalHarga");

  list.innerHTML = "";
  let total = 0;

  if(cart.length === 0){
    list.innerHTML = "Belum ada pesanan.";
  }else{
    cart.forEach(item => {
      list.innerHTML += `
        <div class="cart-item">
          <span>${item.name}</span>
          <span>Rp ${item.price.toLocaleString("id-ID")}</span>
        </div>
      `;
      total += item.price;
    });
  }

  totalEl.innerText = "Total: Rp " + total.toLocaleString("id-ID");
}

// =======================
// MODAL CONTROL
// =======================
function openCart(){
  document.getElementById("cartModal").style.display = "flex";
  document.body.classList.add("modal-open");
  renderCart();
}

function closeCart(){
  document.getElementById("cartModal").style.display = "none";
  document.body.classList.remove("modal-open");
}

function openPay(){
  closeCart();
  document.getElementById("payModal").style.display = "flex";
  document.body.classList.add("modal-open");
}

function closePayWithNotice(){
  alert(
    "NOTIFIKASI:\n" +
    "Jika sudah melakukan pembayaran,\n" +
    "harap kirim bukti screenshot ke WhatsApp Admin."
  );
  document.getElementById("payModal").style.display = "none";
  document.body.classList.remove("modal-open");
}

// =======================
// WHATSAPP ORDER
// =======================
function pesanWA(){
  if(cart.length === 0){
    alert("Keranjang masih kosong!");
    return;
  }

  let text = "Halo kak, saya mau order:%0A";
  let total = 0;

  cart.forEach(item => {
    text += "- " + item.name + "%0A";
    total += item.price;
  });

  text += "%0ATotal: Rp " + total.toLocaleString("id-ID");

  window.open(
    "https://wa.me/6281809730331?text=" + text,
    "_blank"
  );
}

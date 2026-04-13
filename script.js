const prices = {
  alphonso: 1200,
  kesar: 900,
  badami: 700
};

const a = document.getElementById("alphonso");
const k = document.getElementById("kesar");
const b = document.getElementById("badami");

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const addressInput = document.getElementById("address");

const totalDisplay = document.getElementById("total");
const orderBtn = document.getElementById("orderBtn");

let finalMessage = "";

// TOTAL
function updateTotal() {
  let total =
    (a.value * prices.alphonso) +
    (k.value * prices.kesar) +
    (b.value * prices.badami);

  totalDisplay.innerText = "Total: ₹" + total;
}

[a, k, b].forEach(i => i.addEventListener("input", updateTotal));

// ORDER
orderBtn.addEventListener("click", () => {
  let name = nameInput.value.trim();
  let phone = phoneInput.value.trim();
  let address = addressInput.value.trim();

  if (!name || !phone || !address) {
    alert("Fill all details");
    return;
  }

  let total =
    (a.value * prices.alphonso) +
    (k.value * prices.kesar) +
    (b.value * prices.badami);

  let order = {
    id: Date.now(),
    name,
    phone,
    address,
    alphonso: a.value,
    kesar: k.value,
    badami: b.value,
    status: "Pending"
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  finalMessage = `Farmingo Order

Name: ${name}
Phone: ${phone}

Alphonso: ${a.value}
Kesar: ${k.value}
Badami: ${b.value}

Total: ₹${total}

Address: ${address}`;

  document.getElementById("popup").style.display = "flex";
});

// WHATSAPP
function sendToWhatsApp() {
  let url = `https://wa.me/9967335135?text=${encodeURIComponent(finalMessage)}`;
  window.open(url, "_blank");
  document.getElementById("popup").style.display = "none";
}
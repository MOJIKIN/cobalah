const fruits = ["🍒", "🍋", "🍇", "🍉", "🍍", "🍌", "🥭"]; // Simbol buah acak
let isSpinning = false;

function spin() {
  if (isSpinning) return; // Cegah spin jika masih berjalan
  isSpinning = true;

  const slots = [document.getElementById("slot1"), document.getElementById("slot2"), document.getElementById("slot3")];
  const speeds = [100, 150, 200]; // Kecepatan berbeda untuk tiap slot
  const results = [];

  // Fungsi untuk memulai animasi pada tiap slot
  slots.forEach((slot, index) => {
    let counter = 0;

    const interval = setInterval(() => {
      slot.textContent = fruits[Math.floor(Math.random() * fruits.length)];
      counter++;

      // Berhenti setelah waktu tertentu
      if (counter >= 30 + index * 5) { // Durasi berbeda untuk tiap slot
        clearInterval(interval);
        results[index] = slot.textContent;

        // Cek apakah semua slot sudah selesai
        if (results.filter(Boolean).length === slots.length) {
          isSpinning = false;
          checkResult(results);
        }
      }
    }, speeds[index]);
  });
}

// Fungsi untuk mengecek hasil
function checkResult(results) {
  const balanceEl = document.getElementById("balance");
  const betAmount = parseInt(document.getElementById("bet").value, 10);
  const balance = parseInt(balanceEl.textContent, 10);

  if (results[0] === results[1] && results[1] === results[2]) {
    const reward = betAmount * 5; // Menang: 5x taruhan
    balanceEl.textContent = balance + reward;
    document.getElementById("result").textContent = `Congratulations! You won ${reward}! 🎉`;
  } else {
    balanceEl.textContent = balance - betAmount;
    document.getElementById("result").textContent = "Try again!";
  }
}

// Fungsi untuk Top Up
function topUp() {
  const balanceEl = document.getElementById("balance");
  const currentBalance = parseInt(balanceEl.textContent, 10);
  balanceEl.textContent = currentBalance + 10000; // Tambah saldo
  document.getElementById("result").textContent = "You topped up 10000!";
}

// ===== Variabel =====
let layarNode = document.getElementById("layar");
let riwayatNode = document.getElementById("riwayat");

let angkaSekarang = "0"; // angka yang sedang diketik
let angkaSebelumnya = null; // angka pertama
let operatorAktif = null; // + - * /
let resetLayar = false; // true setelah operator / hasil

// ===== Function =====
const tampilkan = () => {
  layarNode.innerHTML = angkaSekarang;
};

const tekanAngka = (digit) => {
  if (resetLayar || angkaSekarang === "0") {
    angkaSekarang = digit;
    resetLayar = false;
  } else {
    angkaSekarang = angkaSekarang + digit;
  }
  tampilkan();
};

const tekanDesimal = () => {
  if (resetLayar) {
    angkaSekarang = "0";
    resetLayar = false;
  }
  if (!angkaSekarang.includes(".")) {
    angkaSekarang = angkaSekarang + ".";
  }
  tampilkan();
};

const hitung = (a, b, operator) => {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) {
        return "Error";
      }
      return a / b;
    default:
      return b;
  }
};

const tekanOperator = (operator) => {
  // Jika sudah ada operator sebelumnya, hitung dulu
  if (operatorAktif !== null && !resetLayar) {
    sama();
  }
  angkaSebelumnya = parseFloat(angkaSekarang);
  operatorAktif = operator;
  resetLayar = true;
  riwayatNode.innerHTML = `${angkaSebelumnya} ${operator}`;
};

const sama = () => {
  if (operatorAktif === null) {
    return;
  }
  let angkaKedua = parseFloat(angkaSekarang);
  let hasil = hitung(angkaSebelumnya, angkaKedua, operatorAktif);

  riwayatNode.innerHTML = `${angkaSebelumnya} ${operatorAktif} ${angkaKedua} =`;

  if (hasil === "Error") {
    angkaSekarang = "Error";
  } else {
    // toPrecision supaya 0.1 + 0.2 = 0.3
    angkaSekarang = String(parseFloat(hasil.toPrecision(12)));
  }
  operatorAktif = null;
  resetLayar = true;
  tampilkan();
};

const hapusSemua = () => {
  angkaSekarang = "0";
  angkaSebelumnya = null;
  operatorAktif = null;
  resetLayar = false;
  riwayatNode.innerHTML = "";
  tampilkan();
};

const hapusSatu = () => {
  if (angkaSekarang.length > 1) {
    angkaSekarang = angkaSekarang.slice(0, -1);
  } else {
    angkaSekarang = "0";
  }
  tampilkan();
};

// ===== Event Listener =====
document.querySelectorAll(".angka").forEach((tombol) => {
  tombol.addEventListener("click", () => tekanAngka(tombol.innerHTML));
});

document.querySelectorAll("[data-operator]").forEach((tombol) => {
  tombol.addEventListener("click", () =>
    tekanOperator(tombol.getAttribute("data-operator"))
  );
});

document.getElementById("desimal").addEventListener("click", tekanDesimal);
document.getElementById("sama").addEventListener("click", sama);
document.getElementById("hapusSemua").addEventListener("click", hapusSemua);
document.getElementById("hapusSatu").addEventListener("click", hapusSatu);

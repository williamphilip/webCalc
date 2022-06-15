// object calculator yang didalamnya terdapat properti yang menggambarkan data & kondisi dari kalkulatornya
const calculator = {
  displayNumber: '0',
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false
};

// fungsi untuk mengupdate angka pada layar
function updateDisplay() {
  document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

// fungsi untuk menghapus data pada kalkulator
function clearCalculator() {
  calculator.displayNumber = '0';
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.waitingForSecondNumber = false;
}

// fungsi untuk memasukkan angka ke dalam nilai displayNumber kalkulator
function inputDigit(digit) {
  // kondisi dimana jika displayNumber bernilai '0', maka angka yang pertama dimasukkan pengguna akan menggantikan keseluruhan nilai displayNumber
  if(calculator.displayNumber === '0') {
    calculator.displayNumber = digit;
  } else {
    // penulisan sama dengan calculator.displayNumber = calculator.displayNumber + digit
    calculator.displayNumber += digit; 
  }  
}

// Fungsi inverseNumber() cukuplah simple karena kita hanya perlu melakukan perkalian displayNumber dengan -1, terkecuali jika displayNumber masih bernilai ‘0’ maka perkalian tidak akan dilakukan.
function inverseNumber() {
  if (calculator.displayNumber === '0') {
      return;
  }
  calculator.displayNumber = calculator.displayNumber * -1;
}

// fungsi untuk menetapkan sebuah operator, baik itu + atau - pada kalkulator
function handleOperator(operator) {
  if (!calculator.waitingForSecondNumber) {
      calculator.operator = operator;
      calculator.waitingForSecondNumber = true;
      calculator.firstNumber = calculator.displayNumber;

      // mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
      calculator.displayNumber = '0';
  } else {
      alert('Operator sudah ditetapkan')
  }
}

// Fungsi ini digunakan untuk melakukan kalkulasi terhadap nilai - nilai yang terdapat pada objek calculator, sehingga pastikan kalkulator sudah memiliki nilai operator dan firstNumber ketika fungsi ini dijalankan.
function performCalculation() {
  // pengecekan nilai-nilai yang dibutuhkan untuk melakukan kalkulasi
  if (calculator.firstNumber == null || calculator.operator == null) {
      // Jika tidak terpenuhi maka proses akan dihentikan
      alert("Anda belum menetapkan operator");
      return;
  }

  let result = 0;
  // pengecekan tipe operator apa yang akan dilakukan
  if (calculator.operator === "+") {
      result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
  } else {
      result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
  }

  // variabel baru dengan nama history yang merupakan objek dari data history yang akan dikirimkan
  const history = {
    firstNumber: calculator.firstNumber,
    secondNumber: calculator.displayNumber,
    operator: calculator.operator,
    result: result
  }

  // memanggil fungsi putHistory() dengan mengirimkan variabel history sebagai argumen fungsinya
  putHistory(history);
  calculator.displayNumber = result;
  // panggil fungsi renderHistory() agar riwayat kalkulasi langsung tampil pada tabel setelah kalkulasi dilakukan.
  renderHistory();
}



// membuat variabel buttons dengan menginisialisasikan nilai seluruh elemen button yang ada, dan memberikan EVENT click pada tiap elemennya
const buttons = document.querySelectorAll(".button");

// Untuk mendapatkan nilai seluruh elemen button kita gunakan querySelectorAll(“.button”) kemudian kita looping nilainya dan berikan event click pada tiap itemnya.
for (let button of buttons) {
  button.addEventListener('click', function(event) {

    // mendapatkan object elemen yang diklik
    const target = event.target;

    // kondisi dimana ketika event target merupakan elemen yang menerapkan class clear maka kita akan panggil fungsi clearCalculator(). 
    if(target.classList.contains('clear')) {
      clearCalculator();
      updateDisplay();
      return;
    }

    if(target.classList.contains('negative')) {
      inverseNumber();
      updateDisplay();
      return;
    }

    if(target.classList.contains('equals')) {
      performCalculation();
      updateDisplay();
      return;
    }

    if(target.classList.contains('operator')) {
      handleOperator(target.innerText);
      return;
    }

    inputDigit(target.innerText);
    updateDisplay()

  });
}
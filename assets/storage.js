// Variable ini digunakan sebagai key untuk mengakses & menyimpan data pada localStorage
const CACHE_KEY = "calculation_history";

// fungsi checkForStorage dengan mengembalikan nilai boolean dari pengecekan fitur Storage pada browser. Fungsi tersebut akan kita gunakan di dalam if statement setiap fungsi transaksi pada localStorage.
function checkForStorage() {
  return typeof(Storage) !== "undefined"
}

// fungsi ini untuk menyimpan data riwayat kalkulasi pada localStorage. Fungsi tersebut memiliki satu argumen yang merupakan data dari hasil kalkulasi yang nantinya akan dimasukkan ke dalam localStorage.
function putHistory(data) {
  if (checkForStorage()) {
      let historyData = null;
      if (localStorage.getItem(CACHE_KEY) === null) {
          historyData = [];
      } else {
          historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
      }

      historyData.unshift(data);

      if (historyData.length > 5) {
          historyData.pop();
      }

      localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
  }
}

/*
Keterangan Kode sbb:
1. JSON.parse() -- digunakan untuk mengubah nilai objek dalam bentuk string kembali pada bentuk objek javascript.
2. JSON.stringify() -- digunakan untuk mengubah objek javascript ke dalam string.
3. unshift() -- digunakan untuk menambahkan nilai baru pada array yang ditempatkan pada awal index. fungsi ini juga mengembalikkan nilai panjang array setelah ditambahkan dengan nilai baru.
4. pop() -- digunakan untuk menghapus nilai index terakhir pada array.

*/

// fungsi untuk mendapatkan data dari localStorage. Kita namakan fungsi tersebut “showHistory().", Fungsi ini mengembalikan nilai array dari localStorage jika sudah memiliki nilai sebelumnya melalui JSON.parse(). Namun jika localStorage masih kosong, fungsi ini akan mengembalikan nilai array kosong.
function showHistory() {
  if (checkForStorage()) {
      return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
  } else {
      return [];
  }
}

// fungsi untuk merender data riwayat kalkulasi pada tabel HTML. Fungsi ini diberi nama dengan renderHistory()
function renderHistory() {
  const historyData = showHistory();
  let historyList = document.querySelector("#historyList");


  // selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
  historyList.innerHTML = "";


  for (let history of historyData) {
      let row = document.createElement('tr');
      row.innerHTML = "<td>" + history.firstNumber + "</td>";
      row.innerHTML += "<td>" + history.operator + "</td>";
      row.innerHTML += "<td>" + history.secondNumber + "</td>";
      row.innerHTML += "<td>" + history.result + "</td>";


      historyList.appendChild(row);
  }
}

// panggil fungsi renderHistory(); agar data history muncul ketika website pertama kali dijalankan.
renderHistory();
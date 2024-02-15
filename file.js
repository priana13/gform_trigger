// Fungsi ini akan dipanggil ketika formulir di-submit
function onSubmitForm(event) {

    var formData = event.namedValues; // Mendapatkan data dari formulir
  
    console.log(formData);
    
    sendDataToEndpoint(formData);
  }
  
  // Fungsi untuk mengirimkan data ke endpoint dengan metode POST
  function sendDataToEndpoint(formData) {   
  
    var hp_value = formData['judul_label_form'][0];
    
    var hp = convertToIndonesianPhoneNumber(hp_value);
    var nama = formData['Nama Panggilan'][0];
  
    var options = {
      'method': 'post',
      'contentType': 'application/x-www-form-urlencoded',
      'payload': {
        'appkey': '04489b0d-edee-4295-ab98-xxxxx',
        'authkey': 'FrYToXPhifE1Rxxxxxx',
        'to': hp, // Menggunakan data dari formulir, misalnya nomor penerima di kolom kedua
        'message': "Terimakasih "+ nama +" sudah mendaftar, nantikan konfirmasi selanjutnya via whatsapp ini" // Menggunakan data dari formulir, misalnya pesan di kolom ketiga
      }
    };
  
    // Kirim permintaan POST ke endpoint
    var response = UrlFetchApp.fetch('https://app.saungwa.com/api/create-message', options);
  
    // Tambahkan penanganan respons di sini jika diperlukan
    Logger.log(response.getContentText());
  }
  
  
  function convertToIndonesianPhoneNumber(phoneNumber) {
      // Menghapus karakter selain angka
      phoneNumber = phoneNumber.replace(/\D/g, '');
      
      // Menghapus kode negara jika sudah ada
      if (phoneNumber.startsWith('0')) {
          phoneNumber = phoneNumber.slice(1);
      } else if (phoneNumber.startsWith('62')) {
          phoneNumber = phoneNumber.slice(3);
      }
  
      // Menambahkan kode negara +62 di depan nomor
      phoneNumber = '62' + phoneNumber;
  
      return phoneNumber;
  }
  
  
  
  
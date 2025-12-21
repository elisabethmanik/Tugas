<?php
// =====================================
// KONFIGURASI
// =====================================
$admin_email = "azzahrafaradilla123@gmail.com";     // Email admin
$admin_wa    = "6285694994322";                     // Nomor WhatsApp admin (format internasional)


// =====================================
// VALIDASI FORM
// =====================================
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die("Akses ditolak! Form tidak dikirim dengan benar.");
}

// Ambil data dari form dengan keamanan dasar
$nama    = isset($_POST['nama']) ? htmlspecialchars($_POST['nama']) : '';
$wa      = isset($_POST['wa']) ? htmlspecialchars($_POST['wa']) : '';
$produk  = isset($_POST['produk']) ? htmlspecialchars($_POST['produk']) : '';
$catatan = isset($_POST['catatan']) ? htmlspecialchars($_POST['catatan']) : '';

// Cek wajib isi
if (empty($nama) || empty($wa) || empty($produk)) {
    die("Harap isi semua data penting (Nama, WA, Produk).");
}


// =====================================
// FORMAT PESAN
// =====================================
$message = "=== Pesanan Baru ===\n";
$message .= "Nama: $nama\n";
$message .= "Nomor WA: $wa\n";
$message .= "Produk: $produk\n";
$message .= "Catatan: $catatan\n";


// =====================================
// KIRIM EMAIL KE ADMIN
// =====================================

$subject = "Pesanan Baru - $nama";
$headers = "From: noreply@yourdomain.com\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Kirim email
@mail($admin_email, $subject, $message, $headers);


// =====================================
// REDIRECT KE WHATSAPP ADMIN
// =====================================
$wa_text = urlencode($message);
$wa_link = "https://wa.me/$admin_wa?text=$wa_text";

header("Location: $wa_link");
exit();

?>

/**
 * Keadaan pendaftaran, dan ke mana orang dikirim untuk mendaftar.
 *
 * ── Kenapa keadaannya DIHITUNG, bukan diketik ─────────────────────────────
 *
 * Sebelum ini halaman pendaftaran memaku tulisan "CLOSE REGISTRATION" di
 * dalam kode, dan judulnya masih menyebut "GYIIF 2025" — dua edisi tertinggal.
 * Tombolnya pun menunjuk ke halaman itu sendiri, jadi mengkliknya tidak
 * membawa ke mana-mana.
 *
 * Itu bukan kelalaian orangnya: keadaan yang harus diubah tangan di dalam
 * kode akan selalu tertinggal, karena yang mengingatnya harus orang dan yang
 * mengubahnya harus programmer. Tanggalnya sudah ada di dasbor; keadaannya
 * diturunkan dari sana.
 *
 * ── Kenapa pendaftarannya diarahkan ke dasbor, bukan diformulirkan di sini ─
 *
 * Mendaftar menulis peserta, tim, pembimbing, dan tagihan sekaligus, lalu
 * memicu email undangan. Formulir enam langkah di dasbor sudah menangani
 * anggota yang bertambah, peserta warga negara asing, unggah berkas, dan
 * pembayaran.
 *
 * Menulis ulang semuanya di sini berarti DUA formulir yang harus dirawat, dan
 * yang satu pasti tertinggal — persis seperti tulisan "GYIIF 2025" tadi.
 */

/** UUID edisi yang dituju formulir pendaftaran dasbor. */
const EVENT_ID = process.env.NEXT_PUBLIC_IYSA_EVENT_ID
  ?? 'a03c7f2e-5581-4642-aeb6-8ff25c1e3e15';

const DASBOR = process.env.NEXT_PUBLIC_IYSA_DASHBOARD
  ?? 'https://dashboard.iysa.or.id';

/**
 * Alamat pendaftaran.
 *
 * Menunjuk ke `/start`, bukan langsung ke formulirnya: di sana pendaftar
 * memverifikasi surelnya dengan kode enam digit lebih dulu. Melompatinya
 * membuat formulir terbuka tanpa tahu siapa yang mengisinya.
 */
export function urlPendaftaran() {
  return `${DASBOR}/register/${EVENT_ID}/start`;
}

/**
 * `belum` | `buka` | `tutup` | `tak_diketahui`
 *
 * `tak_diketahui` saat tanggalnya tidak ada — API mati, atau edisinya memang
 * belum menetapkan jendela pendaftaran. Dibedakan dari `tutup` dengan sengaja:
 * menampilkan "pendaftaran ditutup" karena API sedang mati adalah berbohong
 * kepada orang yang sebenarnya masih boleh mendaftar.
 */
export function keadaanPendaftaran(identitas, sekarang = new Date()) {
  const buka = identitas?.pendaftaran_buka;
  const tutup = identitas?.pendaftaran_tutup;
  if (!buka && !tutup) return 'tak_diketahui';

  const t = sekarang.getTime();
  // Tanggal dari API berbentuk `YYYY-MM-DD` tanpa jam. Penutupan dihitung
  // sampai AKHIR harinya — pendaftaran yang "tutup 18 Desember" masih boleh
  // masuk pada 18 Desember malam, dan itu yang dipahami semua orang.
  const mulai = buka ? new Date(`${buka}T00:00:00+07:00`).getTime() : -Infinity;
  const akhir = tutup ? new Date(`${tutup}T23:59:59+07:00`).getTime() : Infinity;

  if (t < mulai) return 'belum';
  if (t > akhir) return 'tutup';
  return 'buka';
}

/** "26 November 2026" — untuk dipajang, bukan untuk dihitung. */
export function tanggalPanjang(iso, locale = 'id-ID') {
  if (!iso) return null;
  const d = new Date(`${iso}T00:00:00+07:00`);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
}

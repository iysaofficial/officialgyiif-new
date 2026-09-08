/**
 * Keadaan pendaftaran edisi yang sedang disiarkan.
 *
 * ── Kenapa keadaannya DIBACA, bukan diketik ───────────────────────────────
 *
 * Sebelum ini halaman pendaftaran memaku tulisan "CLOSE REGISTRATION" di
 * dalam kode, dan judulnya masih menyebut "GYIIF 2025" — dua edisi tertinggal.
 * Tombolnya pun menunjuk ke halaman itu sendiri, jadi mengkliknya tidak
 * membawa ke mana-mana.
 *
 * Itu bukan kelalaian orangnya: keadaan yang harus diubah tangan di dalam kode
 * akan selalu tertinggal, karena yang mengingatnya harus orang dan yang
 * mengubahnya harus programmer. Sekarang ia datang dari dasbor.
 *
 * ── Formulirnya di situs ini, datanya di dasbor ───────────────────────────
 *
 * Mendaftar menulis peserta, tim, pembimbing, dan tagihan sekaligus, lalu
 * memicu surel undangan. Semua itu tetap dikerjakan dasbor — situs ini tidak
 * menyentuh satu tabel pun.
 *
 * Yang dirender di sini cuma formulirnya, lewat berkas sisipan dari API
 * dasbor. Jadi tetap SATU formulir yang dirawat, dan pendaftar tidak pernah
 * meninggalkan gyiif.or.id di langkah yang paling menentukan.
 */

/**
 * `belum` | `buka` | `tutup` | `tak_diketahui`
 *
 * ── Yang memutuskan adalah TOGEL di dasbor, bukan tanggalnya ──────────────
 *
 * Versi pertama menghitungnya dari `pendaftaran_buka`/`pendaftaran_tutup`.
 * Akibatnya panitia menyalakan togel "Pendaftaran Terbuka" di dasbor dan
 * situs ini tetap berkata belum — dua sumber kebenaran untuk satu pertanyaan,
 * dan yang membaca layar tidak punya cara tahu mana yang menang.
 *
 * Sekarang `pendaftaran_dibuka` yang menentukan. Tanggalnya tetap dipakai,
 * tapi untuk MENJELASKAN: yang datang sebelum tanggal rencana diberi tahu
 * kapan harus kembali, dan yang datang setelah tanggal rencana sementara
 * pendaftarannya sudah ditutup diberi tahu bahwa ia terlambat — bukan bahwa
 * halamannya rusak.
 *
 * `tak_diketahui` saat API tidak menjawab sama sekali. Dibedakan dari `tutup`
 * dengan sengaja: menampilkan "pendaftaran ditutup" karena API sedang mati
 * adalah berbohong kepada orang yang sebenarnya masih boleh mendaftar.
 */
export function keadaanPendaftaran(identitas, sekarang = new Date()) {
  if (!identitas) return 'tak_diketahui';
  if (identitas.pendaftaran_dibuka) return 'buka';

  /*
   * Togelnya mati. Tanggalnya cuma menentukan KALIMAT mana yang lebih
   * menolong — "belum dibuka, kembali tanggal sekian" atau "sudah lewat".
   */
  const buka = identitas.pendaftaran_buka;
  const tutup = identitas.pendaftaran_tutup;
  if (!buka && !tutup) return 'tak_diketahui';

  /*
   * Dibandingkan sebagai STRING `YYYY-MM-DD`, bukan sebagai `Date`.
   *
   * Urutan leksikografis `YYYY-MM-DD` sama persis dengan urutan kalendernya,
   * jadi perbandingannya benar tanpa menyentuh zona waktu — dan zona waktulah
   * yang membuat server dan peramban sempat berbeda satu hari.
   *
   * "Hari ini" tetap dihitung menurut WIB: itu zona tempat panitianya bekerja
   * dan tempat tenggatnya diumumkan.
   */
  const hariIni = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Jakarta', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(sekarang);
  return hariIni < buka ? 'belum' : 'tutup';
}

const BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

/**
 * "26 November 2026" — untuk dipajang, bukan untuk dihitung.
 *
 * ── Kenapa TIDAK memakai toLocaleDateString ───────────────────────────────
 *
 * Versi pertama memakainya, dan hasilnya berbeda antara server dan peramban:
 * server mengirim "25 November 2026", peramban menggambar "26 November 2026".
 * Selisih tepat satu hari, dan React menjatuhkannya sebagai hydration
 * mismatch — galat #418, #423, dan #425 sekaligus di konsol pengunjung.
 *
 * Sebabnya zona waktu. `new Date('2026-11-26T00:00:00+07:00')` adalah
 * 25 November pukul 17:00 UTC. `toLocaleDateString` tanpa opsi `timeZone`
 * memakai zona waktu MESIN yang menjalankannya: Vercel di UTC menulis 25,
 * peramban di Jakarta menulis 26.
 *
 * Yang datang dari API sudah berbentuk `YYYY-MM-DD` — sebuah tanggal kalender,
 * bukan sebuah titik waktu. Mengubahnya jadi `Date` lebih dulu berarti
 * memberinya jam yang tidak pernah dimaksudkan, lalu menerjemahkannya kembali
 * lewat zona waktu yang berbeda-beda. Dipotong langsung dari stringnya, tidak
 * ada zona waktu yang terlibat sama sekali, dan hasilnya identik di mana pun.
 */
export function tanggalPanjang(iso) {
  if (typeof iso !== 'string') return null;
  const cocok = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!cocok) return null;
  const bulan = BULAN[Number(cocok[2]) - 1];
  if (!bulan) return null;
  return `${Number(cocok[3])} ${bulan} ${cocok[1]}`;
}

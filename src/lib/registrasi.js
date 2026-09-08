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

  const t = sekarang.getTime();
  const mulai = buka ? new Date(`${buka}T00:00:00+07:00`).getTime() : -Infinity;
  return t < mulai ? 'belum' : 'tutup';
}

/** "26 November 2026" — untuk dipajang, bukan untuk dihitung. */
export function tanggalPanjang(iso, locale = 'id-ID') {
  if (!iso) return null;
  const d = new Date(`${iso}T00:00:00+07:00`);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
}

/**
 * Penghubung ke API publik dasbor IYSA.
 *
 * ── Kenapa lewat satu berkas, bukan fetch di tiap halaman ─────────────────
 *
 * Situs ini akan memakai lebih dari satu seksi seiring waktu — timeline,
 * awards, dokumentasi. Kalau tiap halaman memanggil sendiri, alamat API,
 * nama seri, dan penanganan kegagalannya tersebar, dan yang pertama berubah
 * pasti alamatnya.
 *
 * ── Kenapa kegagalan TIDAK dilempar ───────────────────────────────────────
 *
 * Situs ini hidup lebih dulu daripada API-nya, dan seluruh isinya masih
 * statis. API yang mati tidak boleh menjatuhkan halaman yang sebetulnya bisa
 * tampil sempurna tanpanya — ia cuma boleh membuat bagian yang bergantung
 * padanya kembali ke nilai bawaan.
 *
 * Karena itu setiap fungsi di sini mengembalikan `null` saat gagal, dan
 * pemanggilnya yang memutuskan apa yang ditampilkan.
 */

const BASIS = process.env.NEXT_PUBLIC_IYSA_API
  ?? 'https://api-dashboard.iysa.or.id/api/public/v1';

const SERI = process.env.NEXT_PUBLIC_IYSA_SERIES ?? 'GYIIF';

/**
 * Ambil beberapa seksi sekaligus.
 *
 * `sections` disaring di server, jadi halaman yang cuma butuh identitas tidak
 * menarik tujuh belas kelompok. Etag-nya tetap dihitung dari muatan penuh di
 * sisi sana, jadi penyaringan di sini tidak merusak cache siapa pun.
 */
export async function ambilSeksi(kunci, opsi = {}) {
  const daftar = Array.isArray(kunci) ? kunci : [kunci];
  const url = `${BASIS}/${encodeURIComponent(SERI)}?sections=${daftar.join(',')}`;

  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      // Dipakai `getStaticProps`, jadi ini berlaku saat halamannya dibangun
      // ulang — bukan tiap kunjungan.
      ...opsi,
    });
    if (!res.ok) return null;

    const json = await res.json();
    const seksi = json?.data?.sections;
    if (!Array.isArray(seksi)) return null;

    const hasil = {};
    for (const s of seksi) hasil[s.key] = s.isi;
    return hasil;
  } catch {
    // Jaringan putus, DNS gagal, API mati — semuanya berakhir sama: halaman
    // memakai nilai bawaannya. Tidak ada yang perlu dibedakan di sini.
    return null;
  }
}

/**
 * Identitas edisi yang sedang disiarkan seri ini.
 *
 * Yang menentukan edisi mana BUKAN situs ini, melainkan pin di dasbor. Jadi
 * saat GYIIF 2027 berganti ke 2028, tidak ada satu baris pun di sini yang
 * perlu disunting.
 */
export async function ambilIdentitas(opsi = {}) {
  const seksi = await ambilSeksi('identitas', opsi);
  return seksi?.identitas ?? null;
}

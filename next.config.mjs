/** @type {import('next').NextConfig} */

/**
 * Tujuan pendaftaran.
 *
 * Disebut sekali di sini dan sekali di `src/lib/registrasi.js`, dan keduanya
 * membaca env yang sama — jadi mengganti edisi cukup mengubah satu nilai di
 * Vercel, bukan dua tempat di kode.
 */
/**
 * Subdomain berjenama untuk pendaftaran.
 *
 * Dulu ia melempar ke `dashboard.iysa.or.id/register/<uuid-edisi>/start`, dan
 * uuid itu harus disunting tiap tahun. Sekarang tujuannya halaman pendaftaran
 * di situs ini sendiri, yang menentukan edisinya lewat pin di dasbor — jadi
 * tidak ada lagi id edisi yang tertulis di berkas ini.
 */
const HOST_DAFTAR = process.env.NEXT_PUBLIC_REGIST_HOST ?? "regist.gyiif.or.id";

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
        pathname: "/**", // Mengizinkan semua path dari domain ini
      },
    ],
  },

  /**
   * `regist.gyiif.or.id` → formulir pendaftaran di dasbor.
   *
   * ── Kenapa di sini, bukan lewat kolom redirect Vercel ────────────────────
   *
   * Kolom "Redirect to Another Domain" di Vercel hanya menerima DOMAIN, dan ia
   * meneruskan path apa adanya. Artinya `regist.gyiif.or.id/` akan mendarat di
   * `dashboard.iysa.or.id/` — halaman depan dasbor, bukan halaman daftar. Path
   * `/register/<id>/start` yang justru dibutuhkan tidak bisa dititipkan lewat
   * situ.
   *
   * ── Kenapa 307, bukan 301 ────────────────────────────────────────────────
   *
   * `permanent: false`. Tujuannya memuat UUID edisi, dan UUID itu berganti tiap
   * tahun. Redirect permanen disimpan peramban nyaris selamanya dan tidak
   * menanyakan ulang — jadi pendaftar yang pernah membuka alamat ini untuk
   * GYIIF 2027 akan dilempar ke edisi 2027 lagi pada 2028, tanpa satu pun cara
   * memberitahunya kecuali meminta ia membersihkan cache peramban.
   *
   * ── Kenapa `has: host`, bukan berkas terpisah ────────────────────────────
   *
   * Subdomain ini menempel ke proyek yang sama. Tanpa syarat host, aturannya
   * akan ikut mengalihkan `gyiif.or.id` juga — seluruh situsnya lenyap ke
   * dasbor.
   */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: HOST_DAFTAR }],
        destination: "/registration/homeregist",
        permanent: false,
      },

      /**
       * Enam alamat pendaftaran lama → satu halaman, jalurnya dititipkan.
       *
       * ── Apa yang ada di sana sebelumnya ────────────────────────────────
       *
       * `homeindo` dan `homeinter` dua halaman pemilih; `indo-offline`,
       * `indo-online`, `inter-offline`, dan `inter-online` formulir yang sama
       * disalin empat kali, ~700 baris masing-masing. Bedanya cuma dua:
       * daftar paket yang ditampilkan, dan bahasa halamannya.
       *
       * Keduanya sekarang jadi SATU LANGKAH di dalam formulirnya sendiri.
       * Paketnya sudah membawa `origin` dan `mode` di basis data, jadi
       * pilihannya dibaca dari data — dan ajang berskala nasional, yang tidak
       * punya paket internasional sama sekali, tidak ditanyai asal peserta.
       *
       * ── Kenapa dialihkan, bukan dihapus ────────────────────────────────
       *
       * Keempat formulir lama mengirim isian ke sebuah Google Apps Script,
       * bukan ke dasbor. Siapa pun yang masih menemukan alamatnya — lewat
       * penanda buku, hasil pencarian, atau tautan di grup WhatsApp angkatan
       * lalu — mendaftar ke sebuah spreadsheet yang tidak ada yang menunggu.
       * Menghapus halamannya menjadikannya 404; mengalihkannya membawa
       * orangnya ke formulir yang benar dengan pilihan yang sudah ia buat di
       * tautan yang ia klik masih utuh.
       *
       * ── Kenapa 307, bukan 301 ──────────────────────────────────────────
       *
       * `permanent: false`, dengan alasan yang sama seperti aturan di atas:
       * peramban menyimpan 301 nyaris selamanya dan berhenti bertanya. Kalau
       * suatu saat alamat-alamat ini dipakai kembali untuk sesuatu yang lain,
       * yang pernah membukanya tidak akan pernah sampai ke sana.
       */
      { source: "/registration/homeindo", destination: "/registration/homeregist?jalur=indo", permanent: false },
      { source: "/registration/homeinter", destination: "/registration/homeregist?jalur=inter", permanent: false },
      { source: "/registration/indo-offline", destination: "/registration/homeregist?jalur=indo-offline", permanent: false },
      { source: "/registration/indo-online", destination: "/registration/homeregist?jalur=indo-online", permanent: false },
      { source: "/registration/inter-offline", destination: "/registration/homeregist?jalur=inter-offline", permanent: false },
      { source: "/registration/inter-online", destination: "/registration/homeregist?jalur=inter-online", permanent: false },
    ];
  },
};

export default nextConfig;

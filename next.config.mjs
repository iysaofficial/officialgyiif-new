/** @type {import('next').NextConfig} */

/**
 * Tujuan pendaftaran.
 *
 * Disebut sekali di sini dan sekali di `src/lib/registrasi.js`, dan keduanya
 * membaca env yang sama — jadi mengganti edisi cukup mengubah satu nilai di
 * Vercel, bukan dua tempat di kode.
 */
const DASBOR = process.env.NEXT_PUBLIC_IYSA_DASHBOARD ?? "https://dashboard.iysa.or.id";
const EVENT_ID = process.env.NEXT_PUBLIC_IYSA_EVENT_ID ?? "a03c7f2e-5581-4642-aeb6-8ff25c1e3e15";

/** Subdomain berjenama untuk pendaftaran. */
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
        destination: `${DASBOR}/register/${EVENT_ID}/start`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

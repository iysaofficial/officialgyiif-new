import { useEffect, useState } from "react";
import Script from "next/script";
import Navigation from "../../components/navigation";
import { Footer } from "@/components/footer";
import { ambilIdentitas } from "@/lib/dashboardApi";
import { keadaanPendaftaran, tanggalPanjang } from "@/lib/registrasi";

/**
 * Pintu masuk pendaftaran.
 *
 * ── Apa yang berubah dan kenapa ───────────────────────────────────────────
 *
 * Halaman ini dulu memaku "CLOSE REGISTRATION" di dalam kode, menyebut
 * "GYIIF 2025" — dua edisi tertinggal — dan kedua tombolnya menunjuk ke
 * halaman ini sendiri, jadi mengkliknya tidak membawa ke mana-mana.
 *
 * Sekarang tahun, tanggal, dan buka-tutupnya datang dari dasbor. Tidak ada
 * lagi yang perlu disunting di kode saat pendaftaran dibuka atau ditutup.
 *
 * ── Kenapa formulirnya DI SINI, bukan di dasbor ───────────────────────────
 *
 * Versi sebelumnya melempar orang ke `dashboard.iysa.or.id/register/<uuid>`.
 * Itu bekerja, tapi memindahkan pendaftar ke tampilan yang sama sekali bukan
 * milik ajang ini — logo, warna, dan navigasinya berganti di tengah jalan,
 * tepat pada langkah yang paling menentukan.
 *
 * Sekarang formulirnya dirender di halaman ini lewat berkas sisipan dari API
 * dasbor. Yang mengurus pendaftarannya tetap dasbor — peserta, tim, tagihan,
 * dan surel undangan semuanya lahir di sana — tapi orangnya tidak pernah
 * meninggalkan gyiif.or.id.
 *
 * Wadahnya menyebut AKRONIM, bukan id edisi. Edisi yang dilayani ditentukan
 * pin di dasbor, jadi berkas ini tidak perlu disunting saat 2027 berganti 2028.
 *
 * ── Kenapa keadaannya dihitung DUA KALI ───────────────────────────────────
 *
 * Sekali di server saat halaman dibangun ulang, sekali lagi di peramban
 * setelah terpasang. Yang di server membuat halamannya sudah benar sejak
 * cetakan pertama — penting untuk mesin pencari dan untuk yang JavaScript-nya
 * lambat. Yang di peramban mengoreksi selisih waktu: halaman yang dibangun
 * lima menit lalu bisa saja sudah melewati tenggatnya.
 *
 * Nilai awalnya diambil dari server supaya tidak ada ketidakcocokan hidrasi.
 */
export default function HomeRegist({ identitas, keadaanAwal }) {
  const [keadaan, setKeadaan] = useState(keadaanAwal);

  useEffect(() => {
    setKeadaan(keadaanPendaftaran(identitas));
  }, [identitas]);

  /*
   * Wadah formulirnya baru ada di DOM setelah keadaannya "buka". Kalau
   * skripnya sudah termuat lebih dulu — dan pada perpindahan halaman memang
   * begitu — ia sudah selesai memindai dan tidak akan memindai lagi sendiri.
   */
  useEffect(() => {
    if (keadaan === "buka" && typeof window !== "undefined") {
      window.IysaDaftar?.pasang();
    }
  }, [keadaan]);

  const tahun = identitas?.tahun ?? "";
  const judul = `${identitas?.akronim ?? "GYIIF"} ${tahun}`.trim();
  const buka = tanggalPanjang(identitas?.pendaftaran_buka);
  const tutup = tanggalPanjang(identitas?.pendaftaran_tutup);

  return (
    <>
      <Navigation />
      {/*
        Latar diberi rona tipis lewat gaya sebaris, bukan lewat kelasnya.
        `.homeregist-section` dipakai juga oleh homeindo dan homeinter, dan
        keduanya tidak sedang diubah — menyentuh kelasnya berarti mengubah dua
        halaman yang tidak diminta siapa pun.

        Ronanya ada supaya kartu formulir yang putih punya sesuatu untuk
        berdiri di atasnya. Putih di atas putih membuat kartunya lenyap, dan
        yang tersisa deretan kotak isian yang mengambang tanpa batas.
      */}
      <section className="homeregist-section" style={{ background: "#f4f6fb" }}>
        <div style={{ width: "100%", maxWidth: "46rem", margin: "0 auto" }}>

          <header style={{ marginBottom: "1.75rem" }}>
            <p
              style={{
                margin: "0 0 .35rem",
                fontSize: ".75rem",
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: "#6b7383",
                fontWeight: 600,
              }}
            >
              {judul || "GYIIF"}
            </p>

            <h1
              style={{
                margin: "0 0 .85rem",
                fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                lineHeight: 1.15,
                fontWeight: 700,
                color: "#1b2333",
              }}
            >
              Registration Form
            </h1>

            {/*
              Keadaannya jadi PIL, bukan kalimat panjang.

              Sebelumnya ia baris teks sebesar judul kedua, dan dari kejauhan
              tidak bisa dibedakan dari judulnya sendiri. Yang dicari orang di
              sini cuma satu hal — buka atau belum — dan itu jawaban sepatah
              kata, bukan sekalimat.
            */}
            <span
              style={{
                display: "inline-block",
                padding: ".3rem .8rem",
                borderRadius: "999px",
                fontSize: ".8rem",
                fontWeight: 600,
                background:
                  keadaan === "buka"
                    ? "rgba(20,107,92,.1)"
                    : keadaan === "tutup"
                    ? "rgba(107,115,131,.12)"
                    : "rgba(41,62,146,.1)",
                color:
                  keadaan === "buka"
                    ? "#116052"
                    : keadaan === "tutup"
                    ? "#5b6273"
                    : "#293e92",
              }}
            >
              {keadaan === "buka"
                ? "Pendaftaran dibuka"
                : keadaan === "belum"
                ? "Belum dibuka"
                : keadaan === "tutup"
                ? "Sudah ditutup"
                : "Status belum diketahui"}
            </span>

            {/* Tanggalnya disebut apa pun keadaannya. Orang yang datang
                terlalu awal perlu tahu kapan harus kembali; yang terlambat
                perlu tahu bahwa ia memang terlambat, bukan tersesat. */}
            {(buka || tutup) && (
              <p
                style={{
                  margin: ".7rem 0 0",
                  fontSize: ".9rem",
                  color: "#5b6273",
                }}
              >
                {buka && tutup
                  ? `${buka} — ${tutup}`
                  : buka
                  ? `Dibuka ${buka}`
                  : `Ditutup ${tutup}`}
              </p>
            )}
          </header>

          {keadaan === "buka" ? (
            /*
             * Wadah formulir sisipan. Dibiarkan kosong di sini — berkas
             * `daftar.js` yang mengisinya, di dalam shadow root supaya CSS
             * situs ini tidak bisa merusaknya dan sebaliknya.
             *
             * Warnanya diwariskan lewat custom property, satu-satunya hal yang
             * menembus shadow root. Yang dipakai `--warna-sekunder` milik situs
             * ini, supaya formulirnya memakai biru GYIIF dan bukan navy bawaan
             * IYSA.
             */
            <div
              data-iysa-daftar="gyiif"
              style={{
                "--iysa-aksen": "#293e92",
                "--iysa-radius": "10px",
                textAlign: "left",
              }}
            />
          ) : (
            /*
             * Bukan tombol yang dimatikan, melainkan keterangan.
             *
             * Tombol mati yang tetap terlihat seperti tombol akan diklik
             * berulang oleh orang yang mengira halamannya rusak. Yang
             * dibutuhkan di sini kalimat, bukan kendali.
             */
            <div
              style={{
                background: "#fff",
                border: "1px solid #dfe3ec",
                borderRadius: "12px",
                padding: "2rem 1.5rem",
                textAlign: "center",
                color: "#5b6273",
                fontSize: ".95rem",
                lineHeight: 1.65,
              }}
            >
              {keadaan === "belum"
                ? "Pendaftaran belum dibuka. Silakan kembali pada tanggal di atas."
                : keadaan === "tutup"
                ? "Pendaftaran edisi ini sudah ditutup."
                : "Informasi pendaftaran belum bisa dimuat. Coba beberapa saat lagi."}
            </div>
          )}
        </div>
      </section>
      <Footer />

      {/*
        `afterInteractive`: formulirnya bukan yang pertama dibaca orang saat
        halaman terbuka, jadi ia tidak perlu menahan render. `onLoad` dan
        `useEffect` di atas sama-sama memanggil `pasang` — yang pertama untuk
        kunjungan langsung, yang kedua untuk perpindahan dari halaman lain
        yang tidak memuat ulang skripnya.
      */}
      <Script
        src="https://api-dashboard.iysa.or.id/embed/daftar.js"
        strategy="afterInteractive"
        onLoad={() => window.IysaDaftar?.pasang()}
      />
    </>
  );
}

/**
 * Dibangun ulang tiap lima menit.
 *
 * Sama dengan umur cache API-nya, jadi tidak ada permintaan yang terbuang
 * menanyakan sesuatu yang di sana pun masih disimpan. Jendela pendaftaran
 * berubah beberapa kali setahun; lima menit jauh lebih rapat daripada yang
 * dibutuhkan, dan itu memang disengaja — selisih waktu di sisi peramban
 * dikoreksi lagi setelah halamannya terpasang.
 */
export async function getStaticProps() {
  const identitas = await ambilIdentitas();
  return {
    props: {
      identitas,
      keadaanAwal: keadaanPendaftaran(identitas),
    },
    revalidate: 300,
  };
}

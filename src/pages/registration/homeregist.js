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
        Rona tipis supaya kartu formulir yang putih punya sesuatu untuk berdiri
        di atasnya. Putih di atas putih membuat kartunya lenyap, dan yang
        tersisa deretan kotak isian yang mengambang tanpa batas.

        Masih lewat gaya sebaris meski `.homeregist-section` kini cuma dipakai
        halaman ini: kelasnya hidup di `globals.css` bersama seluruh gaya situs,
        dan memindahkan warna ke sana berarti satu hal lagi yang harus dicari di
        berkas 900 baris saat halaman ini disunting berikutnya.
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
                ? "Registration open"
                : keadaan === "belum"
                ? "Not open yet"
                : keadaan === "tutup"
                ? "Closed"
                : "Status unavailable"}
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
                  ? `Opens ${buka}`
                  : `Closed ${tutup}`}
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
              /*
                Alamat API disebut eksplisit meski skripnya kini dimuat dari
                sana juga — tebakan dari `currentScript.src` akan menghasilkan
                nilai yang sama.

                Dibiarkan karena ia benar di kedua keadaan, dan karena
                keadaan yang satunya sempat terjadi: berkas ini pernah
                disalin ke `public/` saat deploy backend tidak mendarat, dan
                tanpa atribut ini permintaan pertamanya menjawab 404 dengan
                pesan yang menuduh data, bukan alamat.
              */
              data-iysa-api="https://api-dashboard.iysa.or.id"
              /*
                Bahasa AWAL saja — untuk layar pilihan jalur dan pesan saat
                pendaftaran belum dibuka. Situs ini berbahasa Inggris, jadi
                yang belum memilih apa pun membaca bahasa yang sama dengan
                halaman yang memuatnya.

                Sesudah jalurnya dipilih, bahasanya ditentukan pilihan itu:
                peserta Indonesia membaca formulirnya dalam bahasa Indonesia
                meski halaman ini berbahasa Inggris.
              */
              data-iysa-bahasa="en"
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
                ? "Registration has not opened yet. Please come back on the date above."
                : keadaan === "tutup"
                ? "Registration for this edition is closed."
                : "Registration information could not be loaded. Please try again shortly."}
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

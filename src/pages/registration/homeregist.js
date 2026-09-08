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
      <section className="homeregist-section">
        <div>
          <div className="wrapper">
            <div className="text-center">
              <h1 className="mx-auto text-sm md:text-lg lg:text-5xl">
                REGISTRATION FORM
              </h1>
              <h3 className="mx-auto mt-5 mb-2 text-sm md:text-lg lg:text-2xl">
                {keadaan === "buka"
                  ? `Registration for ${judul} is now open`
                  : keadaan === "belum"
                  ? `Registration for ${judul} opens soon`
                  : keadaan === "tutup"
                  ? `Registration for ${judul} has closed`
                  : `Registration for ${judul}`}
              </h3>

              {/* Tanggalnya disebut apa pun keadaannya. Orang yang datang
                  terlalu awal perlu tahu kapan harus kembali; yang terlambat
                  perlu tahu bahwa ia memang terlambat, bukan tersesat. */}
              {(buka || tutup) && (
                <p className="mx-auto mb-4 text-sm md:text-base">
                  {buka && tutup
                    ? `${buka} — ${tutup}`
                    : buka
                    ? `Opens ${buka}`
                    : `Closes ${tutup}`}
                </p>
              )}
            </div>
          </div>

          <div className="link-web mx-auto text-center">
            {keadaan === "buka" ? (
              /*
               * Wadah formulir sisipan. Dibiarkan kosong di sini — berkas
               * `daftar.js` yang mengisinya, di dalam shadow root supaya CSS
               * situs ini tidak bisa merusaknya dan sebaliknya.
               *
               * `maxWidth` dan `margin` di sini semata memusatkannya di dalam
               * `link-web`; sisa tampilannya milik berkas sisipan itu.
               */
              <div
                data-iysa-daftar="gyiif"
                style={{ maxWidth: "44rem", margin: "0 auto", textAlign: "left" }}
              />
            ) : (
              /*
               * Bukan tombol yang dimatikan, melainkan keterangan.
               *
               * Tombol mati yang tetap terlihat seperti tombol akan diklik
               * berulang oleh orang yang mengira halamannya rusak. Yang
               * dibutuhkan di sini kalimat, bukan kendali.
               */
              <p className="mx-auto text-center m-2">
                {keadaan === "belum"
                  ? "Registration has not opened yet. Please come back on the date above."
                  : keadaan === "tutup"
                  ? "Registration for this edition is closed."
                  : "Registration information is not available right now. Please try again shortly."}
              </p>
            )}
          </div>
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

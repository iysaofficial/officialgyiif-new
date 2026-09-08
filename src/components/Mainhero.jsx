import dynamic from "next/dynamic";
import Link from "next/link";
import { keadaanPendaftaran } from "@/lib/registrasi";
// Mengimpor ParticlesBg secara dinamis dengan ssr: false
const ParticlesBg = dynamic(() => import("particles-bg"), { ssr: false });

/**
 * Sorotan halaman depan.
 *
 * ── Kenapa tulisannya tidak lagi dipaku ───────────────────────────────────
 *
 * Sebelumnya di sini tertulis "COMING SOON" dan "Coming Soon 2027", dan
 * tombolnya menunjuk ke `/` — menekannya tidak membawa ke mana pun. Keduanya
 * harus disunting programmer tiap kali pendaftaran dibuka, dan itulah kenapa
 * halaman ini masih berkata "coming soon" berbulan-bulan setelah edisinya
 * disiapkan di dasbor.
 *
 * Sekarang keadaannya datang dari `identitas` yang sudah ditarik halamannya
 * dari API dasbor. Yang perlu dilakukan saat pendaftaran dibuka cuma
 * menyalakan togelnya di dasbor.
 *
 * Bawaannya tetap "COMING SOON" saat API tidak menjawab — situs yang diam
 * lebih baik daripada situs yang mengundang orang mendaftar ke pintu yang
 * belum tentu terbuka.
 */
export const Mainhero = ({ identitas }) => {
  const keadaan = keadaanPendaftaran(identitas);
  const tahun = identitas?.tahun ?? "2027";
  const buka = keadaan === "buka";

  return (
    <>
      <section className="mainhero-section">
        <div className="text">
          <h2 style={{ color: "yellow", fontWeight: "bold" }}>
            {buka ? "REGISTRATION OPEN" : "COMING SOON"}
          </h2>
          <h2 style={{ color: "white" }}>
            GLOBAL YOUTH INVENTION AND INNOVATION FAIR
          </h2>
          {buka ? (
            <Link href="/registration/homeregist" legacyBehavior>
              <a className="btn btn-custom btn-action m-2">
                Register Now {tahun}
              </a>
            </Link>
          ) : (
            <Link href="/registration/homeregist" legacyBehavior>
              <a className="btn btn-custom btn-action m-2">
                Coming Soon {tahun}
              </a>
            </Link>
          )}
          {/* <Link
            href="https://drive.google.com/file/d/1hlaFs_WJC865Hx4zwqodTtEFL2tqSy9l/view?usp=sharing"
            legacyBehavior
          >
            <a className="btn btn-custom btn-action m-2" target="_blank">
              Guide Book
            </a>
          </Link> */}
        </div>
        <ParticlesBg
          type="circle"
          bg={{
            zIndex: 0,
            bgColor: "#554994",
            position: "absolute",
            top: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </section>
    </>
  );
};

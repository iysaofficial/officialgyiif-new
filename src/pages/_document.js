import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import Link from "next/link";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/assets/img/gyifLogo.png" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />

        {/* FONT AWESOME */}
        <Script
          src="https://kit.fontawesome.com/9681094862.js"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        <Script
          src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* Gelembung "Proses Kurasi" IYSA — kabar kemajuan pengajuan kurasi
            ajang ke Puspresnas. Dikelola dari dasbor IYSA; berkas ini tidak perlu
            diubah lagi saat tahunnya berganti, dan gelembungnya tidak muncul sama
            sekali selama belum ada langkah yang dicatat. <script> biasa, bukan
            next/script: pemuatnya membaca atributnya lewat document.currentScript. */}
        <script
          src="https://api-dashboard.iysa.or.id/embed/kurasi.js"
          data-iysa-kurasi="gyiif"
          defer
        />
      </body>
    </Html>
  );
}

/*
 * Formulir pendaftaran IYSA untuk ditempel di situs resmi tiap seri event.
 *
 * ── Cara pakai (dua baris di halaman mana pun) ───────────────────────────
 *
 *   <div data-iysa-daftar="gyiif"></div>
 *   <script src="https://api-dashboard.iysa.or.id/embed/daftar.js" defer></script>
 *
 * `data-iysa-daftar` diisi AKRONIM serinya, bukan id edisi. Edisi yang dilayani
 * ditentukan pin di dasbor — jadi berkas situs tidak berubah sama sekali dari
 * 2027 ke 2028; divisi IT memindahkan pinnya dan situsnya ikut.
 *
 * ── Kenapa Shadow DOM ────────────────────────────────────────────────────
 *
 * Situs resmi tiap event dibangun sendiri-sendiri, sebagian memuat Bootstrap
 * lama, sebagian Tailwind. Tanpa isolasi, satu aturan `input { width: 100% }`
 * milik tema mereka bisa merusak tata letak formulir ini, dan yang menerima
 * laporannya tim dasbor — bukan tim yang menulis aturannya.
 *
 * Warnanya tetap bisa diatur situsnya lewat custom property, karena custom
 * property menembus Shadow DOM:
 *
 *   [data-iysa-daftar] { --iysa-aksen: #0F4C81; --iysa-radius: 4px; }
 *
 * ── Kenapa tanpa kerangka kerja ──────────────────────────────────────────
 *
 * Berkas ini disisipkan ke halaman orang lain. Membawa React ke sana berarti
 * memaksa situs yang sudah punya React memuat versi kedua, dan situs yang
 * tidak punya memuat 40 KB untuk satu formulir.
 */
(function () {
  'use strict';

  var API = (function () {
    /*
     * Asal API: atribut dulu, baru tebakan dari alamat skrip ini sendiri.
     *
     * ── Kenapa atributnya perlu ada ────────────────────────────────────────
     *
     * Menebak dari `currentScript.src` benar selama berkas ini memang dilayani
     * API-nya, dan salah total begitu situs event menyalinnya ke `public/`
     * sendiri: asalnya jadi situs itu, dan permintaan pertama menjawab 404
     * dengan pesan "edisi belum ditetapkan" — galat yang menuduh data padahal
     * yang salah alamatnya.
     *
     * Situs boleh menyalin berkas ini kalau perlu — misalnya saat deploy
     * backend sedang tidak sampai ke mesin yang melayani domainnya. Yang tidak
     * boleh adalah menyalinnya lalu diam-diam menunjuk ke dirinya sendiri.
     *
     *   <div data-iysa-daftar="gyiif"
     *        data-iysa-api="https://api-dashboard.iysa.or.id"></div>
     */
    var wadah = document.querySelector('[data-iysa-api]');
    var dariAtribut = wadah && (wadah.getAttribute('data-iysa-api') || '').trim();
    if (dariAtribut) {
      try { return new URL(dariAtribut).origin; } catch (e) { /* jatuh ke bawah */ }
    }
    var s = document.currentScript;
    if (s && s.src) {
      try { return new URL(s.src).origin; } catch (e) { /* jatuh ke bawaan */ }
    }
    return 'https://api-dashboard.iysa.or.id';
  })();

  var GAYA = [
    ':host { all: initial; display: block;',
    '  --iysa-aksen: #2E4A8B;',
    '  --iysa-teks: #14161C;',
    '  --iysa-lembut: #5B6273;',
    '  --iysa-garis: #D8DDE7;',
    '  --iysa-kertas: #FFFFFF;',
    '  --iysa-bahaya: #C42B1C;',
    '  --iysa-sukses: #146B5C;',
    '  --iysa-radius: 8px;',
    '  font-family: inherit; color: var(--iysa-teks); line-height: 1.55; }',
    '* { box-sizing: border-box; font-family: inherit; }',
    '.kotak { border: 1px solid var(--iysa-garis); border-radius: var(--iysa-radius);',
    '  background: var(--iysa-kertas); padding: 1.5rem; max-width: 44rem; }',
    'h3 { margin: 0 0 .35rem; font-size: 1.15rem; line-height: 1.3; }',
    'p.ket { margin: 0 0 1.25rem; color: var(--iysa-lembut); font-size: .9rem; }',
    'fieldset { border: 0; padding: 0; margin: 0 0 1.25rem; }',
    'legend { padding: 0; font-size: .72rem; letter-spacing: .09em; text-transform: uppercase;',
    '  color: var(--iysa-lembut); margin-bottom: .6rem; font-weight: 600; }',
    '.baris { display: grid; gap: .75rem; grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr)); }',
    /* Ruas yang isinya panjang mengambil satu baris penuh. Nama paket dibaca
       bersama harganya, dan di kolom setengah lebar "IDR 3.500.000" terpotong
       jadi "IDR 3.500.00" — angka yang salah, bukan sekadar terpotong. */
    '.baris .lebar { grid-column: 1 / -1; }',
    'label { display: block; font-size: .8rem; font-weight: 600; margin-bottom: .25rem; }',
    'label .opt { font-weight: 400; color: var(--iysa-lembut); }',
    'input, select, textarea { width: 100%; padding: .55rem .7rem; font-size: .9rem;',
    '  border: 1px solid var(--iysa-garis); border-radius: calc(var(--iysa-radius) - 2px);',
    '  background: var(--iysa-kertas); color: var(--iysa-teks); }',
    'input:focus, select:focus, textarea:focus { outline: 2px solid var(--iysa-aksen); outline-offset: -1px; }',
    'textarea { min-height: 4.5rem; resize: vertical; }',
    'button { font-size: .9rem; font-weight: 600; padding: .6rem 1.1rem; border-radius: calc(var(--iysa-radius) - 2px);',
    '  border: 1px solid var(--iysa-aksen); background: var(--iysa-aksen); color: #fff; cursor: pointer; }',
    'button[disabled] { opacity: .55; cursor: not-allowed; }',
    'button.samar { background: transparent; color: var(--iysa-aksen); }',
    'button.kecil { padding: .35rem .7rem; font-size: .8rem; }',
    '.aksi { display: flex; gap: .6rem; align-items: center; flex-wrap: wrap; margin-top: .5rem; }',
    '.pesan { margin-top: .8rem; font-size: .85rem; padding: .6rem .8rem; border-radius: calc(var(--iysa-radius) - 2px); }',
    '.pesan.galat { background: rgba(196,43,28,.08); color: var(--iysa-bahaya); }',
    '.pesan.oke { background: rgba(20,107,92,.08); color: var(--iysa-sukses); }',
    '.anggota { border: 1px solid var(--iysa-garis); border-radius: calc(var(--iysa-radius) - 2px);',
    '  padding: .9rem; margin-bottom: .7rem; }',
    '.anggota-kepala { display: flex; justify-content: space-between; align-items: center; margin-bottom: .6rem; }',
    '.anggota-kepala span { font-size: .78rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase;',
    '  color: var(--iysa-lembut); }',
    '.anggota-kepala button { border-color: var(--iysa-garis); background: transparent; color: var(--iysa-bahaya); }',
    '.tutup { text-align: center; padding: 2rem 1rem; }',
    '.tutup .besar { font-size: 1.1rem; font-weight: 700; margin-bottom: .4rem; }',
    '.tutup p { margin: 0; color: var(--iysa-lembut); font-size: .9rem; }',
    '.selesai { text-align: center; padding: 2rem 1rem; }',
    '.selesai .besar { font-size: 1.15rem; font-weight: 700; margin-bottom: .5rem; color: var(--iysa-sukses); }',
    '.jalur { display: grid; gap: .6rem; grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr)); }',
    '.jalur label { display: block; margin: 0; border: 1px solid var(--iysa-garis);',
    '  border-radius: calc(var(--iysa-radius) - 2px); padding: .85rem .95rem; cursor: pointer;',
    '  font-weight: 400; font-size: .9rem; }',
    '.jalur label:hover { border-color: var(--iysa-aksen); }',
    '.jalur input { position: absolute; opacity: 0; width: 0; height: 0; }',
    '.jalur label.pilih { border-color: var(--iysa-aksen);',
    '  box-shadow: inset 0 0 0 1px var(--iysa-aksen); }',
    '.jalur label.fokus { outline: 2px solid var(--iysa-aksen); outline-offset: 2px; }',
    '.jalur .nama { display: block; font-weight: 700; font-size: .92rem; margin-bottom: .2rem; }',
    '.jalur .ket2 { display: block; color: var(--iysa-lembut); font-size: .82rem; line-height: 1.45; }',
    '.jalur .cacah { display: block; margin-top: .4rem; font-size: .78rem; font-weight: 600;',
    '  color: var(--iysa-aksen); }',
    '.akun { border: 1px solid var(--iysa-garis); border-left: 3px solid var(--iysa-aksen);',
    '  border-radius: calc(var(--iysa-radius) - 2px); padding: .85rem 1rem; margin: 0 0 1.25rem;',
    '  background: rgba(0,0,0,.015); }',
    '.akun .judul { margin: 0 0 .25rem; font-size: .9rem; font-weight: 700; }',
    '.akun p { margin: 0 0 .35rem; font-size: .84rem; color: var(--iysa-lembut); line-height: 1.55; }',
    '.akun p:last-child { margin-bottom: 0; }',
  ].join('\n');

  /*
   * ── Kenapa TIDAK ada `prefers-color-scheme` di sini ─────────────────────
   *
   * Versi pertama punya blok itu, dan hasilnya salah dengan cara yang hanya
   * terlihat kalau diuji: pengunjung yang sistemnya bertema gelap melihat
   * formulir hitam menempel di tengah halaman gyiif.or.id yang putih.
   *
   * Untuk sisipan pihak ketiga, tema OS adalah sinyal yang keliru. Yang
   * menentukan bukan preferensi sistem pengunjung melainkan HALAMAN yang
   * memuatnya — dan halaman itulah satu-satunya yang tahu warnanya sendiri.
   *
   * Situs bertema gelap mengaturnya sendiri, satu blok:
   *
   *   [data-iysa-daftar] {
   *     --iysa-teks: #E8EAF0; --iysa-lembut: #9AA2B4;
   *     --iysa-garis: #2A303C; --iysa-kertas: #161A22;
   *     --iysa-aksen: #6E8CD8;
   *   }
   *
   * Situs yang mengikuti tema sistem membungkusnya dengan media query-nya
   * sendiri — keputusan itu miliknya, bukan milik berkas ini.
   */

  function el(tag, attrs, anak) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'html') n.innerHTML = attrs[k];
      else if (k === 'teks') n.textContent = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    (anak || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }

  function pilihan(nama, daftar, kosong) {
    var s = el('select', { name: nama });
    if (kosong) s.appendChild(el('option', { value: '', teks: kosong }));
    daftar.forEach(function (o) {
      s.appendChild(el('option', { value: o.nilai, teks: o.label }));
    });
    return s;
  }

  async function json(jalur, opsi) {
    var res = await fetch(API + jalur, opsi);
    var isi = null;
    try { isi = await res.json(); } catch (e) { /* balasan tanpa JSON */ }
    if (!res.ok) {
      var e2 = new Error((isi && isi.message) || ('HTTP ' + res.status));
      e2.kode = isi && isi.code;
      e2.status = res.status;
      throw e2;
    }
    return isi ? isi.data : null;
  }

  /*
   * ── Kenapa kata-katanya ditabelkan ──────────────────────────────────────
   *
   * Situs resmi tiap event dulu menyediakan enam halaman pendaftaran:
   * homeindo, homeinter, lalu indo-offline, indo-online, inter-offline, dan
   * inter-online. Empat yang terakhir formulir yang sama disalin empat kali,
   * ~700 baris masing-masing, dan bedanya cuma dua: daftar paket yang
   * ditampilkan, dan bahasa halamannya.
   *
   * Keduanya bukan alasan untuk menggandakan halaman. Yang pertama sudah
   * terjawab data — `competition_tracks` menyimpan `origin` dan `mode` di
   * tiap paket. Yang kedua terjawab tabel ini.
   *
   * Bahasanya mengikuti JALUR yang dipilih pendaftar, bukan tebakan dari
   * peramban: yang memilih jalur internasional membaca sisa formulirnya dalam
   * bahasa Inggris.
   */
  var KATA = {
    id: {
      memuat: 'Memuat data pendaftaran…',
      tutupJudul: 'Pendaftaran belum tersedia',
      tutupBelum: 'Pendaftaran edisi ini belum dibuka.',
      tutupRencana: function (t) { return 'Pendaftaran direncanakan dibuka ' + t + '.'; },
      tutupTakAda: 'Data pendaftaran belum tersedia.',
      tutupTakPin: 'Edisi yang dibuka untuk seri ini belum ditetapkan.',
      tutupGagal: 'Gagal memuat data pendaftaran. Coba muat ulang halaman.',

      jalurJudul: 'Jalur pendaftaran',
      jalurKet: 'Pilih jalur yang sesuai. Pilihan ini menentukan paket lomba, '
        + 'mata uang tagihan, dan bahasa formulir berikutnya.',
      jalurAsal: 'Kewarganegaraan peserta',
      jalurModa: 'Cara mengikuti',
      asal_indonesian: 'Warga negara Indonesia',
      asal_indonesian_ket: 'Paket nasional, tagihan dalam rupiah.',
      asal_international: 'International citizen',
      asal_international_ket: 'International packages, billed in US dollars.',
      moda_offline: 'Luring — hadir di lokasi',
      moda_offline_ket: 'Datang ke tempat acara dan menjaga stan.',
      moda_online: 'Daring — lewat Zoom',
      moda_online_ket: 'Presentasi dari mana saja, tanpa datang.',
      jalurLanjut: 'Lanjut',
      jalurBelum: 'Jalurnya belum dipilih.',
      jalurPaket: function (n) { return n + ' paket tersedia'; },
      jalurKembali: '← Ganti jalur',

      surelJudul: 'Pendaftaran Tim',
      surelKet: 'Masukkan alamat surel ketua tim atau pembimbing. Kami kirimkan kode '
        + 'verifikasi ke sana — seluruh dokumen pendaftaran nantinya juga dikirim '
        + 'ke alamat ini.',
      surelLabel: 'Alamat surel',
      surelContoh: 'nama@sekolah.sch.id',
      surelKirim: 'Kirim kode verifikasi',
      surelMengirim: 'Mengirim…',
      surelSalah: 'Alamat surelnya belum benar.',
      surelPunyaKode: 'Saya sudah punya kode',
      surelJedaKet: 'Kode yang tadi dikirim masih berlaku 15 menit. '
        + 'Kalau sudah sampai, langsung masukkan saja — tidak perlu menunggu.',

      lanjutJudul: 'Lanjutkan pendaftaran',
      lanjutKet: function (e) {
        return 'Alamat ' + e + ' masih terverifikasi di peramban ini, jadi tidak perlu '
          + 'meminta kode lagi.';
      },
      lanjutTombol: 'Lanjutkan',
      lanjutUlang: 'Mulai dari awal',

      akunBaru: 'Alamat ini belum punya akun IYSA.',
      akunBaruKet: 'Akunnya kami buatkan otomatis. Surel berisi tautan pembuatan kata '
        + 'sandi dikirim setelah pendaftaran tercatat — tidak ada kata sandi yang '
        + 'dikirim lewat surel.',
      akunBelumAktif: 'Alamat ini sudah ada di sistem, tapi kata sandinya belum pernah dibuat.',
      akunBelumAktifKet: 'Kami kirimkan tautan pembuatan kata sandi setelah pendaftaran '
        + 'tercatat. Tidak ada akun kedua yang dibuat.',
      akunAktif: function (n) {
        return 'Selamat datang kembali' + (n ? ', ' + n : '') + '.';
      },
      akunAktifKet: 'Akun Anda sudah aktif. Masuk dengan kata sandi yang sudah Anda pakai '
        + 'selama ini — tidak ada kata sandi baru, dan tidak ada yang berubah pada akun Anda.',
      akunPeran: function (p) { return 'Peran Anda di ajang ini: ' + p + '.'; },
      akunTim: function (n) {
        return 'Anda sudah membimbing ' + n + ' tim di ajang ini. '
          + 'Formulir ini akan menambah tim baru, bukan menyunting yang sudah ada.';
      },

      kodeJudul: 'Masukkan kode',
      kodeKet: function (e) {
        return 'Enam digit sudah dikirim ke ' + e + '. Kode berlaku 15 menit. '
          + 'Cek folder spam bila belum sampai.';
      },
      kodeLabel: 'Kode verifikasi',
      kodeVerif: 'Verifikasi',
      kodeMemeriksa: 'Memeriksa…',
      kodeGanti: 'Ganti alamat',
      kodeKosong: 'Kodenya belum diisi.',
      kodeTanpaTiket: 'Verifikasi berhasil, tapi sesi pendaftaran tidak terbentuk. Muat ulang halaman.',

      formJudul: 'Data Tim',
      formKet: function (e) {
        return 'Surel ' + e + ' sudah terverifikasi. Lengkapi data di bawah — '
          + 'tagihan dan LoA dikirim ke alamat itu setelah pendaftaran tercatat.';
      },
      grupPaket: 'Paket & kategori',
      grupTim: 'Identitas tim',
      grupAnggota: 'Anggota tim',
      grupPembimbing: 'Pembimbing',
      grupProyek: 'Proyek & pengiriman',
      lbPaket: 'Paket lomba',
      lbKategori: 'Kategori proyek',
      lbNamaTim: 'Nama tim',
      lbInstitusi: 'Sekolah / institusi',
      lbJenjang: 'Jenjang',
      lbNegara: 'Negara',
      lbProvinsi: 'Provinsi',
      lbNpsn: 'NPSN',
      lbNama: 'Nama lengkap',
      lbSurel: 'Surel',
      lbNisn: 'NISN / NIM',
      lbWa: 'Nomor WhatsApp',
      lbKaos: 'Ukuran kaos',
      lbPemNama: 'Nama pembimbing',
      lbPemSurel: 'Surel pembimbing',
      lbJudul: 'Judul proyek',
      lbAlamat: 'Alamat pengiriman',
      lbAlamatContoh: 'Alamat lengkap pengiriman medali dan sertifikat',
      lbSumber: 'Tahu ajang ini dari mana',
      lbSumberContoh: 'Instagram, guru, teman, …',
      pilihPaket: 'Pilih paket…',
      pilihKategori: 'Pilih kategori…',
      pilihJenjang: 'Pilih jenjang…',
      pilihKaos: 'Ukuran kaos…',
      ketua: 'Ketua tim',
      anggotaKe: function (n) { return 'Anggota ' + n; },
      tambahAnggota: '+ Tambah anggota',
      hapus: 'Hapus',
      opsional: ' (opsional)',
      kirim: 'Kirim pendaftaran',
      mengirim: 'Mengirim…',
      belumPaket: 'Paket lombanya belum dipilih.',
      belumJenjang: 'Jenjangnya belum dipilih.',
      belumNama: function (n) { return 'Nama anggota ke-' + n + ' belum diisi.'; },

      selesaiJudul: 'Pendaftaran tercatat',
      selesaiUlang: 'Pendaftaran ini sudah tercatat sebelumnya — tidak ada tim ganda yang dibuat.',
      selesaiKet: function (e) {
        return 'Letter of Acceptance dan tagihan dikirim ke ' + e
          + ' paling lambat 3×24 jam. Cek folder spam bila belum sampai.';
      },
      jenjang: {
        elementary: 'SD / Elementary',
        secondary: 'SMP–SMA / Secondary',
        university: 'Perguruan Tinggi / University',
        public: 'Umum / Public'
      },
      lokal: 'id-ID'
    },
    en: {
      memuat: 'Loading registration data…',
      tutupJudul: 'Registration is not open',
      tutupBelum: 'Registration for this edition has not opened yet.',
      tutupRencana: function (t) { return 'Registration is scheduled to open on ' + t + '.'; },
      tutupTakAda: 'Registration data is not available yet.',
      tutupTakPin: 'No edition has been assigned to this series yet.',
      tutupGagal: 'Could not load registration data. Please reload the page.',

      jalurJudul: 'Registration track',
      jalurKet: 'Choose the track that applies to you. It determines the packages, '
        + 'the invoice currency, and the language of the rest of this form.',
      jalurAsal: 'Participant citizenship',
      jalurModa: 'How you take part',
      asal_indonesian: 'Warga negara Indonesia',
      asal_indonesian_ket: 'Paket nasional, tagihan dalam rupiah.',
      asal_international: 'International citizen',
      asal_international_ket: 'International packages, billed in US dollars.',
      moda_offline: 'Onsite — attend the venue',
      moda_offline_ket: 'Come to the venue and staff your booth.',
      moda_online: 'Online — over Zoom',
      moda_online_ket: 'Present from anywhere, without travelling.',
      jalurLanjut: 'Continue',
      jalurBelum: 'Please choose a track first.',
      jalurPaket: function (n) { return n + (n === 1 ? ' package' : ' packages') + ' available'; },
      jalurKembali: '← Change track',

      surelJudul: 'Team Registration',
      surelKet: 'Enter the email address of the team leader or supervisor. We will send '
        + 'a verification code there — every registration document will go to the '
        + 'same address.',
      surelLabel: 'Email address',
      surelContoh: 'name@school.edu',
      surelKirim: 'Send verification code',
      surelMengirim: 'Sending…',
      surelSalah: 'That email address does not look right.',
      surelPunyaKode: 'I already have a code',
      surelJedaKet: 'The code we just sent is still valid for 15 minutes. '
        + 'If it has arrived, enter it now — there is no need to wait.',

      lanjutJudul: 'Continue your registration',
      lanjutKet: function (e) {
        return e + ' is still verified in this browser, so there is no need to request '
          + 'another code.';
      },
      lanjutTombol: 'Continue',
      lanjutUlang: 'Start over',

      akunBaru: 'This address does not have an IYSA account yet.',
      akunBaruKet: 'We will create one for you. An email with a link to set your password '
        + 'is sent once your registration is recorded — we never email a password itself.',
      akunBelumAktif: 'This address already exists in our system, but no password has ever been set.',
      akunBelumAktifKet: 'We will send a link to set your password once your registration '
        + 'is recorded. No second account is created.',
      akunAktif: function (n) {
        return 'Welcome back' + (n ? ', ' + n : '') + '.';
      },
      akunAktifKet: 'Your account is already active. Sign in with the password you already '
        + 'use — there is no new password, and nothing about your account changes.',
      akunPeran: function (p) { return 'Your role in this event: ' + p + '.'; },
      akunTim: function (n) {
        return 'You already supervise ' + n + ' team' + (n === 1 ? '' : 's')
          + ' in this event. This form adds a new team; it does not edit an existing one.';
      },

      kodeJudul: 'Enter the code',
      kodeKet: function (e) {
        return 'A six-digit code was sent to ' + e + '. It is valid for 15 minutes. '
          + 'Check your spam folder if it has not arrived.';
      },
      kodeLabel: 'Verification code',
      kodeVerif: 'Verify',
      kodeMemeriksa: 'Checking…',
      kodeGanti: 'Change address',
      kodeKosong: 'Please enter the code.',
      kodeTanpaTiket: 'Verified, but no registration session was created. Please reload the page.',

      formJudul: 'Team Details',
      formKet: function (e) {
        return e + ' is verified. Fill in the details below — the invoice and Letter '
          + 'of Acceptance go to that address once your registration is recorded.';
      },
      grupPaket: 'Package & category',
      grupTim: 'Team identity',
      grupAnggota: 'Team members',
      grupPembimbing: 'Supervisor',
      grupProyek: 'Project & shipping',
      lbPaket: 'Competition package',
      lbKategori: 'Project category',
      lbNamaTim: 'Team name',
      lbInstitusi: 'School / institution',
      lbJenjang: 'Level',
      lbNegara: 'Country',
      lbProvinsi: 'Province / state',
      lbNpsn: 'School ID',
      lbNama: 'Full name',
      lbSurel: 'Email',
      lbNisn: 'Student ID',
      lbWa: 'WhatsApp number',
      lbKaos: 'T-shirt size',
      lbPemNama: 'Supervisor name',
      lbPemSurel: 'Supervisor email',
      lbJudul: 'Project title',
      lbAlamat: 'Shipping address',
      lbAlamatContoh: 'Full address for medal and certificate delivery',
      lbSumber: 'How did you hear about this event',
      lbSumberContoh: 'Instagram, teacher, friend, …',
      pilihPaket: 'Choose a package…',
      pilihKategori: 'Choose a category…',
      pilihJenjang: 'Choose a level…',
      pilihKaos: 'T-shirt size…',
      ketua: 'Team leader',
      anggotaKe: function (n) { return 'Member ' + n; },
      tambahAnggota: '+ Add member',
      hapus: 'Remove',
      opsional: ' (optional)',
      kirim: 'Submit registration',
      mengirim: 'Submitting…',
      belumPaket: 'Please choose a package.',
      belumJenjang: 'Please choose a level.',
      belumNama: function (n) { return 'Member ' + n + ' has no name yet.'; },

      selesaiJudul: 'Registration recorded',
      selesaiUlang: 'This registration was already recorded — no duplicate team was created.',
      selesaiKet: function (e) {
        return 'The Letter of Acceptance and invoice will be sent to ' + e
          + ' within 3×24 hours. Check your spam folder if it has not arrived.';
      },
      jenjang: {
        elementary: 'Elementary',
        secondary: 'Secondary',
        university: 'University',
        public: 'Public'
      },
      lokal: 'en-GB'
    }
  };

  /* Jalur boleh ditentukan lebih dulu oleh halaman inangnya:
   *
   *   <div data-iysa-daftar="gyiif" data-iysa-jalur="indo-offline"></div>
   *
   * atau lewat kueri `?jalur=indo-offline`. Keduanya ada supaya enam alamat
   * lama situs — /registration/indo-offline dan saudara-saudaranya — bisa
   * dialihkan ke satu halaman tanpa pengunjungnya kehilangan pilihan yang
   * sudah ia buat di tautan yang ia klik.
   */
  /* Galat yang berarti tiketnya tidak bisa dipakai lagi, apa pun sebabnya.
     Sengaja daftar tertutup: menambah satu kode ke sini berarti membuang
     verifikasi orang, dan itu tidak boleh terjadi karena kebetulan. */
  var TIKET_MATI = [
    'public.bad_ticket',
    'public.ticket_expired',
    'public.ticket_used',
    'public.ticket_wrong_event'
  ];

  function bacaJalur(nilai) {
    var v = String(nilai || '').toLowerCase().trim();
    if (!v) return null;
    var bagian = v.split(/[-_/]/);
    var asal = null; var moda = null;
    bagian.forEach(function (b) {
      if (b === 'indo' || b === 'indonesia' || b === 'indonesian' || b === 'nasional' || b === 'national') asal = 'indonesian';
      if (b === 'inter' || b === 'international' || b === 'internasional') asal = 'international';
      if (b === 'offline' || b === 'luring' || b === 'onsite') moda = 'offline';
      if (b === 'online' || b === 'daring') moda = 'online';
    });
    return (asal || moda) ? { asal: asal, moda: moda } : null;
  }

  function Widget(inang, seri) {
    var akar = inang.attachShadow({ mode: 'open' });
    akar.appendChild(el('style', { teks: GAYA }));
    var kotak = el('div', { class: 'kotak' });
    akar.appendChild(kotak);

    var bahasaAwal = (inang.getAttribute('data-iysa-bahasa') || '').toLowerCase() === 'en' ? 'en' : 'id';

    var jalurAwal = bacaJalur(inang.getAttribute('data-iysa-jalur'));
    if (!jalurAwal && typeof window !== 'undefined' && window.location) {
      try {
        jalurAwal = bacaJalur(new URLSearchParams(window.location.search).get('jalur'));
      } catch (e) { /* peramban tanpa URLSearchParams: lewati saja */ }
    }

    var keadaan = {
      data: null, email: '', tiket: '', anggota: 1,
      bahasa: bahasaAwal,
      asal: jalurAwal && jalurAwal.asal,
      moda: jalurAwal && jalurAwal.moda,
      /* Benar kalau jalurnya memang DITANYAKAN, bukan disimpulkan dari satu
         satu-satunya kemungkinan. Hanya yang ditanyakan yang boleh diubah. */
      jalurDitanya: false,
      nama: '',
      /* Keadaan akun yang dikembalikan verify-code — dipakai untuk memberi tahu
         orangnya surel seperti apa yang akan ia terima, sebelum ia menerimanya. */
      akun: null,
      kedaluwarsa: 0
    };

    /** Kata dalam bahasa yang sedang berlaku. */
    function t(kunci) { return KATA[keadaan.bahasa][kunci]; }

    /*
     * ── Kenapa tiketnya disimpan ────────────────────────────────────────────
     *
     * Tiket berlaku dua jam, tapi widget-nya menyimpannya di memori saja. Yang
     * sudah memasukkan kode lalu membuka halaman lain — melihat kategori,
     * mengecek buku panduan, mencari NISN anggotanya — kembali ke sini dan
     * mendapati dirinya di layar pertama lagi. Dan karena jeda kirim ulang 60
     * detik, yang ia dapat bukan formulir melainkan "Kode baru bisa dikirim
     * lagi dalam 24 detik". Verifikasinya masih sah; cuma halamannya yang lupa.
     *
     * ── Kenapa sessionStorage, bukan localStorage ──────────────────────────
     *
     * Formulir ini banyak dibuka dari komputer lab sekolah. `localStorage`
     * bertahan setelah peramban ditutup, jadi tiket terverifikasi milik satu
     * anak akan menyambut anak berikutnya yang duduk di kursi yang sama.
     * `sessionStorage` ikut mati bersama tabnya.
     *
     * Semua akses dibungkus try/catch: mode penyamaran dan setelan "blokir
     * data situs" membuat pengaksesnya sendiri melempar, bukan mengembalikan
     * null — dan formulir tidak boleh gagal terbuka hanya karena itu.
     */
    var KUNCI_SESI = 'iysa-daftar:' + seri;

    function simpanSesi() {
      try {
        window.sessionStorage.setItem(KUNCI_SESI, JSON.stringify({
          email: keadaan.email,
          tiket: keadaan.tiket,
          nama: keadaan.nama,
          akun: keadaan.akun,
          asal: keadaan.asal,
          moda: keadaan.moda,
          bahasa: keadaan.bahasa,
          jalurDitanya: keadaan.jalurDitanya,
          kedaluwarsa: keadaan.kedaluwarsa
        }));
      } catch (e) { /* penyimpanan diblokir: alurnya tetap jalan, cuma tidak diingat */ }
    }

    function bacaSesi() {
      try {
        var mentah = window.sessionStorage.getItem(KUNCI_SESI);
        if (!mentah) return null;
        var d = JSON.parse(mentah);
        if (!d || !d.tiket || !d.email) return null;
        /* Sisakan satu menit: tiket yang kedaluwarsa saat orangnya sedang
           mengisi akan ditolak di langkah terakhir, sesudah dua puluh ruas. */
        if (!d.kedaluwarsa || Date.now() > d.kedaluwarsa - 60000) return null;
        return d;
      } catch (e) { return null; }
    }

    function hapusSesi() {
      try { window.sessionStorage.removeItem(KUNCI_SESI); } catch (e) { /* diabaikan */ }
    }

    /*
     * `ruas` hidup DI DALAM Widget supaya ia menutup atas `t`. Satu halaman
     * bisa memuat dua pemasangan sekaligus — situs yang menaruh formulir di
     * dua tab, misalnya — dan keduanya bisa berbeda bahasa. Fungsi bersama di
     * luar sini harus diberi tahu bahasanya lewat efek samping, dan efek
     * samping yang urutannya menentukan adalah bug yang menunggu giliran.
     */
    function ruas(label, kendali, opsional) {
      var l = el('label', { teks: label });
      if (opsional) l.appendChild(el('span', { class: 'opt', teks: t('opsional') }));
      return el('div', {}, [l, kendali]);
    }

    /*
     * Bahasa mengikuti ASAL PESERTA, bukan bahasa situs inangnya.
     *
     * Itulah pembeda yang dulu memerlukan halaman terpisah: `indo-offline`
     * berbahasa Indonesia, `inter-offline` berbahasa Inggris, formulirnya
     * sama persis. Sekarang satu formulir yang berganti bahasa pada langkah
     * jalur.
     *
     * `data-iysa-bahasa` di halaman inang hanya menentukan bahasa SEBELUM
     * jalurnya dipilih — layar jalur itu sendiri, dan pesan saat pendaftaran
     * belum dibuka. Sesudah dipilih, yang berlaku pilihan orangnya: situs
     * gyiif.or.id berbahasa Inggris, tapi peserta yang menyatakan dirinya
     * peserta Indonesia tetap membaca formulirnya dalam bahasa Indonesia.
     */
    function setAsal(a) {
      keadaan.asal = a;
      if (a === 'international') keadaan.bahasa = 'en';
      else if (a === 'indonesian') keadaan.bahasa = 'id';
    }

    /** Paket yang lolos jalur terpilih. Sumbu yang tidak dipilih tidak menyaring. */
    function paketJalur() {
      return ((keadaan.data && keadaan.data.paket) || []).filter(function (x) {
        if (keadaan.asal && x.asal !== keadaan.asal) return false;
        if (keadaan.moda && x.moda !== keadaan.moda) return false;
        return true;
      });
    }

    /*
     * Urutan pilihan dipatok, bukan mengikuti urutan paket di basis data.
     *
     * Diurutkan data, "International participant" berdiri di kiri pada GYIIF
     * dan di kanan pada seri lain, tergantung paket mana yang kebetulan
     * disisipkan lebih dulu. Yang membaca halaman ini sekali setahun tidak
     * punya cara tahu bahwa letaknya kebetulan.
     */
    var URUT = { asal: ['indonesian', 'international'], moda: ['offline', 'online'] };

    function nilaiUnik(kunci) {
      var ada = [];
      ((keadaan.data && keadaan.data.paket) || []).forEach(function (x) {
        if (x[kunci] && ada.indexOf(x[kunci]) < 0) ada.push(x[kunci]);
      });
      var urut = URUT[kunci] || [];
      return ada.sort(function (a, b) {
        var ia = urut.indexOf(a); var ib = urut.indexOf(b);
        return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
      });
    }

    function rupiahAtau(x) {
      if (x.harga === null || x.harga === undefined) return '';
      var n = Number(x.harga);
      return x.asal === 'international'
        ? 'USD ' + n.toLocaleString('en-US')
        : 'IDR ' + n.toLocaleString('id-ID');
    }

    function bersihkan() { while (kotak.firstChild) kotak.removeChild(kotak.firstChild); }

    function pesan(teks, jenis) {
      var lama = akar.querySelector('.pesan');
      if (lama) lama.remove();
      if (!teks) return;
      kotak.appendChild(el('div', { class: 'pesan ' + (jenis || 'galat'), teks: teks }));
    }

    // ── Muat data edisi ────────────────────────────────────────────────
    async function mulai() {
      kotak.appendChild(el('p', { class: 'ket', teks: t('memuat') }));
      try {
        var d = await json('/api/public/v1/' + encodeURIComponent(seri) + '?sections=pendaftaran,identitas');
        var seksi = {};
        (d.sections || []).forEach(function (s) { seksi[s.key] = s.isi; });
        keadaan.data = seksi.pendaftaran;
        keadaan.identitas = seksi.identitas || {};
        bersihkan();
        if (!keadaan.data) { tampilTutup(t('tutupTakAda')); return; }
        gerbang();
      } catch (e) {
        bersihkan();
        tampilTutup(e.status === 404 ? t('tutupTakPin') : t('tutupGagal'));
      }
    }

    /*
     * Yang menentukan buka-tutup adalah TOGEL di dasbor, bukan tanggalnya.
     *
     * Versi pertama memeriksa jendelanya juga, dan akibatnya panitia
     * menyalakan togel lalu menemukan formulirnya tetap tidak muncul. Dua
     * sumber kebenaran untuk satu pertanyaan; sekarang satu.
     *
     * Tanggalnya tetap dipakai — tapi untuk MENJELASKAN, bukan menghalangi.
     * Yang datang sebelum tanggal buka diberi tahu kapan harus kembali.
     */
    function gerbang() {
      var p = keadaan.data;
      if (p.dibuka) {
        var sesi = bacaSesi();
        if (sesi) {
          keadaan.email = sesi.email;
          keadaan.tiket = sesi.tiket;
          keadaan.nama = sesi.nama || '';
          keadaan.akun = sesi.akun || null;
          keadaan.asal = sesi.asal || null;
          keadaan.moda = sesi.moda || null;
          keadaan.bahasa = sesi.bahasa === 'en' ? 'en' : 'id';
          keadaan.jalurDitanya = !!sesi.jalurDitanya;
          keadaan.kedaluwarsa = sesi.kedaluwarsa;
          return layarLanjut();
        }
        return layarJalur();
      }
      var buka = p.buka_at ? Date.parse(p.buka_at) : null;
      if (buka && Date.now() < buka) return tampilTutup(t('tutupRencana')(tanggal(buka)));
      tampilTutup(t('tutupBelum'));
    }

    function tanggal(ms) {
      try {
        return new Date(ms).toLocaleDateString(t('lokal'), {
          day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta'
        });
      } catch (e) { return new Date(ms).toISOString().slice(0, 10); }
    }

    function tampilTutup(teks) {
      bersihkan();
      kotak.appendChild(el('div', { class: 'tutup' }, [
        el('div', { class: 'besar', teks: t('tutupJudul') }),
        el('p', { teks: teks })
      ]));
    }

    /*
     * Layar sambungan, bukan langsung ke formulir.
     *
     * Melompat diam-diam ke formulir yang setengah dikenali membuat orang
     * mengira halamannya salah — apalagi kalau yang membukanya orang lain di
     * komputer yang sama. Satu layar yang menyebut alamatnya dan menawarkan
     * "mulai dari awal" menjawab keduanya sekaligus.
     */
    function layarLanjut() {
      bersihkan();
      kotak.appendChild(el('h3', { teks: t('lanjutJudul') }));
      kotak.appendChild(el('p', { class: 'ket', teks: t('lanjutKet')(keadaan.email) }));
      var lanjut = el('button', { type: 'button', teks: t('lanjutTombol') });
      var ulang = el('button', { type: 'button', class: 'samar', teks: t('lanjutUlang') });
      kotak.appendChild(el('div', { class: 'aksi' }, [lanjut, ulang]));
      lanjut.addEventListener('click', layarFormulir);
      ulang.addEventListener('click', function () {
        hapusSesi();
        keadaan.email = ''; keadaan.tiket = ''; keadaan.nama = '';
        keadaan.akun = null; keadaan.kedaluwarsa = 0;
        layarJalur();
      });
    }

    // ── Tahap 0: jalur pendaftaran ─────────────────────────────────────
    //
    // ── Kenapa langkah, bukan halaman ────────────────────────────────────
    //
    // Situs resmi dulu menjawab pertanyaan ini dengan enam alamat berbeda.
    // Konsekuensinya bukan cuma empat salinan formulir yang harus disunting
    // berbarengan: pengunjung diminta MEMILIH sebelum ia melihat apa pun,
    // dari menu yang tidak menyebut satu pun harga, dan pilihan yang salah
    // baru ketahuan setelah seluruh formulir terisi.
    //
    // ── Kenapa sumbu yang tunggal tidak ditanyakan ───────────────────────
    //
    // Ajang nasional tidak punya paket internasional sama sekali. Menanyakan
    // asal peserta di sana berarti menyodorkan pilihan yang salah satunya
    // pasti kosong — dan yang memilihnya sampai di layar berikutnya tanpa
    // satu pun paket. Sumbunya dibaca dari paket yang BENAR-BENAR ada, jadi
    // pertanyaannya hilang sendiri tanpa ada yang menyetel apa pun.
    //
    // Kalau kedua sumbu tunggal — satu paket, satu jalur — langkah ini
    // dilewati seluruhnya.
    function layarJalur() {
      var asalAda = nilaiUnik('asal');
      var modaAda = nilaiUnik('moda');

      if (asalAda.length <= 1) setAsal(asalAda[0] || null);
      if (modaAda.length <= 1) keadaan.moda = modaAda[0] || null;

      var tanyaAsal = asalAda.length > 1;
      var tanyaModa = modaAda.length > 1;
      if (!tanyaAsal && !tanyaModa) { keadaan.jalurDitanya = false; return layarSurel(); }

      // Jalur dari tautan lama: kalau sudah lengkap, tidak perlu ditanya lagi.
      if ((!tanyaAsal || keadaan.asal) && (!tanyaModa || keadaan.moda) && paketJalur().length) {
        if (keadaan.asal) setAsal(keadaan.asal);
        keadaan.jalurDitanya = true;
        return layarSurel();
      }

      keadaan.jalurDitanya = true;
      bersihkan();
      kotak.appendChild(el('h3', { teks: t('jalurJudul') }));
      kotak.appendChild(el('p', { class: 'ket', teks: t('jalurKet') }));

      var pilihanAsal = null;
      var pilihanModa = null;

      /* Cacah paket dihitung ulang tiap pilihan berubah, karena kedua sumbu
         saling menyaring: "daring" berarti hal yang berbeda bagi peserta
         Indonesia dan peserta internasional. */
      function cacah(sumbu, nilai) {
        var a = sumbu === 'asal' ? nilai : (pilihanAsal || keadaan.asal);
        var m = sumbu === 'moda' ? nilai : (pilihanModa || keadaan.moda);
        var cocok = ((keadaan.data && keadaan.data.paket) || []).filter(function (x) {
          return (!a || x.asal === a) && (!m || x.moda === m);
        });
        if (!cocok.length) return '';

        /*
         * Rentang harga hanya ditampilkan kalau seluruh paket yang cocok
         * sekurs. Kartu "Daring" ditekan SEBELUM asal peserta dipilih masih
         * mencakup paket rupiah dan paket dolar sekaligus; menuliskan
         * "USD 275 – IDR 1.150.000" di sana bukan rentang, melainkan dua
         * angka yang kebetulan berdampingan.
         */
        var kurs = [];
        cocok.forEach(function (x) { if (kurs.indexOf(x.asal) < 0) kurs.push(x.asal); });
        var jumlah = t('jalurPaket')(cocok.length);
        if (kurs.length !== 1) return jumlah;

        var angka = cocok
          .map(function (x) { return x.harga === null || x.harga === undefined ? null : Number(x.harga); })
          .filter(function (n) { return n !== null && !isNaN(n); })
          .sort(function (a, b) { return a - b; });
        if (!angka.length) return jumlah;

        var contoh = cocok[0];
        var murah = rupiahAtau({ harga: angka[0], asal: contoh.asal });
        var mahal = rupiahAtau({ harga: angka[angka.length - 1], asal: contoh.asal });
        return jumlah + '  ·  ' + (murah === mahal ? murah : murah + ' – ' + mahal);
      }

      var kartuSemua = [];

      function grup(sumbu, judul, nilaiTersedia, terpilihAwal) {
        var wadah = el('div', { class: 'jalur' });
        nilaiTersedia.forEach(function (n) {
          var radio = el('input', { type: 'radio', name: sumbu, value: n });
          if (n === terpilihAwal) radio.checked = true;
          var cacahEl = el('span', { class: 'cacah' });
          var label = el('label', {}, [
            radio,
            el('span', { class: 'nama', teks: t(sumbu + '_' + n) }),
            el('span', { class: 'ket2', teks: t(sumbu + '_' + n + '_ket') }),
            cacahEl
          ]);
          if (n === terpilihAwal) label.className = 'pilih';
          radio.addEventListener('focus', function () { label.classList.add('fokus'); });
          radio.addEventListener('blur', function () { label.classList.remove('fokus'); });
          radio.addEventListener('change', function () {
            if (sumbu === 'asal') pilihanAsal = n; else pilihanModa = n;
            Array.prototype.forEach.call(wadah.querySelectorAll('label'), function (l) {
              l.classList.remove('pilih');
            });
            label.classList.add('pilih');
            segarkanCacah();
            pesan('');
          });
          kartuSemua.push({ sumbu: sumbu, nilai: n, el: cacahEl });
          wadah.appendChild(label);
        });
        return el('fieldset', {}, [el('legend', { teks: judul }), wadah]);
      }

      function segarkanCacah() {
        kartuSemua.forEach(function (k) { k.el.textContent = cacah(k.sumbu, k.nilai); });
      }

      if (tanyaAsal) {
        pilihanAsal = keadaan.asal || null;
        kotak.appendChild(grup('asal', t('jalurAsal'), asalAda, pilihanAsal));
      }
      if (tanyaModa) {
        pilihanModa = keadaan.moda || null;
        kotak.appendChild(grup('moda', t('jalurModa'), modaAda, pilihanModa));
      }
      segarkanCacah();

      var lanjut = el('button', { type: 'button', teks: t('jalurLanjut') });
      kotak.appendChild(el('div', { class: 'aksi' }, [lanjut]));
      lanjut.addEventListener('click', function () {
        if (tanyaAsal && !pilihanAsal) return pesan(t('jalurBelum'));
        if (tanyaModa && !pilihanModa) return pesan(t('jalurBelum'));
        if (tanyaAsal) setAsal(pilihanAsal);
        if (tanyaModa) keadaan.moda = pilihanModa;
        if (!paketJalur().length) return pesan(t('jalurBelum'));
        /* Tiketnya melekat pada alamat surel dan edisi, bukan pada paket —
           jadi mengganti jalur tidak membatalkan verifikasi yang sudah ada. */
        if (keadaan.tiket) { simpanSesi(); return layarFormulir(); }
        layarSurel();
      });
    }

    /* Tombol kembali ke pilihan jalur. Hanya muncul kalau jalurnya memang
       ditanyakan — kalau ajangnya cuma punya satu jalur, tombol yang membawa
       ke layar berisi satu pilihan adalah jalan buntu yang terlihat seperti
       pilihan. */
    function tombolGantiJalur() {
      if (!keadaan.jalurDitanya) return null;
      var b = el('button', { type: 'button', class: 'samar kecil', teks: t('jalurKembali') });
      b.addEventListener('click', layarJalur);
      return b;
    }

    // ── Tahap 1: alamat surel ──────────────────────────────────────────
    function layarSurel() {
      bersihkan();
      kotak.appendChild(el('h3', { teks: t('surelJudul') }));
      kotak.appendChild(el('p', { class: 'ket', teks: t('surelKet') }));
      var input = el('input', { type: 'email', name: 'email', placeholder: t('surelContoh'), required: 'required' });
      input.value = keadaan.email;
      kotak.appendChild(ruas(t('surelLabel'), input));
      var tombol = el('button', { type: 'button', teks: t('surelKirim') });
      kotak.appendChild(el('div', { class: 'aksi' }, [tombol, tombolGantiJalur()]));

      tombol.addEventListener('click', async function () {
        var e = (input.value || '').trim();
        if (!e || e.indexOf('@') < 0) return pesan(t('surelSalah'));
        tombol.disabled = true; tombol.textContent = t('surelMengirim');
        try {
          await json('/api/registration-access/request-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // `event_id` ikut supaya surelnya bisa menyebut ajangnya. Orang
            // yang mendaftar ke dua ajang di minggu yang sama tidak punya cara
            // lain membedakan dua kode di kotak masuknya.
            body: JSON.stringify({ email: e, event_id: keadaan.identitas.id || undefined })
          });
          keadaan.email = e;
          layarKode();
        } catch (err) {
          pesan(err.message);
          tombol.disabled = false; tombol.textContent = t('surelKirim');

          /*
           * 429 di sini berarti kode SUDAH pernah dikirim baru-baru ini — jeda
           * 60 detik, atau batas per jam. Dua-duanya berarti ada kode yang
           * kemungkinan besar masih berlaku di kotak masuknya, tapi versi
           * sebelumnya menutup jalan: pesan merah, tombol yang menolak, dan
           * tidak ada satu pun cara maju.
           *
           * Jalan keluarnya bukan mengubah batasnya, melainkan berhenti
           * menganggap "tidak bisa kirim lagi" sama dengan "tidak bisa lanjut".
           */
          if (err.status === 429 && (input.value || '').trim().indexOf('@') > 0) {
            keadaan.email = (input.value || '').trim();
            var punya = el('button', { type: 'button', class: 'samar', teks: t('surelPunyaKode') });
            punya.addEventListener('click', function () { layarKode(t('surelJedaKet')); });
            kotak.appendChild(el('div', { class: 'aksi' }, [punya]));
          }
        }
      });
    }

    // ── Tahap 2: kode ──────────────────────────────────────────────────
    function layarKode(catatan) {
      bersihkan();
      kotak.appendChild(el('h3', { teks: t('kodeJudul') }));
      kotak.appendChild(el('p', {
        class: 'ket',
        teks: (catatan ? catatan + ' ' : '') + t('kodeKet')(keadaan.email)
      }));
      var input = el('input', { type: 'text', inputmode: 'numeric', maxlength: '8', placeholder: '000000' });
      kotak.appendChild(ruas(t('kodeLabel'), input));
      var lanjut = el('button', { type: 'button', teks: t('kodeVerif') });
      var ganti = el('button', { type: 'button', class: 'samar', teks: t('kodeGanti') });
      kotak.appendChild(el('div', { class: 'aksi' }, [lanjut, ganti]));

      ganti.addEventListener('click', function () {
        hapusSesi();
        keadaan.tiket = ''; keadaan.akun = null; keadaan.kedaluwarsa = 0;
        layarSurel();
      });
      lanjut.addEventListener('click', async function () {
        var k = (input.value || '').trim();
        if (!k) return pesan(t('kodeKosong'));
        lanjut.disabled = true; lanjut.textContent = t('kodeMemeriksa');
        try {
          var d = await json('/api/registration-access/verify-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: keadaan.email, kode: k, event_id: keadaan.identitas.id || undefined })
          });
          if (!d.tiket) {
            /*
             * Tiket hanya terbit kalau `event_id` dikenali. Kalau ia kosong,
             * pengiriman pasti ditolak nanti — lebih baik berhenti di sini,
             * sebelum ada yang mengisi formulirnya.
             */
            pesan(t('kodeTanpaTiket'));
            lanjut.disabled = false; lanjut.textContent = t('kodeVerif');
            return;
          }
          keadaan.tiket = d.tiket;
          keadaan.nama = d.nama || '';
          /*
           * Keadaan akun sudah dikembalikan verify-code sejak awal — `akun_ada`,
           * `sudah_aktif`, `posisi_di_event`, `tim_dibimbing` — dan selama ini
           * dibuang seluruhnya. Padahal itulah yang menentukan surel seperti apa
           * yang akan orang ini terima, dan menyebutkannya SEKARANG jauh lebih
           * murah daripada menjawab "kenapa saya disuruh buat kata sandi padahal
           * akun saya sudah ada" sesudahnya.
           */
          keadaan.akun = {
            ada: !!d.akun_ada,
            aktif: !!d.sudah_aktif,
            posisi: d.posisi_di_event || null,
            tim: Number(d.tim_dibimbing || 0)
          };
          keadaan.kedaluwarsa = Date.now()
            + (Number(d.tiket_berlaku_jam) || 2) * 3600000;
          simpanSesi();
          layarFormulir();
        } catch (err) {
          pesan(err.message);
          lanjut.disabled = false; lanjut.textContent = t('kodeVerif');
        }
      });
    }

    /*
     * Apa yang ditemukan dari alamat surelnya, dikatakan sebelum ia terjadi.
     *
     * ── Kenapa ini bukan hiasan ──────────────────────────────────────────
     *
     * Alur pendaftaran ini mengirim surel yang BERBEDA tergantung keadaan
     * akunnya: yang belum punya akun menerima "Akun Anda sudah disiapkan"
     * dengan tautan pembuatan kata sandi; yang akunnya sudah aktif menerima
     * "Peran baru ditambahkan" tanpa tautan apa pun, karena tautan klaim
     * menyetel ulang kata sandi dan mengirimkannya ke akun sehat berarti
     * menaruh alat pengambilalihan di kotak surat.
     *
     * Percabangan itu benar, tapi tak seorang pun diberi tahu percabangan
     * mana yang berlaku untuknya. Akibatnya dua pertanyaan yang sama-sama
     * mahal bagi panitia: "kenapa saya disuruh membuat kata sandi padahal
     * akun saya sudah ada" dan "kenapa saya tidak dapat tautan seperti teman
     * saya". Keduanya hilang kalau jawabannya sudah ada di layar sebelum
     * surelnya dikirim.
     *
     * Jumlah tim yang dibimbing ikut disebut karena ia mencegah kesalahan
     * yang paling mahal di halaman ini: pembimbing yang mengira formulir ini
     * menyunting timnya, lalu mendaftarkan tim kedua yang sama.
     */
    function panelAkun() {
      var a = keadaan.akun;
      if (!a) return null;

      var judul; var isi = [];
      if (!a.ada) {
        judul = t('akunBaru');
        isi.push(t('akunBaruKet'));
      } else if (!a.aktif) {
        judul = t('akunBelumAktif');
        isi.push(t('akunBelumAktifKet'));
      } else {
        judul = t('akunAktif')(keadaan.nama);
        isi.push(t('akunAktifKet'));
      }
      if (a.posisi) isi.push(t('akunPeran')(a.posisi.split(',').join(', ')));
      if (a.tim > 0) isi.push(t('akunTim')(a.tim));

      return el('div', { class: 'akun' }, [el('p', { class: 'judul', teks: judul })]
        .concat(isi.map(function (x) { return el('p', { teks: x }); })));
    }

    // ── Tahap 3: formulir ──────────────────────────────────────────────
    function layarFormulir() {
      bersihkan();
      var p = keadaan.data;
      kotak.appendChild(el('h3', { teks: t('formJudul') }));
      kotak.appendChild(el('p', { class: 'ket', teks: t('formKet')(keadaan.email) }));
      var panel = panelAkun();
      if (panel) kotak.appendChild(panel);

      var form = el('form');

      /*
       * Paketnya sudah disaring jalur. Yang tersisa di dropdown ini cuma yang
       * benar-benar bisa dipilih orang ini — dulu ketujuhnya berbaris
       * bersamaan, dan peserta Indonesia menatap "USD 105" di sebelah
       * "IDR 3.500.000" tanpa tahu mana yang miliknya.
       */
      var daftarPaket = paketJalur();
      var pkt = pilihan('packageId', daftarPaket.map(function (x) {
        var h = rupiahAtau(x);
        return { nilai: x.id, label: x.nama + (h ? '  ·  ' + h : '') };
      }), t('pilihPaket'));
      /* Satu paket berarti tidak ada yang perlu dipilih — pilih sendiri, tapi
         biarkan terlihat supaya orangnya tahu apa yang ia dapat. */
      if (daftarPaket.length === 1) pkt.value = daftarPaket[0].id;

      var kat = pilihan('categoryId', (p.kategori || []).map(function (x) {
        return { nilai: x.id, label: x.nama };
      }), t('pilihKategori'));
      var jenjang = pilihan('grade', (p.jenjang || []).map(function (g) {
        return { nilai: g, label: t('jenjang')[g] || g };
      }), t('pilihJenjang'));

      var ruasPaket = ruas(t('lbPaket'), pkt);
      ruasPaket.className = 'lebar';
      form.appendChild(el('fieldset', {}, [
        el('legend', { teks: t('grupPaket') }),
        el('div', { class: 'baris' }, [
          ruasPaket,
          ruas(t('lbKategori'), kat)
        ])
      ]));

      var namaTim = el('input', { name: 'teamName', required: 'required' });
      var institusi = el('input', { name: 'institution' });
      /* Negara tidak dipraisi "Indonesia" untuk jalur internasional — nilai
         bawaan yang salah lebih mahal daripada ruas kosong: ia terkirim apa
         adanya oleh orang yang mengira ruasnya sudah benar. */
      var negara = el('input', {
        name: 'country',
        placeholder: keadaan.asal === 'international' ? '' : 'Indonesia'
      });
      var provinsi = el('input', { name: 'province' });
      var npsn = el('input', { name: 'npsn' });

      form.appendChild(el('fieldset', {}, [
        el('legend', { teks: t('grupTim') }),
        el('div', { class: 'baris' }, [
          ruas(t('lbNamaTim'), namaTim),
          ruas(t('lbInstitusi'), institusi),
          ruas(t('lbJenjang'), jenjang),
          ruas(t('lbNegara'), negara),
          ruas(t('lbProvinsi'), provinsi, true),
          ruas(t('lbNpsn'), npsn, true)
        ])
      ]));

      var wadahAnggota = el('div');
      var tambah = el('button', { type: 'button', class: 'samar kecil', teks: t('tambahAnggota') });
      form.appendChild(el('fieldset', {}, [
        el('legend', { teks: t('grupAnggota') }),
        wadahAnggota,
        el('div', { class: 'aksi' }, [tambah])
      ]));

      function gambarAnggota() {
        while (wadahAnggota.firstChild) wadahAnggota.removeChild(wadahAnggota.firstChild);
        for (var i = 0; i < keadaan.anggota; i++) {
          (function (idx) {
            var hapus = el('button', { type: 'button', class: 'kecil', teks: t('hapus') });
            hapus.addEventListener('click', function () {
              keadaan.anggota -= 1; gambarAnggota();
            });
            var kepala = el('div', { class: 'anggota-kepala' }, [
              el('span', { teks: idx === 0 ? t('ketua') : t('anggotaKe')(idx + 1) }),
              idx > 0 ? hapus : null
            ]);
            var nama = el('input', { 'data-a': 'fullName', 'data-i': String(idx), required: 'required' });
            if (idx === 0 && keadaan.nama) nama.value = keadaan.nama;
            var surel = el('input', { type: 'email', 'data-a': 'email', 'data-i': String(idx) });
            if (idx === 0) surel.value = keadaan.email;
            var nisn = el('input', { 'data-a': 'nationalIdNumber', 'data-i': String(idx) });
            var wa = el('input', { 'data-a': 'phoneNumber', 'data-i': String(idx), placeholder: '08…' });
            var kaos = pilihan('', (p.merchandise_resmi && p.merchandise_resmi.ukuran || []).map(function (u) {
              return { nilai: u, label: u };
            }), t('pilihKaos'));
            kaos.setAttribute('data-a', 'tshirtSize'); kaos.setAttribute('data-i', String(idx));
            wadahAnggota.appendChild(el('div', { class: 'anggota' }, [
              kepala,
              el('div', { class: 'baris' }, [
                ruas(t('lbNama'), nama),
                ruas(t('lbSurel'), surel, idx > 0),
                ruas(t('lbNisn'), nisn, true),
                ruas(t('lbWa'), wa, true),
                ruas(t('lbKaos'), kaos, true)
              ])
            ]));
          })(i);
        }
      }
      gambarAnggota();
      tambah.addEventListener('click', function () { keadaan.anggota += 1; gambarAnggota(); });

      var pemNama = el('input', { name: 'sv_name' });
      var pemSurel = el('input', { type: 'email', name: 'sv_email' });
      var pemWa = el('input', { name: 'sv_phone' });
      form.appendChild(el('fieldset', {}, [
        el('legend', { teks: t('grupPembimbing') }),
        el('div', { class: 'baris' }, [
          ruas(t('lbPemNama'), pemNama, true),
          ruas(t('lbPemSurel'), pemSurel, true),
          ruas(t('lbWa'), pemWa, true)
        ])
      ]));

      var judul = el('input', { name: 'projectTitle', required: 'required' });
      var alamat = el('textarea', { name: 'shippingAddress', placeholder: t('lbAlamatContoh') });
      var sumber = el('input', { name: 'infoSource', placeholder: t('lbSumberContoh') });
      form.appendChild(el('fieldset', {}, [
        el('legend', { teks: t('grupProyek') }),
        ruas(t('lbJudul'), judul),
        el('div', { style: 'height:.75rem' }),
        ruas(t('lbAlamat'), alamat, true),
        el('div', { style: 'height:.75rem' }),
        ruas(t('lbSumber'), sumber, true)
      ]));

      var kirim = el('button', { type: 'submit', teks: t('kirim') });
      form.appendChild(el('div', { class: 'aksi' }, [kirim, tombolGantiJalur()]));
      kotak.appendChild(form);

      form.addEventListener('submit', async function (ev) {
        ev.preventDefault();
        var paketTerpilih = daftarPaket.filter(function (x) { return x.id === pkt.value; })[0];
        if (!paketTerpilih) return pesan(t('belumPaket'));
        if (!jenjang.value) return pesan(t('belumJenjang'));

        var anggota = [];
        for (var i = 0; i < keadaan.anggota; i++) {
          var ambil = function (nama) {
            var n = form.querySelector('[data-a="' + nama + '"][data-i="' + i + '"]');
            return n && n.value ? n.value.trim() : '';
          };
          if (!ambil('fullName')) return pesan(t('belumNama')(i + 1));
          anggota.push({
            isLeader: i === 0,
            fullName: ambil('fullName'),
            email: ambil('email') || undefined,
            school: institusi.value.trim() || undefined,
            phoneNumber: ambil('phoneNumber') || undefined,
            nationalIdNumber: ambil('nationalIdNumber') || null,
            tshirtSize: ambil('tshirtSize') || 'none'
          });
        }

        var muatan = {
          tiket: keadaan.tiket,
          packageId: paketTerpilih.id,
          categoryId: kat.value || undefined,
          participantType: paketTerpilih.asal === 'international' ? 'International Citizen' : 'Indonesia Citizen',
          teamName: namaTim.value.trim(),
          institution: institusi.value.trim() || undefined,
          npsn: npsn.value.trim() || null,
          grade: jenjang.value,
          province: provinsi.value.trim() || null,
          country: negara.value.trim()
            || (keadaan.asal === 'international' ? '' : 'Indonesia') || undefined,
          projectTitle: judul.value.trim(),
          hasCompetedBefore: false,
          shippingAddress: alamat.value.trim() || undefined,
          infoSource: sumber.value.trim() || undefined,
          referralSource: sumber.value.trim() || undefined,
          medalAddon: false,
          members: anggota
        };
        if (pemNama.value.trim() && pemSurel.value.trim()) {
          muatan.supervisor = {
            full_name: pemNama.value.trim(),
            email: pemSurel.value.trim(),
            phone_number: pemWa.value.trim() || '',
            institution: institusi.value.trim() || ''
          };
        }

        kirim.disabled = true; kirim.textContent = t('mengirim');
        try {
          var hasil = await json('/api/public/v1/' + encodeURIComponent(seri) + '/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(muatan)
          });
          /* Tiketnya sudah terpakai. Menyisakannya di penyimpanan berarti
             kunjungan berikutnya menawarkan "lanjutkan" untuk pendaftaran yang
             sudah selesai. */
          hapusSesi();
          layarSelesai(hasil);
        } catch (err) {
          pesan(err.message);
          kirim.disabled = false; kirim.textContent = t('kirim');
          /*
           * Tiket bisa kedaluwarsa saat orangnya sedang mengisi — dua jam, dan
           * formulir ini panjang. Membiarkannya menekan tombol yang akan
           * ditolak terus tidak menolong siapa pun; yang dibutuhkan verifikasi
           * ulang, dan itu cuma satu surel lagi.
           *
           * Dikenali lewat `code`, bukan lewat status: 409 dipakai untuk tiket
           * terpakai DAN untuk pendaftaran yang ditutup, dan membuang
           * verifikasi orang karena panitia baru saja menutup pendaftaran
           * adalah menghukum yang salah.
           */
          if (TIKET_MATI.indexOf(err.kode) >= 0) {
            hapusSesi();
            keadaan.tiket = ''; keadaan.kedaluwarsa = 0;
          }
        }
      });
    }

    function layarSelesai(hasil) {
      bersihkan();
      kotak.appendChild(el('div', { class: 'selesai' }, [
        el('div', { class: 'besar', teks: t('selesaiJudul') }),
        el('p', {
          teks: (hasil && hasil.diulang) ? t('selesaiUlang') : t('selesaiKet')(keadaan.email)
        })
      ]));
    }

    mulai();
  }

  function pasang() {
    var inang = document.querySelectorAll('[data-iysa-daftar]');
    Array.prototype.forEach.call(inang, function (n) {
      if (n.shadowRoot) return; // sudah dipasang
      var seri = (n.getAttribute('data-iysa-daftar') || '').trim();
      if (!seri) {
        n.textContent = 'Atribut data-iysa-daftar belum diisi akronim seri, mis. "gyiif".';
        return;
      }
      Widget(n, seri);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', pasang);
  } else {
    pasang();
  }

  /*
   * Dibuka juga sebagai `window.IysaDaftar.pasang()`.
   *
   * Situs resmi tiap event dibangun dengan Next.js, dan perpindahan halaman di
   * sana terjadi TANPA memuat ulang dokumen. Skrip ini sudah dieksekusi sekali
   * saat kunjungan pertama, jadi pindah ke halaman pendaftaran lewat menu tidak
   * memicunya lagi — dan wadahnya tinggal kosong tanpa satu pun galat yang
   * menjelaskan kenapa.
   *
   * Halaman yang perlu memanggilnya sendiri memakai ini di `useEffect`-nya.
   * Aman diulang: `pasang` melewati wadah yang sudah punya shadow root.
   */
  window.IysaDaftar = window.IysaDaftar || {};
  window.IysaDaftar.pasang = pasang;
})();

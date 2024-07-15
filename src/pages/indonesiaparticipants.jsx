import Navigation from "../components/navigation";
import { Footer } from "../components/footer";

import { Inter } from "next/font/google";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

function IndoensiaParticipants() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedNamaLengkap, setSelectedNamaLengkap] = useState("");
  const [price, setPrice] = useState("");
  const [paymentUrl, setPaymentUrl] = useState("");
  const [uniqueId, setUniqueId] = useState(""); // Mengatur uniqueId ke state
  const [phone, setPhone] = useState(""); // Menambah state untuk phone (Nomor WhatsApp)
  const adminFee = 4500; // Biaya admin tetap

  const generateUniqueId = () => {
    const timestamp = new Date().getTime();
    return `GYIIF${timestamp}`;
  };

  const generateFormData = (
    selectedCategory,
    price,
    uniqueId,
    selectedNamaLengkap,
    phone
  ) => {
    const formattedPrice = Math.max(Math.floor(price), 1);
    const totalPrice = formattedPrice + adminFee;

    // Memecah nama lengkap menjadi array berdasarkan baris
    const names = selectedNamaLengkap.split("\n");

    // Mengambil nama pertama sebagai Nama Ketua
    const ketua = names.length > 0 ? names[0] : "";

    return {
      item_details: [
        {
          id: uniqueId,
          name: selectedCategory,
          price: formattedPrice.toString(),
          quantity: "1",
        },
        {
          id: `${uniqueId}-admin`,
          name: "Admin Fee",
          price: adminFee.toString(),
          quantity: "1",
        },
      ],
      customer_details: {
        first_name: ketua, // Menggunakan nama pertama sebagai Nama Ketua
        phone: phone,
        notes: "Thankyou",
      },
      transaction_details: {
        order_id: uniqueId,
        gross_amount: totalPrice.toString(), // Menggunakan total harga
      },
    };
  };

  const generatePaymentLink = async () => {
    if (
      selectedCategory !== "GYIIF Online Competition" &&
      selectedCategory !== "GYIIF Offline Competition" &&
      selectedCategory !== "GYIIF Offline + Full Pack" &&
      selectedCategory !== "GYIIF Offline + Medali"       
    ) {
      alert(
        "Anda harus memilih salah satu kategori untuk membuat tautan pembayaran."
      );
      return;
    }

    if (!selectedNamaLengkap) {
      alert("Nama lengkap harus diisi untuk membuat tautan pembayaran.");
      return;
    }

    if (!phone) {
      alert(
        "Nomor telepon ketua tim harus diisi untuk membuat tautan pembayaran."
      );
      return; // Menghentikan eksekusi fungsi jika phone belum diisi
    } else if (phone.length < 5 || phone.length > 20) {
      alert(
        "Nomor telepon harus memiliki panjang antara 5 hingga 20 karakter."
      );
      return; // Menghentikan eksekusi fungsi jika panjang phone tidak sesuai
    }

    const newUniqueId = generateUniqueId(); // Menghasilkan uniqueId baru
    setUniqueId(newUniqueId); // Menyimpan uniqueId baru ke state

    const formData = generateFormData(
      selectedCategory,
      price,
      newUniqueId,
      selectedNamaLengkap,
      phone
    );

    const secret = process.env.NEXT_PUBLIC_SECRET;
    const encodedSecret = Buffer.from(secret).toString("base64");
    const basicAuth = `Basic ${encodedSecret}`;

    const apiUrl = `${process.env.NEXT_PUBLIC_API}/v1/payment-links`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: basicAuth,
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log("Response Data:", responseData);
      setPaymentUrl(responseData.payment_url);

      const buttonInput = document.querySelector("form .button input");
      buttonInput.style.display = "block";
    } catch (error) {
      console.error("Error saat mengirim permintaan:", error);
    }
  };

  useEffect(() => {
    if (selectedCategory === "GYIIF Online Competition") {
      setPrice("100000");
    } else if (selectedCategory === "GYIIF Offline Competition") {
      setPrice("200000");
    } else if (selectedCategory === "GYIIF Offline + Full Pack") {
      setPrice("500000");
    } else if (selectedCategory === "GYIIF Offline + Medali") {
      setPrice("300000");
    } else {
      setPrice("");
    }
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbwWMFqBTySdQaSaV3yv0KcPqU2qjpBblcje_4TNulzhcXMvlVlA8RcijMi_mhbjQ_oG/exec";
    const form = document.forms["regist-form"];

    if (form) {
      try {
        await fetch(scriptURL, { method: "POST", body: new FormData(form) });
        form.reset();
        setSelectedCategory("");
        setPrice("");
        setPaymentUrl("");
        setUniqueId("");
      } catch (error) {
        console.error("Error saat mengirim data:", error);
      }
    }
  };

  useEffect(() => {
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbwWMFqBTySdQaSaV3yv0KcPqU2qjpBblcje_4TNulzhcXMvlVlA8RcijMi_mhbjQ_oG/exec";

    const form = document.forms["regist-form"];

    if (form) {
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await fetch(scriptURL, { method: "POST", body: new FormData(form) });

          // Setelah berhasil mengirim data, arahkan pengguna ke halaman lain
          window.location.href = "/terimakasih"; // Gantikan dengan URL halaman sukses Anda
        } catch (error) {
          console.error("Error saat mengirim data:", error);
          // Handle error jika diperlukan
        }

        form.reset();
      };

      form.addEventListener("submit", handleSubmit);

      // Membersihkan event listener saat komponen dilepas
      return () => {
        form.removeEventListener("submit", handleSubmit);
      };
    }
  }, []);
  return (
    <>
      <Navigation />
      <section className="registration-section">
        <div className="container">
          <div className="content">
            <h1 className="sub">FORMULIR PENDAFTARAN</h1>
            <h1 className="garis-bawah"></h1>
            <br></br>
            <h4>
              HALLO PESERTA GYIIF 2025, Mohon perhatikan informasi berikut ini
              sebelum mengisi formulir pendaftaran :
            </h4>
            <br />
            <p>
              1. Mohon mengisi data yang diperlukan dengan benar dan memastikan
              tidak ada kesalahan penulisan. Pastikan juga bahwa data yang
              dikirim sudah final dan tidak mengalami perubahan.
            </p>
            <p>
              2. Pastikan invoice id sudah terbuat agar tombol untuk kirim data bisa muncul.
            </p>
            <p>
              3. Setelah memastikan data sudah benar, Anda dapat mengklik tombol
              &quot;Kirim&quot;. Jika kami telah menerima data Anda, akan ada
              notifikasi berwarna hijau di sebelah tombol &quot;Kirim&quot;.
            </p>
            <p>
              4. Notifikasi: Data telah berhasil terkirim data registrasi akan
              dikirimkan ke alamat email ketua tim, dan berkas akan divalidasi
              oleh tim kami.Mohon bersabar dan tunggu hingga 3 hari setelah
              waktu pendaftaran. Surat Penerimaan (LOA) akan kami kirimkan ke
              alamat email ketua tim.
            </p>
            <br></br>

            <form name="regist-form">
              <h1>BIODATA</h1>
              <h1 className="garis-bawah"></h1>
              <div className="user-details">
                <div className="input-box">
                  <label className="form-label" value="Peserta Indonesia">Kategori Peserta</label>
                  <input
                    type="text"
                    id="CATEGORY_PARTICIPANT"
                    name="CATEGORY_PARTICIPANT"
                    className="form-control"
                    placeholder="Choose Categories Participant"
                    value="PESERTA INDONESIA"
                    readOnly
                  />
                </div>
              </div>

              <div className="user-details">
                <div className="input-box">
                  <label htmlFor="NAMA_LENGKAP" className="form-label">
                    Nama Ketua & Anggota Tim
                  </label>
                  <label>
                    <p>
                      Masukan nama ketua dan anggota tim dengan nama
                      ketua tim diawal, dengan format seperti berikut :
                    </p>
                    <p>
                      Note : maksimal 5 anggota + 1 ketua tim
                    </p>
                    <h6>Kamal Putra</h6>
                    <h6>Ranu Ramadhan</h6>
                    <h6>Irsyad Zaidan</h6>
                  </label>
                  <textarea
                    type="text"
                    id="NAMA_LENGKAP"
                    name="NAMA_LENGKAP"
                    className="form-control"
                    placeholder="Masukan Nama Ketua & Anggota"
                    required
                    value={selectedNamaLengkap}
                    onChange={(e) => setSelectedNamaLengkap(e.target.value)} // Menambahkan handler onChange
                  ></textarea>
                </div>
                <div className="input-box">
                  <label htmlFor="LEADER_WHATSAPP" className="form-label">
                    Nomor WhatsApp Ketua Tim
                  </label>
                  <label>
                    <p>
                      Harap tulis dengan kode telepon, contoh : +6281770914129
                    </p>
                    <p>
                      Notes : Dimohon untuk mengisi nomor ketua tim dengan
                      benar, untuk dimasukan kedalam group
                    </p>
                  </label>
                  <input
                    type="number"
                    id="LEADER_WHATSAPP"
                    name="LEADER_WHATSAPP"
                    className="form-control"
                    placeholder="Masukan Nomor WhatsApp Ketua Tim"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)} // Menambahkan handler onChange
                  />
                </div>
                <div className="input-box">
                  <label for="LEADER_EMAIL" className="form-label">
                    Alamat Email Ketua Tim
                  </label>
                  <label>
                    <p>
                      Notes : Dimohon untuk mengisi email dengan benar,
                      pengiriman LOA akan dikirim melalui email address ketua
                      tim yang di isi.
                    </p>
                  </label>
                  <input
                    type="email"
                    id="LEADER_EMAIL"
                    name="LEADER_EMAIL"
                    className="form-control"
                    placeholder="Masukan Alamat Email Ketua Tim"
                    required
                  />
                </div>
                <div className="input-box">
                  <label for="NISN_NIM" className="form-label">
                    NISN / NIM Ketua & Anggota Tim
                  </label>
                  <label>
                    <p>
                      Notes : Masukan NISN / NIM dengan sesuai urutan nama ketua
                      dan anggota tim, dengan format seperti berikut :
                    </p>
                    <h6>231700</h6>
                    <h6>241700</h6>
                    <h6>251700</h6>
                  </label>
                  <textarea
                    type="text"
                    id="NISN_NIM"
                    name="NISN_NIM"
                    className="form-control"
                    placeholder="Masukan NISN / NIM Ketua & Anggota Tim"
                    required
                  ></textarea>
                </div>
              </div>

              {/* DATA SEKOLAH START */}
              {/* DATA SEKOLAH START */}
              <h1>DATA SEKOLAH</h1>
              <h1 className="garis-bawah"></h1>
              <div className="user-details">
                <div className="input-box">
                  <label htmlFor="NAMA_SEKOLAH" className="form-label">
                    Nama Sekolah/Universitas
                  </label>
                  <label>
                    <p>
                      Notes : Masukan nama sekolah dengan format sesuai urutan
                      nama ketua dan anggota tim asal sekolah masing - masing,
                      dengan format seperti berikut :
                    </p>
                    <h6>SMA CERIA</h6>
                    <h6>SMA BAHAGIA</h6>
                    <h6>SMA TADIKA MESRA</h6>
                  </label>
                  <textarea
                    type="text"
                    id="NAMA_SEKOLAH"
                    name="NAMA_SEKOLAH"
                    className="form-control"
                    placeholder="Masukan Nama Sekolah/Universitas Anda"
                    required
                  ></textarea>
                </div>
                <div className="input-box">
                  <label for="NPSN" className="form-label">
                    Nomor Pokok Sekolah Nasional (NPSN)
                  </label>
                  <label>
                    <p>
                      Notes : Masukan NPSN jika masi bersekolah dengan sesuai
                      urutan nama ketua dan anggota tim, dengan format seperti
                      berikut :
                    </p>
                    <h6>1201301</h6>
                    <h6>1302402</h6>
                    <h6>1020100</h6>
                  </label>
                  <textarea
                    type="number"
                    id="NPSN"
                    name="NPSN"
                    className="form-control"
                    placeholder="Masukan Nomor Pokok Sekolah Nasional (NPSN)"
                  ></textarea>
                </div>
                <div className="input-box">
                  <label for="GRADE" className="form-label">
                    Jenjang Pendidikan{" "}
                  </label>
                  <select
                    type="text"
                    id="GRADE"
                    name="GRADE"
                    className="form-control"
                    placeholder="Choose Grade"
                    required
                  >
                    <option value="">--Pilih Jenjang Pendidikan Anda--</option>
                    <option value="Sekolah Dasar">Sekolah Dasar</option>
                    <option value="Sekolah Menengah Pertama">
                      Sekolah Menengah Pertama
                    </option>
                    <option value="Sekolah Menengah Atas">
                      Sekolah Menengah Atas
                    </option>
                    <option value="Universitas">Universitas</option>
                  </select>
                </div>
                <div className="input-box">
                  <label for="PROVINCE" className="form-label">
                    Provinsi
                  </label>
                  <input
                    type="text"
                    id="PROVINCE"
                    name="PROVINCE"
                    className="form-control"
                    placeholder="Masukan Provinsi Anda"
                    required
                  />
                </div>
              </div>
              {/* DATA SEKOLAH END */}
              {/* DATA SEKOLAH END */}

              {/* DATA PEMBIMBING START */}
              {/* DATA PEMBIMBING START */}
              <h1>DATA PEMBIMBING</h1>
              <h1 className="garis-bawah"></h1>
              <div className="user-details">
                <div className="input-box">
                  <label for="NAME_SUPERVISOR" className="form-label">
                    Nama Guru/Pembimbing
                  </label>
                  <textarea
                    type="text"
                    id="NAME_SUPERVISOR"
                    name="NAME_SUPERVISOR"
                    className="form-control"
                    placeholder="Masukan Nama Guru/Pembimbing"
                    required
                  ></textarea>
                </div>

                <div className="input-box">
                  <label
                    for="WHATSAPP_NUMBER_SUPERVISOR"
                    className="form-label"
                  >
                    Nomor WhatsApp Guru/Pembimbing
                  </label>
                  <label>
                    Mohon tuliskan dengan kode telepon, contoh : +628177091xxxx
                  </label>
                  <input
                    type="number"
                    id="WHATSAPP_NUMBER_SUPERVISOR"
                    name="WHATSAPP_NUMBER_SUPERVISOR"
                    className="form-control"
                    placeholder="Masukan Nomor WhatsApp Guru/Pembimbing"
                    required
                  />
                </div>

                <div className="input-box">
                  <label for="EMAIL_TEACHER_SUPERVISOR" className="form-label">
                    Alamat Email Guru/Pembimbing
                  </label>
                  <input
                    type="email"
                    id="EMAIL_TEACHER_SUPERVISOR"
                    name="EMAIL_TEACHER_SUPERVISOR"
                    className="form-control"
                    placeholder="Alamat Email Guru/Pembimbing"
                    required
                  />
                </div>
              </div>
              {/* DATA PEMBIMBING END */}
              {/* DATA PEMBIMBING END */}

              {/* INVOICE START */}
              {/* INVOICE START */}
              <div className="">
                <h1>INVOICE</h1>
                <h1 className="garis-bawah"></h1>
              </div>
              <div className="user-details">
                <div className="input-box">
                  <label html="CATEGORY_COMPETITION" className="form-label">
                    Kategori Kompetisi
                  </label>
                  <select
                    type="text"
                    id="CATEGORY_COMPETITION"
                    name="CATEGORY_COMPETITION"
                    className="form-control"
                    placeholder="Choose Category Competition"
                    required
                    onChange={handleCategoryChange}
                    value={selectedCategory}
                  >
                    <option value="">--Pilih Kategori Kompetisi--</option>
                    <option value="GYIIF Online Competition">
                      Kompetisi Online
                    </option>
                    <option value="GYIIF Offline Competition">
                      Kompetisi Offline
                    </option>
                    <option value="GYIIF Offline + Full Pack">
                      Kompetisi Offline Full Pack
                    </option>
                    <option value="GYIIF Offline + Medali">
                      Kompetisi Offline + Medali
                    </option>
                  </select>
                </div>
                <div className="mx-auto">
                  <p className="fw-bold">
                    *wajib di klik ketika sudah memilih kategori kompetisi
                  </p>
                  <button
                    className="btn btn-custom"
                    onClick={(e) => generatePaymentLink(e)}
                    disabled={
                      selectedCategory !== "GYIIF Online Competition" &&
                      selectedCategory !== "GYIIF Offline Competition" &&
                      selectedCategory !== "GYIIF Offline + Full Pack" &&
                      selectedCategory !== "GYIIF Offline + Medali" 
                    }
                  >
                    Buat Tautan Pembayaran
                  </button>
                </div>
              </div>
              <div className="user-details">
                <div className="input-box">
                  <label className="form-label">
                    Biaya yang harus dibayarkan{" "}
                    <span className="fw-bold">
                      (Belum Termasuk biaya Admin)
                    </span>
                  </label>
                  <input
                    type="text"
                    id="TOTAL_AMOUNT"
                    name="TOTAL_AMOUNT"
                    className="form-control"
                    placeholder="Total Biaya"
                    value={
                      price
                        ? (price / 1000).toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 3,
                          })
                        : ""
                    }
                    readOnly
                  />
                </div>
                <div className="input-box">
                  <label className="form-label">INVOICE ID</label>
                  <input
                    type="text"
                    id="ORDER_ID"
                    name="ORDER_ID"
                    className="form-control"
                    placeholder="ID PEMBAYARAN"
                    value={uniqueId}
                    readOnly
                  />
                </div>
                <div className="input-box invisible">
                  <label className="form-label">Link Invoice</label>
                  <input
                    type="text"
                    id="LINK_INVOICE"
                    name="LINK_INVOICE"
                    className="form-control"
                    placeholder="Link Pembayaran"
                    value={paymentUrl}
                  />
                </div>
              </div>
              {/* INVOICE END */}
              {/* INVOICE END */}

              {/* DETAIL PROJECT START */}
              {/* DETAIL PROJECT START */}
              <div className="">
                <h1>DETAIL PROYEK</h1>
                <h1 className="garis-bawah"></h1>
              </div>
              <div className="user-details">
                <div className="input-box">
                  <label for="PROJECT_TITLE" className="form-label">
                    Judul Proyek
                  </label>
                  <label>
                    Notes : Dimohon untuk mengisi data judul dengan BENAR, data
                    yang masuk sudah tidak bisa ada perubahan!
                  </label>
                  <textarea
                    type="text"
                    id="PROJECT_TITLE"
                    name="PROJECT_TITLE"
                    className="form-control"
                    placeholder="Masukkan Judul Proyek Anda"
                    required
                  ></textarea>
                </div>
                <div className="input-box">
                  <label for="CATEGORIES" className="form-label">
                    Kategori
                  </label>
                  <select
                    type="text"
                    id="CATEGORIES"
                    name="CATEGORIES"
                    className="form-control"
                    placeholder="--Choose-- "
                    required
                  >
                    <option value="">--Pilih Kategori--</option>
                    <option value="Waste treatment">Waste treatment</option>
                    <option value="IoT and Its Applications">
                      IoT and Its Applications
                    </option>
                    <option value="Functional Food">Functional Food</option>
                    <option value="Energy">Energy</option>
                    <option value="Research on Children with Special Needs">
                      Research on Children with Special Needs
                    </option>
                    <option value="Entrepreneurship">Entrepreneurship</option>
                  </select>
                </div>
                <div className="input-box">
                  <label for="YES_NO" className="form-label">
                    Apakah judul proyek pernah berpartisipasi dalam kompetisi
                    penemuan dan inovasi sebelumnya?
                  </label>
                  <select
                    type="text"
                    id="YES_NO"
                    name="YES_NO"
                    className="form-control"
                    placeholder="--Choose Information Resources-- "
                    required
                  >
                    <option>--Pilih--</option>
                    <option value="Yes">Iya</option>
                    <option value="No">Tidak</option>
                  </select>
                </div>

                <div className="input-box">
                  <label
                    for="JUDUL_PERNAH_BERPATISIPASI"
                    className="form-label"
                  >
                    Jika judul proyek pernah mengikuti kompetisi invensi dan
                    inovasi lainnya, mohon tuliskan nama kompetisinya
                  </label>
                  <textarea
                    type="text"
                    id="JUDUL_PERNAH_BERPATISIPASI"
                    name="JUDUL_PERNAH_BERPATISIPASI"
                    className="form-control"
                    placeholder="Masukan Nama Kompetisinya"
                  ></textarea>
                  <div className="mt-5" id="form_alerts"></div>
                </div>
              </div>
              {/* DETAIL PROJECT END */}
              {/* DETAIL PROJECT END */}

              {/* GENERAL INFORMATION START */}
              {/* GENERAL INFORMATION START */}
              <div className="">
                <h1>INFORMASI UMUM</h1>
                <h1 className="garis-bawah"></h1>
              </div>
              <div className="user-details">
                <div className="input-box">
                  <label for="COMPLETE_ADDRESS" className="form-label">
                    Alamat Lengkap
                  </label>
                  <label>
                    Mohon tuliskan alamat lengkap (Nama Jalan, Nomor Rumah,
                    RT&RW, Kecamatan, Kabupaten, Kota, Provinsi, Kode Pos)
                  </label>
                  <textarea
                    type="text"
                    id="COMPLETE_ADDRESS"
                    name="COMPLETE_ADDRESS"
                    className="form-control"
                    placeholder="Masukan Alamat Lengkap Anda"
                    required
                  ></textarea>
                </div>
                <div className="input-box">
                  <label for="INFORMATION_RESOURCES" className="form-label">
                    Sumber Informasi Kompetisi GYIIF 2025
                  </label>
                  <select
                    type="text"
                    id="INFORMATION_RESOURCES"
                    name="INFORMATION_RESOURCES"
                    className="form-control"
                    placeholder="--Choose Information Resources-- "
                    required
                  >
                    <option value="">--Pilih Sumber Informasi--</option>
                    <option value="IYSA Instagram">IYSA Instagram</option>
                    <option value="GYIIF Instagram">GYIIF Instagram</option>
                    <option value="Pembimbing/Sekolah">
                      Pembimbing/Sekolah
                    </option>
                    <option value="IYSA FaceBook">IYSA FaceBook</option>
                    <option value="IYSA Linkedin">IYSA Linkedin</option>
                    <option value="IYSA Website">IYSA Website</option>
                    <option value="GYIIF Website">GYIIF Website</option>
                    <option value="IYSA Email">IYSA Email</option>
                    <option value="GYIIF Email">GYIIF Email</option>
                    <option value="Acara Sebelumnya">Acara Sebelumnya</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div className="input-box">
                  <label for="FILE" className="form-label">
                    Jika Anda mendapatkan pendaftaran gratis dari acara
                    sebelumnya atau kegiatan kunjungan sekolah sebelumnya, harap
                    lampirkan bukti dokumentasi{" "}
                  </label>
                  <input
                    type="url"
                    id="FILE"
                    name="FILE"
                    className="form-control"
                    placeholder="Upload Link File Drive"
                  />
                </div>
              </div>
              {/* GENERAL INFORMATION END */}
              {/* GENERAL INFORMATION END */}

              <div className="button">
                <input type="submit" value="Kirim" />
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default IndoensiaParticipants;

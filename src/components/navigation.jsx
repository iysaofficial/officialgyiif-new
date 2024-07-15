import Image from "next/image";
import Link from "next/link";

const navigation = () => {
  const handleAboutClick = (e) => {
    e.preventDefault();

    // Mendapatkan id dari href
    const targetId = e.target.getAttribute("href").substring(1);

    // Mendapatkan elemen dengan id "about"
    const targetElement = document.getElementById(targetId);

    // Scroll ke elemen tersebut
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    // Navbar
    <section className="navbar-section">
      <nav
        id="menu"
        className="navbar navbar-expand-lg navbar-light bg-light fixed-top"
      >
        <div className="container">
          <Image
            src="/assets/img/gyifLogo.png"
            width={100} // Sesuaikan lebar gambar
            height={50} // Sesuaikan tinggi gambar
            className="img-fluid"
            alt="ISPC LOGO"
          />
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end me-5"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">
              <ul className="nav navbar-nav navbar-right">
                <Link href="/" legacyBehavior>
                  <a className="nav-item nav-link">Beranda</a>
                </Link>
                <Link href="/faq/faqpage" legacyBehavior>
                  <a className="nav-item nav-link">FAQ </a>
                </Link>
                <Link href="/contactpages" legacyBehavior>
                  <a className="nav-item nav-link">Contact</a>
                </Link>
              </ul>
            </div>
            <div className="ms-lg-3">
              <Link href="/homeregist" legacyBehavior>
                <a className="btn btn-primary btn-action" target="_blank">
                  Buku Panduan
                </a>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default navigation;

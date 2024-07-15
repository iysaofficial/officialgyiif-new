import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navigation = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownToggle = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
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
                  <a className="nav-item nav-link">Home</a>
                </Link>
                <div className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle pointer"
                    onClick={() => handleDropdownToggle("mediaCoverage")}
                  >
                    Media Coverage
                  </a>
                  <div
                    className={`dropdown-menu${
                      openDropdown === "mediaCoverage" ? " show" : ""
                    }`}
                  >
                    <Link href="" legacyBehavior>
                      <a className="dropdown-item">News</a>
                    </Link>
                    <Link
                      href="https://drive.google.com/file/d/1UVCaBsvxjac-0OF7VCAOfPJEOvskYBsz/view?usp=sharing"
                      legacyBehavior
                    >
                      <a className="dropdown-item" target="_blank">
                        Press Release 2024
                      </a>
                    </Link>
                    <Link
                      href="https://drive.google.com/file/d/15kh-LQZkfM7OIu_JuRLl7LhLanf5QdwE/view?usp=sharing"
                      legacyBehavior
                    >
                      <a className="dropdown-item" target="_blank">
                        Press Release 2023
                      </a>
                    </Link>
                  </div>
                </div>
                <Link href="/low/lowtahun" legacyBehavior>
                  <a className="nav-item nav-link">List of Winners</a>
                </Link>
                <div className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle pointer"
                    onClick={() => handleDropdownToggle("curation")}
                  >
                    Curation
                  </a>
                  <div
                    className={`dropdown-menu${
                      openDropdown === "curation" ? " show" : ""
                    }`}
                  >
                    <Link
                      href="https://drive.google.com/drive/folders/1ZykbgV1R2M9ILRT1QUn4RWCwcWjpsQVN"
                      legacyBehavior
                    >
                      <a className="dropdown-item" target="_blank">
                        Curation 2024
                      </a>
                    </Link>
                    <Link
                      href="https://drive.google.com/drive/folders/1dMkwPR-tSI3LORGagyfC52qlpmqSyG_3"
                      legacyBehavior
                    >
                      <a className="dropdown-item" target="_blank">
                        Curation 2023
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle pointer"
                    onClick={() => handleDropdownToggle("gallery")}
                  >
                    Gallery
                  </a>
                  <div
                    className={`dropdown-menu${
                      openDropdown === "gallery" ? " show" : ""
                    }`}
                  >
                    <Link
                      href="https://drive.google.com/drive/folders/1v7k8qwGLENT3xXQHNN5yDR2dq6POKUaR"
                      legacyBehavior
                    >
                      <a className="dropdown-item" target="_blank">
                        Gallery 2024
                      </a>
                    </Link>
                    <Link
                      href="https://drive.google.com/drive/folders/1qAs5LEt9Z5JQjBL8IzxbaTKgvRALq-Jt"
                      legacyBehavior
                    >
                      <a className="dropdown-item" target="_blank">
                        Gallery 2023
                      </a>
                    </Link>
                  </div>
                </div>
                <Link href="/faq/faqpage" legacyBehavior>
                  <a className="nav-item nav-link">FAQ </a>
                </Link>
                <Link href="/#contact" legacyBehavior>
                  <a className="nav-item nav-link">Contact</a>
                </Link>
              </ul>
            </div>
            <div className="ms-lg-3">
              {/* <Link href="/" legacyBehavior>
                <a className="btn btn-primary btn-action" target="_blank">
                  Buku Panduan
                </a>
              </Link> */}
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default navigation;

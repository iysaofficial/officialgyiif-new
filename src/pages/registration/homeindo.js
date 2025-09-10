import Navigation from "../../components/navigation";
import { Footer } from "@/components/footer";
import { indonesiaOnlineTerms, indonesiaOfflineTerms } from "../../data/terms";
import { FlagIcon } from "react-flag-kit";

import { useState, useEffect } from "react";

function HomeIndo() {
  const [showModal, setShowModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [redirectLink, setRedirectLink] = useState("");
  const [termsContent, setTermsContent] = useState("");
  const handleOpenModal = (link, terms) => {
    setRedirectLink(link); // Set link tujuan redirect
    setTermsContent(terms); // Set isi terms sesuai pilihan
    setShowModal(true); // Tampilkan modal
  };

  const handleAccept = () => {
    if (termsAccepted) {
      sessionStorage.setItem("termsAccepted", "true"); // Menyimpan status setuju di sessionStorage
      setShowModal(false);
      window.location.href = redirectLink;
    } else {
      alert("Please agree to the Terms & Conditions to proceed.");
    }
  };

  useEffect(() => {
    const hasAcceptedTerms = sessionStorage.getItem("termsAccepted");
    if (hasAcceptedTerms === "true") {
      setTermsAccepted(true); // Set status sudah diterima
    }
  }, []);

  return (
    <>
      <Navigation />
      <section className="homeregist-section">
        <div>
          <div className="wrapper">
            <div className="text-center">
              <h1 className="mx-auto text-sm md:text-lg lg:text-5xl">
                REGISTRATION FORM FOR INDONESIAN CITIZEN
              </h1>
              <h3 className="mx-auto mt-5 mb-2 text-sm md:text-lg lg:text-2xl">
                Choose Categories Competition for Registration GYIIF 2026
              </h3>
            </div>
          </div>
          <div className="link-web mx-auto text-center">
            <a
              className="btn btn-custom text-center me-lg-5 "
              onClick={() =>
                handleOpenModal(
                  "/registration/indo-online",
                  indonesiaOnlineTerms
                )
              }
            >
              Online Competition{" "}
              <FlagIcon
                code="ID"
                title="Indonesia"
                style={{ marginLeft: "8px" }}
              />
            </a>
            <a
              className="btn btn-custom text-center me-lg-5 "
              onClick={() =>
                handleOpenModal(
                  "/registration/indo-offline",
                  indonesiaOfflineTerms
                )
              }
            >
              Offline Competition{" "}
              <FlagIcon
                code="ID"
                title="Indonesia"
                style={{ marginLeft: "8px" }}
              />
            </a>
          </div>
        </div>
      </section>

      {/* Modal untuk Terms & Conditions */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="text-4xl">Terms & Conditions</h2>
            <div>{termsContent}</div> {/* Isi dinamis */}
            <div className="checkbox mt-2">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <label htmlFor="terms"> I agree to the Terms & Conditions</label>
            </div>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleAccept}>
                Accept & Proceed
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default HomeIndo;

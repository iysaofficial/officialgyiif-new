import React from "react";
import Navigation from "../../../components/navigation";
import { Footer } from "../../../components/footer";
import Link from "next/link";

const kategori24 = () => {
  return (
    <>
      <Navigation />
      {/* PAGE HEADER START */}
      <div className="page-header">
        <h1>List of Winners</h1>
        <ul>
          <li className="titik">
            <Link href="/low/lowtahun" legacyBehavior>
              <a>Previous Page</a>
            </Link>
          </li>
          <li>List of Winners 2024</li>
        </ul>
      </div>
      {/* PAGE HEADER END */}
      <section className="low-section">
        <div id="kategori" className="low container">
          <div className="row">
            <div className="title text-center">
              <h1>
                Choose based on the Category of the event you are participating
                in
              </h1>
            </div>
            <div className="content text-center mt-5">
              <Link
                href="https://drive.google.com/file/d/1R4DqU4bRaqh-BiMuQSufpnRv23wiL-uC/view?usp=sharing"
                legacyBehavior
              >
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-custom m-2"
                >
                  Special Award
                </a>
              </Link>
              <Link href="/low/2024/jenjangofl24" legacyBehavior>
                <a className="btn btn-custom m-2">GYIIF OFFLINE</a>
              </Link>
              <Link href="/low/2024/jenjangonl24" legacyBehavior>
                <a className="btn btn-custom m-2">
                  GYIIF ONLINE
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default kategori24;
import React from "react";
import Navigation from "../../../components/navigation";
import { Footer } from "../../../components/footer";
import Link from "next/link";

const Jenjangonl23 = () => {
  return (
    <>
      <Navigation />
      {/* PAGE HEADER START */}
      <div className="page-header">
        <h1>List of Winners</h1>
        <ul>
          <li className="titik">
            <Link href="/low/2023/kategori23" legacyBehavior>
              <a>Previous Page</a>
            </Link>
          </li>
          <li>List of Winners 2023 Online</li>
        </ul>
      </div>
      {/* PAGE HEADER END */}
      <section className="low-section">
        <div id="kategori" className="low container">
          <div className="row">
            <div className="title text-center">
              <h1>
                Choose based on the Level of the Online event you are
                participating in
              </h1>
            </div>
            <div className="content text-center mt-5">
              <Link
                href="https://drive.google.com/file/d/1bjBG4-E4-bjIulBuZ1jvAcxxlDn-b06_/view?usp=sharing"
                legacyBehavior
              >
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-custom m-2"
                >
                  University
                </a>
              </Link>
              <Link
                href="https://drive.google.com/file/d/1eCt2KaVj-EvOXU4utWEwaSI6QJLAeeg9/view?usp=sharing"
                legacyBehavior
              >
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-custom m-2"
                >
                  Senior High School
                </a>
              </Link>
              <Link
                href="https://drive.google.com/file/d/1Zg4ZYjqvBM-4zXzDPUiDuSKjZO0yEzkN/view?usp=sharing"
                legacyBehavior
              >
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-custom m-2"
                >
                  Junior High School
                </a>
              </Link>
              <Link
                href="https://drive.google.com/file/d/1EWRK9UuK7ayHTgjitr3qqPzkjcDDWavL/view?usp=sharing"
                legacyBehavior
              >
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-custom m-2"
                >
                  Elementary School
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

export default Jenjangonl23;

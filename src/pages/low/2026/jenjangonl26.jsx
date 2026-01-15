import React from "react";
import Navigation from "../../../components/navigation";
import { Footer } from "../../../components/footer";
import Link from "next/link";

const jenjangonl26 = () => {
  return (
    <>
      <Navigation />
      {/* PAGE HEADER START */}
      <div className="page-header">
        <h1>List of Winners</h1>
        <ul>
          <li className="titik">
            <Link href="/low/2026/kategori26" legacyBehavior>
              <a>Previous Page</a>
            </Link>
          </li>
          <li>List of Winners 2026 Online</li>
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
            <div className="content text-center">
              <Link
                href="https://drive.google.com/file/d/1OjMA_iFq7gmNXb7CnzlKKONpICt3f8In/view?usp=sharing"
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
                href="https://drive.google.com/file/d/1Mg2TN6I9KlU7F_sDHaBN72ed4VgXNgqL/view?usp=sharing"
                legacyBehavior
              >
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-custom m-2"
                >
                  Secondary
                </a>
              </Link>
              <Link
                href="https://drive.google.com/file/d/1vXXFRsMXgbS6BBinYBYdkjfvxKElk3jG/view?usp=sharing"
                legacyBehavior
              >
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-custom m-2"
                >
                  Elementary
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

export default jenjangonl26;

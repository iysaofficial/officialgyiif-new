import React from "react";
import Navigation from "../../../components/navigation";
import { Footer } from "../../../components/footer";
import Link from "next/link";

const jenjangofl24 = () => {
  return (
    <>
      <Navigation />
      {/* PAGE HEADER START */}
      <div className="page-header">
        <h1>List of Winners</h1>
        <ul>
          <li className="titik">
            <Link href="/low/2025/kategori25" legacyBehavior>
              <a>Previous Page</a>
            </Link>
          </li>
          <li>List of Winners 2025 Offline</li>
        </ul>
      </div>
      {/* PAGE HEADER END */}
      <section className="low-section">
        <div id="kategori" className="low container">
          <div className="row">
            <div className="title text-center">
              <h1>
                Choose based on the Level of the Offline event you are
                participating in
              </h1>
            </div>
            <div className="content text-center">
              <Link
                href="https://drive.google.com/file/d/1xSL0ElM87d1aD5WI_aSb2VNs6gZNLA9h/view?usp=sharing"
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
                href="https://drive.google.com/file/d/1w7n6_5t8Cl8Y1uLcF-b0MPrSVHzEZAon/view?usp=sharing"
                legacyBehavior
              >
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-custom m-2"
                >
                  Secondary School
                </a>
              </Link>
              <Link
                href="https://drive.google.com/file/d/1DAE6YLYC59m9-pW1EX-Ku3LCnOXumZsf/view?usp=sharing"
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

export default jenjangofl24;

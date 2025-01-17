import React from "react";
import Navigation from "../../../components/navigation";
import { Footer } from "../../../components/footer";
import Link from "next/link";

const jenjangonl25 = () => {
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
          <li>List of Winners 2025 Online</li>
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
                href="https://drive.google.com/file/d/1c2A2Ptue6bR0hBK-KBlZp0MzUjcn-kGg/view?usp=sharing"
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
                href="https://drive.google.com/file/d/1vvpV49Lac9C1dvw7uLgcsE-fjcMiTIoD/view?usp=sharing"
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
                href="https://drive.google.com/file/d/1-3s6aHok-Leycsp32qVeV4czzPVzuHMB/view?usp=sharing"
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
                href="https://drive.google.com/file/d/1XH7jSLUgFEYXf5rhJlqk2bxThsryVnqo/view?usp=sharing"
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

export default jenjangonl25;

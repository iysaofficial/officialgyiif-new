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
                href="https://drive.google.com/file/d/1cX4jMh5wqZKJtx13fuGdGyxOZ5IA5b95/view?usp=sharing"
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
                href="https://drive.google.com/file/d/1yhCRNQfThYYi9q8HdgvNlCnE1fP7Ko9J/view?usp=sharing"
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
                href="https://drive.google.com/file/d/1CTFaA7i5RmYJOXVWkTJhmVGZysI1Ec1w/view?usp=sharing"
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
                href="https://drive.google.com/file/d/1J_SBwVxL2vYGh1XUcXDqqmckyZZlP2b1/view?usp=sharing"
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

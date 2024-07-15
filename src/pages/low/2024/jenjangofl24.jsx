import React from "react";
import Navigation from "../../../components/navigation";
import { Footer } from "../../../components/footer";

const jenjangofl24 = () => {
  return (
    <>
      <Navigation />
      {/* PAGE HEADER START */}
      <div className="page-header">
        <h1>List of Winners</h1>
        <ul>
          <li className="titik">
            <a href="/low/2024/kategori24">Previous Page</a>
          </li>
          <li>List of Winners 2024 Offline</li>
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
              <a
                href="https://drive.google.com/file/d/1gZzaSjcfRdoEt83v6jIY2FUbcpXOJZ76/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="btn btn-custom m-2"
              >
                University
              </a>
              <a
                href="https://drive.google.com/file/d/1P7DvPc2OTVvAGmW9C6DHD5keBB4_5aRH/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="btn btn-custom m-2"
              >
                Junior High School
              </a>
              <a
                href="https://drive.google.com/file/d/16-8-mUAJnRzEu4rTrXcgzXFptMkGKHY2/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="btn btn-custom m-2"
              >
                Elementary School
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default jenjangofl24;

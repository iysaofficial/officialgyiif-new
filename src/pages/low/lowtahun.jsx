import React from "react";
import Navigation from "../../components/navigation";
import { Footer } from "../../components/footer";

const lowtahun = () => {
  return (
    <>
      <Navigation />
      {/* PAGE HEADER START */}
      <div className="page-header">
        <h1>List of Winners</h1>
        <ul>
          <li className="titik">
            <a href="/">Home</a>
          </li>
          <li>List of Winners</li>
        </ul>
      </div>
      {/* PAGE HEADER END */}
      <section className="low-section">
        <div id="low" className="low container">
          <div className="row">
            <div className="title text-center">
              <h1>Select by the year of the event you are participating in</h1>
            </div>
            <div className="content text-center mt-5">
              <a href="/low/2024/kategori24" className="btn btn-custom m-2">
                2024
              </a>
              <a href="/low/2023//kategori23" className="btn btn-custom m-2">
                2023
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default lowtahun;

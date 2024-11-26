import Image from "next/image";

export const Timevenue = (props) => {
  return (
    <section id="organized" className="organized-section text-center">
      <div className="container">
        <div className="section-title">
          <h2>TIME & VENUE</h2>
        </div>
        <div className="row">
          <div className="iysa col-xs-12 col-md-6">
            <Image
              src="/assets/img/team/time.jpg"
              className="img-fluid img-responsive"
              width={350} // Sesuaikan lebar gambar
              height={100} // Sesuaikan tinggi gambar
              alt="UMM LOGO"
            />
          </div>
          <div className="ipb col-xs-12 col-md-6">
          <Image
              src="/assets/img/team/venue.jpg"
              className="img-fluid img-responsive"
              width={350} // Sesuaikan lebar gambar
              height={100} // Sesuaikan tinggi gambar
              alt="UMM LOGO"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

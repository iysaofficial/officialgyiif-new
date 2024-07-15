import Image from "next/image";

export const Organized = (props) => {
  return (
    <section id="organized" className="organized-section text-center">
      <div className="container">
        <div className="section-title">
          <h2>ORGANIZED BY</h2>
        </div>
        <div className="row">
          <div className="iysa col-xs-12 col-md-6">
            <Image
              src="/assets/img/team/iysa.png"
              className="img-fluid img-responsive"
              width={350} // Sesuaikan lebar gambar
              height={100} // Sesuaikan tinggi gambar
              alt="UMM LOGO"
            />
          </div>
          <div className="ipb col-xs-12 col-md-6">
          <Image
              src="/assets/img/team/logo-ITP3.png"
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

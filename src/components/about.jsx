import Image from "next/image";

export const About = (props) => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="row">
          <div className="image col-xs-12 col-md-6">
            <Image
              src="/assets/img/science.jpg"
              className="img-fluid img-responsive"
              width={550} // Sesuaikan lebar gambar
              height={100} // Sesuaikan tinggi gambar
              alt="UMM LOGO"
            />
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text mt-lg-0 mt-5">
              <h2>About Us</h2>
              <h3>GLOBAL YOUTH INVENTION AND INNOVATION FAIR </h3>
              <p>
                Milenial generation is an individual that experiencing
                development especially for emotional on psychologically. so that
                the milenials are the potential for human resources for
                development both now and in thefuture. Therefore, the millennial
                generation is a generation that hasstrong creativity and
                initiative that is able to produce things such asinvention and
                innovation. hoped that it will make it easier for the
                nextgeneration to use the inventions that have been created by
                the current generation as a solution in the future.
              </p>
              <p>
                IYSA as an institution that cares about education and young
                researchers who can carry out innovation and discovery
                activities to solve problems in society. It is not only new to
                the mind (cognitive), but also new to the civilization
                acceptance for development. That&apos;s why. IYSA has several
                national and international science invention, innovation and
                project competitions. Through this activity, students from
                elementary, junior high, college and public to participate by
                presenting their projects in front of the judges. In
                collaboration with Department of Food Science and Technology,
                Institut Pertanian Bogor (IPB), IYSA will hold an International
                Invention and Innovation competition titled Global Youth
                Invention and Innovation Fair (GYIIF) As the learning platform
                to nurture the future scientist!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

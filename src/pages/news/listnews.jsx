import Navigation from "../../components/navigation";
import { Footer } from "../../components/footer";
import Link from "next/link";
import Image from "next/image";

const Listnews = () => {
  return (
    <>
      <Navigation />
      {/* PAGE HEADER START */}
      <div className="page-header">
        <h1>Media Coverage</h1>
        <ul>
          <li className="titik">
            <Link href="/" legacyBehavior>
              <a>Home</a>
            </Link>
          </li>
          <li>News</li>
        </ul>
      </div>
      {/* PAGE HEADER END */}
      <section className="news-section">
        <div className="container">
          <h3 className="text-center">2025</h3>
          <div className="row">
            <div className="card-news col-xs-12 col-md-4">
              <div className="content">
                <Image
                  src="/assets/img/news/12025.jpg"
                  className="img-fluid img-responsive mt-2"
                  width={400} // Sesuaikan lebar gambar
                  height={100} // Sesuaikan tinggi gambar
                  alt="Foto 1"
                />
                <h4 className="text-center">
                  MAN 4 Jakarta Research Team Receives Eight Medals at the Global Youth Invention and Innovation Fair 2025
                </h4>
                <a>
                  South Jakarta (Kemenag) --- The research team of Madrasah Aliyah Negeri (MAN) 4 Jakarta has made achievements at the beginning of 2025. The Ministry of Religious Affairs-assisted madrasah research team won eight medals at...
                </a>
              </div>
              <div className="button">
                <Link href="https://kemenag.go.id/nasional/tim-riset-man-4-jakarta-boyong-delapan-medali-global-youth-invention-and-innovation-fair-2025-I0rmy" legacyBehavior>
                  <a className="btn btn-primary">Read more</a>
                </Link>
              </div>
            </div>
            <div className="card-news col-xs-12 col-md-4">
              <div className="content">
                <Image
                  src="/assets/img/news/32025.jpeg"
                  className="img-fluid img-responsive mt-2"
                  width={400} // Sesuaikan lebar gambar
                  height={100} // Sesuaikan tinggi gambar
                  alt="Foto 1"
                />
                <h4 className="text-center">
                  MAN 2 Padangsidimpuan Research Team Achieves International Level Achievement GYIIF 2025
                </h4>
                <a>
                  Ten MAN 2 Padangsidimpuan students who are members of 2 research teams have made international achievements after winning the Silver Medal at the Global Youth Invention and Innovation Fair (GYIIF) 2025. (ist)...
                </a>
              </div>
              <div className="button">
                <Link href="https://www.medanposonline.com/sumatera-utara/9432/tim-riset-man-2-padangsidimpuan-raih-prestasi-tingkat-internasional-gyiif-2025/medanposonline" legacyBehavior>
                  <a className="btn btn-primary">Read more</a>
                </Link>
              </div>
            </div>
          </div>
          <h3 className="text-center">2024</h3>
          <div className="row">
            <div className="card-news col-xs-12 col-md-4">
              <div className="content">
                <Image
                  src="/assets/img/news/GYIIFIYMIA29.jpg"
                  className="img-fluid img-responsive mt-2"
                  width={400} // Sesuaikan lebar gambar
                  height={100} // Sesuaikan tinggi gambar
                  alt="Foto 1"
                />
                <h4 className="text-center">
                  Held for the Second Time at IPB, 14 Countries Compete in the
                  GYIIF and IYMIA Eventss
                </h4>
                <a>
                  Opening 2024 with two competitions that could be considered
                  new, IYSA and the Faculty of Food Science and Technology IPB
                  successfully held GYIIF and IYMIA for...
                </a>
              </div>
              <div className="button">
                <Link href="/news/pagenews1" legacyBehavior>
                  <a className="btn btn-primary">Read more</a>
                </Link>
              </div>
            </div>
            <div className="card-news col-xs-12 col-md-4">
              <div className="content">
                <Image
                  src="/assets/img/news/sma22.jpg"
                  className="img-fluid img-responsive mt-2"
                  width={400} // Sesuaikan lebar gambar
                  height={100} // Sesuaikan tinggi gambar
                  alt="Foto 1"
                />
                <h4 className="text-center">
                  SMA NEGERI 2 CILACAP WINS SILVER MEDAL IN THE GLOBAL YOUTH
                  INVENTION AND INNOVATION FAIR (GYIIF) 2024
                </h4>
                <a>
                  GYIIF (Global Youth Invention and Innovation Fair) organized
                  by the Bogor Agricultural Institute (IPB) in collaboration
                  with the Indonesian Young Scientist Association (IYSA) took
                  place in...
                </a>
              </div>
              <div className="button">
                <Link href="/news/pagenews2" legacyBehavior>
                  <a className="btn btn-primary">Read more</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Listnews;

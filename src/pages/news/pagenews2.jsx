import Navigation from "../../components/navigation";
import { Footer } from "../../components/footer";
import Link from "next/link";
import Image from "next/image";

const PageNews2 = () => {
  return (
    <>
      <Navigation />
      {/* PAGE HEADER START */}
      <div className="page-header">
        <h1>Media Coverage</h1>
        <ul>
          <li className="titik">
            <Link href="/news/listnews" legacyBehavior>
              <a>Previous Page</a>
            </Link>
          </li>
          <li>News 2024</li>
        </ul>
      </div>
      {/* PAGE HEADER END */}
      <section className="news">
        <div className="container">
          <div className="content-top text-center">
            <Image
              src="/assets/img/news/sma22.jpg"
              className="img-fluid img-responsive mb-3"
              width={800} // Sesuaikan lebar gambar
              height={100} // Sesuaikan tinggi gambar
              alt="Foto 1"
            />
            <h2>
              SMA NEGERI 2 CILACAP WINS SILVER MEDAL IN THE GLOBAL YOUTH
              INVENTION AND INNOVATION FAIR (GYIIF) 2024
            </h2>
          </div>
          <div className="content-bottom">
            <p>
              CILACAP – GYIIF (Global Youth Invention and Innovation Fair)
              organized by the Bogor Agricultural Institute (IPB) in
              collaboration with the Indonesian Young Scientist Association
              (IYSA) took place in a hybrid manner on 10-14 January 2024 in
              Bogor, West Java. GYIIF was attended by 341 teams from 14
              countries, namely Indonesia, Thailand, Turkey, Mexico, United Arab
              Emirates, Malaysia, Philippines, Kazakhstan, Iran, India,
              Uzbekistan, Romania, Singapore and South Africa. In this
              prestigious event, SMA Negeri 2 Cilacap donated a Silver Medal to
              Indonesia.
            </p>
            <p>
              The Cilacap 2 State High School team consisting of members Vinon
              Apip Pranata, Amalia Gita Pramesti, Aryasatya Gian Ramadhan,
              Girindra Eka Paksi Putra Ottaviano, and Kahyana Hendrawan
              Wicaksono succeeded in winning a SILVER MEDAL with the title
              &quot;Anthelmintic Jelly Candy from Leocaena leucocephala Extract&quot;
              which offers worm medicine for children -children in the form of
              jelly candy. The creation of this worming candy was inspired by
              the high prevalence of worms among children but they are reluctant
              to take worming medication. The Youth Scientific Group (KIR) of
              SMA Negeri 2 Cilacap created an innovation in the form of candy to
              treat worm infections in children.
            </p>
            <p>
              Principal of SMA Negeri 2 Cilacap, Dra. Masripah, M.M.Pd. felt
              proud and happy that his students had succeeded in winning awards
              at a fairly prestigious international event.“Alhamdulillah,
              congratulations and success always to the great children!
              &quot;Continue to be in the process of getting better, and all of these
              achievements cannot be separated from the support of all teachers
              and employees at SMA Negeri 2 Cilacap as well as prayers from all
              the people of Cilacap Regency&quot; said Masripah. (wd/kominfo)
            </p>

            <a>Source: </a>
            <Link
              href="https://cilacapkab.go.id/v3/sma-negeri-2-cilacap-raih-medali-perak-dalam-ajang-global-youth-invention-and-innovation-fair-gyiif-2024/"
              legacyBehavior
            >
              <a target="_blank">Click here</a>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PageNews2;

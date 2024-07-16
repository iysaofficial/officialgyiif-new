import Navigation from "../../components/navigation";
import { Footer } from "../../components/footer";
import Link from "next/link";
import Image from "next/image";

const PageNews1 = () => {
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
              src="/assets/img/news/GYIIFIYMIA29.jpg"
              className="img-fluid img-responsive mb-3"
              width={800} // Sesuaikan lebar gambar
              height={100} // Sesuaikan tinggi gambar
              alt="Foto 1"
            />
            <h2>
              Held for the Second Time at IPB, 14 Countries Compete in the GYIIF
              and IYMIA Events
            </h2>
          </div>
          <div className="content-bottom">
            <p>
              BOGOR – Opening 2024 with two competitions that could be
              considered new, IYSA and the Faculty of Food Science and
              Technology IPB successfully held GYIIF and IYMIA for the second
              time. Once again held in Bogor, GYIIF and IYMIA succeeded in
              inviting 61 teams to attend directly to the venue.
            </p>
            <p>
              Even though at this event there were no participants from abroad
              taking part in the offline competition, what was great about this
              competition could be said that we had participants from Sabang to
              Merauke because we had participants from Jambi and Sorong, not
              just one team but several teams came directly to Bogor!
            </p>
            <p>
              This time GYIIF and IYMIA were attended by 341 teams which were
              divided into 272 teams participating in the GYIIF event and 69
              teams participating in the IYMIA event. All participants came from
              14 countries including the United Arab Emirates, Uzbekistan,
              Thailand, Iran, the Philippines, Malaysia, Turkey, Mexico,
              Kazakhstan, Romania, India, South Africa, Singapore and of course
              Indonesia.
            </p>
            <p>
              Held for 4 days from 11-14 January, the following is a series of
              GYIIF and IYMIA 2024 events. On the first day (11/1), we held an
              opening ceremony at 1 pm and continued with judging for the teams
              taking part in the online competition. On the following day
              (12/1), it was the turn of the teams taking part in the offline
              competition to carry out judging directly with the judges. On the
              third day (13/1), the event was filled with a seminar with
              Dr.-Ing. Dase Hunaefi, STP, MFoodST, who provided material on
              "INVITRO MEAT AND MEAT ANALOG" and continued with the announcement
              of the winning teams that took part in the online competition in
              the evening. Meanwhile, on the last day (14/1) we announced the
              winners for the teams taking part in the offline competition.
            </p>
            <p>
              Not only gold, silver and bronze medals, we have also prepared
              many other prizes for the winners including Best Booth, Best
              Presentation, Best Poster, Best Project, IYSA Semi Grand Award,
              IYSA Grand Prize and also several special awards. This time there
              was something special because IPB also gave the Department of Food
              Science and Technology IPB Special Award.
            </p>
            <p>
              Congratulations to the team from Mentari Intercultural School who
              succeeded in taking home the main prize in the form of Fully
              Funded to take part in the 2024 WSEEC event at Pancasila
              University Jakarta (terms and conditions apply).
            </p>
            <p>
              We also want to congratulate all the winners at both the GYIIF and
              IYMIA events!
            </p>
            <p>
              Let's continue to work, achieve and develop with IYSA. If they can
              do it, why can't you? Come achieve your achievements with us.
            </p>
            <a>Source: </a>
            <Link
              href="https://www.depokpos.com/2024/01/digelar-kedua-kalinya-di-ipb-14-negara-bersaing-di-ajang-gyiif-dan-iymia/"
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

export default PageNews1;

import Navigation from "../../components/navigation";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { FlagIcon } from "react-flag-kit";

function HomeRegist() {
  return (
    <>
      <Navigation />
      <section className="homeregist-section">
        <div>
          <div className="wrapper">
            <div className="text-center">
              <h1 className="mx-auto text-sm md:text-lg lg:text-5xl">
                REGISTRATION FORM
              </h1>
              <h3 className="mx-auto mt-5 mb-2 text-sm md:text-lg lg:text-2xl">
                Choose Your Citizenship Category for Registration GYIIF 2025
              </h3>
            </div>
          </div>
          <div className="link-web mx-auto text-center">
            <Link href="/registration/homeindo" legacyBehavior>
              <a className="btn btn-custom text-center me-lg-5 m-2">
                INDONESIAN CITIZEN{" "}
                <FlagIcon
                  code="ID"
                  title="Indonesia"
                  style={{ marginLeft: "8px" }}
                />
              </a>
            </Link>
            <Link href="/registration/homeinter" legacyBehavior>
              <a className="btn btn-custom text-center me-lg-5 m-2">
                INTERNATIONAL CITIZEN{" "}
                <i className="fa-solid fa-earth-americas"></i>
              </a>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default HomeRegist;

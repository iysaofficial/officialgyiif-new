import dynamic from "next/dynamic";
import Link from "next/link";
// Mengimpor ParticlesBg secara dinamis dengan ssr: false
const ParticlesBg = dynamic(() => import("particles-bg"), { ssr: false });

export const Mainhero = (props) => {
  return (
    <>
      <section
        className="mainhero-section"
      
      >
        <div className="text">
          <h2 style={{ color: "yellow", fontWeight: "bold" }}>
            OPEN REGISTRATION 2025
          </h2>
          <h2 style={{ color: "white" }}>
            GLOBAL YOUTH INVENTION AND INNOVATION FAIR
          </h2>
          <Link href="/homeregist" legacyBehavior>
            <a className="btn btn-custom btn-action m-2">Click Here to Registration!!</a>
          </Link>
          <Link href="https://drive.google.com/file/d/1HAN-QQHTbSCOuFNdYL-V9x4kikElmKTd/view?usp=sharing" legacyBehavior>
            <a className="btn btn-custom btn-action m-2" target="_blank">Guide Book</a>
          </Link>
        </div>
        <ParticlesBg
          type="circle"
          bg={{
            zIndex: 0,
            bgColor: "#554994",
            position: "absolute",
            top: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </section>
    </>
  );
};

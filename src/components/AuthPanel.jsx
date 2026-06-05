import logo from "../assets/logo.png";
import heroImg from "../assets/hero.png";
import regImg from "../assets/reg.png";

export default function AuthPanel({ showReg = false }) {
  return (
    <div
      style={{
        background:
          "linear-gradient(145deg, #c8e8f7 0%, #5aafd4 45%, #2370a3 100%)",
        height: "calc(100vh - 40px)",
        borderRadius: "32px",
        position: "relative",
        overflow: "hidden",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >

      <div
        style={{
          position: "absolute",
          top: "32px",
          left: "40px",
          zIndex: 10,
        }}
      >
        <img
          src={logo}
          alt="Lateron"
          style={{
            width: "120px",
            objectFit: "contain",
          }}
        />
      </div>


      {showReg && (
        <img
          src={regImg}
          alt="Add your Skill"
          style={{
            position: "absolute",
            top: "12%",
            left: "15%",
            width: "35%",
            maxWidth: "220px",
            objectFit: "contain",
            zIndex: 4,
            filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.08))",
          }}
        />
      )}


      <div
        style={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          zIndex: 5,
        }}
      >
        <img
          src={heroImg}
          alt="Hero Illustrations"
          style={{
            width: "70%",
            marginBottom: "-10px",
            objectFit: "contain",
          }}
        />
      </div>

    </div>
  );
}
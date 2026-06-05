import { useNavigate } from "react-router-dom";
import heroImg from "../assets/hero.png";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="
      h-screen flex justify-between items-center px-14 relative overflow-hidden
    ">

      {/* LEFT */}
      <div className="w-[48%] flex flex-col justify-center">

        {/* Badge */}
        <div className="
          inline-flex items-center gap-2
          px-4 py-2 rounded-full
          bg-white/30 border border-white/60
          text-[#1E4D6B] text-sm font-normal
          mb-7 w-fit
        ">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1E4D6B] inline-block" />
          Selamat datang di Lateron
        </div>

        {/* Heading */}
        <h1 className="
          text-[58px] leading-[1.15]
          font-semibold text-[#0F3A58]
          tracking-tight mb-5
        ">
          Generate Roadmap<br />
          Belajar untuk Tes<br />
          Bahasa
        </h1>

        {/* Subtext */}
        <p className="text-[#2E6080] text-[15px] leading-relaxed max-w-[400px] mb-9">
          Atur targetmu kami buatkan roadmap belajarmu dan ukur progresmu.
        </p>

        {/* CTA */}
        <button
          onClick={() => navigate("/login")}
          className="
            bg-[#2F7BAF] px-8 py-3.5 rounded-full
            text-white text-[15px] font-medium
            shadow-md hover:bg-[#256a99] hover:scale-105
            transition-all duration-300 w-fit
          "
        >
          Mulai Sekarang
        </button>

      </div>

      {/* RIGHT */}
      <div className="relative w-[52%] h-full flex justify-center items-center">
        <div className="
          absolute w-[680px] h-[680px] rounded-full
          bg-white/25 right-[-160px] bottom-[-200px]
        " />
        <img
          src={heroImg}
          alt="Hero Lateron"
          className="relative z-10 w-[620px] object-contain drop-shadow-lg"
        />
      </div>

    </section>
  );
}
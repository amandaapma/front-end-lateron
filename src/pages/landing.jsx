import Navbar from "../components/navbar";
import Hero from "../components/hero";

export default function Landing() {
  return (
    <div className="
      min-h-screen
      overflow-hidden
      bg-gradient-to-r
      from-[#6FA7CC]
      via-[#C7D6E0]
      to-[#0B4A74]
    ">
      <Navbar/>
      <Hero/>
    </div>
  );
}
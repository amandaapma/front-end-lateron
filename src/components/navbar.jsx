import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="
      absolute
      top-8
      left-10
      z-50
    ">
      <img
        src={logo}
        alt="Lateron Logo"
        className="
          w-[110px]
          object-contain
        "
      />
    </nav>
  );
}
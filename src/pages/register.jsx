import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthPanel from "../components/AuthPanel";
// 1. IMPORT HOOK GOOGLE OAUTH
import { useGoogleLogin } from "@react-oauth/google"; 

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592M6.53 6.533A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.965 9.965 0 01-4.077 5.267M15 12a3 3 0 00-3-3M3 3l18 18"/>
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
  </svg>
);

// ICON GOOGLE SVG RESMI
const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
  </svg>
);

function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  showEye,
  onToggleEye
}) {
  return (
    <div className="mb-4">
      <label className="text-[14px] font-semibold text-[#374151] mb-2 block">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-5 py-3.5 rounded-2xl bg-[#EEF4F8] border border-transparent focus:outline-none focus:border-[#2F7BAF] focus:bg-white transition-all text-[14px]"
        />
        {onToggleEye && (
          <button
            type="button"
            onClick={onToggleEye}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A0AEC0]"
          >
            {showEye ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        )}
      </div>
    </div>
  );
}

export default function Register() {
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      alert("Isi semua data");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password tidak sama");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        email,
        password
      })
    );

    alert("Registrasi berhasil");
    navigate("/login");
  };

  // 2. SETUP TRIGGER UNTUK SIGN UP DENGAN GOOGLE
  const registerDenganGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const googleUserData = await res.json();

        // Mendaftarkan user baru ke localStorage menggunakan data Google
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify({
          email: googleUserData.email,
          name: googleUserData.name,
          avatar: googleUserData.picture
        }));

        alert(`Registrasi berhasil! Selamat datang, ${googleUserData.name}`);
        navigate("/dashboard");
      } catch (error) {
        console.error("Gagal mengambil data user Google", error);
      }
    },
    onError: (error) => console.log("Registrasi Google Gagal/Dibatalkan:", error),
  });

  return (
    <div className="h-screen w-full flex bg-white overflow-hidden font-sans">
      <div className="w-full md:w-[48%] flex flex-col justify-center px-12 lg:px-20 py-10">
        <h1 className="text-[32px] font-bold text-[#1B4F72] mb-2">
          Create an Account
        </h1>

        <p className="text-[14px] text-[#1B4F72]/70 mb-8">
          Let's get started with Lateron
        </p>

        <InputField
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputField
          label="Password"
          type={showPass ? "text" : "password"}
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showEye={showPass}
          onToggleEye={() => setShowPass(!showPass)}
        />

        <InputField
          label="Confirm Password"
          type={showConfirm ? "text" : "password"}
          placeholder="Enter Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          showEye={showConfirm}
          onToggleEye={() => setShowConfirm(!showConfirm)}
        />

        {/* Tombol Register Utama */}
        <button
          onClick={handleRegister}
          className="w-full py-4 rounded-2xl mt-4 bg-[#1B4F72] text-white font-bold text-[15px] hover:bg-[#163f5c] transition-all shadow-md cursor-pointer"
        >
          Sign Up
        </button>

        {/* ================= SEPARATOR LINE (OR) ================= */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="px-4 text-[13px] text-gray-400 font-medium bg-white">or continue with</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* ================= TOMBOL REGISTER GOOGLE ================= */}
        <button
          type="button"
          onClick={() => registerDenganGoogle()}
          className="w-full py-3.5 rounded-2xl mb-6 border border-gray-200 bg-white text-gray-700 font-semibold text-[14px] hover:bg-gray-50 transition-all flex items-center justify-center shadow-xs cursor-pointer"
        >
          <GoogleIcon />
          Sign up with Google
        </button>

        <p className="text-center text-[14px] text-[#6B7280]">
          Have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-[#2F7BAF] font-bold hover:underline cursor-pointer"
          >
            Sign In
          </button>
        </p>
      </div>

      <div className="w-[52%] p-5 hidden md:block">
        <AuthPanel showReg={true} />
      </div>
    </div>
  );
}
import logo from "../assets/nutriva-logo.png";

export default function NutrivaLogo() {
  return (
    <div className="flex items-center gap-1 select-none">
      <img
        src={logo}
        alt="Nutriva Logo"
        className="w-24 sm:w-28 md:w-32 lg:w-36 h-auto object-contain"
      />
    </div>
  );
}
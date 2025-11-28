import logo from "../assets/nutriva-logo.png";

export default function NutrivaLogo() {
  return (
    <div className="flex items-center gap-1 select-none">
      <img
        src={logo}
        alt="Nutriva Logo"
        className="w-32 h-22 object-contain "
      />
    </div>
  );
}

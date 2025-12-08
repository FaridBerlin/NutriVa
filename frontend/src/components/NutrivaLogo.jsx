import logo from "../assets/nutriva-logo.png";

export default function NutrivaLogo({ size = "lg" }) {
  const sizeClasses = {
    sm: "h-20",
    md: "h-24",
    lg: "h-28",
    xl: "h-32",
  };

  return (
    <div className="flex items-center gap-1 select-none">
      <img
        src={logo}
        alt="Nutriva Logo"
        className={`${
          sizeClasses[size] || sizeClasses.lg
        } w-auto object-contain`}
      />
    </div>
  );
}

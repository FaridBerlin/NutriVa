import logo from "../assets/nutriva-logo.png";

export default function NutrivaLogo({ size = "md" }) {
  const sizeClasses = {
    sm: "h-12",
    md: "h-16",
    lg: "h-20",
    xl: "h-24"
  };

  return (
    <div className="flex items-center gap-1 select-none">
      <img
        src={logo}
        alt="Nutriva Logo"
        className={`${sizeClasses[size] || sizeClasses.md} w-auto object-contain`}
      />
    </div>
  );
}
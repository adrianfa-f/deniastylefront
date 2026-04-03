const Button = ({ children, variant = "primary", ...props }) => {
  const baseClasses = "px-4 py-2 rounded-lg font-semibold transition";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline:
      "border border-primary text-primary hover:bg-primary hover:text-white",
  };
  return (
    <button className={`${baseClasses} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;

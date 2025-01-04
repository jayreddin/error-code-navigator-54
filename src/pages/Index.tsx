import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

const buttonNames = [
  "Joule Victorum",
  "Joule Samsung",
  "Joule Modular Air",
  "DeDietrich Strateo",
  "LG Thermia",
  "Hitachi Yutaki",
  "Panasonic Aquarea",
  "Grant Areona",
  "Itec Thermia",
  "Smart Control",
  "System Status",
];

const Index = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "light",
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="page-container">
      <button
        onClick={toggleTheme}
        className="theme-toggle"
        aria-label="Toggle theme"
      >
        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      <h1 className="header">Error Code Search</h1>

      <div className="button-container">
        {buttonNames.map((name, index) => (
          <Link
            key={index}
            to={`/${name.toLowerCase().replace(/\s+/g, "-")}`}
            className="nav-button"
          >
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Index;

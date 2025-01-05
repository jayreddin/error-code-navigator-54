import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

interface ButtonPageProps {
  title: string;
}

interface ErrorCode {
  code: string;
  meaning: string;
  solution: string;
}

const ButtonPage = ({ title }: ButtonPageProps) => {
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "light",
  );
  const [searchCode, setSearchCode] = useState("");
  const [errorDetails, setErrorDetails] = useState<ErrorCode[]>([]);
  const [errorCodes, setErrorCodes] = useState<Record<string, ErrorCode>>({});
  const location = useLocation();

  useEffect(() => {
    const loadErrorCodes = async () => {
      try {
        const routeName = location.pathname.slice(1);
        const response = await import(`../data/error-codes/${routeName}.json`);
        setErrorCodes(response.default);
      } catch (error) {
        console.error("Error loading error codes:", error);
      }
    };

    loadErrorCodes();
  }, [location]);

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

  const handleSearch = (value: string) => {
    setSearchCode(value);
    if (value) {
      const searchTerm = value.toLowerCase().replace(/\s+/g, "");
      const matchingCodes = Object.values(errorCodes).filter((error) => {
        const errorCode = error.code.toLowerCase().replace(/\s+/g, "");
        return errorCode.includes(searchTerm) || searchTerm.includes(errorCode);
      });
      setErrorDetails(matchingCodes);
    } else {
      setErrorDetails([]);
    }
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

      <h1 className="header">{title}</h1>

      <div className="w-full max-w-md space-y-4">
        <Link to="/" className="nav-button block">
          Home
        </Link>

        <Link to="/pdf-files" className="nav-button block">
          PDF Files
        </Link>

        <Input
          type="text"
          value={searchCode}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Error Code"
          className="nav-button text-2xl font-bold text-center h-16"
        />

        {errorDetails.map((error) => (
          <Card
            key={error.code}
            className="p-6 bg-secondary/50 border-[hsl(var(--button-border))] border"
          >
            <div className="space-y-4 text-center">
              <h2 className="text-lg font-semibold border-b pb-2">
                Error Code: {error.code}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Meaning:</h3>
                  <p>{error.meaning}</p>
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-1">Solution:</h3>
                  <p>{error.solution}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ButtonPage;

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Home } from 'lucide-react';

interface ButtonPageProps {
  title: string;
}

const ButtonPage = ({ title }: ButtonPageProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') as 'light' | 'dark' || 'light'
  );
  const location = useLocation();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="page-container">
      <button
        onClick={toggleTheme}
        className="theme-toggle"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      <Link to="/" className="home-button">
        <Home size={20} />
      </Link>

      <h1 className="header">{title}</h1>

      <div className="mt-8 text-center">
        <p>Content for {title} will be added here.</p>
      </div>
    </div>
  );
};

export default ButtonPage;
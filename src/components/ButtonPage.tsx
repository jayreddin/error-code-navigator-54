import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';

interface ButtonPageProps {
  title: string;
}

interface ErrorCode {
  code: string;
  meaning: string;
  solution: string;
}

const ButtonPage = ({ title }: ButtonPageProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') as 'light' | 'dark' || 'light'
  );
  const [searchCode, setSearchCode] = useState('');
  const [errorDetails, setErrorDetails] = useState<ErrorCode | null>(null);

  // Mock error codes - in a real app, this would come from a database or API
  const mockErrorCodes: Record<string, ErrorCode> = {
    '10': {
      code: '10',
      meaning: 'Water Pressure low (<0.8bar)',
      solution: 'Increase water pressure'
    }
  };

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

  const handleSearch = (value: string) => {
    setSearchCode(value);
    if (mockErrorCodes[value]) {
      setErrorDetails(mockErrorCodes[value]);
    } else {
      setErrorDetails(null);
    }
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

      <h1 className="header">{title}</h1>

      <div className="w-full max-w-md">
        <Link to="/" className="nav-button w-full block">
          Home
        </Link>

        <Link to="/pdf-files" className="nav-button w-full block mb-8">
          PDF Files
        </Link>

        <Input
          type="number"
          value={searchCode}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Enter error code"
          className="w-full nav-button mb-4 text-center"
        />

        {errorDetails && (
          <Card className="p-6 bg-secondary/50 text-center">
            <h2 className="text-lg font-semibold mb-4">Error Code: {errorDetails.code}</h2>
            <p className="mb-2">Meaning: {errorDetails.meaning}</p>
            <p>Solution: {errorDetails.solution}</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ButtonPage;
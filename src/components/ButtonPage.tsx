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

      <div className="w-full max-w-md space-y-4">
        <Link to="/" className="nav-button block">
          Home
        </Link>

        <Link to="/pdf-files" className="nav-button block">
          PDF Files
        </Link>

        <Input
          type="number"
          value={searchCode}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Enter error code"
          className="nav-button text-lg font-bold text-center"
        />

        {errorDetails && (
          <Card className="p-6 bg-secondary/50 border-[hsl(var(--button-border))] border">
            <div className="space-y-4 text-center">
              <h2 className="text-lg font-semibold border-b pb-2">Error Code: {errorDetails.code}</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Meaning:</h3>
                  <p>{errorDetails.meaning}</p>
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-1">Solution:</h3>
                  <p>{errorDetails.solution}</p>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ButtonPage;
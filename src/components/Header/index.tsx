import { Link } from 'react-router-dom';
import { useTheme } from '@/context/theme-provider';

import images from '@/assets';

import { Sun, Moon } from 'lucide-react';
import HeaderSearchBox from '../HeaderSearchBox';

function Header() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header className=" border-b sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={'/'}>
          <img className="w-20 -ml-1" src={images.HeaderLogo} alt="Weather Logo" />
        </Link>
        <div className='ml-auto -translate-x-5'>
        <HeaderSearchBox />
        </div>
        <div
          onClick={() => {
            setTheme(isDark ? 'light' : 'dark');
          }}
          className={`flex items-center cursor-pointer transition-transform duration-500 ${
            isDark ? 'rotate-180' : 'rotate-0'
          }`}
        >
          {isDark ? (
            <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all" />
          ) : (
            <Moon className="h-6 w-6 text-blue-500 rotate-0 transition-all" />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

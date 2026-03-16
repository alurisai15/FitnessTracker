import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Menu } from 'lucide-react';

export const Navbar = ({ onOpenSidebar }) => {
  const { theme, setTheme } = useTheme();

  return (
    <header
      className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-background/80 backdrop-blur-lg px-4 lg:px-8"
      data-testid="navbar"
    >
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onOpenSidebar}
        data-testid="mobile-menu-button"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex-1" />

      {/* Theme toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        data-testid="theme-toggle"
        className="rounded-full"
      >
        {theme === 'dark' ? (
          <Sun className="h-4 w-4 text-yellow-500" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Button>
    </header>
  );
};

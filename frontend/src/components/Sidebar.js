import { NavLink } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard,
  Utensils,
  Database,
  Dumbbell,
  ChefHat,
  CalendarDays,
  TrendingUp,
  User,
  LogOut,
  Zap,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/food-logging', icon: Utensils, label: 'Food Log' },
  { to: '/nutrition-database', icon: Database, label: 'Nutrition DB' },
  { to: '/exercise-tracking', icon: Dumbbell, label: 'Exercise' },
  { to: '/meal-recommendations', icon: ChefHat, label: 'Meal Ideas' },
  { to: '/diet-plan', icon: CalendarDays, label: 'Diet Plan' },
  { to: '/progress', icon: TrendingUp, label: 'Progress' },
  { to: '/profile-setup', icon: User, label: 'Profile' },
];

export const Sidebar = ({ onNavClick }) => {
  const { user, logout } = useApp();

  return (
    <div className="flex h-full flex-col bg-card border-r border-border" data-testid="sidebar">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
          <Zap className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="font-heading text-2xl font-bold tracking-tight uppercase text-foreground">
          FitTrack
        </span>
      </div>

      <Separator />

      {/* Nav items */}
      <nav className="flex-1 space-y-1 px-3 py-4" data-testid="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavClick}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )
            }
            data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <Separator />

      {/* User section */}
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary text-sm font-bold">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email || ''}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          data-testid="logout-button"
        >
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

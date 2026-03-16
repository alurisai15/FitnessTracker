import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';

export const Layout = () => {
  const { isAuthenticated } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col">
        <Sidebar />
      </div>

      {/* Mobile sidebar sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Sidebar onNavClick={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="lg:pl-64">
        <Navbar onOpenSidebar={() => setMobileOpen(true)} />
        <main className="px-4 py-6 md:px-8 lg:px-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

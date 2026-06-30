import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background grain">
      <Navbar />
      <main className="flex-1 relative">{children}</main>
      <Footer />
    </div>
  );
}


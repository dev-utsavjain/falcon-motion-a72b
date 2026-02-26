import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { path: '/', name: 'Home', navOrder: 1 },
    { path: '/users', name: 'Users', navOrder: 2 },
    { path: '/analytics', name: 'Analytics', navOrder: 3 },
    { path: '/settings', name: 'Settings', navOrder: 4 }
  ].sort((a, b) => a.navOrder - b.navOrder);

  return (
    <header className={`sticky top-0 z-50 transition ${scrolled ? 'bg-[#050506]/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5E6AD2] to-[#7C3AED] flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Icon name="Sparkles" className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">hi</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${isActive ? 'text-[#00D4FF]' : 'text-indigo-300 hover:text-white'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full text-indigo-300 hover:text-white hover:bg-white/10 transition">
              <Icon name="Bell" className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full text-indigo-300 hover:text-white hover:bg-white/10 transition">
              <Icon name="User" className="w-5 h-5" />
            </button>
            <button className="px-4 py-2 text-sm font-medium rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 active:scale-95 transition">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
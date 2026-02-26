import { Link, NavLink } from 'react-router-dom';
import * as Icons from 'lucide-react';

const Icon = ({ name, ...props }) => {
  const LucideIcon = Icons?.[name] || Icons.HelpCircle;
  return <LucideIcon {...props} />;
};

export default function Header() {
  const navLinks = [
    { path: '/', name: 'Home', navOrder: 1 },
    { path: '/analytics', name: 'Analytics', navOrder: 2 }
  ].sort((a, b) => a.navOrder - b.navOrder);

  return (
    <header className="sticky top-0 z-50 bg-[#050506]/80 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-white font-bold text-xl tracking-tight">hi</Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-300 ${
                    isActive ? 'text-[#5E6AD2]' : 'text-white/70 hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors duration-300">
              <Icon name="Bell" className="w-5 h-5 text-white/70" />
            </button>
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors duration-300">
              <Icon name="User" className="w-5 h-5 text-white/70" />
            </button>
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors duration-300">
              <Icon name="LogOut" className="w-5 h-5 text-white/70" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
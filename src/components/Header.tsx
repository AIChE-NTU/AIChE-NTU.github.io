
import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { navLinks, getDataUrl } from '../constants';
import { useTheme } from '../contexts/ThemeContext';
import { MenuIcon, XIcon, SunIcon, MoonIcon, ChevronDownIcon } from './Icons';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        const fetchLogo = async () => {
            try {
                const response = await fetch(getDataUrl('logo.json'));
                const data = await response.json();
                if (data.siteLogoUrl) {
                    setLogoUrl(data.siteLogoUrl);
                }
            } catch (error) {
                console.error("Failed to fetch site logo:", error);
            }
        };
        fetchLogo();
    }, []);

    const activeLinkStyle = {
        color: 'rgb(var(--color-primary))',
        fontWeight: '700',
    };

    const linkClasses = "text-text-main hover:text-primary transition-colors duration-300 font-medium";

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <header className="bg-surface/80 dark:bg-surface/80 backdrop-blur-sm sticky top-0 z-50 shadow-md w-full">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 w-full">
                    <div className="flex-shrink-0">
                        <NavLink to="/" className="flex items-center">
                            {logoUrl && <img src={logoUrl} alt="AIChE NTU Student Chapter Logo" className="h-16 w-auto object-contain"/>}
                        </NavLink>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex flex-grow justify-evenly items-center">
                        {navLinks.map((link) => (
                            !link.children ? (
                                <NavLink key={link.name} to={link.path} className={linkClasses} style={({ isActive }) => isActive ? activeLinkStyle : {}}>
                                    {link.name}
                                </NavLink>
                            ) : (
                                <div key={link.name} className="relative group">
                                    <NavLink to={link.path} className={`${linkClasses} flex items-center gap-1`} style={({ isActive }) => (isActive || window.location.hash.startsWith(`#${link.path}`)) ? activeLinkStyle : {}}>
                                        {link.name}
                                        <ChevronDownIcon className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                                    </NavLink>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-48 bg-surface rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 border border-gray-200 dark:border-gray-700">
                                        {link.children.map(child => (
                                            <NavLink key={child.name} to={child.path} className="block px-4 py-2 text-text-main hover:bg-primary/10 hover:text-primary transition-colors duration-200">
                                                {child.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}
                    </nav>

                    <div className="hidden lg:flex items-center flex-shrink-0 gap-4">
                         <Link to="/join" className="bg-primary text-white font-bold py-2 px-5 rounded-full hover:bg-primary-focus transition-all duration-300 transform hover:scale-105">
                            Join Us!
                        </Link>
                        <button onClick={toggleTheme} className="text-text-muted hover:text-primary transition-colors" aria-label="Toggle theme">
                            {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
                        </button>
                    </div>

                    <div className="lg:hidden flex items-center gap-4">
                        <button onClick={toggleTheme} className="text-text-muted hover:text-primary transition-colors" aria-label="Toggle theme">
                            {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
                        </button>
                        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                            {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="lg:hidden bg-surface">
                    <nav className="flex flex-col items-center px-4 pt-2 pb-4 space-y-1">
                        {navLinks.map((link) => (
                            !link.children ? (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className="block w-full text-center py-3 text-lg text-text-main hover:bg-primary/20 rounded-md transition-colors"
                                    onClick={() => setIsOpen(false)}
                                    style={({ isActive }) => isActive ? activeLinkStyle : {}}
                                >
                                    {link.name}
                                </NavLink>
                            ) : (
                                <div key={link.name} className="w-full">
                                    <button
                                        onClick={() => setActiveSubMenu(activeSubMenu === link.name ? null : link.name)}
                                        className="w-full flex justify-center items-center gap-2 text-center py-3 text-lg text-text-main hover:bg-primary/20 rounded-md transition-colors"
                                    >
                                        {link.name}
                                        <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${activeSubMenu === link.name ? 'rotate-180' : ''}`} />
                                    </button>
                                    {activeSubMenu === link.name && (
                                        <div className="flex flex-col items-center pl-4 mt-1 space-y-1">
                                            {link.children.map(child => (
                                                <NavLink
                                                    key={child.name}
                                                    to={child.path}
                                                    className="block w-full text-center py-2 text-md text-text-muted hover:bg-primary/10 rounded-md transition-colors"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {child.name}
                                                </NavLink>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )
                        ))}
                        <Link to="/join" onClick={() => setIsOpen(false)} className="w-full text-center py-3 mt-2 bg-primary text-white font-bold rounded-md hover:bg-primary-focus transition-all duration-300">
                           Join Us!
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;

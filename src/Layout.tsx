
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SocialContacts from './components/SocialContacts';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      
      {/* Floating Social Sidebar */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3">
          <SocialContacts variant="sidebar" />
        </div>
      </div>
      
      {/* Main content - with proper spacing from header */}
      <main className="flex-grow pt-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
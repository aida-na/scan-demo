import React from 'react';
import Sidebar from '@/components/ui/sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray">
      <Sidebar />
      <main className="flex-1"> {/* Use standard Tailwind spacing */}
        <div className="mx-auto max-w-7xl p-8"> {/* Add max-width and auto margins */}
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
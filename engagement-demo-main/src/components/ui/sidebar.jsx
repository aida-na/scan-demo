'use client';

import React, { useState } from 'react';
import { 
 Home,  
 Users, 
  Blocks, 
  FileText, 
  Mic, 
  Menu,
  X,
  Bell,
  Cable,
  Settings,
  ChevronRight,
  Bolt
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('main');

  const menuItems = [
    { id: 'main', href: '/', icon: Home, label: 'Main' },
    { id: 'cohorts', href: '/cohorts', icon: Users, label: 'Smart Cohorts' },
    { id: 'studio', href: '/studio', icon: Blocks, label: 'AI Campaign Studio' },
    { id: 'content', href: '/content', icon: FileText, label: 'Content Creator' },
    { id: 'voice', href: '/voice', icon: Mic, label: 'Voice AI Agents' },
    { id: 'integrations', href: '/integrations', icon: Cable, label: 'Integrations' },
    { id: 'settings', href: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className={`
      h-screen
      bg-white
      shadow-lg
      transition-all
      duration-300
      ${isCollapsed ? 'w-16' : 'w-64'}
    `}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <div className="relative h-18 w-18">
            <Image
              src='/favicon.ico'
              alt="Logo"
              width={120}
              height={120}
              className="object-contain"
              priority
            />
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="p-2">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`
              w-full
              flex
              items-center
              p-3
              mb-2
              rounded-lg
              transition-colors
              ${activeItem === item.id 
                ? 'bg-blue-100 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-100'
              }
            `}
            onClick={() => setActiveItem(item.id)}
          >
            <div className="w-6 flex items-center justify-center">
              <item.icon size={15} />
            </div>
            {!isCollapsed && (
              <>
                <span className="ml-2">{item.label}</span>
                {activeItem === item.id && (
                  <ChevronRight size={16} className="ml-auto" />
                )}
              </>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
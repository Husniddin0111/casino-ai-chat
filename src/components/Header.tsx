
import React from 'react';
import { Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-2 rounded-xl">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Casino AI
          </h1>
        </div>
        <div className="text-sm text-gray-500 hidden md:block">
          Your intelligent casino assistant
        </div>
      </div>
    </header>
  );
};

export default Header;

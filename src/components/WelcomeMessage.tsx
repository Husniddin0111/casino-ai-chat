
import React from 'react';
import { Sparkles } from 'lucide-react';

const WelcomeMessage = () => {
  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="text-center space-y-8 py-8 animate-fade-in">
        {/* Welcome Header */}
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Welcome to Casino AI
            </h2>
            <p className="text-gray-600 text-lg">
              Your intelligent casino assistant is here to help
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;

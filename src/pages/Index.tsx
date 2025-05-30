
import React from 'react';
import ChatInterface from '../components/ChatInterface';
import Header from '../components/Header';

const Index = () => {
  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 overflow-hidden bg-gray-50">
        <ChatInterface />
      </div>
    </div>
  );
};

export default Index;

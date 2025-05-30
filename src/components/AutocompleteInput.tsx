
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  disabled?: boolean;
}

const casinoSuggestions = [

  "What are the best casino games for beginners?",
  "How do I play blackjack effectively?",
  "What is the house edge in roulette?",
  "How do slot machines actually work?",
  "What are the odds of winning at poker?",
  "How to manage my bankroll effectively?",
  "What is card counting and is it legal?",
  "Best strategies for playing baccarat?",
  "How do casino bonuses and promotions work?",
  "What is RTP in slot games?",
  "How do I play craps for beginners?",
  "What are progressive jackpots?",
  "When is the best time to play at a casino?",
  "How do casino loyalty programs work?",
  "What's the difference between online and live casinos?",
  "How to set proper gambling limits?",
  "What are the most popular casino games?",
  "How do I cash out my casino winnings?",
  "What is responsible gambling?",
  "How do casino comps and rewards work?",
  "What are the worst bets in a casino?",
  "How does the martingale betting system work?",
  "What should I know before visiting a casino?",
  "How do dealers shuffle cards in blackjack?",
  "What are the different types of slot machines?",
  "Which slot has highest RTP?",
  "What are today's best bonuses?",
  "Are Austrian casinos regulated?",
  "What are the top online casinos in Austria?",
  "How do I withdraw money from a casino?",
  "Which games give the best returns?",
  "Where can I find the biggest welcome bonuses?"
];

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  value,
  onChange,
  onSubmit,
  disabled = false
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value.length >= 1) {
      const filtered = casinoSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 4);
      
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setSelectedIndex(-1);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          selectSuggestion(suggestions[selectedIndex]);
        } else {
          handleSubmit();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const selectSuggestion = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const handleSubmit = () => {
    if (value.trim() && !disabled) {
      onSubmit(value);
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  return (
    <div className="relative">
      {/* Suggestions Dropdown - Above Input */}
      {showSuggestions && (
        <div className="absolute bottom-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mb-2 max-h-60 overflow-y-auto z-10 animate-fade-in">
          <div className="p-2">
            <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-100 mb-1">
              Suggested questions
            </div>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => selectSuggestion(suggestion)}
                className={`w-full text-left px-3 py-3 text-sm rounded-lg transition-all duration-200 ${
                  index === selectedIndex
                    ? 'bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 transform scale-[1.02]'
                    : 'hover:bg-gray-50 text-gray-700 hover:transform hover:scale-[1.01]'
                }`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Field */}
      <div className="flex items-center space-x-3 bg-gray-50 rounded-2xl p-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-purple-500 focus-within:ring-opacity-20 transition-all duration-200">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything about casinos..."
          disabled={disabled}
          className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 px-3 py-2"
        />
        <Button
          onClick={handleSubmit}
          disabled={!value.trim() || disabled}
          size="sm"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl px-4 py-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AutocompleteInput;

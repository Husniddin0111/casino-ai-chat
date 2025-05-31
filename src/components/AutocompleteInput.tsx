
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
"What are the top online casinos in Austria?",
"Which online casinos are the most trusted in Austria?",
"Which casinos offer fast withdrawals in Austria?",
"What are no deposit bonuses and how can I get one?",
"Which casinos offer the best free spins?",
"How do I withdraw money from a casino?",
"What are the safest payment methods in Austrian online casinos?",
"Are there casinos that support instant withdrawals?",
"How long do casino withdrawals take?",
"What are the best casino games for beginners?",
"How do I start playing at an online casino?",
"Which casino games are easiest to learn?",
"Are there beginner-friendly online casinos?",
"How do I play blackjack effectively?",
"How do slot machines actually work?",
"Which slot has highest RTP?",
"What are the odds of winning at poker?",
"What are the most popular casino games?",
"Which games give the best returns?",
"When is the best time to play at a casino?",
"What's the difference between online and live casinos?",
"How to manage my bankroll effectively?",
"Is online gambling legal in Austria?",
"How are casino winnings taxed in Austria?",
"Can I play anonymously at online casinos?",
"How do I verify my account on an online casino?",
"What happens if I win big at an online casino?",
"How do dealers shuffle cards in blackjack?",
"Can I play with live dealers from Austria?",
"How do casino bonuses and promotions work?",
"What should I know before visiting a casino?",
"What are today's best bonuses?",
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

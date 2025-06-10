
import React from 'react';
import { Sparkles } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

const WelcomeMessage = ({ language }: { language: 'en' | 'de' }) => {
  const t = {
    en: {
      title: "Welcome to your smart online assistant",
      text: "Discover trending platforms, tips, and games with ChaCha AI\n Looking for something fun or useful online? I’m here to help.",
      typing: [
        "Discover today's most exciting websites and apps",
        "Find something fun and different to explore online",
        "Where can I try something new and unique online?",
        "What are people loving online right now?",
        "Show me something useful and fun today",
        "Any exciting platforms or tools trending lately?"
      ]
    },
    de: {
      title: "Willkommen bei deinem smarten Online-Assistenten",
      text: "Entdecke trendige Plattformen, Tipps und Spiele mit ChaCha AI\n Suchst du etwas Lustiges oder Nützliches online? Ich helfe dir gern.",
      typing: [
        "Entdecke heute spannende Websites und Apps",
        "Finde etwas Neues und Einzigartiges zum Ausprobieren",
        "Was ist online gerade im Trend?",
        "Zeig mir etwas Nützliches und Unterhaltsames",
        "Welche Tools oder Plattformen sind aktuell beliebt?",
        "Was lohnt sich heute online auszuprobieren?"
      ]
    }
  };

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
            <br></br><br></br>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {t[language].title.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </h2>
            <p className="text-gray-600 text-lg">
              {t[language].text.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
            <br></br>
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.8 }}
              className="inline-block mt-4 text-yellow-600"
            >
              <Lightbulb className="w-8 h-8" />
            </motion.div><br></br><br></br>
            <TypeAnimation
              sequence={
                t[language].typing.flatMap((line) => [line, 1000])
              }
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              className="inline-block text-lg md:text-xl text-gray-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;


import React from 'react';
import { Sparkles } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

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
            <br></br><br></br><br></br>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Welcome to Casino AI
            </h2>
            <p className="text-gray-600 text-lg">
              Your intelligent casino assistant is here to help
            </p>

            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.8 }}
              className="inline-block mt-4 text-yellow-600"
            >
              <Lightbulb className="w-8 h-8" />
            </motion.div><br></br>
            <TypeAnimation
              sequence={[
                "What are today's best bonuses?",
                1000,
                "What are the top online casinos in Austria?",
                1000,
                "How do I withdraw money from a casino?",
                1000,
                "Which games give the best returns?",
                1000,
                "Where can I find the biggest welcome bonuses?",
                1000
              ]}
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

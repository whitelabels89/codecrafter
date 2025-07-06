import { useEffect, useState } from "react";

interface ProgressIndicatorsProps {
  currentStep: number;
  maxSteps: number;
  gameStatus: 'playing' | 'completed' | 'error';
}

export function ProgressIndicators({ currentStep, maxSteps, gameStatus }: ProgressIndicatorsProps) {
  const [celebrationActive, setCelebrationActive] = useState(false);

  useEffect(() => {
    if (gameStatus === 'completed') {
      setCelebrationActive(true);
      setTimeout(() => setCelebrationActive(false), 2000);
    }
  }, [gameStatus]);

  const getCircleStyle = (index: number) => {
    const baseClasses = "progress-circle w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full transition-all duration-300";
    const celebrationClasses = celebrationActive ? "animate-pulse" : "";
    
    if (index < currentStep) {
      // Completed step
      return `${baseClasses} bg-teal-primary ${celebrationClasses}`;
    } else if (index === currentStep) {
      // Current step
      return `${baseClasses} border-2 sm:border-3 lg:border-4 border-teal-primary bg-transparent flex items-center justify-center breathing ${celebrationClasses}`;
    } else {
      // Future step
      return `${baseClasses} bg-teal-primary ${celebrationClasses}`;
    }
  };

  return (
    <div className="flex space-x-3 sm:space-x-4 lg:space-x-6">
      {[...Array(Math.min(maxSteps, 6))].map((_, index) => (
        <div key={index} className={getCircleStyle(index)}>
          {index === currentStep && (
            <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 bg-white rounded-full"></div>
          )}
        </div>
      ))}
    </div>
  );
}

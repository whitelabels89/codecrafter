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
    const baseClasses = "progress-circle w-16 h-16 rounded-full transition-all duration-300";
    const celebrationClasses = celebrationActive ? "animate-pulse" : "";
    
    if (index < currentStep) {
      // Completed step
      return `${baseClasses} bg-teal-primary ${celebrationClasses}`;
    } else if (index === currentStep) {
      // Current step
      return `${baseClasses} border-4 border-teal-primary bg-transparent flex items-center justify-center breathing ${celebrationClasses}`;
    } else {
      // Future step
      return `${baseClasses} bg-teal-primary ${celebrationClasses}`;
    }
  };

  return (
    <div className="flex space-x-6">
      {[...Array(Math.min(maxSteps, 6))].map((_, index) => (
        <div key={index} className={getCircleStyle(index)}>
          {index === currentStep && (
            <div className="w-6 h-6 bg-white rounded-full"></div>
          )}
        </div>
      ))}
    </div>
  );
}

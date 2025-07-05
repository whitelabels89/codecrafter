interface CodeDisplayProps {
  codeSequence: string[];
  currentStep: number;
  gameStatus: 'playing' | 'completed' | 'error';
}

export function CodeDisplay({ codeSequence, currentStep, gameStatus }: CodeDisplayProps) {
  const getLineStyle = (index: number) => {
    const baseClasses = "text-6xl font-bold text-code-blue transition-all duration-300";
    
    if (index < currentStep) {
      // Completed code line
      return `${baseClasses} opacity-25`;
    } else if (index === currentStep) {
      // Current code line
      const breathingClass = gameStatus === 'playing' ? 'breathing' : '';
      const shakeClass = gameStatus === 'error' ? 'shaking' : '';
      return `${baseClasses} ${breathingClass} ${shakeClass}`;
    } else {
      // Future code line
      return `${baseClasses} opacity-50`;
    }
  };

  return (
    <div className="text-center">
      <div className="space-y-8">
        {codeSequence.map((code, index) => (
          <div 
            key={index}
            className={getLineStyle(index)}
          >
            {code}
          </div>
        ))}
      </div>
    </div>
  );
}

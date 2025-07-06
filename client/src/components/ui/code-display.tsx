interface CodeDisplayProps {
  codeSequence: string[];
  currentStep: number;
  gameStatus: 'playing' | 'completed' | 'error';
}

export function CodeDisplay({ codeSequence, currentStep, gameStatus }: CodeDisplayProps) {
  const getLineStyle = (index: number, line: string = '') => {
    // Different sizes for different types of code lines
    const isIndented = line && line.startsWith('  ');
    const isLoop = line && (line.includes('for') || line.includes('def') || line.includes('while'));
    
    let baseClasses = "";
    if (isLoop) {
      baseClasses = "text-5xl font-bold transition-all duration-300";
      // Different colors for different loop types
      if (line.includes('while')) {
        baseClasses += " text-red-600"; // While loops in red/maroon
      } else {
        baseClasses += " text-code-blue"; // For loops in blue
      }
    } else if (isIndented) {
      baseClasses = "text-5xl font-bold text-code-blue transition-all duration-300 ml-8";
    } else {
      baseClasses = "text-6xl font-bold text-code-blue transition-all duration-300";
    }
    
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
            className={getLineStyle(index, code)}
          >
            {code}
          </div>
        ))}
      </div>
    </div>
  );
}

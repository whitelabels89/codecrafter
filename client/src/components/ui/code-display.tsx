interface CodeDisplayProps {
  codeSequence: string[];
  currentStep: number;
  gameStatus: 'playing' | 'completed' | 'error';
}

export function CodeDisplay({ codeSequence, currentStep, gameStatus }: CodeDisplayProps) {
  const getLineStyle = (index: number, line: string = '') => {
    // Calculate indentation level
    const indentLevel = Math.floor((line.match(/^ */)?.[0]?.length || 0) / 2);
    const isLoop = line && (line.includes('for') || line.includes('def') || line.includes('while'));
    const isIf = line && line.includes('if');
    
    let baseClasses = "text-5xl font-bold transition-all duration-300 leading-tight";
    
    // Add left margin based on indentation level
    if (indentLevel > 0) {
      baseClasses += ` ml-${indentLevel * 12}`;
    }
    
    // Color coding based on statement type
    if (line.includes('while')) {
      baseClasses += " text-red-600"; // While loops in red/maroon
    } else if (line.includes('for')) {
      baseClasses += " text-red-600"; // For loops also in red/maroon
    } else if (line.includes('if')) {
      baseClasses += " text-red-600"; // If statements in red/maroon  
    } else {
      baseClasses += " text-blue-600"; // Commands in blue
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
    <div className="text-left">
      <div className="space-y-4">
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

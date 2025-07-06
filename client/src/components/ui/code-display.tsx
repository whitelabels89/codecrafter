interface CodeDisplayProps {
  codeSequence: string[];
  currentStep: number;
  gameStatus: 'playing' | 'completed' | 'error';
  displaySequence: string[];
  level: number;
}

export function CodeDisplay({ codeSequence, currentStep, gameStatus, displaySequence, level }: CodeDisplayProps) {
  const getLineStyle = (line: string = '') => {
    let baseClasses = "text-2xl sm:text-3xl lg:text-5xl font-bold transition-all duration-300 leading-tight";
    
    // For if-else statements (level 26-30), show which path is taken
    if (level >= 26 && level <= 30) {
      if (line.includes('if') || line.includes('else:')) {
        baseClasses += " text-red-600"; // Control structures in red
      } else if (line.includes('()')) {
        // For command lines, check if this command is in the actual sequence
        const commandName = line.replace('()', '').trim();
        const isExecuted = codeSequence.includes(commandName);
        
        if (isExecuted) {
          baseClasses += " text-blue-600"; // Executed path
        } else {
          baseClasses += " text-gray-400"; // Not executed path (dimmed)
        }
      } else {
        baseClasses += " text-red-600";
      }
    } else {
      // Regular color coding for other levels
      if (line.includes('while') || line.includes('for') || line.includes('if') || 
          line.includes('else') || line.includes('def') || line.includes('break')) {
        baseClasses += " text-red-600"; // Control structures in red/maroon
      } else {
        baseClasses += " text-blue-600"; // Commands in blue
      }
    }
    
    return baseClasses;
  };
  
  const getIndentStyle = (line: string) => {
    // Calculate indentation level based on leading spaces
    const indentLevel = Math.floor((line.match(/^ */)?.[0]?.length || 0) / 2);
    return {
      marginLeft: `${indentLevel * 24}px` // Reduced from 48px to 24px for mobile
    };
  };

  return (
    <div className="w-full flex justify-center lg:justify-start">
      <div className="text-left space-y-2 sm:space-y-3 lg:space-y-4 overflow-x-auto">
        {(displaySequence || codeSequence).map((code, index) => (
          <div 
            key={index}
            className={getLineStyle(code)}
            style={getIndentStyle(code)}
          >
            {code}
          </div>
        ))}
      </div>
    </div>
  );
}

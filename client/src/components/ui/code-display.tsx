interface CodeDisplayProps {
  codeSequence: string[];
  currentStep: number;
  gameStatus: 'playing' | 'completed' | 'error';
}

export function CodeDisplay({ codeSequence, currentStep, gameStatus }: CodeDisplayProps) {
  const getLineStyle = (line: string = '') => {
    let baseClasses = "text-5xl font-bold transition-all duration-300 leading-tight";
    
    // Color coding based on statement type
    if (line.includes('while') || line.includes('for') || line.includes('if') || 
        line.includes('else') || line.includes('def') || line.includes('break')) {
      baseClasses += " text-red-600"; // Control structures in red/maroon
    } else {
      baseClasses += " text-blue-600"; // Commands in blue
    }
    
    // No step indicators - all code shown equally
    return baseClasses;
  };
  
  const getIndentStyle = (line: string) => {
    // Calculate indentation level based on leading spaces
    const indentLevel = Math.floor((line.match(/^ */)?.[0]?.length || 0) / 2);
    return {
      marginLeft: `${indentLevel * 48}px` // 48px per indentation level
    };
  };

  return (
    <div className="text-left">
      <div className="space-y-4">
        {codeSequence.map((code, index) => (
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

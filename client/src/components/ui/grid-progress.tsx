import { useEffect, useState } from "react";

interface GridProgressProps {
  currentPosition: { x: number; y: number };
  gameStatus: 'playing' | 'completed' | 'error';
  codeSequence: string[];
  currentStep: number;
  gridSize: { width: number; height: number };
  displaySequence: string[];
}

export function GridProgress({ 
  currentPosition, 
  gameStatus, 
  codeSequence, 
  currentStep,
  gridSize,
  displaySequence 
}: GridProgressProps) {
  const [celebrationActive, setCelebrationActive] = useState(false);

  useEffect(() => {
    if (gameStatus === 'completed') {
      setCelebrationActive(true);
      setTimeout(() => setCelebrationActive(false), 2000);
    }
  }, [gameStatus]);

  // Calculate the path the player should take with wrapping
  const calculatePath = () => {
    const path = [{ x: 1, y: 1 }]; // Starting position
    let currentPos = { x: 1, y: 1 };
    
    for (let i = 0; i < codeSequence.length; i++) {
      const command = codeSequence[i];
      let newPos = { ...currentPos };
      
      switch (command) {
        case 'atas':
          newPos.y = currentPos.y - 1;
          if (newPos.y < 0) newPos.y = gridSize.height - 1; // Wrap to bottom
          break;
        case 'bawah':
          newPos.y = currentPos.y + 1;
          if (newPos.y >= gridSize.height) newPos.y = 0; // Wrap to top
          break;
        case 'kiri':
          newPos.x = currentPos.x - 1;
          if (newPos.x < 0) newPos.x = gridSize.width - 1; // Wrap to right
          break;
        case 'kanan':
          newPos.x = currentPos.x + 1;
          if (newPos.x >= gridSize.width) newPos.x = 0; // Wrap to left
          break;
      }
      
      path.push(newPos);
      currentPos = newPos;
    }
    
    return path;
  };

  const path = calculatePath();

  // Calculate dynamic grid size based on code complexity
  const calculateGridSize = () => {
    const totalLines = displaySequence?.length || 1;
    const maxLineLength = displaySequence?.length ? Math.max(...displaySequence.map(line => line.length)) : 10;
    
    // Count indentation levels and control structures
    const maxIndentLevel = displaySequence?.length ? Math.max(...displaySequence.map(line => {
      const indentLevel = Math.floor((line.match(/^ */)?.[0]?.length || 0) / 2);
      return indentLevel;
    })) : 0;
    
    const hasControlStructures = displaySequence?.some(line => 
      line.includes('while') || line.includes('for') || line.includes('if') || 
      line.includes('else') || line.includes('def') || line.includes('break')
    ) || false;
    
    // Base size calculation
    let circleSize = 24; // Base size in pixels
    
    // Adjust based on number of lines
    if (totalLines <= 2) {
      circleSize = 28; // Larger for simple code
    } else if (totalLines <= 4) {
      circleSize = 24; // Medium size
    } else if (totalLines <= 6) {
      circleSize = 20; // Smaller for complex code
    } else {
      circleSize = 16; // Very small for very complex code
    }
    
    // Adjust based on line length
    if (maxLineLength > 30) {
      circleSize = Math.max(circleSize - 4, 14); // Don't go below 14
    }
    
    // Adjust based on indentation complexity
    if (maxIndentLevel > 2) {
      circleSize = Math.max(circleSize - 2, 12); // Don't go below 12
    }
    
    // Additional adjustment for control structures
    if (hasControlStructures && totalLines > 5) {
      circleSize = Math.max(circleSize - 2, 10); // Don't go below 10
    }
    
    return { size: circleSize, gap: Math.max(circleSize / 4, 3) };
  };

  const { size: circleSize, gap: gridGap } = calculateGridSize();

  const getCircleStyle = (x: number, y: number) => {
    const isStartPosition = x === 1 && y === 1;
    const isCurrentPosition = x === currentPosition.x && y === currentPosition.y;
    const pathIndex = path.findIndex(p => p.x === x && p.y === y);
    const isInPath = pathIndex !== -1;
    const isCompleted = pathIndex !== -1 && pathIndex < currentStep;
    
    const baseClasses = "rounded-full transition-all duration-300";
    const celebrationClasses = celebrationActive ? "animate-pulse" : "";
    
    if (isCurrentPosition) {
      // Current position - keep original color but add radar effect
      const shakeClass = gameStatus === 'error' ? 'shaking' : '';
      const radarClass = gameStatus === 'playing' ? 'radar-pulse' : '';
      if (isInPath) {
        return `${baseClasses} bg-pink-primary ${shakeClass} ${radarClass} ${celebrationClasses}`;
      } else {
        return `${baseClasses} bg-teal-primary ${shakeClass} ${radarClass} ${celebrationClasses}`;
      }
    } else if (isInPath) {
      // All positions in path (completed and future) - keep same color to avoid confusion
      return `${baseClasses} bg-pink-primary ${celebrationClasses}`;
    } else {
      // Regular positions - teal
      return `${baseClasses} bg-teal-primary ${celebrationClasses}`;
    }
  };
  
  const getCircleInlineStyle = () => {
    return {
      width: `${circleSize * 4}px`, // Convert to pixels
      height: `${circleSize * 4}px`
    };
  };

  return (
    <div 
      className="grid grid-cols-3 p-6"
      style={{ gap: `${gridGap * 4}px` }}
    >
      {Array.from({ length: gridSize.height }, (_, y) =>
        Array.from({ length: gridSize.width }, (_, x) => (
          <div 
            key={`${x}-${y}`} 
            className={`${getCircleStyle(x, y)} relative`}
            style={getCircleInlineStyle()}
          >
            {currentPosition.x === x && currentPosition.y === y && (
              <div 
                className="bg-white bg-opacity-40 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: `${circleSize * 1.5}px`,
                  height: `${circleSize * 1.5}px`
                }}
              ></div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
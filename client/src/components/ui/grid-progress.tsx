import { useEffect, useState } from "react";

interface GridProgressProps {
  currentPosition: { x: number; y: number };
  gameStatus: 'playing' | 'completed' | 'error';
  codeSequence: string[];
  currentStep: number;
  gridSize: { width: number; height: number };
  displaySequence: string[];
  level: number;
}

export function GridProgress({ 
  currentPosition, 
  gameStatus, 
  codeSequence, 
  currentStep,
  gridSize,
  displaySequence,
  level
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

  // Calculate dynamic grid size based on code text height proportional sizing
  const calculateGridSize = () => {
    const totalLines = displaySequence?.length || 1;
    
    // Check if mobile screen size (using window width)
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
    
    // Special sizing for level 1 and mobile
    if (level === 1) {
      return isMobile ? { size: 50, gap: 8 } : { size: 70, gap: 12 }; // Smaller on mobile
    }
    
    // Calculate estimated text height based on line count and font size
    // Different font sizes for mobile vs desktop
    const lineHeight = isMobile ? 32 : 48; // text-2xl vs text-5xl
    const lineSpacing = isMobile ? 12 : 16; // space-y-3 vs space-y-4
    const estimatedCodeHeight = (totalLines * lineHeight) + ((totalLines - 1) * lineSpacing);
    
    // Calculate proportional circle size based on code height
    // Target: Grid should occupy similar visual weight as code text
    // Grid has 3x3 = 9 circles, so divide estimated height by grid arrangement
    const targetGridHeight = estimatedCodeHeight * (isMobile ? 1.0 : 1.2); // Less proportion on mobile
    const gridRows = 3;
    const estimatedTotalGaps = (gridRows - 1) * (isMobile ? 8 : 12); // Smaller gaps on mobile
    
    // Calculate circle size: (target height - gaps) / number of rows
    let circleSize = Math.max((targetGridHeight - estimatedTotalGaps) / gridRows, isMobile ? 30 : 40);
    
    // Ensure reasonable bounds - different for mobile
    circleSize = Math.min(circleSize, isMobile ? 60 : 100); // Smaller max on mobile
    circleSize = Math.max(circleSize, isMobile ? 30 : 40); // Smaller min on mobile
    
    // Calculate proportional gap
    const gap = Math.max(circleSize / 8, isMobile ? 3 : 4);
    
    return { size: Math.round(circleSize), gap: Math.round(gap) };
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
      width: `${circleSize}px`, // Direct pixel size
      height: `${circleSize}px`
    };
  };

  return (
    <div 
      className="grid grid-cols-3 p-6"
      style={{ gap: `${gridGap}px` }}
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
                  width: `${circleSize * 0.6}px`,
                  height: `${circleSize * 0.6}px`
                }}
              ></div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
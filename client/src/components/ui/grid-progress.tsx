import { useEffect, useState } from "react";

interface GridProgressProps {
  currentPosition: { x: number; y: number };
  gameStatus: 'playing' | 'completed' | 'error';
  codeSequence: string[];
  currentStep: number;
  gridSize: { width: number; height: number };
}

export function GridProgress({ 
  currentPosition, 
  gameStatus, 
  codeSequence, 
  currentStep,
  gridSize 
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

  const getCircleStyle = (x: number, y: number) => {
    const isStartPosition = x === 1 && y === 1;
    const isCurrentPosition = x === currentPosition.x && y === currentPosition.y;
    const pathIndex = path.findIndex(p => p.x === x && p.y === y);
    const isInPath = pathIndex !== -1;
    const isCompleted = pathIndex !== -1 && pathIndex < currentStep;
    
    const baseClasses = "w-24 h-24 rounded-full transition-all duration-300";
    const celebrationClasses = celebrationActive ? "animate-pulse" : "";
    
    if (isCurrentPosition) {
      // Current position - white circle with breathing animation
      const breathingClass = gameStatus === 'playing' ? 'breathing' : '';
      const shakeClass = gameStatus === 'error' ? 'shaking' : '';
      return `${baseClasses} border-4 border-teal-primary bg-white flex items-center justify-center ${breathingClass} ${shakeClass} ${celebrationClasses}`;
    } else if (isCompleted) {
      // Completed positions - filled teal
      return `${baseClasses} bg-teal-primary ${celebrationClasses}`;
    } else if (isInPath) {
      // Future positions in path - pink/red
      return `${baseClasses} bg-pink-primary ${celebrationClasses}`;
    } else {
      // Regular positions - teal
      return `${baseClasses} bg-teal-primary ${celebrationClasses}`;
    }
  };

  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {Array.from({ length: gridSize.height }, (_, y) =>
        Array.from({ length: gridSize.width }, (_, x) => (
          <div key={`${x}-${y}`} className={getCircleStyle(x, y)}>
            {currentPosition.x === x && currentPosition.y === y && (
              <div className="w-8 h-8 bg-teal-primary rounded-full"></div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
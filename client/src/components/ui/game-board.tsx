import { DirectionalControls } from "./directional-controls";
import { ProgressIndicators } from "./progress-indicators";
import { CodeDisplay } from "./code-display";

interface GameBoardProps {
  gameState: {
    currentStep: number;
    maxSteps: number;
    codeSequence: string[];
    displaySequence: string[];
    playerSequence: string[];
    isWaitingForInput: boolean;
    level: number;
    gameStatus: 'playing' | 'completed' | 'error';
  };
  onPlayerInput: (direction: string) => void;
}

export function GameBoard({ gameState, onPlayerInput }: GameBoardProps) {
  return (
    <>
      {/* Menu Icon */}
      <div className="absolute top-6 left-6 z-10">
        <div className="grid grid-cols-3 gap-1 w-8 h-8">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-menu-gray rounded-full"></div>
          ))}
        </div>
      </div>

      {/* Main Game Container */}
      <div className="min-h-screen flex items-center justify-center px-8">
        <div className="w-full max-w-6xl flex items-center justify-between">
          
          {/* Game Section */}
          <div className="flex-1 flex flex-col items-center justify-center space-y-12">
            <DirectionalControls 
              onInput={onPlayerInput}
              disabled={!gameState.isWaitingForInput}
            />
            <ProgressIndicators 
              currentStep={gameState.currentStep}
              maxSteps={gameState.maxSteps}
              gameStatus={gameState.gameStatus}
            />
          </div>
          
          {/* Code Display */}
          <div className="flex-1 flex items-center justify-center ml-16">
            <CodeDisplay 
              codeSequence={gameState.displaySequence}
              currentStep={gameState.currentStep}
              gameStatus={gameState.gameStatus}
            />
          </div>
          
        </div>
      </div>
      
      {/* Branding Footer */}
      <div className="absolute bottom-6 left-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">QA</span>
          </div>
          <span className="text-gray-600 font-medium">Queen's Academy iCoding</span>
        </div>
      </div>
    </>
  );
}

import { useState, useEffect, useCallback } from "react";
import { GameBoard } from "@/components/ui/game-board";
import { DirectionalControls } from "@/components/ui/directional-controls";
import { ProgressIndicators } from "@/components/ui/progress-indicators";
import { CodeDisplay } from "@/components/ui/code-display";

interface GameState {
  currentStep: number;
  maxSteps: number;
  codeSequence: string[];
  displaySequence: string[];
  playerSequence: string[];
  isWaitingForInput: boolean;
  level: number;
  gameStatus: 'playing' | 'completed' | 'error';
}

export default function Game() {
  const [gameState, setGameState] = useState<GameState>({
    currentStep: 0,
    maxSteps: 3,
    codeSequence: ['kanan', 'maju', 'kiri'],
    displaySequence: ['kanan()', 'maju()', 'kiri()'],
    playerSequence: [],
    isWaitingForInput: true,
    level: 1,
    gameStatus: 'playing'
  });

  const generateLevel = useCallback((level: number) => {
    const commands = ['kanan', 'maju', 'kiri', 'mundur'];
    const sequenceLength = Math.min(3 + Math.floor(level / 2), 6);
    
    const codeSequence = [];
    for (let i = 0; i < sequenceLength; i++) {
      const randomCommand = commands[Math.floor(Math.random() * commands.length)];
      codeSequence.push(randomCommand);
    }
    
    return {
      codeSequence,
      displaySequence: codeSequence.map(cmd => `${cmd}()`)
    };
  }, []);

  const initializeGame = useCallback(() => {
    const { codeSequence, displaySequence } = generateLevel(gameState.level);
    setGameState(prev => ({
      ...prev,
      currentStep: 0,
      maxSteps: codeSequence.length,
      codeSequence,
      displaySequence,
      playerSequence: [],
      isWaitingForInput: true,
      gameStatus: 'playing'
    }));
  }, [gameState.level, generateLevel]);

  const handlePlayerInput = useCallback((direction: string) => {
    if (!gameState.isWaitingForInput || gameState.gameStatus !== 'playing') return;

    const directionMap: { [key: string]: string } = {
      'up': 'maju',
      'down': 'mundur',
      'left': 'kiri',
      'right': 'kanan'
    };

    const command = directionMap[direction];
    const expectedCommand = gameState.codeSequence[gameState.currentStep];

    if (command === expectedCommand) {
      // Correct input
      const newStep = gameState.currentStep + 1;
      const newPlayerSequence = [...gameState.playerSequence, command];
      
      setGameState(prev => ({
        ...prev,
        currentStep: newStep,
        playerSequence: newPlayerSequence
      }));

      if (newStep >= gameState.maxSteps) {
        // Level completed
        setGameState(prev => ({
          ...prev,
          gameStatus: 'completed'
        }));
        
        // Auto-advance to next level after delay
        setTimeout(() => {
          setGameState(prev => ({
            ...prev,
            level: prev.level + 1
          }));
        }, 2000);
      }
    } else {
      // Wrong input - trigger error and restart
      setGameState(prev => ({
        ...prev,
        gameStatus: 'error',
        isWaitingForInput: false
      }));
      
      // Auto-restart after error animation
      setTimeout(() => {
        initializeGame();
      }, 1500);
    }
  }, [gameState, initializeGame]);

  // Initialize game on mount and level change
  useEffect(() => {
    initializeGame();
  }, [gameState.level]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameState.isWaitingForInput) return;
      
      let direction = null;
      switch(e.key) {
        case 'ArrowUp': direction = 'up'; break;
        case 'ArrowDown': direction = 'down'; break;
        case 'ArrowLeft': direction = 'left'; break;
        case 'ArrowRight': direction = 'right'; break;
      }
      
      if (direction) {
        e.preventDefault();
        handlePlayerInput(direction);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [gameState.isWaitingForInput, handlePlayerInput]);

  return (
    <div className="bg-game-bg min-h-screen font-kid-friendly">
      <GameBoard 
        gameState={gameState}
        onPlayerInput={handlePlayerInput}
      />
    </div>
  );
}

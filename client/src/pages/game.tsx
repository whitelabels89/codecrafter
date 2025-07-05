import { useState, useEffect, useCallback } from "react";
import { GameBoard } from "@/components/ui/game-board";
import { DirectionalControls } from "@/components/ui/directional-controls";
import { ProgressIndicators } from "@/components/ui/progress-indicators";
import { CodeDisplay } from "@/components/ui/code-display";
import { GridProgress } from "@/components/ui/grid-progress";

interface GameState {
  currentStep: number;
  maxSteps: number;
  codeSequence: string[];
  displaySequence: string[];
  playerSequence: string[];
  isWaitingForInput: boolean;
  level: number;
  gameStatus: 'playing' | 'completed' | 'error';
  currentPosition: { x: number; y: number };
  gridSize: { width: number; height: number };
}

export default function Game() {
  const [gameState, setGameState] = useState<GameState>({
    currentStep: 0,
    maxSteps: 4,
    codeSequence: ['atas', 'kanan', 'bawah', 'kiri'],
    displaySequence: ['atas()', 'kanan()', 'bawah()', 'kiri()'],
    playerSequence: [],
    isWaitingForInput: true,
    level: 1,
    gameStatus: 'playing',
    currentPosition: { x: 1, y: 1 },
    gridSize: { width: 3, height: 3 }
  });

  const generateLevel = useCallback((level: number) => {
    const basicCommands = ['kanan', 'atas', 'kiri', 'bawah'];
    let codeSequence: string[] = [];
    let displaySequence: string[] = [];
    
    if (level <= 3) {
      // Basic movement levels
      const sequenceLength = Math.min(3 + level, 6);
      for (let i = 0; i < sequenceLength; i++) {
        const randomCommand = basicCommands[Math.floor(Math.random() * basicCommands.length)];
        codeSequence.push(randomCommand);
      }
      displaySequence = codeSequence.map(cmd => `${cmd}()`);
    } else if (level <= 6) {
      // Simple loop levels: for i in range(2): kanan()
      const loopCount = Math.min(level - 2, 3);
      const command = basicCommands[Math.floor(Math.random() * basicCommands.length)];
      
      // Generate the actual sequence
      for (let i = 0; i < loopCount; i++) {
        codeSequence.push(command);
      }
      
      // Display with loop syntax
      displaySequence = [`for i in range(${loopCount}):`];
      displaySequence.push(`  ${command}()`);
    } else if (level <= 10) {
      // Nested loops or multiple commands in loop
      const loopCount = 2;
      const commands = basicCommands.slice(0, 2); // Only use 2 commands
      
      for (let i = 0; i < loopCount; i++) {
        commands.forEach(cmd => codeSequence.push(cmd));
      }
      
      displaySequence = [`for i in range(${loopCount}):`];
      commands.forEach(cmd => displaySequence.push(`  ${cmd}()`));
    } else {
      // Advanced levels with functions and while loops
      const repeatCount = Math.min(level - 8, 4);
      const command = basicCommands[Math.floor(Math.random() * basicCommands.length)];
      
      for (let i = 0; i < repeatCount; i++) {
        codeSequence.push(command);
      }
      
      displaySequence = [`def move():`];
      displaySequence.push(`  ${command}()`);
      displaySequence.push(`for i in range(${repeatCount}):`);
      displaySequence.push(`  move()`);
    }
    
    return { codeSequence, displaySequence };
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
      gameStatus: 'playing',
      currentPosition: { x: 1, y: 1 }
    }));
  }, [gameState.level, generateLevel]);

  const handlePlayerInput = useCallback((direction: string) => {
    if (!gameState.isWaitingForInput || gameState.gameStatus !== 'playing') return;

    const directionMap: { [key: string]: string } = {
      'up': 'atas',
      'down': 'bawah',
      'left': 'kiri',
      'right': 'kanan'
    };

    const command = directionMap[direction];
    const expectedCommand = gameState.codeSequence[gameState.currentStep];

    if (command === expectedCommand) {
      // Correct input - move position with wrapping
      let newPosition = { ...gameState.currentPosition };
      
      switch (command) {
        case 'atas':
          newPosition.y = gameState.currentPosition.y - 1;
          if (newPosition.y < 0) newPosition.y = gameState.gridSize.height - 1; // Wrap to bottom
          break;
        case 'bawah':
          newPosition.y = gameState.currentPosition.y + 1;
          if (newPosition.y >= gameState.gridSize.height) newPosition.y = 0; // Wrap to top
          break;
        case 'kiri':
          newPosition.x = gameState.currentPosition.x - 1;
          if (newPosition.x < 0) newPosition.x = gameState.gridSize.width - 1; // Wrap to right
          break;
        case 'kanan':
          newPosition.x = gameState.currentPosition.x + 1;
          if (newPosition.x >= gameState.gridSize.width) newPosition.x = 0; // Wrap to left
          break;
      }
      
      const newStep = gameState.currentStep + 1;
      const newPlayerSequence = [...gameState.playerSequence, command];
      
      setGameState(prev => ({
        ...prev,
        currentStep: newStep,
        playerSequence: newPlayerSequence,
        currentPosition: newPosition
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

  const handleLevelSelect = useCallback((level: number) => {
    setGameState(prev => ({
      ...prev,
      level: level
    }));
  }, []);

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
        onLevelSelect={handleLevelSelect}
      />
    </div>
  );
}

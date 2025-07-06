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
      // Level 1-3: Basic single commands
      const sequenceLength = Math.min(1 + level, 4);
      for (let i = 0; i < sequenceLength; i++) {
        const randomCommand = basicCommands[Math.floor(Math.random() * basicCommands.length)];
        codeSequence.push(randomCommand);
      }
      displaySequence = codeSequence.map(cmd => `${cmd}()`);
    } else if (level <= 6) {
      // Level 4-6: Simple while loops
      const command1 = basicCommands[Math.floor(Math.random() * basicCommands.length)];
      const command2 = basicCommands[Math.floor(Math.random() * basicCommands.length)];
      const command3 = basicCommands[Math.floor(Math.random() * basicCommands.length)];
      
      codeSequence = [command1, command2, command3];
      displaySequence = [`${command1}()`];
      displaySequence.push(`while ●:`);
      displaySequence.push(`  ${command2}()`);
      displaySequence.push(`  ${command3}()`);
    } else if (level <= 10) {
      // Level 7-10: Nested while loops
      const command1 = basicCommands[Math.floor(Math.random() * basicCommands.length)];
      const command2 = basicCommands[Math.floor(Math.random() * basicCommands.length)];
      const command3 = basicCommands[Math.floor(Math.random() * basicCommands.length)];
      const command4 = basicCommands[Math.floor(Math.random() * basicCommands.length)];
      
      codeSequence = [command1, command2, command3, command4];
      displaySequence = [`while ●:`];
      displaySequence.push(`  ${command1}()`);
      displaySequence.push(`  ${command2}()`);
      displaySequence.push(`while ●:`);
      displaySequence.push(`  ${command3}()`);
      displaySequence.push(`  ${command4}()`);
    } else if (level <= 15) {
      // Level 11-15: For loops with high repetition
      const loopCount = Math.min(level - 8, 9); // Perbaikan perhitungan
      const command1 = basicCommands[Math.floor(Math.random() * basicCommands.length)];
      const command2 = basicCommands[Math.floor(Math.random() * basicCommands.length)];
      const command3 = basicCommands[Math.floor(Math.random() * basicCommands.length)];
      
      // Generate sequence for large loops
      for (let i = 0; i < loopCount; i++) {
        codeSequence.push(command1);
      }
      for (let i = 0; i < 3; i++) {
        codeSequence.push(command2);
      }
      codeSequence.push(command3);
      
      displaySequence = [`for i in range(${loopCount}):`];
      displaySequence.push(`  ${command1}()`); // Dengan indentasi 2 spasi
      displaySequence.push(`for i in range(3):`);
      displaySequence.push(`  ${command2}()`); // Dengan indentasi 2 spasi
      displaySequence.push(`${command3}()`);
    } else if (level <= 20) {
      // Level 16-20: Nested for loops
      const command1 = basicCommands[Math.floor(Math.random() * basicCommands.length)];
      const command2 = basicCommands[Math.floor(Math.random() * basicCommands.length)];
      const command3 = basicCommands[Math.floor(Math.random() * basicCommands.length)];
      
      // Generate nested loop sequence
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          codeSequence.push(command1);
        }
        codeSequence.push(command2);
      }
      codeSequence.push(command3);
      
      displaySequence = [`for i in range(4):`];
      displaySequence.push(`  for i in range(4):`); // 2 spasi indentasi
      displaySequence.push(`    ${command1}()`); // 4 spasi indentasi (nested)
      displaySequence.push(`  ${command2}()`); // 2 spasi indentasi
      displaySequence.push(`${command3}()`); // Tanpa indentasi
    } else if (level <= 25) {
      // Level 21-25: If statements with conditions
      const command1 = basicCommands[Math.floor(Math.random() * basicCommands.length)];
      const command2 = basicCommands[Math.floor(Math.random() * basicCommands.length)];
      const command3 = basicCommands[Math.floor(Math.random() * basicCommands.length)];
      
      codeSequence = [command1, command2, command3];
      displaySequence = [`${command1}()`]; // Tanpa indentasi
      displaySequence.push(`if ●:`); // Tanpa indentasi
      displaySequence.push(`  ${command2}()`); // 2 spasi indentasi
      displaySequence.push(`  ${command3}()`); // 2 spasi indentasi
    } else {
      // Level 26+: Complex if statements with multiple conditions
      const command1 = basicCommands[Math.floor(Math.random() * basicCommands.length)];
      const command2 = basicCommands[Math.floor(Math.random() * basicCommands.length)];
      const command3 = basicCommands[Math.floor(Math.random() * basicCommands.length)];
      const command4 = basicCommands[Math.floor(Math.random() * basicCommands.length)];
      
      codeSequence = [command1, command2, command3, command4];
      displaySequence = [`${command1}()`]; // Tanpa indentasi
      displaySequence.push(`if ●:`); // Tanpa indentasi
      displaySequence.push(`  ${command2}()`); // 2 spasi indentasi
      displaySequence.push(`${command3}()`); // Tanpa indentasi
      displaySequence.push(`if ●:`); // Tanpa indentasi
      displaySequence.push(`  ${command4}()`); // 2 spasi indentasi
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

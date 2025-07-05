interface LevelSelectorProps {
  currentLevel: number;
  onLevelSelect: (level: number) => void;
  onClose: () => void;
}

export function LevelSelector({ currentLevel, onLevelSelect, onClose }: LevelSelectorProps) {
  const levels = Array.from({ length: 20 }, (_, i) => i + 1);
  
  const handleLevelClick = (level: number) => {
    onLevelSelect(level);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Pilih Level</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="grid grid-cols-5 gap-3">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => handleLevelClick(level)}
              className={`
                w-12 h-12 rounded-lg font-bold text-lg transition-all duration-200
                ${level === currentLevel 
                  ? 'bg-teal-primary text-white' 
                  : level <= currentLevel 
                    ? 'bg-green-400 text-white hover:bg-green-500' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }
                ${level <= currentLevel ? 'hover:scale-105' : ''}
              `}
              disabled={level > currentLevel}
            >
              {level}
            </button>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Level saat ini: {currentLevel}
          </p>
        </div>
      </div>
    </div>
  );
}
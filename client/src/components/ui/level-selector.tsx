interface LevelSelectorProps {
  currentLevel: number;
  onLevelSelect: (level: number) => void;
  onClose: () => void;
}

export function LevelSelector({ currentLevel, onLevelSelect, onClose }: LevelSelectorProps) {
  const levels = Array.from({ length: 60 }, (_, i) => i + 1);
  
  const handleLevelClick = (level: number) => {
    onLevelSelect(level);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Pilih Level</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl"
          >
            ×
          </button>
        </div>
        
        <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-2 sm:gap-3">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => handleLevelClick(level)}
              className={`
                w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg font-bold text-xs sm:text-sm transition-all duration-200
                ${level === currentLevel 
                  ? 'bg-teal-primary text-white' 
                  : 'bg-blue-400 text-white hover:bg-blue-500'
                }
                hover:scale-105
              `}
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
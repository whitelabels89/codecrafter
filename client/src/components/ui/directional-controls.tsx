import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

interface DirectionalControlsProps {
  onInput: (direction: string) => void;
  disabled?: boolean;
}

export function DirectionalControls({ onInput, disabled }: DirectionalControlsProps) {
  const handleClick = (direction: string) => {
    if (disabled) return;
    onInput(direction);
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-3 grid-rows-3 gap-2 w-48 h-48">
        {/* Empty cell */}
        <div></div>
        
        {/* Up button */}
        <button 
          onClick={() => handleClick('up')}
          disabled={disabled}
          className="control-btn bg-control-gray hover:bg-control-gray-hover rounded-lg flex items-center justify-center w-14 h-14 shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          <ChevronUp className="w-8 h-8 text-white" />
        </button>
        
        {/* Empty cell */}
        <div></div>
        
        {/* Left button */}
        <button 
          onClick={() => handleClick('left')}
          disabled={disabled}
          className="control-btn bg-control-gray hover:bg-control-gray-hover rounded-lg flex items-center justify-center w-14 h-14 shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
        
        {/* Center empty cell */}
        <div className="w-14 h-14"></div>
        
        {/* Right button */}
        <button 
          onClick={() => handleClick('right')}
          disabled={disabled}
          className="control-btn bg-control-gray hover:bg-control-gray-hover rounded-lg flex items-center justify-center w-14 h-14 shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
        
        {/* Empty cell */}
        <div></div>
        
        {/* Down button */}
        <button 
          onClick={() => handleClick('down')}
          disabled={disabled}
          className="control-btn bg-control-gray hover:bg-control-gray-hover rounded-lg flex items-center justify-center w-14 h-14 shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          <ChevronDown className="w-8 h-8 text-white" />
        </button>
        
        {/* Empty cell */}
        <div></div>
      </div>
    </div>
  );
}

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
      <div className="grid grid-cols-3 grid-rows-2 gap-1 w-32 h-20">
        {/* Empty cell */}
        <div></div>
        
        {/* Up button */}
        <button 
          onClick={() => handleClick('up')}
          disabled={disabled}
          className="control-btn bg-control-gray hover:bg-control-gray-hover rounded-lg flex items-center justify-center w-9 h-9 shadow-md transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          <ChevronUp className="w-4 h-4 text-white" />
        </button>
        
        {/* Empty cell */}
        <div></div>
        
        {/* Left button */}
        <button 
          onClick={() => handleClick('left')}
          disabled={disabled}
          className="control-btn bg-control-gray hover:bg-control-gray-hover rounded-lg flex items-center justify-center w-9 h-9 shadow-md transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4 text-white" />
        </button>
        
        {/* Down button */}
        <button 
          onClick={() => handleClick('down')}
          disabled={disabled}
          className="control-btn bg-control-gray hover:bg-control-gray-hover rounded-lg flex items-center justify-center w-9 h-9 shadow-md transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          <ChevronDown className="w-4 h-4 text-white" />
        </button>
        
        {/* Right button */}
        <button 
          onClick={() => handleClick('right')}
          disabled={disabled}
          className="control-btn bg-control-gray hover:bg-control-gray-hover rounded-lg flex items-center justify-center w-9 h-9 shadow-md transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}

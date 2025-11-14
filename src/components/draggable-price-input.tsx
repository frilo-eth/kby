import React, { useState, useRef, useEffect } from 'react';

export default function DraggablePriceInput() {
  const [value, setValue] = useState(2628.08);
  const [inputValue, setInputValue] = useState('2628.08');
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragStartX = useRef(0);
  const dragStartValue = useRef(0);

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const increment = () => {
    const newValue = value + 1;
    setValue(newValue);
    setInputValue(formatNumber(newValue));
  };

  const decrement = () => {
    const newValue = Math.max(0, value - 1);
    setValue(newValue);
    setInputValue(formatNumber(newValue));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/,/g, '');
    setInputValue(e.target.value);
    
    const num = parseFloat(input);
    if (!isNaN(num) && num >= 0) {
      setValue(num);
    }
  };

  const handleInputBlur = () => {
    const num = parseFloat(inputValue.replace(/,/g, ''));
    if (!isNaN(num) && num >= 0) {
      setValue(num);
      setInputValue(formatNumber(num));
    } else {
      setInputValue(formatNumber(value));
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === inputRef.current) return;
    e.preventDefault();
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartValue.current = value;
    document.body.style.cursor = 'ew-resize';
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const deltaX = e.clientX - dragStartX.current;
      const sensitivity = 0.5;
      const newValue = Math.max(0, dragStartValue.current + (deltaX * sensitivity));
      
      setValue(newValue);
      setInputValue(formatNumber(newValue));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = 'default';
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="flex items-center justify-center p-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6 w-80">
        <label className="block text-gray-500 text-sm mb-3">Min</label>
        
        <div 
          className={`flex items-center gap-4 ${isDragging ? 'cursor-ew-resize' : 'cursor-grab active:cursor-grabbing'}`}
          onMouseDown={handleMouseDown}
        >
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className="w-full text-4xl font-normal text-gray-800 bg-transparent border-none focus:outline-none p-0"
              style={{ userSelect: isDragging ? 'none' : 'text' }}
            />

          </div>

          <button
            onClick={increment}
            className="text-gray-600 hover:text-gray-800 text-2xl font-light w-8 h-8 flex items-center justify-center"
          >
            +
          </button>

          <button
            onClick={decrement}
            className="text-gray-600 hover:text-gray-800 text-2xl font-light w-8 h-8 flex items-center justify-center"
          >
            −
          </button>
        </div>

        <div className="mt-2 text-gray-500 text-base">
          ${formatNumber(value)}
        </div>
      </div>
    </div>
  );
}


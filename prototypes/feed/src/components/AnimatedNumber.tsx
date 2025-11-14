import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface AnimatedNumberProps {
  value: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export function AnimatedNumber({ value, className = '', style = {} }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(String(value));
  const prevValue = useRef(String(value));

  useEffect(() => {
    const newValue = String(value);
    if (newValue !== prevValue.current) {
      prevValue.current = newValue;
      setDisplayValue(newValue);
    }
  }, [value]);

  const chars = displayValue.split('');

  return (
    <span className={`inline-flex ${className}`} style={style}>
      {chars.map((char, index) => (
        <AnimatedChar 
          key={`pos-${index}-${displayValue}`} 
          char={char} 
          index={index}
          uniqueId={`${displayValue}-${index}`}
        />
      ))}
    </span>
  );
}

function AnimatedChar({ char, index, uniqueId }: { char: string; index: number; uniqueId: string }) {
  // Characters that don't animate (symbols, letters)
  const isNumber = /[0-9]/.test(char);
  
  if (!isNumber) {
    return (
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className="inline-block"
      >
        {char}
      </motion.span>
    );
  }

  // Rollodex animation for numbers
  return (
    <span className="inline-block relative" style={{ width: '0.6em', height: '1.2em', overflow: 'hidden' }}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={uniqueId}
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
            delay: index * 0.02,
          }}
          className="inline-block absolute top-0 left-0 right-0 text-center"
        >
          {char}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default AnimatedNumber;

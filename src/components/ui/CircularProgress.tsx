// ui/CircularProgress.tsx
import React, { useEffect, useState } from 'react';

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showPercentage?: boolean;
  isVisible?: boolean;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ 
  percentage, 
  size = 60, 
  strokeWidth = 3, 
  className = '',
  showPercentage = true,
  isVisible = false
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimatedPercentage(percentage);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedPercentage(0);
    }
  }, [percentage, isVisible]);

  return (
    <div 
      className={`relative inline-flex items-center justify-center transition-all duration-300 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        className="transform -rotate-90 transition-opacity duration-300"
        width={size}
        height={size}
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(0, 0, 0, 0.1)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="black"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      
      {showPercentage && (
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          <span className="text-black font-bold font-bebas text-sm">
            {Math.round(animatedPercentage)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default CircularProgress;

import React, { useState } from 'react';
import { usePalette } from '../../../hooks/usePalette';
import { ColorWithId } from '../../../types/color';
import './Swatch.css';

interface SwatchProps {
  color: ColorWithId;
  size: 'small' | 'medium' | 'large';
}

const Swatch: React.FC<SwatchProps> = ({ color, size }) => {
  const { lockColor } = usePalette();
  const [copied, setCopied] = useState(false);

  // Calculate whether text should be light or dark based on the color's lightness
  const isDark = color.hsl[2] < 50;
  const textColor = isDark ? 'white' : 'black';
  
  // Calculate pill background and text colors for better readability
  const pillBgColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';
  // Set pill text color based on the pill background color - not the swatch color
  const pillTextColor = isDark ? 'white' : 'black';
  
  // For dark pill backgrounds, always use white text
  const isPillBgDark = !isDark; // If swatch is light, pill bg will be dark
  const finalPillTextColor = isPillBgDark ? 'white' : 'black';

  // Handle copying hex value to clipboard
  const handleCopyHex = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(color.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Handle toggling lock state
  const handleToggleLock = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    lockColor(color.id, !color.locked);
  };

  return (
    <div 
      className={`color-swatch ${size} ${color.locked ? 'locked' : ''}`} 
      style={{ 
        backgroundColor: color.hex,
        borderRadius: 0 // Explicitly set inline style as well
      }}
    >
      <div className="swatch-toolbar">
        <button 
          className="lock-button"
          onMouseDown={handleToggleLock} 
          aria-label={color.locked ? "Unlock color" : "Lock color"}
          title={color.locked ? "Unlock color" : "Lock color"}
        >
          {color.locked ? '🔒' : '🔓'}
        </button>
      </div>

      <div className="swatch-details">
        <span 
          className="color-pill hex-value" 
          style={{ backgroundColor: pillBgColor, color: finalPillTextColor }}
          onClick={handleCopyHex}
          title="Click to copy"
        >
          {copied ? "Copied!" : color.hex}
        </span>
        
        <span 
          className="color-pill rgb-values"
          style={{ backgroundColor: pillBgColor, color: finalPillTextColor }}
        >
          RGB: {color.rgb[0]}, {color.rgb[1]}, {color.rgb[2]}
        </span>
        
        <span 
          className="color-pill hsl-values"
          style={{ backgroundColor: pillBgColor, color: finalPillTextColor }}
        >
          HSL: {Math.round(color.hsl[0])}°, {Math.round(color.hsl[1])}%, {Math.round(color.hsl[2])}%
        </span>
      </div>
    </div>
  );
};

export default Swatch;

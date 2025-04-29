import React, { useState, useEffect } from 'react';
import { usePalette } from '../../../hooks/usePalette';
import { HarmonyType } from '../../../types/color';
import './SeedPicker.css';

interface SeedPickerProps {
  onClose: () => void;
}

const SeedPicker: React.FC<SeedPickerProps> = ({ onClose }) => {
  const { generatePalette, currentPalette } = usePalette();
  const [hexValue, setHexValue] = useState('#1a73e8'); // Default Google blue
  const [hue, setHue] = useState(210); // Default hue in degrees
  const [saturation, setSaturation] = useState(80); // Default saturation percent
  const [lightness, setLightness] = useState(50); // Default lightness percent
  const [harmonyType, setHarmonyType] = useState<HarmonyType>('analogous');
  
  // Convert hex to HSL on initialization
  useEffect(() => {
    try {
      // Parse hex to get RGB
      const hexColor = hexValue.replace('#', '');
      const r = parseInt(hexColor.substr(0, 2), 16) / 255;
      const g = parseInt(hexColor.substr(2, 2), 16) / 255;
      const b = parseInt(hexColor.substr(4, 2), 16) / 255;
      
      // Convert RGB to HSL (simplified for this example)
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const d = max - min;
      
      // Calculate Hue
      let h = 0;
      if (d === 0) h = 0;
      else if (max === r) h = ((g - b) / d) % 6;
      else if (max === g) h = (b - r) / d + 2;
      else if (max === b) h = (r - g) / d + 4;
      h = Math.round(h * 60);
      if (h < 0) h += 360;
      
      // Calculate Lightness
      const l = (max + min) / 2;
      
      // Calculate Saturation
      const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
      
      setHue(h);
      setSaturation(Math.round(s * 100));
      setLightness(Math.round(l * 100));
    } catch (error) {
      console.error("Error parsing hex color", error);
    }
  }, []);
  
  // Update hex when HSL changes
  useEffect(() => {
    // Function to convert HSL to Hex
    const hslToHex = (h: number, s: number, l: number): string => {
      s /= 100;
      l /= 100;
      
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs((h / 60) % 2 - 1));
      const m = l - c / 2;
      
      let r = 0, g = 0, b = 0;
      
      if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
      } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
      } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
      } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
      } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
      } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
      }
      
      // Convert to hex
      const toHex = (value: number): string => {
        const hex = Math.round((value + m) * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };
      
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };
    
    setHexValue(hslToHex(hue, saturation, lightness));
  }, [hue, saturation, lightness]);
  
  // Handle hex input change
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Only update if it's a valid hex
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      setHexValue(value);
      
      // Update HSL values (this would trigger the useEffect above)
      try {
        // Parse hex to get RGB
        const hexColor = value.replace('#', '');
        const r = parseInt(hexColor.substr(0, 2), 16) / 255;
        const g = parseInt(hexColor.substr(2, 2), 16) / 255;
        const b = parseInt(hexColor.substr(4, 2), 16) / 255;
        
        // Convert RGB to HSL
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const d = max - min;
        
        // Calculate Hue
        let h = 0;
        if (d === 0) h = 0;
        else if (max === r) h = ((g - b) / d) % 6;
        else if (max === g) h = (b - r) / d + 2;
        else if (max === b) h = (r - g) / d + 4;
        h = Math.round(h * 60);
        if (h < 0) h += 360;
        
        // Calculate Lightness
        const l = (max + min) / 2;
        
        // Calculate Saturation
        const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
        
        setHue(h);
        setSaturation(Math.round(s * 100));
        setLightness(Math.round(l * 100));
      } catch (error) {
        console.error("Error parsing hex color", error);
      }
    } else {
      // Update the input anyway to give feedback
      setHexValue(value);
    }
  };
  
  // Handle HSL sliders
  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHue(parseInt(e.target.value));
  };
  
  const handleSaturationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaturation(parseInt(e.target.value));
  };
  
  const handleLightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLightness(parseInt(e.target.value));
  };
  
  // Handle harmony type selection
  const handleHarmonyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHarmonyType(e.target.value as HarmonyType);
  };
  
  // Handle generate button click
  const handleGenerate = () => {
    generatePalette({
      seedColor: [hue, saturation, lightness],
      harmonyType: harmonyType,
      preserveLocked: true,
      mode: 'light'
    });
    
    onClose(); // Close the drawer after generating
  };
  
  return (
    <div className="seed-picker">
      <div 
        className="color-preview" 
        style={{ backgroundColor: hexValue }}
      >
        <div className="hex-input-container">
          <input
            type="text"
            className="hex-input"
            value={hexValue}
            onChange={handleHexChange}
            maxLength={7}
          />
        </div>
      </div>
      
      <div className="hsl-sliders">
        <div className="slider-group">
          <label>
            Hue: {hue}°
            <input
              type="range"
              className="hue-slider"
              min="0"
              max="360"
              value={hue}
              onChange={handleHueChange}
            />
          </label>
        </div>
        
        <div className="slider-group">
          <label>
            Saturation: {saturation}%
            <input
              type="range"
              className="saturation-slider"
              min="0"
              max="100"
              value={saturation}
              onChange={handleSaturationChange}
              style={{
                background: `linear-gradient(to right, 
                  hsl(${hue}, 0%, ${lightness}%), 
                  hsl(${hue}, 100%, ${lightness}%))`
              }}
            />
          </label>
        </div>
        
        <div className="slider-group">
          <label>
            Lightness: {lightness}%
            <input
              type="range"
              className="lightness-slider"
              min="0"
              max="100"
              value={lightness}
              onChange={handleLightnessChange}
              style={{
                background: `linear-gradient(to right, 
                  hsl(${hue}, ${saturation}%, 0%), 
                  hsl(${hue}, ${saturation}%, 50%), 
                  hsl(${hue}, ${saturation}%, 100%))`
              }}
            />
          </label>
        </div>
      </div>
      
      <div className="harmony-selection">
        <label htmlFor="harmony-select">Harmony Type:</label>
        <select 
          id="harmony-select"
          value={harmonyType}
          onChange={handleHarmonyChange}
        >
          <option value="analogous">Analogous</option>
          <option value="complementary">Complementary</option>
          <option value="triadic">Triadic</option>
          <option value="tetradic">Tetradic</option>
          <option value="splitComplementary">Split Complementary</option>
          <option value="monochromatic">Monochromatic</option>
        </select>
      </div>
      
      <button 
        className="generate-button"
        onClick={handleGenerate}
      >
        Generate Palette
      </button>
    </div>
  );
};

export default SeedPicker;

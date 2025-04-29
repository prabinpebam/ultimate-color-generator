import React, { useState, useContext } from 'react';
import { usePalette } from '../../hooks/usePalette';
import { SettingsContext } from '../../context/SettingsContext';
import { HarmonyType } from '../../types/color';
import './QuickBar.css';

interface QuickBarProps {
  onOpenInputDrawer?: () => void;
}

const QuickBar: React.FC<QuickBarProps> = ({ onOpenInputDrawer }) => {
  const { generatePalette, regeneratePalette } = usePalette();
  const { settings, updateSettings } = useContext(SettingsContext);
  
  const [harmonyType, setHarmonyType] = useState<HarmonyType>('analogous');
  const [paletteSize, setPaletteSize] = useState(settings.paletteSize);
  
  const handleGenerate = () => {
    generatePalette({
      paletteSize,
      harmonyType,
      preserveLocked: true,
      mode: settings.mode
    });
  };
  
  const handleRegenerateClick = () => {
    regeneratePalette({
      harmonyType,
      preserveLocked: true
    });
  };
  
  const handleHarmonyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHarmonyType(e.target.value as HarmonyType);
  };
  
  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value);
    setPaletteSize(newSize);
    updateSettings({ paletteSize: newSize });
  };
  
  return (
    <div className="quick-bar">
      <button 
        className="generate-button" 
        onClick={handleGenerate}
      >
        Generate New
      </button>
      
      <button 
        className="regenerate-button" 
        onClick={handleRegenerateClick}
      >
        Regenerate
      </button>
      
      <div className="quick-controls">
        <div className="control-group">
          <label htmlFor="harmony-select">Harmony:</label>
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
        
        <div className="control-group">
          <label htmlFor="size-select">Colors:</label>
          <select
            id="size-select"
            value={paletteSize}
            onChange={handleSizeChange}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="7">7</option>
          </select>
        </div>
      </div>
      
      {onOpenInputDrawer && (
        <button 
          className="advanced-options-button"
          onClick={onOpenInputDrawer}
        >
          Advanced Options
        </button>
      )}
    </div>
  );
};

export default QuickBar;

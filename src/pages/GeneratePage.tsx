import React, { useState, useEffect } from 'react';
import { usePalette } from '../hooks/usePalette';
import SwatchGrid from '../components/generate/PaletteBoard/SwatchGrid';
import InputDrawer from '../components/generate/InputDrawer/InputDrawer';
import { HarmonyType } from '../types/color';
import './GeneratePage.css';

const GeneratePage: React.FC = () => {
  const { generatePalette, currentPalette } = usePalette();
  
  // Add state for palette size and harmony type
  const [paletteSize, setPaletteSize] = useState(5);
  const [harmonyType, setHarmonyType] = useState<HarmonyType>('analogous');
  
  // Remove isInputDrawerOpen state as drawer will always be visible
  
  // Generate a palette if none exists
  useEffect(() => {
    if (currentPalette.colors.length === 0) {
      generatePalette({
        paletteSize,
        harmonyType,
        preserveLocked: true,
        mode: 'light'
      });
    }
  }, [currentPalette.colors.length, generatePalette, paletteSize, harmonyType]);

  // Handle generating a new palette
  const handleGeneratePalette = () => {
    generatePalette({
      paletteSize,
      harmonyType,
      preserveLocked: true,
      mode: 'light'
    });
  };

  return (
    <div className="generate-page">
      <div className="main-content-area">
        <div className="left-panel">
          <h1>Ultimate Color Generator</h1>
          
          <div className="controls-container">
            <div className="controls-group">
              <label htmlFor="palette-size">Number of Colors:</label>
              <select 
                id="palette-size" 
                value={paletteSize} 
                onChange={(e) => setPaletteSize(Number(e.target.value))}
                className="control-select"
              >
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="7">7</option>
                <option value="9">9</option>
              </select>
            </div>
            
            <div className="controls-group">
              <label htmlFor="harmony-type">Harmony:</label>
              <select 
                id="harmony-type" 
                value={harmonyType} 
                onChange={(e) => setHarmonyType(e.target.value as HarmonyType)}
                className="control-select"
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
              onClick={handleGeneratePalette}
            >
              Generate New Palette
            </button>
            
            {/* Advanced Options button removed */}
          </div>
          
          <div className="palette-container">
            <SwatchGrid />
          </div>
        </div>
        
        <div className="right-panel">
          {/* InputDrawer always visible */}
          <InputDrawer isOpen={true} onClose={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default GeneratePage;

import React from 'react';
import { ColorWithId } from '../../types/color';
import { simulateColorBlindness } from '../../algorithms/accessibility/colorBlind';
import './ColorBlindSimulator.css';

interface ColorBlindSimulatorProps {
  palette: ColorWithId[];
}

const ColorBlindSimulator: React.FC<ColorBlindSimulatorProps> = ({ palette }) => {
  const types = ['protanopia', 'deuteranopia', 'tritanopia'];
  
  return (
    <div className="color-blind-simulator">
      <h3>Color Blindness Simulation</h3>
      
      <div className="simulation-container">
        {types.map(type => (
          <div key={type} className="simulation-row">
            <h4>{type.charAt(0).toUpperCase() + type.slice(1)}</h4>
            <div className="color-row">
              {palette.map(color => {
                // Placeholder for simulation
                return (
                  <div 
                    key={`${type}-${color.id}`}
                    className="simulated-color"
                    style={{ backgroundColor: color.hex }}
                    title={`${type} simulation of ${color.hex}`}
                  ></div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorBlindSimulator;

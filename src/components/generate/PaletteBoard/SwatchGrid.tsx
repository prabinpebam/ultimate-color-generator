import React from 'react';
import { usePalette } from '../../../hooks/usePalette';
import Swatch from './Swatch';
import './SwatchGrid.css';

const SwatchGrid: React.FC = () => {
  const { currentPalette } = usePalette();
  const colors = currentPalette.colors;

  // Show empty state if no colors
  if (colors.length === 0) {
    return (
      <div className="empty-state">
        <p>No palette generated yet</p>
        <p>Use the controls above to generate a palette</p>
      </div>
    );
  }

  // Determine grid class based on number of colors
  let gridClassName = "swatch-grid";
  if (colors.length === 1) {
    gridClassName += " one-color";
  } else if (colors.length === 2) {
    gridClassName += " two-colors";
  } else if (colors.length >= 3) {
    gridClassName += " has-proportion"; // Apply 60-30-10 proportions
  }

  return (
    <div className={gridClassName}>
      {colors.map((color, index) => (
        <Swatch
          key={color.id}
          color={color}
          size={index === 0 ? 'large' : index === 1 ? 'medium' : 'small'}
        />
      ))}
    </div>
  );
};

export default SwatchGrid;

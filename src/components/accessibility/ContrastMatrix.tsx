import React from 'react';
import { ColorWithId } from '../../types/color';
import { calculateContrastRatio } from '../../algorithms/accessibility/contrast';
import './ContrastMatrix.css';

interface ContrastMatrixProps {
  palette: ColorWithId[];
  wcagLevel: 'AA' | 'AAA';
}

const ContrastMatrix: React.FC<ContrastMatrixProps> = ({ palette, wcagLevel }) => {
  // Simple placeholder implementation
  return (
    <div className="contrast-matrix">
      <h3>Contrast Matrix</h3>
      <div className="matrix-container">
        <table>
          <thead>
            <tr>
              <th>Color</th>
              {palette.map(color => (
                <th key={color.id}>
                  <div className="color-sample" style={{ backgroundColor: color.hex }}></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {palette.map(bgColor => (
              <tr key={bgColor.id}>
                <td>
                  <div className="color-sample" style={{ backgroundColor: bgColor.hex }}></div>
                </td>
                {palette.map(textColor => {
                  const ratio = calculateContrastRatio(bgColor.rgb, textColor.rgb);
                  const minRequired = wcagLevel === 'AA' ? 4.5 : 7;
                  const passes = ratio >= minRequired;
                  
                  return (
                    <td key={`${bgColor.id}-${textColor.id}`} className={passes ? 'pass' : 'fail'}>
                      {ratio.toFixed(2)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContrastMatrix;

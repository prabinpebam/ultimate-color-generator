import React, { useState } from 'react';
import { usePalette } from '../../hooks/usePalette';
import './ExportDrawer.css';

interface ExportDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExportDrawer: React.FC<ExportDrawerProps> = ({ isOpen, onClose }) => {
  const { currentPalette, roleAssignments } = usePalette();
  const [selectedFormats, setSelectedFormats] = useState<string[]>(['css']);
  
  const toggleFormat = (format: string) => {
    if (selectedFormats.includes(format)) {
      setSelectedFormats(selectedFormats.filter(f => f !== format));
    } else {
      setSelectedFormats([...selectedFormats, format]);
    }
  };
  
  const handleExport = () => {
    // Placeholder for export functionality
    console.log('Exporting palette in formats:', selectedFormats);
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="export-drawer">
      <div className="drawer-header">
        <h2>Export Palette</h2>
        <button className="close-button" onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>
      
      <div className="export-options">
        <h3>Select Formats</h3>
        
        <div className="format-checkboxes">
          <label className="format-option">
            <input 
              type="checkbox"
              checked={selectedFormats.includes('css')}
              onChange={() => toggleFormat('css')}
            />
            CSS Variables
          </label>
          
          <label className="format-option">
            <input 
              type="checkbox"
              checked={selectedFormats.includes('scss')}
              onChange={() => toggleFormat('scss')}
            />
            SCSS Variables
          </label>
          
          <label className="format-option">
            <input 
              type="checkbox"
              checked={selectedFormats.includes('json')}
              onChange={() => toggleFormat('json')}
            />
            JSON
          </label>
        </div>
      </div>
      
      <div className="export-actions">
        <button className="export-button" onClick={handleExport}>
          Export Selected Formats
        </button>
      </div>
    </div>
  );
};

export default ExportDrawer;

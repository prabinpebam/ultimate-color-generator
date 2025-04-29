import React, { useState } from 'react';
import SeedPicker from './SeedPicker';
import SemanticInput from './SemanticInput';
import ImageUpload from './ImageUpload';
import './InputDrawer.css';

type TabType = 'seed' | 'semantic' | 'image';

interface InputDrawerProps {
  isOpen: boolean;
  onClose: () => void; // We'll keep this prop for API consistency but won't use it
}

const InputDrawer: React.FC<InputDrawerProps> = ({ isOpen }) => {
  const [activeTab, setActiveTab] = useState<TabType>('seed');

  return (
    <div className={`input-panel ${isOpen ? 'visible' : ''}`}>
      <div className="panel-header">
        <h2>Advanced Options</h2>
      </div>
      
      <div className="panel-tabs">
        <button 
          className={`tab-button ${activeTab === 'seed' ? 'active' : ''}`}
          onClick={() => setActiveTab('seed')}
        >
          Seed Color
        </button>
        <button 
          className={`tab-button ${activeTab === 'semantic' ? 'active' : ''}`}
          onClick={() => setActiveTab('semantic')}
        >
          Semantic Input
        </button>
        <button 
          className={`tab-button ${activeTab === 'image' ? 'active' : ''}`}
          onClick={() => setActiveTab('image')}
        >
          Image Upload
        </button>
      </div>
      
      <div className="panel-content">
        {activeTab === 'seed' && <SeedPicker onClose={() => {}} />}
        {activeTab === 'semantic' && <SemanticInput onClose={() => {}} />}
        {activeTab === 'image' && <ImageUpload onClose={() => {}} />}
      </div>
    </div>
  );
};

export default InputDrawer;

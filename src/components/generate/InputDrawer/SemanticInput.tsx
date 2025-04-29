import { useState } from 'react'
import { usePalette } from '../../../hooks/usePalette'
import { SEMANTIC_MAPPINGS } from '../../../algorithms/generation/semantic'
import './SemanticInput.css'

interface SemanticInputProps {
  onClose: () => void;
}

const SemanticInput: React.FC<SemanticInputProps> = ({ onClose }) => {
  const { generatePalette } = usePalette()
  const [selectedTerms, setSelectedTerms] = useState<string[]>([])

  // Get available semantic terms from the mappings
  const availableTerms = Object.keys(SEMANTIC_MAPPINGS).sort()

  // Group terms by category for better organization
  const termCategories = {
    'Mood/Tone': ['calm', 'energetic', 'professional', 'vibrant', 'muted'],
    'Style': ['vintage', 'minimalist', 'earthy', 'sophisticated'],
    'Feel': ['warm', 'cool', 'dark', 'light']
  }

  const handleTermClick = (term: string) => {
    if (selectedTerms.includes(term)) {
      // Remove term if already selected
      setSelectedTerms(selectedTerms.filter(t => t !== term))
    } else {
      // Add term if not already selected (limit to 3 terms)
      if (selectedTerms.length < 3) {
        setSelectedTerms([...selectedTerms, term])
      }
    }
  }

  const handleClearClick = () => {
    setSelectedTerms([])
  }

  const handleGenerateClick = () => {
    generatePalette({
      semanticTerms: selectedTerms,
      preserveLocked: true
    })
  }

  const renderTerms = (category: string, terms: string[]) => {
    return (
      <div className="term-category" key={category}>
        <h3>{category}</h3>
        <div className="term-chips">
          {terms
            .filter(term => SEMANTIC_MAPPINGS[term]) // Only show terms that have mappings
            .sort()
            .map(term => (
              <button
                key={term}
                className={`term-chip ${selectedTerms.includes(term) ? 'selected' : ''}`}
                onClick={() => handleTermClick(term)}
              >
                {term}
              </button>
            ))}
        </div>
      </div>
    )
  }

  return (
    <div className="semantic-input">
      <div className="selected-terms">
        <h3>Selected Terms ({selectedTerms.length}/3)</h3>
        <div className="selected-chips">
          {selectedTerms.length > 0 ? (
            selectedTerms.map(term => (
              <span key={term} className="selected-chip">
                {term}
                <button 
                  className="remove-term" 
                  onClick={() => handleTermClick(term)}
                  aria-label={`Remove ${term}`}
                >
                  ×
                </button>
              </span>
            ))
          ) : (
            <p className="no-selections">Select up to 3 terms below</p>
          )}
        </div>
        {selectedTerms.length > 0 && (
          <button className="clear-button" onClick={handleClearClick}>
            Clear All
          </button>
        )}
      </div>

      <div className="term-categories">
        {Object.entries(termCategories).map(([category, terms]) => 
          renderTerms(category, terms)
        )}
      </div>

      <button
        className="generate-button"
        onClick={handleGenerateClick}
        disabled={selectedTerms.length === 0}
      >
        Generate from Terms
      </button>
      <button 
        className="generate-button"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  )
}

export default SemanticInput

import { useState, useEffect } from 'react'
import { usePalette } from '../../../hooks/usePalette'
import { rgbToHex } from '../../../algorithms/colorModels/rgb'
import { hexToRgb } from '../../../algorithms/colorModels/rgb'
import { rgbToHSL, hslToRGB } from '../../../algorithms/colorModels/conversions'
import './SeedPicker.css'

const SeedPicker = () => {
  const { currentPalette, generatePalette } = usePalette()
  const [hexValue, setHexValue] = useState('#6200EE')
  const [hue, setHue] = useState(271)
  const [saturation, setSaturation] = useState(100)
  const [lightness, setLightness] = useState(47)
  
  // Update HSL when hex changes
  useEffect(() => {
    try {
      const rgb = hexToRgb(hexValue)
      const [h, s, l] = rgbToHSL(rgb)
      setHue(Math.round(h))
      setSaturation(Math.round(s))
      setLightness(Math.round(l))
    } catch (error) {
      // Handle invalid hex
      console.error('Invalid hex value', error)
    }
  }, [hexValue])
  
  // Update hex when HSL changes
  useEffect(() => {
    const rgb = hslToRGB([hue, saturation, lightness])
    setHexValue(rgbToHex(rgb))
  }, [hue, saturation, lightness])
  
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Allow incomplete hex values during typing
    if (/^#?([0-9A-Fa-f]{0,6})$/.test(value)) {
      // Ensure the value starts with #
      const formattedValue = value.startsWith('#') ? value : `#${value}`
      setHexValue(formattedValue)
    }
  }
  
  const handleHexBlur = () => {
    // Ensure valid hex on blur
    try {
      hexToRgb(hexValue)
    } catch {
      // Reset to a valid hex if invalid
      setHexValue('#6200EE')
    }
  }
  
  const handleGenerateClick = () => {
    generatePalette({
      seedColor: [hue, saturation, lightness],
      preserveLocked: true
    })
  }

  return (
    <div className="seed-picker">
      <div className="color-preview" style={{ backgroundColor: hexValue }}>
        <div className="hex-input-container">
          <input
            type="text"
            value={hexValue}
            onChange={handleHexChange}
            onBlur={handleHexBlur}
            className="hex-input"
            maxLength={7}
          />
        </div>
      </div>
      
      <div className="hsl-sliders">
        <div className="slider-group">
          <label htmlFor="hue-slider">Hue: {hue}°</label>
          <input
            id="hue-slider"
            type="range"
            min="0"
            max="360"
            value={hue}
            onChange={(e) => setHue(parseInt(e.target.value))}
            className="hue-slider"
          />
        </div>
        
        <div className="slider-group">
          <label htmlFor="saturation-slider">Saturation: {saturation}%</label>
          <input
            id="saturation-slider"
            type="range"
            min="0"
            max="100"
            value={saturation}
            onChange={(e) => setSaturation(parseInt(e.target.value))}
            className="saturation-slider"
          />
        </div>
        
        <div className="slider-group">
          <label htmlFor="lightness-slider">Lightness: {lightness}%</label>
          <input
            id="lightness-slider"
            type="range"
            min="0"
            max="100"
            value={lightness}
            onChange={(e) => setLightness(parseInt(e.target.value))}
            className="lightness-slider"
          />
        </div>
      </div>
      
      <button 
        className="generate-button"
        onClick={handleGenerateClick}
      >
        Generate from This Color
      </button>
    </div>
  )
}

export default SeedPicker

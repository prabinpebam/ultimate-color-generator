import { useContext } from 'react'
import { PaletteContext } from '../context/PaletteContext'
import { HistoryContext } from '../context/HistoryContext'
import { SettingsContext } from '../context/SettingsContext'
import { PaletteGenerationOptions, PaletteAdjustmentOptions } from '../types/palette'
import { ColorWithId, HSLColor } from '../types/color'
import { hslToRGB, rgbToHSL } from '../algorithms/colorModels/conversions'
import { rgbToHex } from '../algorithms/colorModels/rgb'
import { rgbToLAB } from '../algorithms/colorModels/conversions'

export function usePalette() {
  const paletteContext = useContext(PaletteContext)
  const historyContext = useContext(HistoryContext)
  const { settings } = useContext(SettingsContext)
  
  const generatePalette = (options?: Partial<PaletteGenerationOptions>) => {
    const defaultOptions: PaletteGenerationOptions = {
      paletteSize: settings.paletteSize,
      harmonyType: 'analogous',
      preserveLocked: true,
      mode: settings.mode
    }
    
    paletteContext.generateNewPalette({
      ...defaultOptions,
      ...options
    })
  }
  
  const adjustPalette = (options: PaletteAdjustmentOptions) => {
    // Create a copy of the current colors to modify
    const adjustedColors = paletteContext.currentPalette.colors.map((color, index) => {
      // Skip locked colors if preserveLocked is true
      if (options.preserveLocked && color.locked) {
        return color
      }
      
      const [h, s, l] = color.hsl
      let newH = h
      let newS = s
      let newL = l
      
      // Apply hue shift if provided
      if (options.hueShift !== undefined) {
        newH = (h + options.hueShift) % 360
        if (newH < 0) newH += 360
      }
      
      // Apply saturation multiplier if provided
      if (options.saturationMultiplier !== undefined) {
        newS = Math.max(0, Math.min(100, s * options.saturationMultiplier))
      }
      
      // Apply lightness multiplier if provided
      if (options.lightnessMultiplier !== undefined) {
        newL = Math.max(0, Math.min(100, l * options.lightnessMultiplier))
      }
      
      // Only update if something changed
      if (newH !== h || newS !== s || newL !== l) {
        const newHSL: HSLColor = [newH, newS, newL]
        const newRGB = hslToRGB(newHSL)
        
        return {
          ...color,
          rgb: newRGB,
          hex: rgbToHex(newRGB),
          hsl: newHSL,
          lab: rgbToLAB(newRGB)
        }
      }
      
      return color
    })
    
    // Add current palette to history
    historyContext.addToHistory(paletteContext.currentPalette)
    
    // Update the palette with adjusted colors
    // Using regeneratePalette instead of updatePalette
    const newPalette = {
      ...paletteContext.currentPalette,
      colors: adjustedColors,
      timestamp: Date.now()
    }
    paletteContext.regeneratePalette({
      preserveLocked: options.preserveLocked
    })
  }
  
  const undo = () => {
    const previousPalette = historyContext.undo()
    if (previousPalette) {
      // Use regeneratePalette instead of setCurrentPalette
      paletteContext.regeneratePalette({
        // Adding required options
        harmonyType: previousPalette.harmony,
        preserveLocked: true
      })
      return true
    }
    return false
  }
  
  const redo = () => {
    const nextPalette = historyContext.redo()
    if (nextPalette) {
      // Use regeneratePalette instead of setCurrentPalette
      paletteContext.regeneratePalette({
        // Adding required options
        harmonyType: nextPalette.harmony,
        preserveLocked: true
      })
      return true
    }
    return false
  }

  const lockColor = (colorId: string, locked: boolean) => {
    console.log(`usePalette.lockColor called with colorId: ${colorId}, locked: ${locked}`);
    
    // First, check if the lockColor function exists in the context
    if (!paletteContext.lockColor) {
      console.error("lockColor function is missing in PaletteContext!");
      return;
    }
    
    try {
      // Call the context method
      paletteContext.lockColor(colorId, locked);
      
      // For debugging - log the updated state
      setTimeout(() => {
        const updatedColor = paletteContext.currentPalette.colors.find(c => c.id === colorId);
        console.log(`Updated color state: ${updatedColor?.locked}`);
      }, 0);
    } catch (error) {
      console.error("Error in lockColor function:", error);
    }
  };
  
  return {
    ...paletteContext,
    generatePalette,
    adjustPalette,
    undo,
    redo,
    canUndo: historyContext.canUndo,
    canRedo: historyContext.canRedo,
    lockColor
  }
}

import { createContext, useState, ReactNode, useCallback, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ColorWithId, HSLColor, HarmonyType, RGBColor } from '../types/color'
import { Palette, PaletteGenerationOptions, PaletteAdjustmentOptions } from '../types/palette'
import { UIColorRoleAssignments } from '../types/uiRoles'
import { generatePaletteFromSeed } from '../algorithms/generation/seedBased'
import { generatePaletteFromSemantics } from '../algorithms/generation/semantic'
import { hslToRGB, rgbToHSL } from '../algorithms/colorModels/conversions'
import { rgbToHex } from '../algorithms/colorModels/rgb'
import { rgbToLAB } from '../algorithms/colorModels/conversions'
import { HistoryContext } from './HistoryContext'

interface PaletteContextType {
  currentPalette: Palette
  generateNewPalette: (options: PaletteGenerationOptions) => void
  regeneratePalette: (options: Partial<PaletteGenerationOptions>) => void
  updateColor: (colorId: string, color: Partial<ColorWithId>) => void
  lockColor: (colorId: string, locked: boolean) => void
  updateRoleAssignments: (assignments: UIColorRoleAssignments) => void
  roleAssignments: UIColorRoleAssignments
  reorderColors: (startIndex: number, endIndex: number) => void
  // Add missing methods
  updatePalette: (palette: Palette) => void
  setCurrentPalette: (palette: Palette) => void
}

export const PaletteContext = createContext<PaletteContextType>({
  currentPalette: {
    id: '',
    name: '',
    colors: [],
    harmony: 'analogous',
    timestamp: 0
  },
  generateNewPalette: () => {},
  regeneratePalette: () => {},
  updateColor: () => {},
  lockColor: () => {},
  updateRoleAssignments: () => {},
  roleAssignments: {},
  reorderColors: () => {},
  updatePalette: () => {},
  setCurrentPalette: () => {}
})

interface PaletteProviderProps {
  children: ReactNode
}

export const PaletteProvider = ({ children }: PaletteProviderProps) => {
  const { addToHistory } = useContext(HistoryContext)
  
  const [currentPalette, setCurrentPalette] = useState<Palette>({
    id: uuidv4(),
    name: 'New Palette',
    colors: [],
    harmony: 'analogous',
    timestamp: Date.now()
  })
  
  const [roleAssignments, setRoleAssignments] = useState<UIColorRoleAssignments>({})
  
  const createColorWithId = (hsl: HSLColor): ColorWithId => {
    const rgb = hslToRGB(hsl)
    return {
      id: uuidv4(),
      rgb,
      hex: rgbToHex(rgb),
      hsl,
      lab: rgbToLAB(rgb),
      locked: false
    }
  }
  
  const generateNewPalette = (options: PaletteGenerationOptions) => {
    const { paletteSize, harmonyType, preserveLocked } = options;
    
    // Get currently locked colors if we need to preserve them
    const lockedColors = preserveLocked ? currentPalette.colors.filter(color => color.locked) : [];
    
    // Generate a random seed color if none provided
    const seedColor = options.seedColor || [Math.floor(Math.random() * 360), 70, 50];
    
    // Generate HSL colors
    const hslColors = generatePaletteFromSeed(seedColor, paletteSize, harmonyType);
    
    // Convert to ColorWithId objects, but preserve locked colors
    let colors: ColorWithId[] = [];
    
    if (preserveLocked && lockedColors.length > 0) {
      // Create a new array with locked colors first
      colors = [...lockedColors];
      
      // Fill the remaining slots with new colors
      const remainingSlots = paletteSize - lockedColors.length;
      
      if (remainingSlots > 0) {
        // Take only the colors we need from the generated ones
        const newColors = hslColors.slice(0, remainingSlots).map(createColorWithId);
        colors = [...colors, ...newColors];
      }
    } else {
      // No locked colors or not preserving locks - use all new colors
      colors = hslColors.map(createColorWithId);
    }
    
    // Create new palette
    const newPalette: Palette = {
      id: uuidv4(),
      name: 'New Palette',
      colors,
      harmony: harmonyType,
      timestamp: Date.now()
    };
    
    setCurrentPalette(newPalette);
    
    // Clear role assignments when generating a completely new palette
    if (!preserveLocked || lockedColors.length === 0) {
      setRoleAssignments({});
    }
  };
  
  const regeneratePalette = (options: Partial<PaletteGenerationOptions>) => {
    const { harmonyType, preserveLocked = true } = options;
    
    if (currentPalette.colors.length === 0) {
      generateNewPalette({
        paletteSize: 5,
        harmonyType: harmonyType || 'analogous',
        preserveLocked: false,
        mode: 'light'
      });
      return;
    }
    
    // Get locked colors
    const lockedColors = preserveLocked ? 
      currentPalette.colors.filter(color => color.locked) : [];
    
    // Find an unlocked color to use as seed
    let seedColor: HSLColor;
    const unlockedColor = currentPalette.colors.find(c => !c.locked);
    
    if (unlockedColor) {
      seedColor = unlockedColor.hsl;
    } else if (currentPalette.colors.length > 0) {
      seedColor = currentPalette.colors[0].hsl;
    } else {
      seedColor = [Math.floor(Math.random() * 360), 70, 50];
    }
    
    // Generate new HSL colors
    const newHarmony = harmonyType || currentPalette.harmony;
    const hslColors = generatePaletteFromSeed(
      seedColor, 
      currentPalette.colors.length, 
      newHarmony
    );
    
    // Create new colors array preserving locked colors
    let newColors: ColorWithId[] = [];
    
    if (preserveLocked && lockedColors.length > 0) {
      // Start with locked colors
      newColors = [...lockedColors];
      
      // Generate colors for remaining slots
      const remainingCount = currentPalette.colors.length - lockedColors.length;
      if (remainingCount > 0) {
        const additionalColors = hslColors.slice(0, remainingCount).map(createColorWithId);
        newColors = [...newColors, ...additionalColors];
      }
    } else {
      // No locked colors to preserve
      newColors = hslColors.map(createColorWithId);
    }
    
    // Update palette
    setCurrentPalette({
      ...currentPalette,
      colors: newColors,
      harmony: newHarmony,
      timestamp: Date.now()
    });
  };
  
  const updateColor = useCallback((colorId: string, updates: Partial<ColorWithId>) => {
    setCurrentPalette(prev => {
      const updatedColors = prev.colors.map(color => {
        if (color.id === colorId) {
          return { ...color, ...updates }
        }
        return color
      })
      
      return {
        ...prev,
        colors: updatedColors,
        timestamp: Date.now()
      }
    })
  }, [])
  
  const lockColor = (colorId: string, locked: boolean) => {
    // Update the current palette with the locked/unlocked color
    setCurrentPalette(prev => {
      const updatedColors = prev.colors.map(color => {
        if (color.id === colorId) {
          return { ...color, locked };
        }
        return color;
      });
      
      return {
        ...prev,
        colors: updatedColors,
        timestamp: Date.now()
      };
    });
  };
  
  const updateRoleAssignments = useCallback((assignments: UIColorRoleAssignments) => {
    setRoleAssignments(assignments)
  }, [])
  
  const reorderColors = useCallback((startIndex: number, endIndex: number) => {
    setCurrentPalette(prev => {
      const result = [...prev.colors]
      const [removed] = result.splice(startIndex, 1)
      result.splice(endIndex, 0, removed)
      
      return {
        ...prev,
        colors: result,
        timestamp: Date.now()
      }
    })
  }, [])
  
  const updatePalette = useCallback((palette: Palette) => {
    setCurrentPalette(palette)
  }, [])

  return (
    <PaletteContext.Provider 
      value={{
        currentPalette,
        generateNewPalette,
        regeneratePalette,
        updateColor,
        lockColor,
        updateRoleAssignments,
        roleAssignments,
        reorderColors,
        updatePalette,
        setCurrentPalette
      }}
    >
      {children}
    </PaletteContext.Provider>
  )
}

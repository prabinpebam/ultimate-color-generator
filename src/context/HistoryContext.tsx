import { createContext, useState, ReactNode, useCallback } from 'react';
import { Palette } from '../types/palette';

interface HistoryContextType {
  history: Palette[];
  currentIndex: number;
  addToHistory: (palette: Palette) => void;
  undo: () => Palette | null;
  redo: () => Palette | null;
  canUndo: boolean;
  canRedo: boolean;
}

export const HistoryContext = createContext<HistoryContextType>({
  history: [],
  currentIndex: -1,
  addToHistory: () => {},
  undo: () => null,
  redo: () => null,
  canUndo: false,
  canRedo: false
});

interface HistoryProviderProps {
  children: ReactNode;
  maxSize?: number;
}

export const HistoryProvider = ({
  children,
  maxSize = 30
}: HistoryProviderProps) => {
  const [history, setHistory] = useState<Palette[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  
  const addToHistory = useCallback((palette: Palette) => {
    setHistory(prev => {
      // Remove any future history if we're not at the end
      const newHistory = prev.slice(0, currentIndex + 1);
      
      // Add the new palette
      const updatedHistory = [...newHistory, { ...palette }];
      
      // Trim history if it exceeds max size
      if (updatedHistory.length > maxSize) {
        return updatedHistory.slice(updatedHistory.length - maxSize);
      }
      
      return updatedHistory;
    });
    
    setCurrentIndex(prev => Math.min(prev + 1, maxSize - 1));
  }, [currentIndex, maxSize]);
  
  const undo = useCallback(() => {
    if (currentIndex <= 0) {
      return null;
    }
    
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);
    return history[newIndex];
  }, [currentIndex, history]);
  
  const redo = useCallback(() => {
    if (currentIndex >= history.length - 1) {
      return null;
    }
    
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    return history[newIndex];
  }, [currentIndex, history]);
  
  return (
    <HistoryContext.Provider
      value={{
        history,
        currentIndex,
        addToHistory,
        undo,
        redo,
        canUndo: currentIndex > 0,
        canRedo: currentIndex < history.length - 1
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

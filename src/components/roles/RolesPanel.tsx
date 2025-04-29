import { useState } from 'react'
import { usePalette } from '../../hooks/usePalette'
import { UIColorRoleType } from '../../types/uiRoles'
import RoleSlot from './RoleSlot'
import './RolesPanel.css'

interface RolesPanelProps {
  isOpen: boolean
  onClose: () => void
}

const RolesPanel = ({ isOpen, onClose }: RolesPanelProps) => {
  const { currentPalette, roleAssignments, updateRoleAssignments } = usePalette()
  
  // The list of UI color roles with display names and descriptions
  const colorRoles: Array<{
    role: UIColorRoleType,
    displayName: string,
    description: string
  }> = [
    { 
      role: 'primary', 
      displayName: 'Primary', 
      description: 'Main brand color, used for key actions and navigation' 
    },
    { 
      role: 'secondary', 
      displayName: 'Secondary', 
      description: 'Complementary color for supporting elements' 
    },
    { 
      role: 'accent', 
      displayName: 'Accent', 
      description: 'Used sparingly to highlight important elements' 
    },
    { 
      role: 'background', 
      displayName: 'Background', 
      description: 'Main background of the UI' 
    },
    { 
      role: 'surface', 
      displayName: 'Surface', 
      description: 'Background for cards, modals and elevated components' 
    },
    { 
      role: 'text', 
      displayName: 'Text', 
      description: 'Primary text content color' 
    },
    { 
      role: 'border', 
      displayName: 'Border', 
      description: 'Dividers, borders and outlines' 
    },
    { 
      role: 'success', 
      displayName: 'Success', 
      description: 'Positive feedback, completion' 
    },
    { 
      role: 'warning', 
      displayName: 'Warning', 
      description: 'Cautionary feedback, important notices' 
    },
    { 
      role: 'error', 
      displayName: 'Error', 
      description: 'Error states, destructive actions' 
    },
    { 
      role: 'info', 
      displayName: 'Info', 
      description: 'Informational highlights, help text' 
    },
  ]
  
  const handleColorAssignment = (role: UIColorRoleType, colorId: string | null) => {
    const newAssignments = { ...roleAssignments }
    
    if (colorId === null) {
      // Remove assignment
      delete newAssignments[role]
    } else {
      // Add/update assignment
      newAssignments[role] = colorId
    }
    
    updateRoleAssignments(newAssignments)
  }
  
  const handleClearAll = () => {
    updateRoleAssignments({})
  }
  
  const handleAutoAssign = () => {
    const newAssignments = { ...roleAssignments }
    
    // Simple auto-assignment logic based on palette position
    if (currentPalette.colors.length > 0) {
      if (currentPalette.colors[0]) newAssignments.primary = currentPalette.colors[0].id
      if (currentPalette.colors[1]) newAssignments.secondary = currentPalette.colors[1].id
      if (currentPalette.colors[2]) newAssignments.accent = currentPalette.colors[2].id
      
      // If we have more colors, assign more roles
      if (currentPalette.colors[3]) newAssignments.background = currentPalette.colors[3].id
      if (currentPalette.colors[4]) newAssignments.surface = currentPalette.colors[4].id
      
      // Stateful colors if we have enough
      if (currentPalette.colors.length >= 8) {
        if (currentPalette.colors[5]) newAssignments.success = currentPalette.colors[5].id
        if (currentPalette.colors[6]) newAssignments.warning = currentPalette.colors[6].id
        if (currentPalette.colors[7]) newAssignments.error = currentPalette.colors[7].id
      }
    }
    
    updateRoleAssignments(newAssignments)
  }

  return (
    <div className={`roles-panel ${isOpen ? 'open' : ''}`}>
      <div className="panel-header">
        <h2>Assign UI Roles</h2>
        <button 
          className="close-button" 
          onClick={onClose}
          aria-label="Close panel"
        >
          ×
        </button>
      </div>
      
      <div className="panel-actions">
        <button 
          className="clear-button" 
          onClick={handleClearAll}
          disabled={Object.keys(roleAssignments).length === 0}
        >
          Clear All
        </button>
        <button 
          className="auto-assign-button" 
          onClick={handleAutoAssign}
          disabled={currentPalette.colors.length === 0}
        >
          Auto-Assign
        </button>
      </div>
      
      <div className="roles-container">
        {colorRoles.map(({ role, displayName, description }) => (
          <RoleSlot
            key={role}
            role={role}
            displayName={displayName}
            description={description}
            assignedColorId={roleAssignments[role] || null}
            onAssign={(colorId) => handleColorAssignment(role, colorId)}
          />
        ))}
      </div>
      
      <div className="panel-footer">
        <p className="panel-hint">
          Drag colors from your palette to assign them to UI roles, or use Auto-Assign for a quick start.
        </p>
      </div>
    </div>
  )
}

export default RolesPanel

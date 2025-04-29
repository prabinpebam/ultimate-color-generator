import { useDrop } from 'react-dnd'
import { usePalette } from '../../hooks/usePalette'
import { UIColorRoleType } from '../../types/uiRoles'
import './RoleSlot.css'

interface RoleSlotProps {
  role: UIColorRoleType
  displayName: string
  description: string
  assignedColorId: string | null
  onAssign: (colorId: string | null) => void
}

const RoleSlot = ({ 
  role, 
  displayName, 
  description, 
  assignedColorId, 
  onAssign 
}: RoleSlotProps) => {
  const { currentPalette } = usePalette()
  
  // Find the assigned color from the palette
  const assignedColor = currentPalette.colors.find(color => color.id === assignedColorId)
  
  // React DND drop target
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'COLOR',
    drop: (item: { id: string }) => {
      onAssign(item.id)
      return { role }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  })
  
  const handleClearClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering other handlers
    onAssign(null)
  }
  
  return (
    <div 
      ref={drop}
      className={`role-slot ${isOver ? 'drop-hover' : ''} ${assignedColor ? 'has-color' : ''}`}
    >
      <div className="role-info">
        <h3>{displayName}</h3>
        <p>{description}</p>
      </div>
      
      {assignedColor ? (
        <div className="role-color-preview" style={{ backgroundColor: assignedColor.hex }}>
          <button 
            className="clear-assignment" 
            onClick={handleClearClick}
            aria-label={`Clear ${displayName} assignment`}
          >
            ×
          </button>
          <span className="color-hex">{assignedColor.hex}</span>
        </div>
      ) : (
        <div className="empty-slot">
          <span>Drop color here</span>
        </div>
      )}
    </div>
  )
}

export default RoleSlot

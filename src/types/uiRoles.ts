export type UIColorRoleType = 
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'background'
  | 'surface'
  | 'text'
  | 'border'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export interface UIColorRole {
  role: UIColorRoleType;
  displayName: string;
  description: string;
  colorId?: string;  // ID of assigned color from palette
}

export interface UIColorRoleAssignments {
  [key: string]: string; // Maps role name to color ID
}

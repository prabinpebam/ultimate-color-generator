# Ultimate Color Generator - Development Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Development Environment Setup](#development-environment-setup)
3. [Project Architecture](#project-architecture)
4. [Core Concepts](#core-concepts)
5. [Development Workflow](#development-workflow)
6. [Testing Strategy](#testing-strategy)
7. [Component Development Guidelines](#component-development-guidelines)
8. [Algorithm Implementation](#algorithm-implementation)
9. [State Management](#state-management)
10. [Accessibility Implementation](#accessibility-implementation)
11. [Build and Deployment](#build-and-deployment)
12. [Contributing](#contributing)

## Introduction

The Ultimate Color Generator is a sophisticated web application designed to help users create harmonious and accessible color palettes for digital interfaces. This guide provides developers with the necessary information to understand, contribute to, and extend the project.

### Project Goals

- Enable designers and non-designers to create cohesive color palettes
- Provide multiple input methods (direct color selection, semantic input, image extraction)
- Ensure accessibility compliance through WCAG contrast checking
- Generate color schemes based on established harmony principles
- Facilitate the application of colors to standard UI roles

### Key Technologies

- **Frontend Framework**: React with TypeScript
- **Build System**: Vite
- **Testing**: Vitest and React Testing Library
- **Styling**: CSS Variables and custom styling
- **Deployment**: GitHub Pages

## Development Environment Setup

### Prerequisites

- Node.js (v16.x or higher recommended)
- npm (v8.x or higher) or yarn
- Git

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/ultimate-color-generator.git
   cd ultimate-color-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Editor Setup

We recommend using Visual Studio Code with the following extensions:
- ESLint
- Prettier
- TypeScript Hero
- Color Highlight

Configure your editor to format on save using Prettier with the project's `.prettierrc` configuration.

## Project Architecture

The Ultimate Color Generator follows a modular architecture with clear separation of concerns. The primary organizational structure is as follows:

### Core Structure

```
ultimate-color-generator/
├── src/                   # Source code
│   ├── algorithms/        # Pure color-related logic
│   ├── components/        # React components
│   ├── context/           # React context providers
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript types and interfaces
│   └── utils/             # Utility functions
├── documentation/         # Project documentation
└── tests/                 # Test files
```

### Key Directory Explanations

#### `src/algorithms/`
Contains all the color-related mathematical and algorithmic logic, organized by function:
- `colorModels/` - Core implementations of RGB, HSL, and LAB color models with conversion utilities
- `harmony/` - Implementations of color harmony algorithms (complementary, analogous, etc.)
- `accessibility/` - WCAG contrast algorithms and color blindness simulations
- `generation/` - Palette generation logic based on seeds, semantics, and images

#### `src/components/`
UI components organized by function:
- `common/` - Reusable UI primitives (buttons, inputs, etc.)
- `layout/` - Structural components (header, sidebar, etc.)
- `generate/` - Components specific to palette generation
- `roles/` - Components for assigning colors to UI roles
- `accessibility/` - Accessibility checking components
- `preview/` - Preview mockups showing palette in context
- `export/` - Components for exporting palettes in various formats

#### `src/context/`
React Context providers for global state management:
- `PaletteContext` - Manages the current palette state
- `SettingsContext` - Manages application settings
- `HistoryContext` - Manages palette history and undo/redo functionality

#### `src/hooks/`
Custom React hooks for reusable logic:
- `usePalette` - Palette manipulation hooks
- `useColorConversion` - Hooks for converting between color models
- `useImageExtraction` - Image color extraction functionality
- `useSemanticMapping` - Mapping semantic inputs to color attributes
- `useStorage` - Local storage persistence

## Core Concepts

### Color Models

The application uses three primary color models:

1. **RGB (Red, Green, Blue)**: Used primarily for display and export formats
2. **HSL (Hue, Saturation, Lightness)**: Used for intuitive manipulation and harmony generation
3. **LAB (CIELAB)**: Used for perceptually uniform operations and accessibility calculations

Each model has its own class/module with appropriate conversion methods.

### Color Harmony

The application implements several established color harmony principles:

- Complementary: Colors opposite on the color wheel
- Analogous: Colors adjacent on the color wheel
- Triadic: Three colors evenly spaced on the color wheel
- Tetradic/Square: Four colors evenly spaced on the color wheel
- Split-Complementary: A base color plus two colors adjacent to its complement
- Monochromatic: Variations of a single hue

### UI Color Roles

Colors in a palette are assigned to standard UI roles:
- Primary/Brand
- Secondary
- Accent
- Background (Light/Dark)
- Surface
- Text
- Border
- States (hover, active, disabled)
- Notifications (success, warning, error, info)

## Development Workflow

### Feature Development Process

1. **Issue Creation**: Create a GitHub issue describing the feature/bug
2. **Branch Creation**: Create a feature branch with format `feature/issue-number-short-description`
3. **Development**: Implement the feature with appropriate tests
4. **Self-Review**: Ensure code meets style guidelines and passes all tests
5. **Pull Request**: Submit a PR with a detailed description
6. **Code Review**: Address feedback from reviewers
7. **Merge**: Merge the PR once approved

### Code Style and Conventions

- Follow the TypeScript style guidelines and ESLint rules configured in the project
- Use functional components with hooks for React components
- Implement pure functions for algorithms whenever possible
- Use descriptive variable names that reflect domain concepts
- Document complex algorithms with comments explaining the mathematical background

## Testing Strategy

We use Vitest and React Testing Library for testing our application.

### Testing Levels

1. **Unit Tests**: For algorithms and utility functions
   - Test input/output relationships
   - Test edge cases and error handling

2. **Component Tests**: For React components
   - Test rendering
   - Test user interactions
   - Test state changes

3. **Integration Tests**: For key user flows
   - Test end-to-end features
   - Test component interactions

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Component Development Guidelines

### Component Structure

1. Define props interface
2. Implement component with appropriate typing
3. Implement handlers for user interactions
4. Apply appropriate styling
5. Add accessibility attributes
6. Write tests

### Example Component

```tsx
import { FC, useState } from 'react';
import './Button.css';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  disabled = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
  return (
    <button
      className={`btn btn-${variant} ${isHovered ? 'hovered' : ''}`}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
```

## Algorithm Implementation

### Algorithm Guidelines

1. Implement algorithms as pure functions when possible
2. Document the mathematical basis of each algorithm
3. Provide type safety with TypeScript interfaces
4. Handle edge cases and invalid inputs
5. Optimize for performance when necessary

### Example Algorithm Implementation

```typescript
/**
 * Generates a complementary color in HSL color space
 * A complementary color is 180 degrees away on the color wheel
 * 
 * @param hsl - HSL color values [hue, saturation, lightness]
 * @returns Complementary HSL color
 */
export function generateComplementary(hsl: HSLColor): HSLColor {
  const [h, s, l] = hsl;
  
  // Calculate complementary hue (180 degrees opposite)
  const complementaryHue = (h + 180) % 360;
  
  return [complementaryHue, s, l];
}
```

## State Management

The application uses React Context for state management, with custom hooks providing a clean API for consuming and updating state.

### Key State Management Files

- `src/context/PaletteContext.tsx`: Manages the current palette
- `src/context/SettingsContext.tsx`: Manages application settings
- `src/context/HistoryContext.tsx`: Manages history and undo/redo functionality

### Example State Hook Usage

```tsx
import { usePalette } from '../hooks/usePalette';

const MyComponent = () => {
  const { palette, updatePalette, regeneratePalette } = usePalette();
  
  const handleRegenerateClick = () => {
    regeneratePalette({
      preserveLocked: true,
      harmonyType: 'analogous'
    });
  };
  
  return (
    <div>
      {palette.map(color => (
        <ColorSwatch key={color.id} color={color} />
      ))}
      <button onClick={handleRegenerateClick}>Regenerate</button>
    </div>
  );
};
```

## Accessibility Implementation

Accessibility is a core feature of the Ultimate Color Generator, not just an add-on.

### Key Accessibility Features

1. **WCAG Contrast Checking**:
   - Implementation of contrast ratio calculations according to WCAG 2.1
   - Visual indicators for AA and AAA compliance levels
   - Automatic color adjustment to meet contrast requirements

2. **Color Blindness Simulation**:
   - Implementations of protanopia, deuteranopia, and tritanopia simulations
   - Visual preview of how palettes appear to users with color vision deficiencies

3. **General Accessibility**:
   - Keyboard navigation support
   - ARIA attributes for screen reader compatibility
   - Focus management for modal and drawer components

### Implementing Accessible Components

- Use semantic HTML elements whenever possible
- Include proper ARIA roles and attributes
- Implement keyboard navigation (focus management)
- Test with screen readers

## Build and Deployment

### Build Process

The application is built using Vite, with output configured to the `docs/` directory for GitHub Pages compatibility.

```bash
# Development build
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

### Deployment

The application is deployed to GitHub Pages automatically when changes are pushed to the main branch.

1. Ensure the `vite.config.ts` has `build.outDir` set to 'docs'
2. Run `npm run build`
3. Commit and push the updated `docs/` directory
4. GitHub Actions will deploy the changes

## Contributing

### Getting Started as a Contributor

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes following our development guidelines
4. Add tests for your changes
5. Submit a pull request

### Pull Request Process

1. Ensure your code follows our style guidelines
2. Update documentation as necessary
3. Include tests for new features
4. Get approval from at least one maintainer
5. Merge only when all checks pass

## Additional Resources

- [Color Theory Research Report](./Comprehensive%20Research%20Report%20on%20Color%20Theory%20and%20Application%20for%20Digital%20Interface%20Design.md)
- [UX Design Specification](./UX‑Design‑Specification.md)
- [Algorithm Explanations](./algorithm-explanations.md)
- [Project Folder Structure](./project-folder-structure.md)

---

This document is a living guide and will be updated as the project evolves. If you have suggestions for improvements, please open an issue or pull request.

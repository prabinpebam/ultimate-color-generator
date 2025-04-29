# Ultimate Color Generator

A sophisticated web application for creating harmonious and accessible color palettes for digital interfaces. This tool enables both designers and non-designers to generate, customize, and export color palettes that meet WCAG accessibility standards.

![Ultimate Color Generator Screenshot](./docs/assets/screenshot.png)

## Features

- **Multiple Generation Methods**: Create palettes from seed colors, semantic inputs, or image extraction
- **Color Harmony Rules**: Apply established color theory principles including analogous, complementary, triadic and more
- **UI Role Assignment**: Assign colors to standard UI roles like primary, secondary, accent, etc.
- **Accessibility Checking**: Test contrast ratios against WCAG standards and simulate color blindness
- **Live Previews**: See your palette applied to common UI components and layouts in real-time
- **Export Options**: Export your palette in multiple formats including CSS variables, SCSS, and more

## Getting Started

### Prerequisites

- Node.js (v16.x or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ultimate-color-generator.git
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

## Usage

1. **Generate a Palette**:
   - Click "Generate" for an instant palette
   - Adjust harmony type and number of colors using the controls
   - Lock colors you want to keep by clicking the lock icon

2. **Customize**:
   - Fine-tune individual colors by clicking on them
   - Add semantic tags for mood-based generation
   - Upload images to extract colors

3. **Check Accessibility**:
   - Use the accessibility tools to ensure your palette meets WCAG standards
   - Validate contrast ratios between text and background colors

4. **Preview**:
   - View your palette in various UI contexts like websites, dashboards, and mobile interfaces
   - Toggle between light and dark modes

5. **Export**:
   - Choose your desired export format
   - Copy directly to clipboard or download as a file

## Development

### Project Structure

The application follows a modular architecture with clear separation of concerns:

- **algorithms/**: Color-related mathematical and algorithmic logic
- **components/**: React components organized by function
- **context/**: React Context providers for global state
- **hooks/**: Custom React hooks for reusable logic
- **types/**: TypeScript types and interfaces
- **utils/**: Utility functions

See the [project folder structure](./documentation/project-folder-structure.md) for more details.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production-ready files
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Lint code
- `npm run format` - Format code

## Deployment

The application is configured for deployment to GitHub Pages:

```bash
npm run build
```

This will create a production build in the `docs/` directory, which can be deployed to GitHub Pages.

## Technologies

- React
- TypeScript
- Vite
- CSS Variables
- React Router
- React DnD
- Vitest for testing

## Documentation

For more detailed information, check out the documentation:

- [Development Guide](./documentation/development-guide.md)
- [Algorithm Explanations](./documentation/algorithm-explanations.md)
- [UX Design Specification](./documentation/UX‑Design‑Specification.md)
- [Color Theory Research](./documentation/Comprehensive%20Research%20Report%20on%20Color%20Theory%20and%20Application%20for%20Digital%20Interface%20Design.md)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

ultimate-color-generator/
├── src/
│   ├── assets/                        # Raw, un‑transformed files
│   │   ├── fonts/
│   │   ├── icons/
│   │   └── images/
│   │
│   ├── styles/                        # Global & design‑token CSS
│   │   ├── variables.css
│   │   ├── themes.css
│   │   └── global.css
│   │
│   ├── types/                         # Shared types and interfaces
│   │   ├── color.ts
│   │   ├── palette.ts
│   │   └── uiRoles.ts
│   │
│   ├── algorithms/                    # Color-related logic (pure functions)
│   │   ├── colorModels/               # Core color transformations
│   │   │   ├── rgb.ts
│   │   │   ├── hsl.ts
│   │   │   ├── lab.ts
│   │   │   └── conversions.ts         # Conversions between models
│   │   │
│   │   ├── harmony/                   # Color harmony algorithms
│   │   │   ├── complementary.ts
│   │   │   ├── analogous.ts
│   │   │   ├── triadic.ts
│   │   │   └── tetradic.ts
│   │   │
│   │   ├── accessibility/
│   │   │   ├── contrast.ts
│   │   │   ├── wcag.ts
│   │   │   └── colorBlind.ts
│   │   │
│   │   ├── generation/
│   │   │   ├── seedBased.ts
│   │   │   ├── semantic.ts
│   │   │   └── imageBased.ts
│   │   │
│   │   └── kmeans.ts                  # Image color extraction
│   │
│   ├── utils/                         # General-purpose helpers
│   │   ├── fileExport.ts
│   │   ├── store.ts                   # LocalStorage wrapper
│   │   └── share.ts                   # URL parameter handling
│   │
│   ├── context/                       # React Context providers
│   │   ├── PaletteContext.tsx
│   │   ├── SettingsContext.tsx
│   │   └── HistoryContext.tsx
│   │
│   ├── hooks/                         # Reusable stateful logic
│   │   ├── usePalette.ts
│   │   ├── useColorConversion.ts
│   │   ├── useImageExtraction.ts
│   │   ├── useSemanticMapping.ts
│   │   └── useStorage.ts
│   │
│   ├── components/
│   │   ├── common/                    # Pure UI atoms
│   │   │   ├── Button.tsx
│   │   │   ├── Icon.tsx
│   │   │   ├── Tooltip.tsx
│   │   │   ├── Slider.tsx
│   │   │   ├── Dropdown.tsx
│   │   │   └── Modal.tsx
│   │   │
│   │   ├── layout/                    # Shell chrome
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── BottomSheet.tsx
│   │   │   └── Drawer.tsx
│   │   │
│   │   ├── generate/                  # "Generate" view widgets
│   │   │   ├── QuickBar.tsx
│   │   │   ├── InputDrawer/
│   │   │   │   ├── SeedPicker.tsx
│   │   │   │   ├── SemanticInput.tsx
│   │   │   │   └── ImageUpload.tsx
│   │   │   ├── PaletteBoard/
│   │   │   │   ├── Swatch.tsx
│   │   │   │   ├── SwatchGrid.tsx
│   │   │   │   └── MiniPicker.tsx
│   │   │   └── ContextPreviewStrip.tsx
│   │   │
│   │   ├── roles/
│   │   │   ├── RolesPanel.tsx
│   │   │   └── RoleSlot.tsx
│   │   │
│   │   ├── accessibility/
│   │   │   ├── AccessibilityOverlay.tsx
│   │   │   ├── ContrastMatrix.tsx
│   │   │   └── ColorBlindSimulator.tsx
│   │   │
│   │   ├── preview/
│   │   │   ├── PreviewTabs.tsx
│   │   │   ├── WebpageMock.tsx
│   │   │   ├── DashboardMock.tsx
│   │   │   ├── MobileMock.tsx
│   │   │   └── EmailMock.tsx
│   │   │
│   │   └── export/
│   │       ├── ExportDrawer.tsx
│   │       └── FormatCheckbox.tsx
│   │
│   ├── pages/                         # Route‑level components
│   │   ├── GeneratePage.tsx
│   │   ├── PreviewPage.tsx
│   │   └── NotFound.tsx
│   │
│   ├── App.tsx                        # Top‑level router/layout
│   ├── routes.tsx
│   └── main.tsx                       # Vite entry
│
├── documentation/                     # Project documentation (not deployed)
│   ├── UX‑Design‑Specification.md
│   ├── development-guide.md
│   └── algorithm-explanations.md
│
├── tests/                             # Vitest / React‑Testing‑Library
│   ├── components/
│   ├── hooks/
│   ├── algorithms/
│   └── utils/
│
├── docs/                              # Build output (GitHub Pages dir)
│   ├── index.html                     # Generated from build
│   ├── assets/                        # Generated from build
│   └── .nojekyll                      # Prevents GitHub Jekyll processing
│
├── index.html                         # Root HTML template for Vite
├── .eslintrc.cjs
├── .prettierrc
├── tsconfig.json
├── vite.config.ts                     # Configure build.outDir = 'docs'
├── package.json
└── README.md
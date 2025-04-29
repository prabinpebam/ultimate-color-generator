# Ultimate Color Generator – UX Design Specification  

## 1. Product Vision  
Enable designers and non‑designers to create, refine and export accessible, brand‑ready color palettes through a single, guided interface.

---

## 2. Personas (condensed)  
| Persona | Goal | Pain‑points the app solves |
|---------|------|----------------------------|
| Novice web‑builder | Needs a quick, good‑looking palette without knowing color theory | Overwhelm, technical jargon |
| UI/UX designer | Wants fine control, WCAG compliance, export tokens | Manual tweaking, contrast checking |
| Brand manager | Ensure palettes map to brand roles & share with team | Consistency, documentation |

---

## 3. High‑Level Information Architecture  

1. Global Shell  
   1.1 Header (brand, theme toggle, account)  
   1.2 Collapsible Nav Sidebar  
        • Generate • Roles • Accessibility • Preview • Export  

2. Generate (default)  
   • Quick Bar   • Input Drawer   • Palette Board   • Context Preview Strip  

3. Roles Panel (bottom sheet / side panel)  
4. Accessibility Overlay (modal)  
5. Preview View (full page)  
6. Export Drawer  
7. Support: Onboarding tour, glossary tooltips, history, save/share

---

## 4. Detailed Views & Components  

### 4.1 Global Shell  
| Area | Contents | Interactions |
|------|----------|--------------|
| Header | Logo • Light/Dark toggle • User avatar | Toggle theme, open account menu |
| Nav Sidebar | Icons + labels for the 5 views | Click → load view; collapsible |

### 4.2 Generate View (Palette Builder)  
| Zone | Description | Key Controls |
|------|-------------|--------------|
| Quick Bar (sticky top) | One‑click “Generate”, Harmony selector, Palette‑size dropdown, Mode (Light/Dark/Both) toggle | Instant regeneration, updates board live |
| Input Drawer (slide‑in right) | Seed Color picker (HEX/RGB/LAB), Semantic tag chips, Image upload, Constraint sliders (sat, lightness, temp) | Drawer can stay closed; mixed inputs allowed |
| Palette Board (center) | Swatches sized to 60‑30‑10; each shows HEX/RGB; lock icon; contrast badge | Drag to reorder, click to open mini‑picker, lock/unlock, copy hex |
| Context Preview Strip (bottom) | Mini components (button, card, text on bg) in real time | Click component → open full Preview view |

### 4.3 Roles Panel  
• Invoked via docked button or nav.  
• Drag a swatch onto role slots: Primary, Secondary, Accent, BG (light/dark), Surface, Text, Border, States, Notifications.  
• Live reflect in preview strip.  
• Conflict icon if contrast of Text/BG fails.

### 4.4 Accessibility Overlay  
| Feature | Details |
|---------|---------|
| Contrast Matrix | n×n grid, AA & AAA badges |
| Color‑blind Simulators | Protanopia, Deuteranopia, Tritanopia – hover palette to preview |
| Enforce Toggle | Auto‑adjust offending pairs when on |

### 4.5 Preview View  
Tabs: Webpage • Dashboard • Mobile • Email.  
Each tab shows responsive breakpoints; Light/Dark toggle inherited. Real components pull colors from current role mapping.

### 4.6 Export Drawer  
Checklist of formats (CSS vars, SCSS, Tailwind‑config, JSON, SVG, ASE, PNG).  
Options: include role tokens, include proportion doc PDF.  
Buttons: Copy to clipboard, Download zip, Create share link.

---

## 5. Interaction Flows (happy path)  
1. User lands on Generate → clicks “Generate” for instant palette.  
2. Locks 2 colors, opens Input Drawer, adds semantic tag “calm”, regenerates remaining colors.  
3. Opens Roles Panel, drags colors to Primary/Accent/Text.  
4. Accessibility Overlay warns Primary vs Text (fails AA) → auto‑fix.  
5. Opens Preview, toggles Dark Mode, satisfied.  
6. Export Drawer → selects CSS + PDF, downloads bundle.  
7. Share link copied; session auto‑saved to account.

---

## 6. Responsive Behaviour  
• ≥1280 px: three‑panel (Nav + Canvas + Side drawers).  
• 768‑1279 px: Nav collapses to icons; drawers turn into full‑height slide‑overs.  
• <768 px: Single‑column; Quick Bar sticky; panels become bottom sheets.

---

## 7. Accessibility & Performance Notes  
• Keyboard‑navigable components (Roving tabindex in swatch grid).  
• ARIA roles for pickers, sliders, drawers.  
• Color‑choice changes announced via live‑region.  
• Lazy‑load image analysis (web worker) to keep UI responsive.

---

## 8. Glossary Tooltip Set (examples)  
| Term | Tooltip |
|------|---------|
| Hue | “Color family measured 0‑360° on wheel.” |
| L* (LAB) | “Perceived lightness 0 (black) – 100 (white).” |
| WCAG AA | “Minimum contrast 4.5:1 for normal text.” |

---

## 9. Open Questions  
1. Should semantic tags be editable by admins?  
2. Versioning strategy for shared palette links?  
3. Do we cache image uploads or process client‑side only?

---

_End of spec._
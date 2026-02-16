# Vibrant Textiles Association Website

A modern, responsive website for Vibrant Textiles Association built with React, Vite, Tailwind CSS, and Framer Motion.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing (ready for future pages)

## Project Structure

```
vibrant-textiles/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx       # Sticky navigation with mobile menu
│   │   ├── Hero.jsx         # Hero section with CTA
│   │   ├── About.jsx        # About Vibrant Textiles section
│   │   ├── Mission.jsx      # Mission cards section
│   │   ├── FocusAreas.jsx   # Key focus areas grid
│   │   └── Members.jsx      # Board members section
│   ├── pages/               # Page components
│   │   └── Home.jsx         # Main home page
│   ├── hooks/               # Custom React hooks (for future use)
│   ├── utils/               # Utility functions (for future use)
│   ├── assets/              # Static assets
│   ├── App.jsx              # Main app with routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles with Tailwind
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
└── package.json             # Dependencies
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd vibrant-textiles
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

### 4. Preview Production Build

```bash
npm run preview
```

## Features

### Current Implementation

- ✅ Responsive navbar with smooth scroll
- ✅ Mobile hamburger menu
- ✅ Hero section with animations
- ✅ About section with scroll animations
- ✅ Mission cards with hover effects
- ✅ Key focus areas grid
- ✅ Board members section (placeholder)
- ✅ Smooth scrolling between sections
- ✅ Active link highlighting
- ✅ Framer Motion animations
- ✅ Mobile-first responsive design

### Placeholder Sections (Ready for Development)

- Events/Fair
- Skill Development
- Media
- Research
- Contact
- Membership

## Backend Integration Notes

The code is structured for easy backend integration:

### Components Ready for API Integration

1. **Mission.jsx** - Line 11: Fetch mission data from API
2. **FocusAreas.jsx** - Line 11: Fetch focus areas from API
3. **Members.jsx** - Line 11: Fetch board members from API

### Recommended API Structure

```javascript
// Example API endpoints
GET /api/missions          // Fetch all missions
GET /api/focus-areas       // Fetch all focus areas
GET /api/members           // Fetch board members
POST /api/membership       // Submit membership application
GET /api/events            // Fetch events
```

### Example API Integration

```javascript
// In hooks/useMembers.js
import { useState, useEffect } from 'react';

export const useMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/members')
      .then(res => res.json())
      .then(data => {
        setMembers(data);
        setLoading(false);
      });
  }, []);

  return { members, loading };
};
```

## Color Palette

- **Primary**: Deep maroon/red tones (#c23d3d to #6f2727)
- **Accent**: Gold/yellow tones (#eab308 to #713f12)
- **Background**: Soft grays and whites

## Customization

### Changing Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Your custom colors
  },
  accent: {
    // Your custom colors
  }
}
```

### Adding New Sections

1. Create component in `src/components/`
2. Import and add to `src/pages/Home.jsx`
3. Add navigation link in `src/components/Navbar.jsx`

## Future Enhancements

- [ ] Backend API integration
- [ ] Contact form with validation
- [ ] Event management system
- [ ] Member portal/dashboard
- [ ] Blog/News section
- [ ] Gallery/Media section
- [ ] Search functionality
- [ ] Multi-language support
- [ ] Admin panel

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2024 Vibrant Textiles Association. All rights reserved.

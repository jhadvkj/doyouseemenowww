# A TEĎ MĚ VIDÍŠ? - Photography Collection Project

A minimalist photography website where visitors can upload and view photos of QR code stickers found in various locations.

## Features

- Clean white background with black serif typography
- Animated floating red handwritten background element
- Photo upload functionality with image optimization
- Frameless photo gallery grid (3 columns)
- Responsive design for mobile and desktop
- Czech language content

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express
- **Styling**: Tailwind CSS + shadcn/ui
- **Image Processing**: Sharp
- **File Upload**: Multer
- **State Management**: TanStack Query

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open http://localhost:5000

## Deployment

### GitHub Pages (Static)
This project requires a backend server, so GitHub Pages alone won't work.

### Recommended: Railway/Render/Vercel
1. Push to GitHub
2. Connect your repository to Railway, Render, or Vercel
3. Set build command: `npm run build`
4. Set start command: `npm start`

### Environment Variables
- `NODE_ENV`: production
- `PORT`: (automatically set by most platforms)

## File Structure

```
├── client/          # Frontend React application
├── server/          # Backend Express application  
├── shared/          # Shared TypeScript schemas
├── uploads/         # File storage for uploaded images
└── dist/           # Production build output
```

## Credits

- Site made with replit.com
- Font credit to plain-form.com, typeface: ready active light
- Non-commercial use
- Contact: touskovazuza@gmail.com
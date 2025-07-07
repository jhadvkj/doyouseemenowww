# A TEĎ MĚ VIDÍŠ? - Photography Collection Project

## Overview

This is a photography collection project built with a modern full-stack architecture. The application allows users to upload and view photos in a gallery format. The title "A TEĎ MĚ VIDÍŠ?" translates to "Do you see me now?" in Czech, suggesting this is a project focused on making small things visible through photography, particularly involving QR code stickers placed in various locations.

## System Architecture

The application follows a monorepo structure with clear separation between client and server code:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite for fast development and building

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **File Processing**: Sharp for image optimization, Multer for file uploads
- **Session Management**: PostgreSQL-based session storage
- **Development**: tsx for TypeScript execution in development

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Schema Management**: Drizzle Kit for migrations
- **File Storage**: Local filesystem with static file serving

## Key Components

### Database Schema
- **Photos Table**: Stores photo metadata including filename, original name, MIME type, size, and upload timestamp
- **Schema Validation**: Zod schemas for type-safe data validation

### API Endpoints
- `GET /api/photos`: Retrieve all photos sorted by upload date
- `POST /api/photos`: Upload new photos with multipart form data
- `GET /uploads/*`: Serve uploaded image files with caching headers

### Frontend Components
- **Home Page**: Main gallery view with photo upload functionality
- **UI Components**: Comprehensive shadcn/ui component library including forms, dialogs, toasts, and more
- **Mobile Support**: Responsive design with mobile-specific hooks and components

### File Upload System
- **Image Processing**: Sharp for optimization and format conversion
- **File Validation**: Type checking and size limits (10MB max)
- **Storage**: Local uploads directory with organized file naming
- **Error Handling**: Comprehensive error handling with user feedback

## Data Flow

1. **Photo Upload**: User selects image → Client validates file → Upload to server → Sharp processes image → Store in filesystem → Save metadata to database → Update client cache
2. **Photo Display**: Client requests photos → Server queries database → Return photo metadata → Client renders gallery with image URLs
3. **Real-time Updates**: TanStack Query handles cache invalidation and automatic refetching

## External Dependencies

### Production Dependencies
- **UI Framework**: React ecosystem (React, React DOM, React Router alternative)
- **Database**: Drizzle ORM with PostgreSQL driver
- **Image Processing**: Sharp for server-side image manipulation
- **File Upload**: Multer for handling multipart form data
- **Component Library**: Radix UI primitives with shadcn/ui styling
- **Utilities**: Date-fns for date handling, class-variance-authority for component variants

### Development Dependencies
- **Build Tools**: Vite, ESBuild for production builds
- **TypeScript**: Full TypeScript support across the stack
- **Styling**: Tailwind CSS with PostCSS processing
- **Development**: tsx for TypeScript execution, various type definitions

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds client code to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Assets**: Static file serving for uploaded images

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Environment setting (development/production)

### File Structure
```
├── client/          # Frontend React application
├── server/          # Backend Express application  
├── shared/          # Shared TypeScript schemas and types
├── uploads/         # File storage for uploaded images
├── migrations/      # Database migration files
└── dist/           # Production build output
```

## Changelog

- July 07, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.